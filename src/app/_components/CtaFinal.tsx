import "@/styles/cta.css";

export default function CtaFinal() {
  return (
    <section className="cta-final" id="contato">
      <div className="cta-bg" />
      <div className="wrap">
        <span className="eyebrow">Vamos construir juntos</span>
        <h2>
          Construindo um futuro <i>sustentável juntos.</i>
        </h2>
        <p>
          Conte sobre seu projeto, sua escola, sua empresa ou seu município. Nós
          ajudamos a transformar a intenção ambiental em prática consistente,
          mensurável e inspiradora.
        </p>
        <div className="hero-ctas">
          <a
            href="mailto:contato@ipeeducacaoambiental.com.br"
            className="btn btn-light"
          >
            Solicitar proposta
            <span className="arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          <a href="#galeria" className="btn btn-ghost">
            Ver experiências
          </a>
        </div>
      </div>
    </section>
  );
}
