import Nav from "./_components/Nav";
import Hero from "./_components/Hero";
import About from "./_components/About";
import Values from "./_components/Values";
import Areas from "./_components/Areas";
import Differentials from "./_components/Differentials";
import Esg from "./_components/Esg";
import Gallery from "./_components/Gallery";
import CtaFinal from "./_components/CtaFinal";
import Footer from "./_components/Footer";
import ScrollReveal from "./_components/ScrollReveal";
import { getContent } from "@/content/get";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from "@/lib/site";

// Lê o conteúdo (padrões + edições do painel) fresco a cada requisição,
// para que as edições apareçam imediatamente.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  // Dados estruturados (JSON-LD) — montados do conteúdo ao vivo, ignorando
  // placeholders (redes "#" e telefone com zeros) para não poluir o SEO.
  const socials = content.footer.socials
    .map((s) => s.href)
    .filter((href) => href && !href.startsWith("#"));
  const phone = content.contact.phone;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: content.footer.brandTitle,
    url: SITE_URL,
    logo: absoluteUrl(content.nav.logo),
    image: absoluteUrl(content.about.image),
    description: SITE_DESCRIPTION,
    email: content.contact.email,
    slogan: content.footer.tagline,
    areaServed: { "@type": "Country", name: "Brasil" },
    ...(socials.length ? { sameAs: socials } : {}),
    ...(phone && !phone.includes("0000") ? { telephone: phone } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav data={content.nav} />
      <Hero data={content.hero} />
      <main>
        <About data={content.about} />
        <Values data={content.values} />
        <Areas data={content.areas} />
        <Differentials data={content.differentials} />
        <Esg data={content.esg} />
        <Gallery data={content.gallery} />
        <CtaFinal data={content.ctaFinal} contact={content.contact} />
      </main>
      <Footer data={content.footer} contact={content.contact} />
      <ScrollReveal />
    </>
  );
}
