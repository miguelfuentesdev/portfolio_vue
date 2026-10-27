import { createHash, createHmac } from 'node:crypto';
import type { H3Event } from 'h3';
import type { ContactRequest } from '~/types/ContactRequest';

interface AwsCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
  expiresAt: number;
}

// Se reutilizan mientras la instancia de la función siga viva
let cachedCredentials: AwsCredentials | null = null;

const sha256 = (data: string) => createHash('sha256').update(data).digest('hex');
const hmac = (key: string | Buffer, data: string) => createHmac('sha256', key).update(data).digest();

// Vercel entrega un token OIDC por petición; se cambia por credenciales temporales del rol
async function getCredentials(event: H3Event, roleArn: string, region: string): Promise<AwsCredentials> {
  if (cachedCredentials && cachedCredentials.expiresAt - Date.now() > 60_000) {
    return cachedCredentials;
  }

  const token = getHeader(event, 'x-vercel-oidc-token') ?? process.env.VERCEL_OIDC_TOKEN;
  if (!token) {
    throw new Error('Falta el token OIDC de Vercel');
  }

  const response = await $fetch<any>(`https://sts.${region}.amazonaws.com/`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      Action: 'AssumeRoleWithWebIdentity',
      Version: '2011-06-15',
      RoleArn: roleArn,
      RoleSessionName: 'web-portfolio-contact',
      WebIdentityToken: token,
    }).toString(),
  });

  const credentials = response.AssumeRoleWithWebIdentityResponse.AssumeRoleWithWebIdentityResult.Credentials;
  cachedCredentials = {
    accessKeyId: credentials.AccessKeyId,
    secretAccessKey: credentials.SecretAccessKey,
    sessionToken: credentials.SessionToken,
    expiresAt: credentials.Expiration * 1000,
  };
  return cachedCredentials;
}

// Firma SigV4 mínima para un POST JSON a una Function URL con auth AWS_IAM
function signRequest(url: URL, body: string, region: string, credentials: AwsCredentials) {
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const date = amzDate.slice(0, 8);
  const scope = `${date}/${region}/lambda/aws4_request`;
  const payloadHash = sha256(body);

  const headers: Record<string, string> = {
    'content-type': 'application/json',
    host: url.host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
    'x-amz-security-token': credentials.sessionToken,
  };
  const signedHeaders = Object.keys(headers).sort().join(';');
  const canonicalHeaders = Object.keys(headers).sort().map((k) => `${k}:${headers[k]}\n`).join('');
  const canonicalRequest = ['POST', url.pathname || '/', '', canonicalHeaders, signedHeaders, payloadHash].join('\n');

  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha256(canonicalRequest)].join('\n');
  const signingKey = hmac(hmac(hmac(hmac(`AWS4${credentials.secretAccessKey}`, date), region), 'lambda'), 'aws4_request');
  const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  return {
    ...headers,
    authorization: `AWS4-HMAC-SHA256 Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
  };
}

export async function sendToContactLambda(event: H3Event, payload: ContactRequest) {
  const { contactLambdaUrl, contactRoleArn, contactAwsRegion } = useRuntimeConfig(event);
  const credentials = await getCredentials(event, contactRoleArn, contactAwsRegion);

  const url = new URL(contactLambdaUrl);
  const body = JSON.stringify(payload);

  return fetch(url, {
    method: 'POST',
    headers: signRequest(url, body, contactAwsRegion, credentials),
    body,
  });
}
