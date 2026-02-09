"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

const pillars = [
  {
    title: "Arquitectura de agarre",
    copy: "Látex 4mm con capas de densidad progresiva para respuesta estable.",
  },
  {
    title: "Ajuste boutique",
    copy: "Cortes híbridos y negativos diseñados para control y sensibilidad.",
  },
  {
    title: "Ediciones cortas",
    copy: "Series limitadas para cuidar cada detalle y mantener exclusividad.",
  },
];

export default function StorySection() {
  return (
    <section id="story" className="container py-16">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Manifiesto</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-title text-4xl font-semibold leading-tight">
              Boutique de guantes para arqueros que no negocian el control.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-xl text-sm text-white/70">
              N95 nace en la intersección entre ingeniería de performance y estética
              editorial. Cada edición parte de pruebas reales en cancha, feedback de
              arqueros y un lenguaje visual sobrio, técnico y contundente.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link href="/lookbook" className="text-[var(--accent)] hover:underline">
                Ver lookbook
              </Link>
              <Link href="/collection" className="inline-flex items-center gap-2 text-white/70 hover:text-cyber-gray">
                Explorar colección
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
        <RevealGroup className="grid gap-4" stagger={0.12}>
          {pillars.map((item) => (
            <div
              key={item.title}
              className="rounded-[12px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/65">{item.copy}</p>
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
