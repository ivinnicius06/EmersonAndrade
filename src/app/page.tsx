import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import EAFit from "@/components/fit/EAFit";
import Personalization from "@/components/Personalization";
import {
  Manifesto,
  PremiumFashion,
  ImageConsulting,
  Bespoke,
  PrivateExperience,
  BrandAndStore,
  Instagram,
  FinalCTA,
  Footer,
} from "@/components/Editorial";
import { site } from "@/lib/site";
export default function Home() {
  const structured = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: site.name,
    telephone: "+5577998229945",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barreiras",
      addressRegion: "BA",
      addressCountry: "BR",
    },
    sameAs: [site.instagram],
    hasMap: site.maps,
    description:
      "Moda masculina, consultoria de imagem, personalização e sob medida.",
  };
  return (
    <>
      <a className="skip-link" href="#manifesto">
        Pular apresentação
      </a>
      <Header />
      <main>
        <Hero />
        <Motion>
          <Manifesto />
          <Experience />
          <PremiumFashion />
          <ImageConsulting />
          <EAFit />
          <Personalization />
          <Bespoke />
          <PrivateExperience />
          <BrandAndStore />
          <Instagram />
          <FinalCTA />
        </Motion>
      </main>
      <Footer />
      <WhatsAppButton />
      <Cursor />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
