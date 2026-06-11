import { ReactNode } from "react";
import "@/styles/areas.css";

type Area = {
  tag: string;
  title: string;
  description: string;
  icon: ReactNode;
  items: string[];
};

const AREAS: Area[] = [
  {
    tag: "A · Educacionais",
    title: "Serviços Educacionais",
    description:
      "Projetos pedagógicos vivenciais para escolas, da educação infantil ao ensino médio, conectando currículo e território.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 7l9-4 9 4-9 4-9-4z" />
        <path d="M3 7v6l9 4 9-4V7" />
        <path d="M12 11v10" />
      </svg>
    ),
    items: [
      "Projetos escolares socioambientais",
      "Oficinas e gincanas ambientais",
      "Hortas escolares e jardins sensoriais",
      "Trilhas educativas e visitas guiadas",
      "Formação de professores",
    ],
  },
  {
    tag: "B · Órgãos Públicos",
    title: "Serviços para Órgãos Públicos",
    description:
      "Consultoria técnica e desenho de políticas públicas que articulam meio ambiente, educação e gestão territorial.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 21h18" />
        <path d="M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-6h6v6" />
        <path d="M9 12h.01M15 12h.01" />
      </svg>
    ),
    items: [
      "Consultorias técnicas especializadas",
      "Treinamentos e capacitação de equipes",
      "Eventos e seminários temáticos",
      "Gestão sustentável de áreas protegidas",
      "Apoio à formulação de políticas públicas",
    ],
  },
  {
    tag: "C · Empresariais",
    title: "Serviços Empresariais",
    description:
      "ESG aplicado e sustentabilidade corporativa que vão além do relatório — engajando pessoas e gerando impacto mensurável.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M2 20h20" />
        <path d="M5 20V9l7-4 7 4v11" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    ),
    items: [
      "Estratégia e implementação ESG",
      "Gestão de resíduos e logística reversa",
      "Sustentabilidade corporativa integrada",
      "Workshops para colaboradores",
      "Treinamentos e mentorias executivas",
    ],
  },
  {
    tag: "D · Materiais",
    title: "Materiais Educativos",
    description:
      "Produção autoral de conteúdos didáticos e literários, com rigor científico e linguagem acessível.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z" />
        <path d="M4 4l16 16" />
        <path d="M9 10h6M9 14h4" />
      </svg>
    ),
    items: [
      "Cartilhas e manuais didáticos",
      "Literatura infantojuvenil ambiental",
      "Guias de trilhas e roteiros educativos",
      "Jogos e materiais lúdicos",
      "Conteúdo digital e audiovisual",
    ],
  },
];

export default function Areas() {
  return (
    <section className="areas" id="atuacao">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Áreas de Atuação</span>
            <h2>
              Soluções sob medida para <i>quatro grandes públicos.</i>
            </h2>
          </div>
          <p className="lead">
            Mais de 50 serviços organizados em quatro frentes — combinados para
            atender desde uma horta escolar até políticas públicas de larga
            escala e projetos ESG corporativos.
          </p>
        </div>

        <div className="area-grid">
          {AREAS.map((area, index) => (
            <article
              key={area.tag}
              className={`area reveal${index > 0 ? ` d${index}` : ""}`}
            >
              <div className="area-head">
                <div className="area-icon">{area.icon}</div>
                <span className="area-tag">{area.tag}</span>
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <ul>
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
