import { ClippedPhoto } from "#/components/ui/ClippedPhoto";
import { CtaButton } from "#/components/ui/CtaButton";
import { useReveal } from "#/hooks/useReveal";

export function MissionVision() {
	const missionRef = useReveal<HTMLDivElement>();
	const visionRef = useReveal<HTMLDivElement>();
	const ctaRef = useReveal<HTMLDivElement>();

	return (
		<section className="relative bg-ipe-brand py-20">
			<div className="mx-auto max-w-5xl space-y-14 px-6">
				<div
					ref={missionRef}
					className="reveal grid items-center gap-8 md:grid-cols-[1fr_auto]"
				>
					<div>
						<h3 className="mb-3 text-lg font-bold text-ipe-pink">Missão:</h3>
						<p className="text-sm leading-relaxed text-white/95">
							Semear conhecimento e cultivar o pertencimento através de
							experiências de educação ambiental de alto impacto, conectando
							saberes locais a uma consciência global de forma inclusiva e
							sustentável.
						</p>
					</div>
					<ClippedPhoto
						className="photo-lift h-60 w-80 md:h-72 md:w-96"
						src="/images/01.jpeg"
						alt="Missão"
					/>
				</div>

				<div
					ref={visionRef}
					className="reveal grid items-center gap-8 md:grid-cols-[auto_1fr]"
				>
					<ClippedPhoto
						className="photo-lift h-60 w-80 md:h-72 md:w-96"
						src="/images/02.jpeg"
						alt="Visão"
						imgClassName="object-top"
					/>
					<div>
						<h3 className="mb-3 text-lg font-bold text-ipe-pink">Visão:</h3>
						<p className="text-sm leading-relaxed text-white/95">
							Ser referência nacional em educação ambiental integrada,
							transformando realidades locais em exemplos globais.
						</p>
					</div>
				</div>

				<div ref={ctaRef} className="reveal flex justify-center pt-4">
					<CtaButton href="#contact">CONTRATAR</CtaButton>
				</div>
			</div>
		</section>
	);
}
