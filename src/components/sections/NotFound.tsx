import { Link } from "@tanstack/react-router";
import { CtaButton } from "#/components/ui/CtaButton";
import { Logo } from "#/components/ui/Logo";

export function NotFound() {
	return (
		<main className="hero-forest relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
			<div className="hero-rise mb-10">
				<Logo size="lg" />
			</div>

			<p className="hero-rise mb-4 font-script text-5xl text-ipe-pink drop-shadow-lg md:text-6xl">
				Ops!
			</p>

			<h1 className="hero-rise-delay mb-6 text-[5rem] font-extrabold leading-none tracking-tight text-white drop-shadow-xl md:text-[8rem]">
				404
			</h1>

			<p className="hero-rise-delay mb-2 max-w-xl text-lg font-semibold uppercase tracking-[0.18em] text-white drop-shadow-md md:text-xl">
				Página não encontrada
			</p>

			<p className="hero-rise-delay mb-10 max-w-md text-sm leading-relaxed text-white/85">
				A trilha que você seguiu não leva a lugar nenhum. Que tal voltar e
				explorar o que cultivamos por aqui?
			</p>

			<div className="hero-rise-delay flex flex-col items-center gap-4 sm:flex-row">
				<CtaButton href="/">VOLTAR AO INÍCIO</CtaButton>
				<Link
					to="/"
					hash="services"
					className="text-sm font-bold uppercase tracking-widest text-white/90 underline-offset-4 transition-colors hover:text-ipe-pink hover:underline"
				>
					Ver serviços
				</Link>
			</div>

			<div className="soft-pulse pointer-events-none absolute -bottom-20 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-ipe-pink/30 blur-3xl" />
		</main>
	);
}
