import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Lookbook from "@/components/lookbook";
import Reviews from "@/components/reviews";
import FinalCTA from "@/components/final-cta";

export const metadata: Metadata = {
  title: "Lookbook | N95 Gloves",
  description: "Editorial boutique con materiales, textura y narrativa visual N95.",
};

export default function LookbookPage() {
  return (
    <>
      <PageHero
        eyebrow="Lookbook"
        title="Editorial nocturna. Látex, gesto y ritual."
        description="Una lectura visual de cada guante. Texturas, capas y presencia en cancha para entender el ADN N95."
        badges={["Editorial", "Cápsulas visuales", "Paleta neón"]}
        primaryCta={{ label: "Explorar coleccion", href: "/collection" }}
        secondaryCta={{ label: "Ver tecnología", href: "/technology" }}
      />
      <Lookbook />
      <Reviews />
      <FinalCTA />
    </>
  );
}
