import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { NotFound } from "#/components/sections/NotFound";
import appCss from "../styles.css?url";

const SITE_NAME = "Ipê - Educação Ambiental";
const SITE_TITLE =
	"Ipê - Educação Ambiental | Consultoria e Projetos em Educação Ambiental";
const SITE_DESCRIPTION =
	"Ipê - Educação Ambiental: consultoria, formações e projetos que conectam saberes locais a uma consciência global. Soluções práticas para escolas, empresas e comunidades, com origem na Amazônia.";
const SITE_URL = "https://ipeambiental.com.br";
const OG_IMAGE = `${SITE_URL}/images/logo.png`;
const KEYWORDS =
	"educação ambiental, sustentabilidade, consultoria ambiental, Amazônia, formação ambiental, projetos socioambientais, Ipê, meio ambiente, ESG, educação para sustentabilidade";

const STRUCTURED_DATA = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: SITE_NAME,
	url: SITE_URL,
	logo: OG_IMAGE,
	image: OG_IMAGE,
	description: SITE_DESCRIPTION,
	areaServed: "BR",
	knowsLanguage: "pt-BR",
	founder: [
		{ "@type": "Person", name: "Elisângela Lucena da Silva" },
		{ "@type": "Person", name: "Aline Carla dos Santos Moraes Marinho" },
	],
};

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: SITE_TITLE },
			{ name: "description", content: SITE_DESCRIPTION },
			{ name: "keywords", content: KEYWORDS },
			{ name: "author", content: SITE_NAME },
			{ name: "robots", content: "index, follow" },
			{
				name: "googlebot",
				content: "index, follow, max-image-preview:large",
			},
			{ name: "theme-color", content: "#2d8700" },
			{ name: "color-scheme", content: "light" },
			{ name: "format-detection", content: "telephone=no" },

			// Open Graph
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: SITE_NAME },
			{ property: "og:title", content: SITE_TITLE },
			{ property: "og:description", content: SITE_DESCRIPTION },
			{ property: "og:url", content: SITE_URL },
			{ property: "og:locale", content: "pt_BR" },
			{ property: "og:image", content: OG_IMAGE },
			{ property: "og:image:alt", content: `Logotipo ${SITE_NAME}` },

			// Twitter
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: SITE_TITLE },
			{ name: "twitter:description", content: SITE_DESCRIPTION },
			{ name: "twitter:image", content: OG_IMAGE },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "canonical", href: SITE_URL },
			{ rel: "icon", type: "image/png", href: "/images/logo.png" },
			{ rel: "apple-touch-icon", href: "/images/logo.png" },
			{ rel: "manifest", href: "/manifest.json" },
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Montserrat:wght@300;400;500;600;700;800&display=swap",
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(STRUCTURED_DATA),
			},
		],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
