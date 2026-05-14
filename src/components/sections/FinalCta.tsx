import { CtaButton } from "#/components/ui/CtaButton";
import { useReveal } from "#/hooks/useReveal";

export function FinalCta() {
	const ref = useReveal<HTMLDivElement>();

	return (
		<section className="final-cta" data-cursor="orb">
			<div className="bg">
				<img src="/images/hero-background.png" alt="" aria-hidden="true" />
			</div>
			<div className="overlay" />
			<div ref={ref} className="reveal final-cta-inner">
				<div className="final-cta-glow" aria-hidden="true" />
				<p className="final-script">Vamos plantar juntos?</p>
				<h2 className="final-heading">
					Educação ambiental que vira hábito.
					<span className="line2">Hábito que vira cultura.</span>
				</h2>
				<p className="final-body">
					Da Amazônia para escolas, empresas e comunidades. Construímos projetos
					sob medida — do diagnóstico à formação — para que a consciência
					ambiental deixe de ser pauta e vire prática no dia a dia.
				</p>
				<CtaButton href="#contact">QUERO CONTRATAR A IPÊ</CtaButton>
				<span className="micro">
					Conversa inicial sem compromisso · Resposta em até 24h
				</span>
			</div>
		</section>
	);
}
