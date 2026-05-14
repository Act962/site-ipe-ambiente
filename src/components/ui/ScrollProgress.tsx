import { useEffect, useRef } from "react";

export function ScrollProgress() {
	const ref = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const onScroll = () => {
			const h = document.documentElement;
			const max = h.scrollHeight - h.clientHeight;
			const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
			if (ref.current) ref.current.style.width = `${pct}%`;
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}
