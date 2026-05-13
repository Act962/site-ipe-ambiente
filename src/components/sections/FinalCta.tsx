import { CtaButton } from "#/components/ui/CtaButton";
import { useReveal } from "#/hooks/useReveal";

export function FinalCta() {
	const ref = useReveal<HTMLDivElement>();

	return (
		<section
			id="support"
			className="hero-forest relative isolate overflow-hidden"
		>
			<div
				ref={ref}
				className="reveal relative mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-32 text-center md:min-h-[70vh] md:py-44"
			>
				<div className="soft-pulse pointer-events-none absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ipe-pink/30 blur-3xl" />

				<p className="mb-3 font-script text-2xl text-ipe-pink drop-shadow-md md:text-3xl">
					Vamos plantar juntos?
				</p>

				<h2 className="mb-5 max-w-3xl text-balance text-2xl font-semibold uppercase leading-relaxed tracking-[0.18em] text-white drop-shadow-lg md:text-3xl">
					Educação ambiental que vira hábito.
					<span className="block">Hábito que vira cultura.</span>
				</h2>

				<p className="mb-10 max-w-xl text-sm leading-relaxed text-white/90 md:text-base">
					Da Amazônia para escolas, empresas e comunidades. Construímos projetos
					sob medida — do diagnóstico à formação — para que a consciência
					ambiental deixe de ser pauta e vire prática no dia a dia.
				</p>

				<CtaButton href="#contact">QUERO CONTRATAR A IPÊ</CtaButton>

				<p className="mt-5 text-xs uppercase tracking-[0.18em] text-white/70">
					Conversa inicial sem compromisso · Resposta em até 24h
				</p>
			</div>
		</section>
	);
}
