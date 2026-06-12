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

// Lê o conteúdo (padrões + edições do painel) fresco a cada requisição,
// para que as edições apareçam imediatamente.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
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
