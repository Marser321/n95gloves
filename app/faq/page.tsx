import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import FAQ from "@/components/faq";
import FinalCTA from "@/components/final-cta";

export const metadata: Metadata = {
  title: "FAQ | N95 Gloves",
  description: "Respuestas boutique sobre envíos, garantías y pagos N95.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Confianza boutique en cada compra."
        description="Envíos, devoluciones, garantía y soporte humano. Todo claro antes de entrar al arco."
        badges={["Envíos 24-48h", "Devolución 30 días", "Soporte humano"]}
        primaryCta={{ label: "Hablar con un asesor", href: "/contact" }}
        secondaryCta={{ label: "Ver políticas", href: "/policies" }}
      />
      <FAQ />
      <FinalCTA />
    </>
  );
}
