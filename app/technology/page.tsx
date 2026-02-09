import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import TechSection from "@/components/tech-section";
import { TechSpecsBento } from "@/components/tech-specs-bento";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tecnología | N95 Gloves",
  description: "Ingeniería boutique: látex, cortes y control de impacto N95.",
};

export default function TechnologyPage() {
  const flagship = products[0];
  return (
    <>
      <PageHero
        eyebrow="Tecnología"
        title="Ingeniería de agarre y control total."
        description="El guante como herramienta de precisión. Detalles técnicos, capas de látex y arquitectura de corte para atajadas que marcan diferencia."
        badges={["Látex 4mm", "Cortes híbridos", "Control de impacto"]}
        primaryCta={{ label: "Ver la coleccion", href: "/collection" }}
        secondaryCta={{ label: "Ver FAQ", href: "/faq" }}
      />
      <TechSection />
      <TechSpecsBento product={flagship} />
    </>
  );
}
