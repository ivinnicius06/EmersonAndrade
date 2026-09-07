import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  robots: { index: Boolean(process.env.NEXT_PUBLIC_SITE_URL), follow: true },
  title: "Emerson Andrade | Moda Masculina, Imagem e Exclusividade",
  description:
    "Moda masculina, consultoria de imagem e peças sob medida. Conheça a experiência Emerson Andrade em Barreiras, Bahia. Envios para todo o Brasil.",
  openGraph: {
    title: "Emerson Andrade — Sua imagem, com intenção.",
    description: "Uma experiência de moda masculina construída para você.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/media/hero-poster.webp", width: 1600, height: 900 }],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <noscript>
          <style>{`.loading-signature { display: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
