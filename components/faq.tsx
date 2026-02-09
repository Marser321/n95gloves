"use client";

import { MessageCircle, ShieldCheck, Truck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

const faqs = [
  {
    title: "Envíos y devoluciones",
    copy: "Despacho prioritario 24-48h. Devolución simple dentro de 30 días.",
    icon: Truck,
  },
  {
    title: "Garantía oficial",
    copy: "Cobertura ante fallas de fabricación. Soporte directo boutique.",
    icon: ShieldCheck,
  },
  {
    title: "Pagos seguros",
    copy: "Aceptamos Visa, MasterCard, Amex y Apple Pay (placeholder).",
    icon: Wallet,
  },
  {
    title: "Asesoría humana",
    copy: "Habla con un asesor para elegir el corte y el ajuste ideal.",
    icon: MessageCircle,
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="container py-16">
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Promesa Boutique</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="section-title text-3xl font-semibold">Confianza antes, durante y después</h3>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-xl text-sm text-white/70">
              Sin letra chica. Cada compra incluye soporte, garantía y un circuito claro de
              devolución si el ajuste no es perfecto.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="button" variant="outline">Hablar con un asesor</Button>
              <span className="text-xs uppercase tracking-[0.24em] text-white/50">
                Respuesta en menos de 2 horas
              </span>
            </div>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-4">
          {faqs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-[12px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-[8px] border border-cyber-lime/30 bg-cyber-lime/10">
                    <Icon className="h-5 w-5 text-cyber-lime" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-white/65">{item.copy}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
