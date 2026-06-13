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

/** Lê os overrides atuais. Sem KV configurado, opera em modo só-padrões. */
export async function readOverrides(): Promise<ContentOverrides> {
  const redis = client();
  if (!redis) return {};
  try {
    const data = await redis.get<ContentOverrides>(KEY);
    return data ?? {};
  } catch {
    return {};
  }
}

/** Grava os overrides (documento único). */
export async function writeOverrides(overrides: ContentOverrides): Promise<void> {
  const redis = client();
  if (!redis) {
    throw new Error(
      "Armazenamento de conteúdo não configurado: defina KV_REST_API_URL e KV_REST_API_TOKEN.",
    );
  }
  await redis.set(KEY, overrides);
}
