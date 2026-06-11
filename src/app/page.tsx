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

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <About />
        <Values />
        <Areas />
        <Differentials />
        <Esg />
        <Gallery />
        <CtaFinal />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
