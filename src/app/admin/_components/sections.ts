/** Seções do editor, na ordem do site. Cada `id` é `sec-<chave em SiteContent>`:
 *  as abas (Sidebar/MobileNav) usam a lista, e `SectionCard`/`useSectionForm`
 *  derivam o mesmo id da chave da seção — manter o padrão. */
export const ADMIN_SECTIONS = [
  { id: "sec-nav", label: "Navegação" },
  { id: "sec-hero", label: "Hero" },
  { id: "sec-about", label: "Sobre" },
  { id: "sec-values", label: "Valores" },
  { id: "sec-areas", label: "Áreas de Atuação" },
  { id: "sec-differentials", label: "Diferenciais" },
  { id: "sec-esg", label: "ESG" },
  { id: "sec-gallery", label: "Galeria" },
  { id: "sec-ctaFinal", label: "Chamada Final" },
  { id: "sec-contact", label: "Contato" },
  { id: "sec-footer", label: "Rodapé" },
] as const;

export type SectionId = (typeof ADMIN_SECTIONS)[number]["id"];
