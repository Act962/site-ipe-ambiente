/**
 * Fonte única de verdade do conteúdo do site.
 *
 * `SiteContent` descreve a ESTRUTURA fixa da página (mesmas seções, mesmas
 * contagens — o cliente só edita textos e imagens, nunca adiciona/remove blocos).
 * `DEFAULTS` carrega os valores atuais, copiados verbatim dos componentes/CSS de
 * hoje. Esses defaults são o FALLBACK: enquanto um campo não for sobrescrito no
 * painel, é este valor que aparece. Com a base de overrides vazia, o site renderiza
 * idêntico ao original.
 *
 * Os ícones SVG (áreas, redes sociais) e os spans do grid da galeria continuam no
 * código — são estruturais, não editáveis.
 */

export type Link = { href: string; label: string };

export type SiteContent = {
  nav: {
    logo: string;
    links: Link[];
    cta: Link;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lede: string;
    primaryCta: Link;
    ghostCta: Link;
    bgImage: string;
  };
  about: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    paragraph1: string;
    paragraph2: string;
    badgeNum: string;
    badgeLabel: string;
    missao: { title: string; text: string };
    visao: { title: string; text: string };
    image: string;
  };
  values: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    items: { num: string; title: string; text: string }[];
  };
  areas: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    /** A ordem dos itens casa com os ícones SVG fixos em Areas.tsx (por índice). */
    items: { tag: string; title: string; description: string; bullets: string[] }[];
  };
  differentials: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    items: { num: string; unit: string; title: string; text: string }[];
  };
  esg: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    cta: Link;
    pillars: { letter: string; title: string; text: string }[];
    ods: string[];
  };
  gallery: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    lead: string;
    /** `key` casa com a classe CSS (t1..t9) que define o span no grid — fixo. */
    tiles: { key: string; label: string; image: string }[];
  };
  ctaFinal: {
    eyebrow: string;
    titleLead: string;
    titleEmphasis: string;
    paragraph: string;
    /** O href do botão primário é montado como mailto a partir de `contact.email`. */
    primaryCta: { label: string };
    ghostCta: Link;
    bgImage: string;
  };
  /** Dados de contato compartilhados entre a Chamada Final e o Rodapé. */
  contact: {
    email: string;
    phone: string;
    location: string;
    cnpj: string;
  };
  footer: {
    logo: string;
    brandTitle: string;
    brandSubtitle: string;
    description: string;
    quote: string;
    navLinks: Link[];
    services: string[];
    /** `network` casa com o ícone SVG fixo em Footer.tsx. */
    socials: { network: string; href: string }[];
    copyrightName: string;
    tagline: string;
  };
};

