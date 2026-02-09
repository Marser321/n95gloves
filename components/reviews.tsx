"use client";

import { Star } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

const reviews = [
  {
    name: "Martina R.",
    role: "Arquera amateur",
    quote:
      "El agarre en lluvia es real. Los usé en césped húmedo y no se movió nada.",
  },
  {
    name: "Lucas T.",
    role: "Entrenador de arqueros",
    quote:
      "Se sienten premium desde el primer uso. El corte híbrido da control sin perder comodidad.",
  },
  {
    name: "Valen C.",
    role: "Torneo regional",
    quote:
      "El ajuste es firme pero flexible. No tuve que acostumbrarme, fue directo al partido.",
  },
];

export default function Reviews() {
  return (
    <section className="container space-y-8 py-14">
      <div className="flex flex-col gap-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">Prueba social</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="section-title text-3xl font-semibold">Lo que dicen los que atajan en serio</h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-sm text-white/65">
            Testimonios cortos para reforzar confianza y reducir fricción antes de comprar.
          </p>
        </Reveal>
      </div>
      <RevealGroup className="grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-[12px] border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-1 text-[var(--accent)]">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-[var(--accent)]" aria-hidden />
              ))}
            </div>
            <p className="mt-4 text-sm text-white/70">“{review.quote}”</p>
            <div className="mt-4 text-xs uppercase tracking-[0.24em] text-white/50">
              {review.name}
            </div>
            <div className="text-xs text-white/60">{review.role}</div>
          </article>
        ))}
      </RevealGroup>
    </section>
  );
}
