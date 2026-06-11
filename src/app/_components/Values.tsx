import "@/styles/values.css";

const VALUES = [
  {
    num: "01",
    title: "Pertencimento",
    text: "Conectar pessoas aos seus territórios e à biodiversidade que as cerca.",
  },
  {
    num: "02",
    title: "Diversidade & Inclusão",
    text: "Acolher saberes plurais, vozes locais e culturas tradicionais.",
  },
  {
    num: "03",
    title: "Sustentabilidade Integrada",
    text: "Equilibrar dimensões ambiental, social, econômica e cultural.",
  },
  {
    num: "04",
    title: "Inovação",
    text: "Métodos vivenciais, narrativas e tecnologias a serviço da educação.",
  },
  {
    num: "05",
    title: "Transparência & Diálogo",
    text: "Comunicação clara, escuta ativa e construção colaborativa.",
  },
];

export default function Values() {
  return (
    <section className="values">
      <div className="wrap values-head">
        <div className="section-head">
          <div>
            <span className="eyebrow">Nossos Valores</span>
            <h2>
              Os princípios que orientam <i>cada projeto.</i>
            </h2>
          </div>
          <p className="lead">
            Cinco pilares que sustentam a maneira como pensamos, projetamos e
            entregamos educação ambiental — em qualquer escala, para qualquer
            público.
          </p>
        </div>
      </div>

      <div className="wrap values-body">
        <div className="values-grid">
          {VALUES.map((value, index) => (
            <div
              key={value.num}
              className={`value reveal${index > 0 ? ` d${index}` : ""}`}
            >
              <span className="num">{value.num}</span>
              <h4>{value.title}</h4>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
