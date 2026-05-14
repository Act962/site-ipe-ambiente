import { useEffect, useRef } from "react";

export function CursorOrb() {
	const ref = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		let raf = 0;
		let tx = 0;
		let ty = 0;
		let x = 0;
		let y = 0;
		const move = (e: PointerEvent) => {
			tx = e.clientX;
			ty = e.clientY;
			const target =
				e.target instanceof Element
					? e.target.closest("[data-cursor='orb']")
					: null;
			if (target) el.classList.add("is-active");
			else el.classList.remove("is-active");
		};
		const tick = () => {
			x += (tx - x) * 0.18;
			y += (ty - y) * 0.18;
			el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
			raf = requestAnimationFrame(tick);
		};
		window.addEventListener("pointermove", move);
		tick();
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("pointermove", move);
		};
	}, []);
	return <div ref={ref} className="cursor-orb" aria-hidden="true" />;
}
