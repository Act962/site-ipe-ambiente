// Gera o hash bcrypt (em base64) de uma senha para ADMIN_PASSWORD_HASH.
//
// O hash é emitido em base64 de propósito: o hash cru começa com "$2b$12$…" e os
// carregadores de .env expandem "$2b"/"$12" como variáveis, corrompendo o valor.
// base64 não tem "$", então cola sem dor em .env.local e no painel da Vercel.
//
// Uso:
//   node scripts/hash-password.mjs "minhaSenhaForte"
//
// Copie a linha impressa para o seu .env.local (ou variáveis da Vercel):
//   ADMIN_PASSWORD_HASH=<valor impresso>

import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Uso: node scripts/hash-password.mjs "suaSenha"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log(Buffer.from(hash, "utf8").toString("base64"));
