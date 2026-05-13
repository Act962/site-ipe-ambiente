import { ClippedPhoto } from "#/components/ui/ClippedPhoto";
import { CtaButton } from "#/components/ui/CtaButton";
import { SectionTitle } from "#/components/ui/SectionTitle";
import { useReveal } from "#/hooks/useReveal";

type FounderCardProps = {
	name: string;
	bio: string;
	photoSrc: string;
	reverse?: boolean;
};

function CurvedArrow({ flip = false }: { flip?: boolean }) {
	return (
		<svg
			viewBox="0 0 120 80"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={`hidden h-16 w-24 shrink-0 self-start text-ipe-green-600 md:block ${
				flip ? "-scale-x-100" : ""
			}`}
		>
			<path d="M6 14 C 40 6, 80 18, 104 56" />
			<path d="M102 40 L 104 56 L 91 47" />
		</svg>
	);
}

function FounderCard({
	name,
	bio,
	photoSrc,
	reverse = false,
}: FounderCardProps) {
	const ref = useReveal<HTMLDivElement>();
	return (
		<div
			ref={ref}
			className={`reveal flex flex-col items-center gap-6 md:flex-row ${
				reverse ? "md:flex-row-reverse" : ""
			}`}
		>
			<ClippedPhoto
				className="photo-lift h-56 w-72 shrink-0 md:h-64 md:w-80"
				src={photoSrc}
				alt={name}
			/>
			<CurvedArrow flip={reverse} />
			<p className="text-sm leading-relaxed text-ipe-green-900">
				<span className="font-bold">{name}:</span> {bio}
			</p>
		</div>
	);
}

export function AboutUs() {
	const titleRef = useReveal<HTMLDivElement>();
	const introRef = useReveal<HTMLParagraphElement>();
	const ctaRef = useReveal<HTMLDivElement>();

	return (
		<section id="about-us" className="bg-white py-20">
			<div className="mx-auto max-w-4xl px-6">
				<div ref={titleRef} className="reveal mb-10 flex justify-center">
					<SectionTitle>Quem somos</SectionTitle>
				</div>

				<p
					ref={introRef}
					className="reveal mb-12 text-center text-base leading-relaxed text-ipe-green-900 md:text-justify"
				>
					A Ipê - Educação Ambiental surge em solo amazônico, da união entre a
					expertise científica e a paixão pedagógica de duas pesquisadoras e
					educadoras. Com um olhar atento às urgências socioambientais, a
					empresa transforma o conhecimento acadêmico em soluções práticas, com
					o objetivo de multiplicar hábitos sustentáveis e regenerativos no
					cotidiano da sociedade. Nossa atuação é pautada pelo respeito aos
					ciclos naturais e pelo compromisso de formar cidadãos e instituições
					capazes de coexistir em equilíbrio com o meio ambiente.
				</p>

				<div className="space-y-10">
					<FounderCard
						name="Elisângela Lucena da Silva"
						photoSrc="/images/07.jpeg"
						bio="Co-fundadora da Ipê - Educação Ambiental, professora licenciada em Ciências Naturais, especialista em Educação Ambiental, profissional com experiência em diversos segmentos da educação e coordenação de projetos."
					/>
					<FounderCard
						reverse
						name="Aline Carla dos Santos Moraes Marinho"
						photoSrc="/images/08.jpeg"
						bio="Co-fundadora da Ipê - Educação Ambiental, professora licenciada em Biologia, especialista em Educação Ambiental, mestre em Ciências Ambientais, profissional com experiência em diversos segmentos da educação, arte e cultura."
					/>
				</div>

				<div ref={ctaRef} className="reveal mt-12 flex justify-center">
					<CtaButton href="#contact">CONTRATAR</CtaButton>
				</div>
			</div>
		</section>
	);
}
