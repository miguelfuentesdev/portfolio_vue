# Lambda de contacto

Recibe `{ sender_email, message }` desde `server/api/contact`, guarda el mensaje en
`public.contact_messages` (Supabase, rol `contact_app`) y lo reenvía por SES.

- Función: `portfolio-contact` (us-west-2, Node 22, arm64)
- Function URL con auth `AWS_IAM`; Vercel la invoca con el rol `vercel-portfolio-contact`
  vía OIDC (solo `web-portfolio` en production).
- SES: identidad `mfuentesdev.com`, remitente `contacto@mfuentesdev.com`.

## Desplegar

```powershell
cd infra/contact-lambda
npm ci --omit=dev
Compress-Archive -Force -Path index.mjs, package.json, node_modules -DestinationPath function.zip
aws --profile mfuentesaws --region us-west-2 lambda update-function-code --function-name portfolio-contact --zip-file fileb://function.zip
```

## Contraseña de la base

```bash
bash infra/contact-lambda/set-db-password.sh
```
