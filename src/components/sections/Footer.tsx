import { Logo } from "#/components/ui/Logo";

export function Footer() {
	return (
		<footer id="contact" className="site-footer">
			<div className="footer-inner">
				<Logo size="lg" />
				<a
					href="https://instagram.com/ipeeducacaoambiental"
					target="_blank"
					rel="noreferrer"
					className="footer-social"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
					>
						<rect
							x="3"
							y="3"
							width="18"
							height="18"
							rx="5"
							stroke="currentColor"
							strokeWidth="2"
						/>
						<circle
							cx="12"
							cy="12"
							r="4"
							stroke="currentColor"
							strokeWidth="2"
						/>
						<circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
					</svg>
					<span>
						<span className="accent">ipe</span>educacao
						<span className="accent">ambiental</span>
					</span>
				</a>
				<a href="#contact" className="footer-cta">
					<span>SOLICITE UM ORÇAMENTO</span>
					<svg
						width="14"
						height="12"
						viewBox="0 0 16 14"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M1 7H15M15 7L9 1M15 7L9 13"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</a>
				<div className="footer-divider" />
				<p className="footer-rights">
					TODOS OS DIREITOS RESERVADOS PARA IPÊ EDUCAÇÃO AMBIENTAL
				</p>
			</div>
		</footer>
	);
}
