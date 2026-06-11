import "@/styles/hero.css";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-img" />
      <div className="wrap">
        <div className="reveal in">
          <span className="hero-eyebrow">Nascida na Amazônia · Atuação Nacional</span>
        </div>
        <h1 className="reveal in d1">
          Educação ambiental que <i>transforma realidades.</i>
        </h1>
        <p className="lede reveal in d2">
          Projetos, consultorias e experiências sustentáveis para escolas,
          empresas, órgãos públicos e comunidades — construídos sobre ciência,
          vivência e pertencimento.
        </p>
        <div className="hero-ctas reveal in d3">
          <a href="#atuacao" className="btn btn-light">
            Conheça nossos serviços
            <span className="arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          <a href="#contato" className="btn btn-ghost">
            Fale conosco
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <svg className="scroll-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 4v15M6 13l6 6 6-6" />
        </svg>
      </div>
    </header>
  );
}
