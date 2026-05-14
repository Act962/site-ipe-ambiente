import { useEffect, useState } from "react";
import { Logo } from "#/components/ui/Logo";

const SECTION_IDS = ["hero", "services", "about-us", "support", "contact"];

export function Header() {
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState<string>("hero");
	const [, setMobileOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const sections = SECTION_IDS.map((id) =>
			document.getElementById(id),
		).filter((el): el is HTMLElement => Boolean(el));
		if (!sections.length) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) setActive(e.target.id);
				}
			},
			{ rootMargin: "-40% 0px -50% 0px", threshold: 0 },
		);
		for (const s of sections) io.observe(s);
		return () => io.disconnect();
	}, []);

	const linkClass = (id: string) =>
		`nav-link${active === id ? " is-active" : ""}`;

	return (
		<header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
			<div className="header-inner">
				<Logo />
				<nav className="site-nav" aria-label="Navegação principal">
					<a href="#about-us" className={linkClass("about-us")}>
						QUEM SOMOS
					</a>
					<a href="#services" className={linkClass("services")}>
						SERVIÇOS
					</a>
					<a href="#support" className={linkClass("support")}>
						APOIO
					</a>
					<a href="#contact" className={linkClass("contact")}>
						CONTATO
					</a>
				</nav>
				<a href="#contact" className="header-cta">
					<span>CONTRATAR</span>
					<svg viewBox="0 0 16 14" fill="none" aria-hidden="true">
						<path
							d="M1 7H15M15 7L9 1M15 7L9 13"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</a>
				<button
					type="button"
					className="mobile-menu-btn"
					aria-label="Abrir menu"
					onClick={() => setMobileOpen((v) => !v)}
				>
					<svg
						width="18"
						height="14"
						viewBox="0 0 18 14"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M1 1h16M1 7h16M1 13h16"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>
		</header>
	);
}
