type SectionTitleProps = {
	children: React.ReactNode;
	eyebrow?: string;
	eyebrowOnDark?: boolean;
	withTrees?: boolean;
};

function BannerTree({ variant = 0 }: { variant?: 0 | 1 }) {
	if (variant === 1) {
		return (
			<svg viewBox="0 0 60 90" fill="none" aria-hidden="true">
				<rect x="26" y="62" width="8" height="22" fill="#5e3a1f" rx="1.5" />
				<path
					d="M30 4 C 14 18, 6 38, 4 60 C 18 56, 24 58, 30 60 C 36 58, 42 56, 56 60 C 54 38, 46 18, 30 4 Z"
					fill="#2e8b1f"
				/>
				<path
					d="M30 18 C 18 30, 12 46, 12 58 C 22 54, 30 56, 30 58 Z"
					fill="#1f6815"
					opacity="0.6"
				/>
			</svg>
		);
	}
	return (
		<svg viewBox="0 0 60 90" fill="none" aria-hidden="true">
			<rect x="26" y="60" width="8" height="24" fill="#5e3a1f" rx="1.5" />
			<ellipse cx="30" cy="36" rx="26" ry="34" fill="#2e8b1f" />
			<ellipse cx="22" cy="30" rx="10" ry="14" fill="#1f6815" opacity="0.5" />
		</svg>
	);
}

function BannerLeaf({
	className = "",
	color = "#1f6815",
	stem = "#0c2f0a",
}: {
	className?: string;
	color?: string;
	stem?: string;
}) {
	return (
		<svg
			viewBox="0 0 60 60"
			fill="none"
			aria-hidden="true"
			className={`brush-banner-leaf ${className}`}
		>
			<path
				d="M8 52 C 12 28, 28 8, 56 6 C 54 32, 38 50, 14 54 Z"
				fill={color}
			/>
			<path
				d="M8 52 C 18 40, 30 28, 56 6"
				stroke={stem}
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path
				d="M20 40 L 28 36"
				stroke={stem}
				strokeWidth="1"
				strokeLinecap="round"
			/>
			<path
				d="M28 30 L 36 26"
				stroke={stem}
				strokeWidth="1"
				strokeLinecap="round"
			/>
			<path
				d="M36 22 L 44 18"
				stroke={stem}
				strokeWidth="1"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function BrushStrokeBg({
	fill = "#8FD35A",
	innerFill = "#7BC840",
}: {
	fill?: string;
	innerFill?: string;
}) {
	return (
		<svg
			className="brush-banner-stroke"
			viewBox="0 0 600 160"
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<g filter="url(#brush-edge)">
				<rect x="30" y="22" width="540" height="116" rx="6" fill={fill} />
			</g>
			<g filter="url(#brush-edge-2)" opacity="0.35">
				<rect x="60" y="40" width="480" height="6" rx="3" fill={innerFill} />
				<rect x="90" y="56" width="420" height="4" rx="2" fill={innerFill} />
				<rect x="50" y="108" width="500" height="6" rx="3" fill={innerFill} />
				<rect x="80" y="120" width="440" height="4" rx="2" fill={innerFill} />
			</g>
		</svg>
	);
}

/**
 * Mount once at the app root. Supplies the SVG filters that the
 * brush-stroke section title uses to get painted, uneven edges.
 */
export function BrushBannerDefs() {
	return (
		<svg
			width="0"
			height="0"
			style={{ position: "absolute" }}
			aria-hidden="true"
		>
			<defs>
				<filter id="brush-edge" x="-5%" y="-20%" width="110%" height="140%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.018 0.05"
						numOctaves={2}
						seed={5}
						result="noise"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale={22}
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
				<filter id="brush-edge-2" x="-5%" y="-20%" width="110%" height="140%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.04 0.08"
						numOctaves={2}
						seed={12}
						result="noise"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale={9}
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
			</defs>
		</svg>
	);
}

export function SectionTitle({
	children,
	eyebrow,
	eyebrowOnDark = false,
	withTrees = true,
}: SectionTitleProps) {
	return (
		<div className="brush-banner">
			{withTrees ? (
				<div className="brush-banner-treeline" aria-hidden="true">
					<BannerTree variant={0} />
					<BannerTree variant={1} />
					<BannerTree variant={0} />
					<BannerTree variant={1} />
					<BannerTree variant={0} />
					<BannerTree variant={1} />
					<BannerTree variant={0} />
				</div>
			) : null}

			<div className="brush-banner-inner">
				<BrushStrokeBg />
				<BannerLeaf className="is-top-left" />
				<BannerLeaf className="is-bottom-right" />
				{eyebrow ? (
					<span
						className={`section-eyebrow${eyebrowOnDark ? " on-dark" : ""}`}
						style={{
							position: "absolute",
							top: 4,
							left: "50%",
							transform: "translateX(-50%)",
						}}
					>
						{eyebrow}
					</span>
				) : null}
				<h2 className="brush-banner-text">{children}</h2>
			</div>
		</div>
	);
}
