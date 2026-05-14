import { createFileRoute } from "@tanstack/react-router";
import { AboutUs } from "#/components/sections/AboutUs";
import { FinalCta } from "#/components/sections/FinalCta";
import { Footer } from "#/components/sections/Footer";
import { Header } from "#/components/sections/Header";
import { Hero } from "#/components/sections/Hero";
import { MissionVision } from "#/components/sections/MissionVision";
import { Services } from "#/components/sections/Services";
import { CursorOrb } from "#/components/ui/CursorOrb";
import { ScrollProgress } from "#/components/ui/ScrollProgress";
import { BrushBannerDefs } from "#/components/ui/SectionTitle";
import { WhatsAppFloat } from "#/components/ui/WhatsAppFloat";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<>
			<BrushBannerDefs />
			<ScrollProgress />
			<CursorOrb />
			<main>
				<Header />
				<Hero />
				<Services />
				<AboutUs />
				<MissionVision />
				<FinalCta />
				<Footer />
			</main>
			<WhatsAppFloat />
		</>
	);
}
