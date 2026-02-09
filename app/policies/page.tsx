import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Políticas | N95 Gloves",
  description: "Envíos, devoluciones, garantía y pagos con claridad boutique.",
};

const sections = [
  {
    id: "shipping",
    title: "Envíos",
    copy: "Despacho prioritario 24-48h en Montevideo y 48-72h en interior. Tracking incluido en cada pedido.",
  },
  {
    id: "returns",
    title: "Devoluciones",
    copy: "Tienes 30 días para solicitar cambio o devolución. El guante debe estar en estado original.",
  },
  {
    id: "warranty",
    title: "Garantía",
    copy: "Cubrimos fallas de fabricación. Evaluación boutique y reemplazo según disponibilidad de edición.",
  },
  {
    id: "payments",
    title: "Pagos",
    copy: "Aceptamos tarjetas y transferencias. Mercado Pago se activa al finalizar la integración.",
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Politicas"
        title="Transparencia total en cada compra."
        description="Condiciones claras y soporte humano para que compres con confianza."
        badges={["Sin letra chica", "Soporte real", "Boutique"]}
        primaryCta={{ label: "Ver FAQ", href: "/faq" }}
        secondaryCta={{ label: "Contactar", href: "/contact" }}
      />
      <section className="container grid gap-6 py-16 md:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="rounded-[12px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <Reveal>
              <h2 className="section-title text-2xl font-semibold">{section.title}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 text-sm text-white/70">{section.copy}</p>
            </Reveal>
          </div>
        ))}
      </section>
    </>
  );
}
