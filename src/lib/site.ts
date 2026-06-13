/** Identidade do site, usada por metadata, robots, sitemap e dados estruturados. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ipeeducacaoambiental.com";

export const SITE_NAME = "IPÊ Educação Ambiental";

export const SITE_TITLE =
  "IPÊ Educação Ambiental — Raízes locais, consciência global";

export const SITE_DESCRIPTION =
  "Projetos, consultorias e experiências sustentáveis em educação ambiental, ESG e socioambiental — para escolas, empresas, órgãos públicos e comunidades. Nascida na Amazônia, com atuação em todo o Brasil.";

/** Torna um caminho (`/assets/...`) absoluto; deixa URLs completas (Blob) como estão. */
export function absoluteUrl(pathOrUrl: string): string {
  return pathOrUrl.startsWith("http") ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}
