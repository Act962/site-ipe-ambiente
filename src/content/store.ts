import "server-only";

import { put, list, del } from "@vercel/blob";
import type { DeepPartial } from "./get";
import type { SiteContent } from "./defaults";

/**
 * Armazenamento dos OVERRIDES (só o que o editor mudou) em um único documento
 * JSON no Vercel Blob.
 *
 * Para fugir do cache de CDN do Blob, cada salvamento grava um arquivo com URL
 * NOVA (`addRandomSuffix`) e apaga as versões antigas. A leitura pega sempre a
 * mais recente. O cache/revalidação de fato fica no `getContent()` (unstable_cache
 * + revalidateTag), em get.ts.
 */

export type ContentOverrides = DeepPartial<SiteContent>;

const PREFIX = "site-content/overrides";

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function latestOverridesUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: PREFIX });
  if (blobs.length === 0) return null;
  blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  return blobs[0].url;
}

/** Lê os overrides atuais. Sem Blob configurado, opera em modo só-padrões. */
export async function readOverrides(): Promise<ContentOverrides> {
  if (!hasBlob()) return {};
  try {
    const url = await latestOverridesUrl();
    if (!url) return {};
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return {};
    return (await res.json()) as ContentOverrides;
  } catch {
    return {};
  }
}

/** Grava os overrides (substitui o documento) e limpa versões antigas. */
export async function writeOverrides(overrides: ContentOverrides): Promise<void> {
  const body = JSON.stringify(overrides, null, 2);
  const { url } = await put(`${PREFIX}.json`, body, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: true,
  });

  // Limpeza best-effort das versões anteriores.
  try {
    const { blobs } = await list({ prefix: PREFIX });
    const stale = blobs.filter((b) => b.url !== url).map((b) => b.url);
    if (stale.length) await del(stale);
  } catch {
    /* ignora falha de limpeza */
  }
}
