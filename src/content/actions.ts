"use server";

import { verifySession } from "@/server/auth/dal";
import {
  readOverridesOrThrow,
  writeOverrides,
  type ContentOverrides,
} from "./store";

/**
 * Salva o override de uma ou mais seções. `patch` traz a(s) seção(ões) completas
 * (ex.: `{ hero: { ...todos os campos } }`); faz merge raso por seção sobre o que
 * já existe. As páginas leem o conteúdo fresco (sem cache), então a edição aparece
 * na próxima carga — não é preciso revalidar. Campos em branco voltam ao padrão na
 * hora de renderizar (ver resolver em get.ts).
 */
export async function saveContent(patch: ContentOverrides): Promise<void> {
  await verifySession();
  // Leitura ESTRITA: se o KV falhar aqui, o salvamento falha junto. Tratar a
  // falha como "sem overrides" regravaria o documento só com esta seção,
  // apagando as edições de todas as outras.
  const current = await readOverridesOrThrow();
  await writeOverrides({ ...current, ...patch });
}
