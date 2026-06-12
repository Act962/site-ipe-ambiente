# Deploy e configuração do painel

Checklist técnico para colocar o painel no ar na Vercel.

## Variáveis de ambiente (Vercel → Project → Settings → Environment Variables)

| Variável | O que é | Como obter |
|---|---|---|
| `SESSION_SECRET` | Chave que assina o cookie de sessão | `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` |
| `ADMIN_EMAIL` | E-mail de login do editor | definido por você |
| `ADMIN_PASSWORD_HASH` | Hash da senha (em base64) | `node scripts/hash-password.mjs "aSenhaDoCliente"` |
| `BLOB_READ_WRITE_TOKEN` | Acesso ao Vercel Blob | **já existe** — criado ao conectar o Blob store ao projeto |

> ⚠️ O hash é guardado em **base64** de propósito: o hash bcrypt cru começa com
> `$2b$12$…` e os carregadores de `.env` expandem `$2b`/`$12` como variáveis,
> corrompendo o valor. O script `hash-password.mjs` já emite em base64.

Defina as 3 primeiras nos ambientes **Production** (e Preview, se quiser testar).
O `BLOB_READ_WRITE_TOKEN` já é injetado automaticamente pela integração do Blob.

## Gerar as credenciais do cliente

```bash
# 1. Chave de sessão (cole em SESSION_SECRET)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 2. Hash da senha (cole em ADMIN_PASSWORD_HASH)
node scripts/hash-password.mjs "senha-forte-do-cliente"

# 3. ADMIN_EMAIL = o e-mail que o cliente vai usar para entrar
```

## Desenvolvimento local

As mesmas variáveis ficam em `.env.local` (não versionado). Veja `.env.example`.
Rode `pnpm dev` e acesse `http://localhost:3000/admin`.

## Como funciona (resumo técnico)

- **Conteúdo**: textos editados ficam num único `content.json` de *overrides* no
  Vercel Blob; imagens enviadas ficam como arquivos em `uploads/` no mesmo Blob.
  O site renderiza `padrões (código) + overrides (Blob)`.
- **Padrões/fallback**: `src/content/defaults.ts`. Com o Blob vazio, o site é
  idêntico ao original; campo em branco volta ao padrão.
- **Atualização instantânea**: ao salvar, a Server Action regrava o JSON e chama
  `revalidateTag(..., { expire: 0 })`; a home (estática) re-renderiza na próxima
  visita já com o conteúdo novo.
- **Auth**: login único por `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH`, sessão JWT
  (`jose`) em cookie HttpOnly, rota `/admin/*` protegida por `src/proxy.ts` e por
  `verifySession()` em cada Server Action.

## Pós-deploy — primeiro acesso

1. Acesse `https://SEU-SITE.com/admin`, entre com `ADMIN_EMAIL` + a senha.
2. Preencha os dados reais no card **Contato** (e-mail, telefone, CNPJ) — eles
   substituem os placeholders (`+55 (00) 0000-0000`, `CNPJ 00.000.000/0001-00`).
3. Entregue o `GUIA-DO-PAINEL.md` ao cliente.
