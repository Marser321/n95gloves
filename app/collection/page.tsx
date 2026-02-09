import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import TrustStrip from "@/components/trust-strip";
import BentoGrid from "@/components/bento-grid";
import Reviews from "@/components/reviews";
import FinalCTA from "@/components/final-cta";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Colección | N95 Gloves",
  description: "Explora la colección completa de guantes N95 con estética boutique.",
};

export default function CollectionPage() {
  return (
    <>
      <PageHero
        eyebrow="Colección"
        title="La línea completa. Precisión, agarre y presencia."
        description="Cada modelo responde a un perfil de arquero. Ediciones limitadas, materiales de élite y una estética editorial sin concesiones."
        badges={["Series limitadas", "Látex 4mm", "Cortes híbridos"]}
        primaryCta={{ label: "Ver lookbook", href: "/lookbook" }}
        secondaryCta={{ label: "Explorar tecnología", href: "/technology" }}
      />
      <TrustStrip />
      <BentoGrid products={products} />
      <Reviews />
      <FinalCTA />
    </>
  );
}
