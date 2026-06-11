import "@/styles/esg.css";

const PILLARS = [
  {
    letter: "E",
    title: "Ambiental",
    text: "Gestão de resíduos, biodiversidade, clima e uso responsável de recursos naturais.",
  },
  {
    letter: "S",
    title: "Social",
    text: "Engajamento comunitário, diversidade, educação e relações com territórios.",
  },
  {
    letter: "G",
    title: "Governança",
    text: "Transparência, ética, métricas e construção de políticas internas sólidas.",
  },
  {
    letter: "+",
    title: "Impacto",
    text: "Indicadores socioambientais conectados aos Objetivos de Desenvolvimento Sustentável.",
  },
];

const ODS = [
  "ODS 4 · Educação de qualidade",
  "ODS 6 · Água potável",
  "ODS 11 · Cidades sustentáveis",
  "ODS 12 · Consumo responsável",
  "ODS 13 · Ação climática",
  "ODS 15 · Vida terrestre",
];

export default function Esg() {
  return (
    <section className="esg" id="esg">
      <div className="wrap">
        <div className="esg-grid">
          <div>
            <span className="eyebrow">ESG &amp; Sustentabilidade</span>
            <h2>
              Do compromisso ao <i>impacto mensurável.</i>
            </h2>
            <p className="lead">
              Apoiamos organizações a transformar princípios ESG em prática
              cotidiana — com indicadores claros, governança consistente e
              conexão genuína com a agenda 2030 das Nações Unidas.
            </p>
            <a href="#contato" className="btn btn-outline">
              Falar sobre ESG na minha empresa
              <span className="arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <div className="ods-grid">
              {ODS.map((ods) => (
                <span key={ods} className="ods-chip">
                  {ods}
                </span>
              ))}
            </div>
          </div>

          <div className="esg-pillars">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="esg-pillar">
                <span className="letter">{pillar.letter}</span>
                <h4>{pillar.title}</h4>
                <p>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
