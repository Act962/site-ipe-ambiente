export function PinkIpeTreeIcon({ className = "" }: { className?: string }) {
	return (
		<div className={`relative h-14 w-14 ${className}`}>
			<div className="absolute left-1/2 bottom-0 h-4 w-2 -translate-x-1/2 rounded-sm bg-amber-900/80" />
			<div className="absolute inset-x-1 top-0 h-11 rounded-full bg-ipe-pink" />
			<div className="absolute inset-x-3 top-1 h-7 rounded-full bg-ipe-pink-dark/70" />
		</div>
	);
}
