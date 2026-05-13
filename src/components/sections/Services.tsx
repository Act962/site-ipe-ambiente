import { ClippedPhoto } from "#/components/ui/ClippedPhoto";
import { CtaButton } from "#/components/ui/CtaButton";
import { SectionTitle } from "#/components/ui/SectionTitle";
import { useReveal } from "#/hooks/useReveal";

const SERVICES = [
	{ label: "Serviço 1", photo: "/images/11.jpeg" },
	{ label: "Serviço 2", photo: "/images/04.jpeg" },
	{ label: "Serviço 3", photo: "/images/09.jpeg" },
	{ label: "Serviço 4", photo: "/images/13.jpeg" },
	{ label: "Serviço 5", photo: "/images/06.jpeg" },
	{ label: "Serviço 6", photo: "/images/03.jpeg" },
	{ label: "Serviço 7", photo: "/images/15.jpeg" },
	{ label: "Serviço 8", photo: "/images/12.jpeg" },
];

export function Services() {
	const titleRef = useReveal<HTMLDivElement>();
	const gridRef = useReveal<HTMLDivElement>();
	const ctaRef = useReveal<HTMLDivElement>();

	return (
		<section id="services" className="relative bg-ipe-brand pb-24 pt-16">
			<div className="mx-auto max-w-6xl px-6">
				<div ref={titleRef} className="reveal mb-14 flex justify-center">
					<SectionTitle>Serviços</SectionTitle>
				</div>

				<div
					ref={gridRef}
					className="reveal-stagger grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4"
				>
					{SERVICES.map(({ label, photo }) => (
						<div key={label} className="flex flex-col items-center text-center">
							<ClippedPhoto
								className="photo-lift mb-4 h-36 w-36 md:h-40 md:w-40"
								src={photo}
								alt={label}
							/>
							<span className="text-sm font-bold uppercase tracking-widest text-white">
								{label}
							</span>
						</div>
					))}
				</div>

				<div ref={ctaRef} className="reveal mt-14 flex justify-center">
					<CtaButton href="#contact">CONTRATAR</CtaButton>
				</div>
			</div>
		</section>
	);
}
