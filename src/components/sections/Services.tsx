import { ClippedPhoto } from "#/components/ui/ClippedPhoto";
import { CtaButton } from "#/components/ui/CtaButton";
import { SectionTitle } from "#/components/ui/SectionTitle";
import { useReveal } from "#/hooks/useReveal";

const SERVICES = [
	{
		label: "Trilhas Educativas",
		desc: "Vivências guiadas em fragmentos de mata e unidades de conservação.",
		photo: "/images/11.jpeg",
		tag: "Ao ar livre",
	},
	{
		label: "Oficinas Escolares",
		desc: "Conteúdos práticos do fundamental ao médio, alinhados à BNCC.",
		photo: "/images/04.jpeg",
		tag: "Para escolas",
	},
	{
		label: "Diagnóstico Socioambiental",
		desc: "Mapeamento de impactos, comunidades e indicadores ESG.",
		photo: "/images/09.jpeg",
		tag: "Para empresas",
	},
	{
		label: "Plantios Coletivos",
		desc: "Mutirões de restauração com espécies nativas da Amazônia.",
		photo: "/images/13.jpeg",
		tag: "Comunidade",
	},
	{
		label: "Formação de Educadores",
		desc: "Capacitação continuada em educação ambiental crítica.",
		photo: "/images/06.jpeg",
		tag: "Para docentes",
	},
	{
		label: "Consultoria Empresarial",
		desc: "Planos de educação ambiental para programas internos e RH verde.",
		photo: "/images/03.jpeg",
		tag: "Para empresas",
	},
	{
		label: "Eventos & Datas",
		desc: "Ações de impacto em SIPAT, Semana do Meio Ambiente e mais.",
		photo: "/images/15.jpeg",
		tag: "Pontual",
	},
	{
		label: "Programas Comunitários",
		desc: "Articulação com lideranças locais e povos tradicionais.",
		photo: "/images/12.jpeg",
		tag: "Territorial",
	},
];

export function Services() {
	const titleRef = useReveal<HTMLDivElement>();
	const introRef = useReveal<HTMLParagraphElement>();
	const gridRef = useReveal<HTMLDivElement>();
	const ctaRef = useReveal<HTMLDivElement>();

	return (
		<section id="services" className="services" data-cursor="orb">
			<img
				src="/images/trees-rose.png"
				alt=""
				aria-hidden="true"
				className="services-decor-tree left"
			/>
			<img
				src="/images/trees-rose.png"
				alt=""
				aria-hidden="true"
				className="services-decor-tree right"
			/>

			<div className="services-inner">
				<div ref={titleRef} className="reveal">
					<SectionTitle eyebrow="O que fazemos" eyebrowOnDark>
						Serviços
					</SectionTitle>
				</div>

				<p ref={introRef} className="reveal services-intro">
					Soluções práticas que traduzem ciência em hábito — desenhadas para
					escolas, empresas e comunidades.
				</p>

				<div ref={gridRef} className="reveal-stagger services-grid">
					{SERVICES.map(({ label, desc, photo, tag }) => (
						<div key={label} className="service-card">
							<span className="service-tag">{tag}</span>
							<ClippedPhoto
								className="photo-wrap"
								style={{ height: 168, width: 168 }}
								src={photo}
								alt={label}
							/>
							<span className="service-label">{label}</span>
							<span className="service-desc">{desc}</span>
						</div>
					))}
				</div>

				<div ref={ctaRef} className="reveal services-cta">
					<CtaButton href="#contact">CONTRATAR</CtaButton>
				</div>
			</div>
		</section>
	);
}
