import type { Metadata } from "next";
import { Mail, MessageCircle, Clock } from "lucide-react";
import PageHero from "@/components/page-hero";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Contacto | N95 Gloves",
  description: "Soporte boutique para ayudarte a elegir el guante ideal.",
};

const channels = [
  {
    title: "Asesoría directa",
    copy: "Hablemos sobre corte, ajuste y modelos. Respuesta en menos de 2 horas.",
    detail: "WhatsApp boutique",
    icon: MessageCircle,
  },
  {
    title: "Correo premium",
    copy: "Consultas sobre pedidos, cambios y colaboraciones.",
    detail: "contacto@n95gloves.com",
    icon: Mail,
  },
  {
    title: "Horario",
    copy: "Lunes a sabado, 10:00 - 20:00 (UY).",
    detail: "Soporte humano",
    icon: Clock,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Asesoría boutique para cada arquero."
        description="Un equipo humano listo para guiar tu compra. Ajuste, tallas y performance explicados al detalle."
        badges={["Respuesta rápida", "Soporte experto", "Follow-up real"]}
        primaryCta={{ label: "Explorar colección", href: "/collection" }}
        secondaryCta={{ label: "Ver FAQ", href: "/faq" }}
      />
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <RevealGroup className="contents" stagger={0.12}>
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.title}
                  className="rounded-[12px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
                >
                  <Reveal>
                    <div className="flex h-12 w-12 items-center justify-center rounded-[10px] border border-white/15 bg-white/5">
                      <Icon className="h-6 w-6 text-white/70" aria-hidden />
                    </div>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h3 className="mt-4 text-lg font-semibold">{channel.title}</h3>
                  </Reveal>
                  <Reveal delay={0.16}>
                    <p className="mt-2 text-sm text-white/65">{channel.copy}</p>
                  </Reveal>
                  <Reveal delay={0.22}>
                    <p className="mt-4 text-xs uppercase tracking-[0.24em] text-white/50">{channel.detail}</p>
                  </Reveal>
                </div>
              );
            })}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
