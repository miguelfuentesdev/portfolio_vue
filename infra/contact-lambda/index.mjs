// Guarda el mensaje de contacto en Supabase y lo reenvía por SES.
// Se invoca solo desde el servidor de Nuxt a través de una Function URL con IAM.
import pg from 'pg';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const MAX_MESSAGE_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ses = new SESv2Client({});

// Una conexión basta: cada instancia de Lambda atiende una petición a la vez
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME ?? 'postgres',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
  max: 1,
  idleTimeoutMillis: 10_000,
});

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseBody(event) {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body ?? '', 'base64').toString('utf8')
    : event.body ?? '';
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function buildEmail(email, message) {
  const date = new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });
  const html = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Fecha:</strong> ${date}</p>
    <hr>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>
  `;
  const text = `Nuevo mensaje de contacto\n\nEmail: ${email}\nFecha: ${date}\n\n${message}`;
  return { html, text };
}

export const handler = async (event) => {
  if (event.requestContext?.http?.method !== 'POST') {
    return json(405, { error: 'Método no permitido.' });
  }

  const body = parseBody(event);
  const email = typeof body?.sender_email === 'string' ? body.sender_email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (
    !email ||
    !message ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    !EMAIL_REGEX.test(email)
  ) {
    return json(400, { error: 'Email y mensaje son requeridos.' });
  }

  let id;
  try {
    const { rows } = await pool.query(
      'insert into public.contact_messages (email, message) values ($1, $2) returning id',
      [email, message],
    );
    id = rows[0].id;
  } catch (error) {
    console.error('No se pudo guardar el mensaje', error);
    return json(500, { error: 'No se pudo guardar el mensaje.' });
  }

  const { html, text } = buildEmail(email, message);
  try {
    await ses.send(
      new SendEmailCommand({
        FromEmailAddress: process.env.FROM_EMAIL,
        Destination: { ToAddresses: [process.env.TO_EMAIL] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            Subject: { Data: 'Nuevo mensaje de contacto', Charset: 'UTF-8' },
            Body: {
              Html: { Data: html, Charset: 'UTF-8' },
              Text: { Data: text, Charset: 'UTF-8' },
            },
          },
        },
      }),
    );
  } catch (error) {
    console.error('No se pudo enviar el email', { id, error });
    await pool
      .query("update public.contact_messages set status = 'failed' where id = $1", [id])
      .catch((e) => console.error('No se pudo marcar como fallido', { id, e }));
    return json(502, { error: 'No se pudo enviar el mensaje.' });
  }

  try {
    await pool.query("update public.contact_messages set status = 'sent' where id = $1", [id]);
  } catch (error) {
    // El correo ya salió; solo queda registrado como pendiente
    console.error('No se pudo marcar como enviado', { id, error });
  }

  return json(200, { message: 'Mensaje enviado correctamente' });
};
