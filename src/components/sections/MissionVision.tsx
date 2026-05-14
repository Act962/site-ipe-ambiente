import { ClippedPhoto } from "#/components/ui/ClippedPhoto";
import { CtaButton } from "#/components/ui/CtaButton";
import { useReveal } from "#/hooks/useReveal";

export function MissionVision() {
	const missionRef = useReveal<HTMLDivElement>();
	const visionRef = useReveal<HTMLDivElement>();
	const ctaRef = useReveal<HTMLDivElement>();

	return (
		<section id="support" className="mission-vision">
			<img
				src="/images/trees-rose.png"
				alt=""
				aria-hidden="true"
				className="mv-bg-tree"
			/>
			<div className="mv-inner">
				<div ref={missionRef} className="reveal mv-row">
					<div className="mv-text">
						<h3 className="mv-eyebrow">Missão</h3>
						<div className="mv-divider" />
						<p>
							Semear conhecimento e cultivar o pertencimento através de
							experiências de educação ambiental de alto impacto, conectando
							saberes locais a uma consciência global de forma inclusiva e
							sustentável.
						</p>
					</div>
					<ClippedPhoto
						style={{ width: 380, height: 270 }}
						src="/images/01.jpeg"
						alt="Missão"
					/>
				</div>

				<div ref={visionRef} className="reveal mv-row is-reverse">
					<ClippedPhoto
						style={{ width: 380, height: 270 }}
						src="/images/02.jpeg"
						alt="Visão"
						imgStyle={{ objectPosition: "center top" }}
					/>
					<div className="mv-text">
						<h3 className="mv-eyebrow">Visão</h3>
						<div className="mv-divider" />
						<p>
							Ser referência nacional em educação ambiental integrada,
							transformando realidades locais em exemplos globais.
						</p>
					</div>
				</div>

				<div ref={ctaRef} className="reveal mv-cta">
					<CtaButton href="#contact">CONTRATAR</CtaButton>
				</div>
			</div>
		</section>
	);
}
