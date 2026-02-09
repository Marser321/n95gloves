import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import StorySection from "@/components/story-section";
import About from "@/components/about";
import Reviews from "@/components/reviews";

export const metadata: Metadata = {
  title: "Sobre N95 | N95 Gloves",
  description: "Manifiesto y enfoque boutique de la marca N95 Gloves.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre N95"
        title="Boutique de guantes con obsesión por el control."
        description="N95 nace en cancha y se refina en atelier. Materiales premium, cortes precisos y una estética editorial que convierte cada atajada en una declaración."
        badges={["Ediciones limitadas", "Feedback real", "Precisión boutique"]}
        primaryCta={{ label: "Explorar colección", href: "/collection" }}
        secondaryCta={{ label: "Ver tecnología", href: "/technology" }}
      />
      <StorySection />
      <About />
      <Reviews />
    </>
  );
}
