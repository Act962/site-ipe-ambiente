import "server-only";

import { Redis } from "@upstash/redis";
import type { DeepPartial } from "./get";
import type { SiteContent } from "./defaults";

/**
 * Armazenamento dos OVERRIDES (só o que o editor mudou) no Vercel KV (Upstash
 * Redis) — `get`/`set` de uma única chave, fortemente consistente.
 *
 * Por que NÃO no Vercel Blob: o Blob não dá consistência de leitura-após-escrita
 * imediata aqui — o CDN público serve conteúdo antigo após sobrescrever, e o
 * `list()` retorna vazio/defasado em produção, fazendo a leitura cair no padrão.
 * O KV resolve isso de vez. (As IMAGENS continuam no Blob, em actions.ts — lá
 * cada upload tem URL única e o problema não existe.)
 */

export type ContentOverrides = DeepPartial<SiteContent>;

const KEY = "site-content:overrides";

/**
 * Cliente Redis. A integração da Vercel injeta `KV_REST_API_URL`/`KV_REST_API_TOKEN`
 * (algumas integrações usam `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`).
 * Sem credenciais, o site opera em modo só-padrões.
 */
function client(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

const NOT_CONFIGURED =
  "Armazenamento de conteúdo não configurado: defina KV_REST_API_URL e KV_REST_API_TOKEN.";

/**
 * Lê os overrides para RENDERIZAR. Tolerante: sem KV configurado ou com o KV
 * fora do ar, devolve `{}` e o site aparece com os padrões. Nunca use o
 * resultado como base de uma gravação — para isso existe `readOverridesOrThrow`.
 */
export async function readOverrides(): Promise<ContentOverrides> {
  if (!client()) return {};
  try {
    return await readOverridesOrThrow();
  } catch {
    return {};
  }
}

/**
 * Lê os overrides para GRAVAR por cima (ler-modificar-gravar). Estrita: `{}` só
 * quando a chave realmente não existe; qualquer falha de leitura é propagada,
 * para que um erro passageiro não vire um documento vazio regravado.
 */
export async function readOverridesOrThrow(): Promise<ContentOverrides> {
  const redis = client();
  if (!redis) throw new Error(NOT_CONFIGURED);
  const data = await redis.get<ContentOverrides>(KEY);
  return data ?? {};
}

/** Grava os overrides (documento único). */
export async function writeOverrides(overrides: ContentOverrides): Promise<void> {
  const redis = client();
  if (!redis) throw new Error(NOT_CONFIGURED);
  await redis.set(KEY, overrides);
}
