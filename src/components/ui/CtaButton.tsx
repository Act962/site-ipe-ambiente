type CtaButtonProps = {
	children?: React.ReactNode;
	href?: string;
	className?: string;
	withArrow?: boolean;
};

export function CtaButton({
	children = "CONTRATAR",
	href,
	className = "",
	withArrow = true,
}: CtaButtonProps) {
	const cls = `cta-btn ${className}`;
	const inner = (
		<>
			<span>{children}</span>
			{withArrow ? (
				<span className="arrow" aria-hidden="true">
					<svg
						width="16"
						height="14"
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
				</span>
			) : null}
		</>
	);
	return href ? (
		<a href={href} className={cls}>
			{inner}
		</a>
	) : (
		<button type="button" className={cls}>
			{inner}
		</button>
	);
}
