import { Instagram } from "lucide-react";
import { Logo } from "#/components/ui/Logo";

export function Footer() {
	return (
		<footer id="contact" className="bg-ipe-green-900 py-16 text-white">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">
				<Logo size="lg" />

				<a
					href="https://instagram.com/ipeeducacaoambiental"
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center gap-2 text-sm hover:text-ipe-pink"
				>
					<Instagram className="h-4 w-4" />
					<span>
						<span className="text-ipe-green-500">ipe</span>
						educacao
						<span className="text-ipe-green-500">ambiental</span>
					</span>
				</a>

				<a
					href="#contact"
					className="inline-flex items-center justify-center rounded-full bg-ipe-green-500 px-8 py-3 text-xs font-bold tracking-widest text-white shadow hover:bg-ipe-green-400"
				>
					SOLICITE UM ORÇAMENTO
				</a>

				<p className="mt-6 text-[10px] tracking-[0.25em] text-white/60">
					TODOS OS DIREITOS RESERVADOS PARA IPÊ EDUCAÇÃO AMBIENTAL
				</p>
			</div>
		</footer>
	);
}
