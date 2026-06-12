import "server-only";

import bcrypt from "bcryptjs";

/**
 * O hash bcrypt é guardado em **base64** porque o hash cru começa com `$2b$12$…`
 * e os carregadores de `.env` (dotenv-expand, usado pelo Next) tratam `$2b`/`$12`
 * como variáveis e corrompem o valor. base64 não tem `$`, então é seguro tanto em
 * `.env.local` quanto no painel de variáveis da Vercel. Por segurança, aceitamos
 * também um hash cru já válido (caso colado direto na Vercel, onde não há expansão).
 */
function resolveHash(raw: string): string {
  if (raw.startsWith("$2")) return raw; // já é um hash bcrypt cru
  try {
    return Buffer.from(raw, "base64").toString("utf8");
  } catch {
    return raw;
  }
}

/**
 * Único editor, definido por variáveis de ambiente:
 *   ADMIN_EMAIL          — e-mail de login
 *   ADMIN_PASSWORD_HASH  — hash bcrypt em base64 (gere com scripts/hash-password.mjs)
 */
export async function verifyCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const rawHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedEmail || !rawHash) {
    throw new Error(
      "Login não configurado: defina ADMIN_EMAIL e ADMIN_PASSWORD_HASH no ambiente.",
    );
  }

  const hash = resolveHash(rawHash);

  const emailOk =
    email.trim().toLowerCase() === expectedEmail.trim().toLowerCase();
  // Sempre roda o bcrypt (mesmo com e-mail errado) para não vazar timing.
  const passwordOk = await bcrypt.compare(password, hash);

  return emailOk && passwordOk;
}
