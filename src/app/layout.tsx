import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";

/* Display em serifa (com itálico verde nos acentos) */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

/* Texto corrido */
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/* Eyebrows / metadados */
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "IPÊ Educação Ambiental — Raízes locais, consciência global",
  description:
    "Projetos, consultorias e experiências sustentáveis em educação ambiental, ESG e socioambiental — para escolas, empresas, órgãos públicos e comunidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
