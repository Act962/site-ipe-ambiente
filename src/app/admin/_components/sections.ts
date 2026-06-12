/** Seções do editor, na ordem do site. Usada pela sidebar (âncoras + scroll-spy)
 *  e pelos `id` dos cards em Editor.tsx — manter em sincronia. */
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
