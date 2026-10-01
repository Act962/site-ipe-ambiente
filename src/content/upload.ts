/**
 * Regras do upload de imagens, compartilhadas entre o painel (que valida antes de
 * enviar) e a rota `/admin/upload` (que as impõe no token do Blob). Sem
 * `server-only`: o formulário do painel importa daqui.
 */

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB

/** Rota que emite o token de upload direto para o Blob. */
export const UPLOAD_ROUTE = "/admin/upload";

/** Único formato de caminho aceito: `uploads/<uuid>.<ext>`. */
export const UPLOAD_PATH_PATTERN = /^uploads\/[0-9a-f-]{36}\.[a-z0-9]{1,8}$/;

/** Caminho único para um arquivo novo — cada upload tem a sua própria URL. */
export function uploadPathFor(fileName: string): string {
  const ext =
    (fileName.includes(".") ? fileName.split(".").pop() : "")
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 8) || "img";
  return `uploads/${crypto.randomUUID()}.${ext}`;
}
