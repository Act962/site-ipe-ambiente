// import { PinkIpeTreeIcon } from "./PinkIpeTreeIcon";

export function SectionTitle({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col items-center">
			{/* <PinkIpeTreeIcon className="mb-4" /> */}
			<h2 className="title-ribbon font-script text-4xl md:text-5xl">
				{children}
			</h2>
		</div>
	);
}
