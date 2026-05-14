import { useEffect, useRef } from "react";
import { Petals } from "#/components/ui/Petals";

export function Hero() {
	const bgRef = useRef<HTMLDivElement | null>(null);
	const treelineRef = useRef<HTMLDivElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let raf = 0;
		const onScroll = () => {
			if (raf) return;
			raf = requestAnimationFrame(() => {
				raf = 0;
				const y = window.scrollY;
				if (y > window.innerHeight) return;
				if (bgRef.current)
					bgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
				if (treelineRef.current)
					treelineRef.current.style.transform = `translate3d(0, ${y * -0.18}px, 0)`;
				if (contentRef.current) {
					contentRef.current.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
					contentRef.current.style.opacity = String(Math.max(0, 1 - y / 600));
				}
			});
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (raf) cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<section id="hero" className="hero" data-cursor="orb">
			<div ref={bgRef} className="hero-bg">
				<img src="/images/hero-background.png" alt="" aria-hidden="true" />
			</div>
			<div className="hero-overlay" />
			<div className="hero-vignette" />

			<Petals count={16} />

			<div ref={treelineRef} className="hero-treeline">
				<img src="/images/trees-rose.png" alt="" aria-hidden="true" />
			</div>

			<div ref={contentRef} className="hero-content">
				<img
					src="/icons/quote.svg"
					alt=""
					aria-hidden="true"
					className="hero-quote-mark hero-rise"
				/>
				<p className="hero-text hero-rise-2">
					Proteger as florestas do nosso planeta é a única forma de garantir que
					nossos filhos e netos tenham um <span className="accent">lar</span>.
				</p>
				<p className="hero-author hero-rise-3">
					Manifesto Ipê · Educação Ambiental
				</p>
			</div>

			<div className="hero-scroll-cue" aria-hidden="true">
				<span>Role para descobrir</span>
				<span className="line" />
			</div>
		</section>
	);
}
