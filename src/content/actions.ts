"use server";

import { revalidateTag } from "next/cache";
import { put } from "@vercel/blob";
import { verifySession } from "@/server/auth/dal";
import { readOverrides, writeOverrides, type ContentOverrides } from "./store";
import { CONTENT_TAG } from "./get";

/**
 * Salva o override de uma ou mais seções. `patch` traz a(s) seção(ões) completas
 * (ex.: `{ hero: { ...todos os campos } }`); faz merge raso por seção sobre o que
 * já existe e revalida o conteúdo imediatamente (`expire: 0`).
 * Campos em branco voltam ao padrão na hora de renderizar (ver resolver em get.ts).
 */
export async function saveContent(patch: ContentOverrides): Promise<void> {
  await verifySession();
  const current = await readOverrides();
  await writeOverrides({ ...current, ...patch });
  revalidateTag(CONTENT_TAG, { expire: 0 });
}

export type UploadResult = { url: string } | { error: string };

const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB

/** Faz upload de uma imagem para o Blob e devolve a URL pública. */
export async function uploadImage(formData: FormData): Promise<UploadResult> {
  await verifySession();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Nenhum arquivo enviado." };
  }
  if (!file.type.startsWith("image/")) {
    return { error: "Envie um arquivo de imagem (JPG, PNG, WebP…)." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "Imagem muito grande (máximo 8 MB)." };
  }

  const ext = (file.name.split(".").pop() || "img")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const { url } = await put(`uploads/${crypto.randomUUID()}.${ext}`, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return { url };
}
