import { useMemo } from "react";

type Petal = {
	i: number;
	left: number;
	drift: string;
	dur: number;
	delay: number;
	size: number;
	rot: number;
};

export function Petals({ count = 14 }: { count?: number }) {
	const petals = useMemo<Petal[]>(() => {
		return Array.from({ length: count }, (_, i) => {
			const left = Math.random() * 100;
			const drift = `${Math.random() * 200 - 100}px`;
			const dur = 9 + Math.random() * 9;
			const delay = -Math.random() * dur;
			const size = 9 + Math.random() * 9;
			const rot = Math.random() * 360;
			return { i, left, drift, dur, delay, size, rot };
		});
	}, [count]);

	return (
		<>
			{petals.map((p) => (
				<span
					key={p.i}
					className="petal"
					style={
						{
							left: `${p.left}%`,
							width: p.size,
							height: p.size,
							animationDuration: `${p.dur}s`,
							animationDelay: `${p.delay}s`,
							transform: `rotate(${p.rot}deg)`,
							"--drift": p.drift,
						} as React.CSSProperties
					}
				/>
			))}
		</>
	);
}
