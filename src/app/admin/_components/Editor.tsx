"use client";

import type { SiteContent } from "@/content/defaults";
import {
  useSectionForm,
  SectionCard,
  TextField,
  ImageField,
  ItemGroup,
} from "./form-kit";

/* ───────────────── NAV ───────────────── */
function NavForm({ value }: { value: SiteContent["nav"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("nav", value);
  return (
    <SectionCard id="sec-nav" eyebrow="Topo" title="Navegação" status={status} error={error} onSave={save} onReset={reset}>
      <ImageField label="Logo" value={draft.logo} onChange={(v) => set("logo", v)} />
      <div className="af-cols">
        {draft.links.map((link, i) => (
          <TextField key={i} label={`Link ${i + 1}`} value={link.label} onChange={(v) => set(`links.${i}.label`, v)} />
        ))}
      </div>
      <TextField label="Botão (texto)" value={draft.cta.label} onChange={(v) => set("cta.label", v)} />
    </SectionCard>
  );
}

/* ───────────────── HERO ───────────────── */
function HeroForm({ value }: { value: SiteContent["hero"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("hero", value);
  return (
    <SectionCard id="sec-hero" eyebrow="Abertura" title="Hero" status={status} error={error} onSave={save} onReset={reset}>
      <TextField label="Selo (eyebrow)" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <div className="af-cols">
        <TextField label="Título — início" value={draft.titleLead} onChange={(v) => set("titleLead", v)} />
        <TextField label="Título — destaque (itálico)" value={draft.titleEmphasis} onChange={(v) => set("titleEmphasis", v)} />
      </div>
      <TextField label="Texto de apoio" value={draft.lede} onChange={(v) => set("lede", v)} multiline />
      <div className="af-cols">
        <TextField label="Botão principal" value={draft.primaryCta.label} onChange={(v) => set("primaryCta.label", v)} />
        <TextField label="Botão secundário" value={draft.ghostCta.label} onChange={(v) => set("ghostCta.label", v)} />
      </div>
      <ImageField label="Imagem de fundo" value={draft.bgImage} onChange={(v) => set("bgImage", v)} />
    </SectionCard>
  );
}

/* ───────────────── SOBRE ───────────────── */
function AboutForm({ value }: { value: SiteContent["about"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("about", value);
  return (
    <SectionCard id="sec-about" eyebrow="Institucional" title="Sobre" status={status} error={error} onSave={save} onReset={reset}>
      <TextField label="Selo" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <div className="af-cols">
        <TextField label="Título — início" value={draft.titleLead} onChange={(v) => set("titleLead", v)} />
        <TextField label="Título — destaque" value={draft.titleEmphasis} onChange={(v) => set("titleEmphasis", v)} />
      </div>
      <TextField label="Parágrafo 1" value={draft.paragraph1} onChange={(v) => set("paragraph1", v)} multiline />
      <TextField label="Parágrafo 2" value={draft.paragraph2} onChange={(v) => set("paragraph2", v)} multiline />
      <div className="af-cols">
        <TextField label="Selo — número" value={draft.badgeNum} onChange={(v) => set("badgeNum", v)} />
        <TextField label="Selo — texto" value={draft.badgeLabel} onChange={(v) => set("badgeLabel", v)} multiline />
      </div>
      <ItemGroup title="Missão">
        <TextField label="Título" value={draft.missao.title} onChange={(v) => set("missao.title", v)} />
        <TextField label="Texto" value={draft.missao.text} onChange={(v) => set("missao.text", v)} multiline />
      </ItemGroup>
      <ItemGroup title="Visão">
        <TextField label="Título" value={draft.visao.title} onChange={(v) => set("visao.title", v)} />
        <TextField label="Texto" value={draft.visao.text} onChange={(v) => set("visao.text", v)} multiline />
      </ItemGroup>
      <ImageField label="Foto" value={draft.image} onChange={(v) => set("image", v)} />
    </SectionCard>
  );
}

/* ───────────────── VALORES ───────────────── */
function ValuesForm({ value }: { value: SiteContent["values"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("values", value);
  return (
    <SectionCard id="sec-values" eyebrow="Princípios" title="Valores" status={status} error={error} onSave={save} onReset={reset}>
      <TextField label="Selo" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <div className="af-cols">
        <TextField label="Título — início" value={draft.titleLead} onChange={(v) => set("titleLead", v)} />
        <TextField label="Título — destaque" value={draft.titleEmphasis} onChange={(v) => set("titleEmphasis", v)} />
      </div>
      <TextField label="Texto de apoio" value={draft.lead} onChange={(v) => set("lead", v)} multiline />
      {draft.items.map((item, i) => (
        <ItemGroup key={i} title={`Valor ${item.num}`}>
          <div className="af-cols">
            <TextField label="Número" value={item.num} onChange={(v) => set(`items.${i}.num`, v)} />
            <TextField label="Título" value={item.title} onChange={(v) => set(`items.${i}.title`, v)} />
          </div>
          <TextField label="Texto" value={item.text} onChange={(v) => set(`items.${i}.text`, v)} multiline />
        </ItemGroup>
      ))}
    </SectionCard>
  );
}

/* ───────────────── ÁREAS ───────────────── */
function AreasForm({ value }: { value: SiteContent["areas"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("areas", value);
  return (
    <SectionCard id="sec-areas" eyebrow="Serviços" title="Áreas de Atuação" status={status} error={error} onSave={save} onReset={reset}>
      <TextField label="Selo" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <div className="af-cols">
        <TextField label="Título — início" value={draft.titleLead} onChange={(v) => set("titleLead", v)} />
        <TextField label="Título — destaque" value={draft.titleEmphasis} onChange={(v) => set("titleEmphasis", v)} />
      </div>
      <TextField label="Texto de apoio" value={draft.lead} onChange={(v) => set("lead", v)} multiline />
      {draft.items.map((area, i) => (
        <ItemGroup key={i} title={area.title}>
          <div className="af-cols">
            <TextField label="Etiqueta" value={area.tag} onChange={(v) => set(`items.${i}.tag`, v)} />
            <TextField label="Título" value={area.title} onChange={(v) => set(`items.${i}.title`, v)} />
          </div>
          <TextField label="Descrição" value={area.description} onChange={(v) => set(`items.${i}.description`, v)} multiline />
          {area.bullets.map((b, j) => (
            <TextField key={j} label={`Item ${j + 1}`} value={b} onChange={(v) => set(`items.${i}.bullets.${j}`, v)} />
          ))}
        </ItemGroup>
      ))}
    </SectionCard>
  );
}

/* ───────────────── DIFERENCIAIS ───────────────── */
function DifferentialsForm({ value }: { value: SiteContent["differentials"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("differentials", value);
  return (
    <SectionCard id="sec-differentials" eyebrow="Números" title="Diferenciais" status={status} error={error} onSave={save} onReset={reset}>
      <TextField label="Selo" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <div className="af-cols">
        <TextField label="Título — início" value={draft.titleLead} onChange={(v) => set("titleLead", v)} />
        <TextField label="Título — destaque" value={draft.titleEmphasis} onChange={(v) => set("titleEmphasis", v)} />
      </div>
      <TextField label="Texto de apoio" value={draft.lead} onChange={(v) => set("lead", v)} multiline />
      {draft.items.map((stat, i) => (
        <ItemGroup key={i} title={stat.title}>
          <div className="af-cols">
            <TextField label="Número" value={stat.num} onChange={(v) => set(`items.${i}.num`, v)} />
            <TextField label="Unidade" value={stat.unit} onChange={(v) => set(`items.${i}.unit`, v)} />
          </div>
          <TextField label="Título" value={stat.title} onChange={(v) => set(`items.${i}.title`, v)} />
          <TextField label="Texto" value={stat.text} onChange={(v) => set(`items.${i}.text`, v)} multiline />
        </ItemGroup>
      ))}
    </SectionCard>
  );
}

/* ───────────────── ESG ───────────────── */
function EsgForm({ value }: { value: SiteContent["esg"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("esg", value);
  return (
    <SectionCard id="sec-esg" eyebrow="ESG" title="ESG & Sustentabilidade" status={status} error={error} onSave={save} onReset={reset}>
      <TextField label="Selo" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <div className="af-cols">
        <TextField label="Título — início" value={draft.titleLead} onChange={(v) => set("titleLead", v)} />
        <TextField label="Título — destaque" value={draft.titleEmphasis} onChange={(v) => set("titleEmphasis", v)} />
      </div>
      <TextField label="Texto de apoio" value={draft.lead} onChange={(v) => set("lead", v)} multiline />
      <TextField label="Botão (texto)" value={draft.cta.label} onChange={(v) => set("cta.label", v)} />
      {draft.pillars.map((p, i) => (
        <ItemGroup key={i} title={`Pilar “${p.letter}” — ${p.title}`}>
          <div className="af-cols">
            <TextField label="Letra" value={p.letter} onChange={(v) => set(`pillars.${i}.letter`, v)} />
            <TextField label="Título" value={p.title} onChange={(v) => set(`pillars.${i}.title`, v)} />
          </div>
          <TextField label="Texto" value={p.text} onChange={(v) => set(`pillars.${i}.text`, v)} multiline />
        </ItemGroup>
      ))}
      <ItemGroup title="Selos ODS">
        <div className="af-cols">
          {draft.ods.map((chip, i) => (
            <TextField key={i} label={`ODS ${i + 1}`} value={chip} onChange={(v) => set(`ods.${i}`, v)} />
          ))}
        </div>
      </ItemGroup>
    </SectionCard>
  );
}

/* ───────────────── GALERIA ───────────────── */
function GalleryForm({ value }: { value: SiteContent["gallery"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("gallery", value);
  return (
    <SectionCard id="sec-gallery" eyebrow="Experiências" title="Galeria" status={status} error={error} onSave={save} onReset={reset}>
      <TextField label="Selo" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <div className="af-cols">
        <TextField label="Título — início" value={draft.titleLead} onChange={(v) => set("titleLead", v)} />
        <TextField label="Título — destaque" value={draft.titleEmphasis} onChange={(v) => set("titleEmphasis", v)} />
      </div>
      <TextField label="Texto de apoio" value={draft.lead} onChange={(v) => set("lead", v)} multiline />
      {draft.tiles.map((tile, i) => (
        <ItemGroup key={tile.key} title={`Foto ${i + 1}`}>
          <TextField label="Legenda" value={tile.label} onChange={(v) => set(`tiles.${i}.label`, v)} />
          <ImageField label="Imagem" value={tile.image} onChange={(v) => set(`tiles.${i}.image`, v)} />
        </ItemGroup>
      ))}
    </SectionCard>
  );
}

/* ───────────────── CHAMADA FINAL ───────────────── */
function CtaFinalForm({ value }: { value: SiteContent["ctaFinal"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("ctaFinal", value);
  return (
    <SectionCard id="sec-ctaFinal" eyebrow="Conversão" title="Chamada Final" status={status} error={error} onSave={save} onReset={reset}>
      <TextField label="Selo" value={draft.eyebrow} onChange={(v) => set("eyebrow", v)} />
      <div className="af-cols">
        <TextField label="Título — início" value={draft.titleLead} onChange={(v) => set("titleLead", v)} />
        <TextField label="Título — destaque" value={draft.titleEmphasis} onChange={(v) => set("titleEmphasis", v)} />
      </div>
      <TextField label="Texto" value={draft.paragraph} onChange={(v) => set("paragraph", v)} multiline />
      <div className="af-cols">
        <TextField label="Botão principal" value={draft.primaryCta.label} onChange={(v) => set("primaryCta.label", v)} />
        <TextField label="Botão secundário" value={draft.ghostCta.label} onChange={(v) => set("ghostCta.label", v)} />
      </div>
      <ImageField label="Imagem de fundo" value={draft.bgImage} onChange={(v) => set("bgImage", v)} />
    </SectionCard>
  );
}

/* ───────────────── CONTATO (compartilhado) ───────────────── */
function ContactForm({ value }: { value: SiteContent["contact"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("contact", value);
  return (
    <SectionCard id="sec-contact" eyebrow="Compartilhado" title="Contato" status={status} error={error} onSave={save} onReset={reset}>
      <p className="af-note">Usado na Chamada Final (e-mail) e no Rodapé.</p>
      <div className="af-cols">
        <TextField label="E-mail" value={draft.email} onChange={(v) => set("email", v)} />
        <TextField label="Telefone" value={draft.phone} onChange={(v) => set("phone", v)} />
      </div>
      <div className="af-cols">
        <TextField label="Localização" value={draft.location} onChange={(v) => set("location", v)} />
        <TextField label="CNPJ" value={draft.cnpj} onChange={(v) => set("cnpj", v)} />
      </div>
    </SectionCard>
  );
}

/* ───────────────── RODAPÉ ───────────────── */
function FooterForm({ value }: { value: SiteContent["footer"] }) {
  const { draft, set, save, reset, status, error } = useSectionForm("footer", value);
  return (
    <SectionCard id="sec-footer" eyebrow="Rodapé" title="Rodapé" status={status} error={error} onSave={save} onReset={reset}>
      <ImageField label="Logo" value={draft.logo} onChange={(v) => set("logo", v)} />
      <div className="af-cols">
        <TextField label="Marca — título" value={draft.brandTitle} onChange={(v) => set("brandTitle", v)} />
        <TextField label="Marca — subtítulo" value={draft.brandSubtitle} onChange={(v) => set("brandSubtitle", v)} />
      </div>
      <TextField label="Descrição" value={draft.description} onChange={(v) => set("description", v)} multiline />
      <TextField label="Citação" value={draft.quote} onChange={(v) => set("quote", v)} />
      <ItemGroup title="Serviços listados">
        {draft.services.map((s, i) => (
          <TextField key={i} label={`Serviço ${i + 1}`} value={s} onChange={(v) => set(`services.${i}`, v)} />
        ))}
      </ItemGroup>
      <ItemGroup title="Redes sociais (links)">
        {draft.socials.map((soc, i) => (
          <TextField key={i} label={soc.network} value={soc.href} onChange={(v) => set(`socials.${i}.href`, v)} hint="Cole a URL do perfil" />
        ))}
      </ItemGroup>
      <div className="af-cols">
        <TextField label="Direitos (nome)" value={draft.copyrightName} onChange={(v) => set("copyrightName", v)} />
        <TextField label="Assinatura" value={draft.tagline} onChange={(v) => set("tagline", v)} />
      </div>
    </SectionCard>
  );
}

/* ───────────────── EDITOR ───────────────── */
export default function Editor({ data }: { data: SiteContent }) {
  return (
    <div className="editor">
      <NavForm value={data.nav} />
      <HeroForm value={data.hero} />
      <AboutForm value={data.about} />
      <ValuesForm value={data.values} />
      <AreasForm value={data.areas} />
      <DifferentialsForm value={data.differentials} />
      <EsgForm value={data.esg} />
      <GalleryForm value={data.gallery} />
      <CtaFinalForm value={data.ctaFinal} />
      <ContactForm value={data.contact} />
      <FooterForm value={data.footer} />
    </div>
  );
}
