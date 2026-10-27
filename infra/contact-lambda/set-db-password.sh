#!/usr/bin/env bash
# Guarda la contraseña de contact_app en la Lambda sin mostrarla ni dejarla en el repo.
# Uso: infra/contact-lambda/set-db-password.sh
set -euo pipefail

FN=${FN:-portfolio-contact}
AWS=${AWS_CLI:-aws}
AWS_ARGS=(--profile "${AWS_PROFILE_NAME:-mfuentesaws}" --region us-west-2)

read -rsp "Contraseña de contact_app en Supabase: " DB_PASS
echo

CURRENT=$("$AWS" "${AWS_ARGS[@]}" lambda get-function-configuration \
  --function-name "$FN" --query 'Environment.Variables' --output json)

TMP=$(mktemp)
trap 'rm -f "$TMP"' EXIT

DB_PASS="$DB_PASS" CURRENT="$CURRENT" node -e '
if (!process.env.DB_PASS) { console.error("La contraseña está vacía"); process.exit(1); }
const vars = JSON.parse(process.env.CURRENT || "{}") || {};
vars.DB_PASSWORD = process.env.DB_PASS;
process.stdout.write(JSON.stringify({ Variables: vars }));
' > "$TMP"

# aws.exe en Windows no entiende rutas estilo /tmp de Git Bash
TMP_PATH=$TMP
command -v cygpath >/dev/null && TMP_PATH=$(cygpath -w "$TMP")

"$AWS" "${AWS_ARGS[@]}" lambda update-function-configuration \
  --function-name "$FN" --environment "file://$TMP_PATH" \
  --query '{Function: FunctionName, Status: LastUpdateStatus}' --output table
echo "Listo. La contraseña quedó en la configuración de $FN."
