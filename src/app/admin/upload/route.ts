import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getSession } from "@/server/auth/dal";
import { MAX_IMAGE_BYTES, UPLOAD_PATH_PATTERN } from "@/content/upload";

/**
 * Emite o token para o navegador enviar a imagem DIRETO ao Vercel Blob. O arquivo
 * não passa por aqui: uma Server Action aceita só 1 MB de corpo por padrão e as
 * funções da Vercel, cerca de 4,5 MB — menos que os 8 MB prometidos ao editor.
 * O limite de tamanho e o tipo de arquivo vão gravados no token, então quem os
 * impõe é o próprio Blob.
 */
export async function POST(request: Request): Promise<Response> {
  // Sem `verifySession()`: ele redireciona, e aqui a resposta precisa ser JSON.
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return Response.json({ error: "Sessão expirada." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as HandleUploadBody;
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!UPLOAD_PATH_PATTERN.test(pathname)) {
          throw new Error("Caminho de upload inválido.");
        }
        return {
          allowedContentTypes: ["image/*"],
          maximumSizeInBytes: MAX_IMAGE_BYTES,
          addRandomSuffix: false,
        };
      },
    });
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Falha no upload." },
      { status: 400 },
    );
  }
}
