type ClippedPhotoProps = {
	className?: string;
	src?: string;
	alt?: string;
	imgClassName?: string;
	style?: React.CSSProperties;
	imgStyle?: React.CSSProperties;
	children?: React.ReactNode;
};

const SHAPE_SVG =
	"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path d='M 0 18 A 4 4 0 0 1 3.916 13.18 L 63.084 0.82 A 4 4 0 0 1 68.256 3.796 L 98.744 96.204 A 4 4 0 0 1 96 100 L 4 100 A 4 4 0 0 1 0 96 Z' fill='black'/></svg>\")";

export function ClippedPhoto({
	className = "",
	src,
	alt = "",
	imgClassName = "",
	style,
	imgStyle,
	children,
}: ClippedPhotoProps) {
	return (
		<div
			className={`clipped-photo relative ${className}`}
			style={
				{
					"--shape": SHAPE_SVG,
					filter: "drop-shadow(0 12px 18px rgb(0 0 0 / 0.28))",
					...style,
				} as React.CSSProperties
			}
		>
			<div
				className="absolute inset-0 overflow-hidden bg-ipe-green-700"
				style={
					{
						WebkitMaskImage: SHAPE_SVG,
						maskImage: SHAPE_SVG,
						WebkitMaskSize: "100% 100%",
						maskSize: "100% 100%",
						WebkitMaskRepeat: "no-repeat",
						maskRepeat: "no-repeat",
					} as React.CSSProperties
				}
			>
				{src ? (
					<img
						src={src}
						alt={alt}
						className={`h-full w-full object-cover ${imgClassName}`}
						style={imgStyle}
					/>
				) : (
					<div className="photo-placeholder h-full w-full" />
				)}
				{children}
			</div>
		</div>
	);
}
