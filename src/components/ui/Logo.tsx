export function Logo({ size = "sm" }: { size?: "sm" | "lg" }) {
	const isLg = size === "lg";
	return (
		<a href="#hero" aria-label="Voltar ao início" className="inline-block">
			<img
				src="/images/logo.png"
				alt="Ipê"
				className={`object-contain ${isLg ? "h-32 w-32" : "h-14 w-14"}`}
			/>
		</a>
	);
}
