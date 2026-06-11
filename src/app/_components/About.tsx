import "@/styles/about.css";

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-img-stack reveal">
            <div className="primary" />
            <div className="badge">
              <span className="num serif">+10</span>
              <span className="lbl">
                anos transformando conhecimento científico em prática socioambiental
              </span>
            </div>
          </div>

          <div className="about-body">
            <span className="eyebrow reveal">Sobre a IPÊ</span>
            <h2 className="reveal d1">
              Da floresta para o mundo. <i>Da ciência para a prática.</i>
            </h2>
            <p className="reveal d2">
              A IPÊ Educação Ambiental nasceu na Amazônia, da união entre
              pesquisadoras e educadoras ambientais que acreditam na potência da
              educação como vetor de mudança real. Traduzimos conhecimento
              científico em soluções práticas para promover sustentabilidade,
              pertencimento e consciência ambiental.
            </p>
            <p className="reveal d3">
              Atendemos escolas, empresas, órgãos públicos e comunidades em todo o
              país — sempre com metodologias vivenciais, integrando teoria e
              prática, raízes locais e visão global.
            </p>
            <div className="mv-grid reveal d4">
              <div>
                <h4>Missão</h4>
                <p>
                  Promover educação ambiental transformadora, conectando ciência,
                  cultura e comunidade.
                </p>
              </div>
              <div>
                <h4>Visão</h4>
                <p>
                  Ser referência nacional em soluções socioambientais inspiradas na
                  biodiversidade amazônica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
