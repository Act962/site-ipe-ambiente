import "@/styles/differentials.css";

const STATS = [
  {
    num: "+50",
    unit: "serviços",
    title: "Portfólio completo",
    text: "Soluções modulares que se adaptam ao contexto e à escala de cada parceiro.",
  },
  {
    num: "4",
    unit: "públicos",
    title: "Atendimento integrado",
    text: "Escolas, empresas, órgãos públicos e comunidades em um mesmo ecossistema.",
  },
  {
    num: "100",
    unit: "%",
    title: "Metodologia vivencial",
    text: "Aprendizagem ancorada na experiência direta com a natureza e o território.",
  },
  {
    num: "BR",
    unit: "·nacional",
    title: "Atuação em todo o país",
    text: "Raízes amazônicas, presença e parcerias em diferentes biomas brasileiros.",
  },
];

export default function Differentials() {
  return (
    <section className="diff" id="diferenciais">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Diferenciais</span>
            <h2>
              Resultados que falam <i>por si.</i>
            </h2>
          </div>
          <p className="lead">
            Combinamos rigor técnico, sensibilidade pedagógica e uma base
            científica forte — formada por pesquisadoras com vivência prática em
            campo.
          </p>
        </div>

        <div className="stats">
          {STATS.map((stat, index) => (
            <div
              key={stat.title}
              className={`stat reveal${index > 0 ? ` d${index}` : ""}`}
            >
              <div className="num">
                {stat.num}
                <small>{stat.unit}</small>
              </div>
              <h5>{stat.title}</h5>
              <p>{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