export const DEFAULTS: SiteContent = {
  nav: {
    logo: "/assets/logo-ipe.png",
    links: [
      { href: "#sobre", label: "Sobre" },
      { href: "#atuacao", label: "Atuação" },
      { href: "#diferenciais", label: "Diferenciais" },
      { href: "#esg", label: "ESG" },
      { href: "#galeria", label: "Experiências" },
    ],
    cta: { href: "#contato", label: "Fale conosco" },
  },

  hero: {
    eyebrow: "Nascida na Amazônia · Atuação Nacional",
    titleLead: "Educação ambiental que ",
    titleEmphasis: "transforma realidades.",
    lede:
      "Projetos, consultorias e experiências sustentáveis para escolas, empresas, órgãos públicos e comunidades — construídos sobre ciência, vivência e pertencimento.",
    primaryCta: { href: "#atuacao", label: "Conheça nossos serviços" },
    ghostCta: { href: "#contato", label: "Fale conosco" },
    bgImage: "/assets/background.jpeg",
  },

  about: {
    eyebrow: "Sobre a IPÊ",
    titleLead: "Da floresta para o mundo. ",
    titleEmphasis: "Da ciência para a prática.",
    paragraph1:
      "A IPÊ Educação Ambiental nasceu na Amazônia, da união entre pesquisadoras e educadoras ambientais que acreditam na potência da educação como vetor de mudança real. Traduzimos conhecimento científico em soluções práticas para promover sustentabilidade, pertencimento e consciência ambiental.",
    paragraph2:
      "Atendemos escolas, empresas, órgãos públicos e comunidades em todo o país — sempre com metodologias vivenciais, integrando teoria e prática, raízes locais e visão global.",
    badgeNum: "+10",
    badgeLabel:
      "anos transformando conhecimento científico em prática socioambiental",
    missao: {
      title: "Missão",
      text:
        "Promover educação ambiental transformadora, conectando ciência, cultura e comunidade.",
    },
    visao: {
      title: "Visão",
      text:
        "Ser referência nacional em soluções socioambientais inspiradas na biodiversidade amazônica.",
    },
    image: "/assets/14.jpeg",
  },

  values: {
    eyebrow: "Nossos Valores",
    titleLead: "Os princípios que orientam ",
    titleEmphasis: "cada projeto.",
    lead:
      "Cinco pilares que sustentam a maneira como pensamos, projetamos e entregamos educação ambiental — em qualquer escala, para qualquer público.",
    items: [
      {
        num: "01",
        title: "Pertencimento",
        text:
          "Conectar pessoas aos seus territórios e à biodiversidade que as cerca.",
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
        text:
          "Métodos vivenciais, narrativas e tecnologias a serviço da educação.",
      },
      {
        num: "05",
        title: "Transparência & Diálogo",
        text: "Comunicação clara, escuta ativa e construção colaborativa.",
      },
    ],
  },

  areas: {
    eyebrow: "Áreas de Atuação",
    titleLead: "Soluções sob medida para ",
    titleEmphasis: "quatro grandes públicos.",
    lead:
      "Mais de 50 serviços organizados em quatro frentes — combinados para atender desde uma horta escolar até políticas públicas de larga escala e projetos ESG corporativos.",
    items: [
      {
        tag: "A · Educacionais",
        title: "Serviços Educacionais",
        description:
          "Projetos pedagógicos vivenciais para escolas, da educação infantil ao ensino médio, conectando currículo e território.",
        bullets: [
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
        bullets: [
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
        bullets: [
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
        bullets: [
          "Cartilhas e manuais didáticos",
          "Literatura infantojuvenil ambiental",
          "Guias de trilhas e roteiros educativos",
          "Jogos e materiais lúdicos",
          "Conteúdo digital e audiovisual",
        ],
      },
    ],
  },

  differentials: {
    eyebrow: "Diferenciais",
    titleLead: "Resultados que falam ",
    titleEmphasis: "por si.",
    lead:
      "Combinamos rigor técnico, sensibilidade pedagógica e uma base científica forte — formada por pesquisadoras com vivência prática em campo.",
    items: [
      {
        num: "+50",
        unit: "serviços",
        title: "Portfólio completo",
        text:
          "Soluções modulares que se adaptam ao contexto e à escala de cada parceiro.",
      },
      {
        num: "4",
        unit: "públicos",
        title: "Atendimento integrado",
        text:
          "Escolas, empresas, órgãos públicos e comunidades em um mesmo ecossistema.",
      },
      {
        num: "100",
        unit: "%",
        title: "Metodologia vivencial",
        text:
          "Aprendizagem ancorada na experiência direta com a natureza e o território.",
      },
      {
        num: "BR",
        unit: "·nacional",
        title: "Atuação em todo o país",
        text:
          "Raízes amazônicas, presença e parcerias em diferentes biomas brasileiros.",
      },
    ],
  },

  esg: {
    eyebrow: "ESG & Sustentabilidade",
    titleLead: "Do compromisso ao ",
    titleEmphasis: "impacto mensurável.",
    lead:
      "Apoiamos organizações a transformar princípios ESG em prática cotidiana — com indicadores claros, governança consistente e conexão genuína com a agenda 2030 das Nações Unidas.",
    cta: { href: "#contato", label: "Falar sobre ESG na minha empresa" },
    pillars: [
      {
        letter: "E",
        title: "Ambiental",
        text:
          "Gestão de resíduos, biodiversidade, clima e uso responsável de recursos naturais.",
      },
      {
        letter: "S",
        title: "Social",
        text:
          "Engajamento comunitário, diversidade, educação e relações com territórios.",
      },
      {
        letter: "G",
        title: "Governança",
        text:
          "Transparência, ética, métricas e construção de políticas internas sólidas.",
      },
      {
        letter: "+",
        title: "Impacto",
        text:
          "Indicadores socioambientais conectados aos Objetivos de Desenvolvimento Sustentável.",
      },
    ],
    ods: [
      "ODS 4 · Educação de qualidade",
      "ODS 6 · Água potável",
      "ODS 11 · Cidades sustentáveis",
      "ODS 12 · Consumo responsável",
      "ODS 13 · Ação climática",
      "ODS 15 · Vida terrestre",
    ],
  },

  gallery: {
    eyebrow: "Experiências em campo",
    titleLead: "Trilhas, oficinas e ",
    titleEmphasis: "encontros que ensinam.",
    lead:
      "Cada projeto começa com escuta e termina em vivência. Uma seleção do que acontece quando ciência, natureza e comunidade se encontram.",
    tiles: [
      { key: "t1", label: "Mirante Vale do Rio Azul", image: "/assets/01.jpeg" },
      { key: "t2", label: "Trilha educativa", image: "/assets/15.jpeg" },
      { key: "t3", label: "Flora amazônica", image: "/assets/04.jpeg" },
      { key: "t4", label: "Estudo de campo", image: "/assets/03.jpeg" },
      { key: "t5", label: "Visita guiada · ICMBio", image: "/assets/07.jpeg" },
      { key: "t6", label: "Oficina sensorial", image: "/assets/14.jpeg" },
      { key: "t7", label: "Exposição escolar", image: "/assets/12.jpeg" },
      { key: "t8", label: "Paisagens do cerrado", image: "/assets/11.jpeg" },
      { key: "t9", label: "Sítio arqueológico", image: "/assets/05.jpeg" },
    ],
  },

  ctaFinal: {
    eyebrow: "Vamos construir juntos",
    titleLead: "Construindo um futuro ",
    titleEmphasis: "sustentável juntos.",
    paragraph:
      "Conte sobre seu projeto, sua escola, sua empresa ou seu município. Nós ajudamos a transformar a intenção ambiental em prática consistente, mensurável e inspiradora.",
    primaryCta: { label: "Solicitar proposta" },
    ghostCta: { href: "#galeria", label: "Ver experiências" },
    bgImage: "/assets/13.jpeg",
  },

  contact: {
    email: "contato@ipeeducacaoambiental.com.br",
    phone: "+55 (00) 0000-0000",
    location: "Amazônia · Atuação nacional",
    cnpj: "00.000.000/0001-00",
  },

  footer: {
    logo: "/assets/logo.png",
    brandTitle: "IPÊ",
    brandSubtitle: "Educação Ambiental",
    description:
      "Educação ambiental, ESG e projetos socioambientais nascidos na Amazônia, com atuação em todo o Brasil.",
    quote: "Raízes locais, consciência global.",
    navLinks: [
      { href: "#sobre", label: "Sobre" },
      { href: "#atuacao", label: "Áreas de Atuação" },
      { href: "#diferenciais", label: "Diferenciais" },
      { href: "#esg", label: "ESG" },
      { href: "#galeria", label: "Experiências" },
    ],
    services: [
      "Serviços Educacionais",
      "Órgãos Públicos",
      "Empresariais · ESG",
      "Materiais Educativos",
      "Consultoria & Mentoria",
    ],
    socials: [
      { network: "Instagram", href: "#" },
      { network: "LinkedIn", href: "#" },
      { network: "WhatsApp", href: "#" },
    ],
    copyrightName: "IPÊ EDUCAÇÃO AMBIENTAL",
    tagline: "RAÍZES LOCAIS · CONSCIÊNCIA GLOBAL",
  },
};
