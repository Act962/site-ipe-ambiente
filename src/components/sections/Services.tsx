import { ClippedPhoto } from "#/components/ui/ClippedPhoto";
import { CtaButton } from "#/components/ui/CtaButton";
import { SectionTitle } from "#/components/ui/SectionTitle";

const SERVICES = [
	"Serviço 1",
	"Serviço 2",
	"Serviço 3",
	"Serviço 4",
	"Serviço 5",
	"Serviço 6",
	"Serviço 7",
	"Serviço 8",
];

export function Services() {
	return (
		<section
			id="services"
			className="relative bg-ipe-brand pb-24 pt-16"
		>
			<div className="mx-auto max-w-6xl px-6">
				<div className="mb-14 flex justify-center">
					<SectionTitle>Serviços</SectionTitle>
				</div>

				<div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
					{SERVICES.map((label) => (
						<div key={label} className="flex flex-col items-center text-center">
							<ClippedPhoto className="mb-4 h-36 w-36 md:h-40 md:w-40" />
							<span className="text-sm font-bold uppercase tracking-widest text-white">
								{label}
							</span>
						</div>
					))}
				</div>

				<div className="mt-14 flex justify-center">
					<CtaButton href="#contact">CONTRATAR</CtaButton>
				</div>
			</div>
		</section>
	);
}
