import { ClippedPhoto } from "#/components/ui/ClippedPhoto";
import { CtaButton } from "#/components/ui/CtaButton";
import { SectionTitle } from "#/components/ui/SectionTitle";
import { useReveal } from "#/hooks/useReveal";

type FounderCardProps = {
	first: string;
	last: string;
	eyebrow: string;
	bio: string;
	tags: string[];
	photoSrc: string;
	reverse?: boolean;
};

function CurvedArrow({ flip = false }: { flip?: boolean }) {
	return (
		<svg
			className="curved-arrow"
			viewBox="0 0 120 90"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			style={flip ? { transform: "scaleX(-1)" } : undefined}
		>
			<path d="M6 14 C 40 6, 78 20, 102 60" strokeDasharray="3 6" />
			<path d="M100 44 L 102 60 L 89 51" />
		</svg>
	);
}

function FounderCard({
	first,
	last,
	eyebrow,
	bio,
	tags,
	photoSrc,
	reverse = false,
}: FounderCardProps) {
	const ref = useReveal<HTMLDivElement>();
	return (
		<div ref={ref} className={`founder reveal${reverse ? " is-reverse" : ""}`}>
			<div className="founder-photo-wrap" data-cursor="orb">
				<ClippedPhoto
					style={{ width: 280, height: 220 }}
					src={photoSrc}
					alt={`${first} ${last}`}
				/>
			</div>
			<CurvedArrow flip={reverse} />
			<div className="founder-meta">
				<span className="founder-eyebrow">{eyebrow}</span>
				<h3 className="founder-name">
					<span className="first">{first}</span>
					<span className="last">{last}</span>
				</h3>
				<p className="founder-bio">{bio}</p>
				<div className="founder-tags">
					{tags.map((t) => (
						<span key={t} className="founder-tag">
							{t}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}

export function AboutUs() {
	const titleRef = useReveal<HTMLDivElement>();
	const introRef = useReveal<HTMLDivElement>();
	const ctaRef = useReveal<HTMLDivElement>();

	return (
		<section id="about-us" className="about">
			<div className="about-inner">
				<div ref={titleRef} className="reveal">
					<SectionTitle eyebrow="Nossa história">Quem somos</SectionTitle>
				</div>

				<div ref={introRef} className="reveal about-intro">
					<span className="lead">
						A Ipê nasce em solo amazônico — do encontro entre ciência e
						pedagogia.
					</span>
					Da união entre a expertise científica e a paixão pedagógica de duas
					pesquisadoras e educadoras, transformamos conhecimento acadêmico em
					soluções práticas — multiplicando hábitos sustentáveis e regenerativos
					no cotidiano da sociedade. Nossa atuação é pautada pelo respeito aos
					ciclos naturais e pelo compromisso de formar cidadãos e instituições
					capazes de coexistir em equilíbrio com o meio ambiente.
				</div>

				<div className="founders">
					<FounderCard
						first="Elisângela"
						last="Lucena da Silva"
						eyebrow="Co-fundadora"
						photoSrc="/images/07.jpeg"
						bio="Professora licenciada em Ciências Naturais, especialista em Educação Ambiental, com vasta experiência em diversos segmentos da educação e coordenação de projetos."
						tags={["Ciências Naturais", "Educação Ambiental", "Coordenação"]}
					/>
					<FounderCard
						reverse
						first="Aline Carla"
						last="dos Santos Moraes Marinho"
						eyebrow="Co-fundadora"
						photoSrc="/images/08.jpeg"
						bio="Professora licenciada em Biologia, especialista em Educação Ambiental, mestre em Ciências Ambientais, com experiência em educação, arte e cultura."
						tags={[
							"Biologia",
							"Mestre em Ciências Ambientais",
							"Arte & Cultura",
						]}
					/>
				</div>

				<div ref={ctaRef} className="reveal about-cta">
					<CtaButton href="#contact">CONTRATAR</CtaButton>
				</div>
			</div>
		</section>
	);
}
