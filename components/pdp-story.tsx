"use client";

import { Droplets, Sparkles, ShieldCheck } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

const chapters = [
  {
    title: "Látex de élite",
    copy: "Compuesto alemán 4mm para agarre estable en lluvia, calor y superficies mixtas.",
    icon: Droplets,
  },
  {
    title: "Arquitectura interna",
    copy: "Capas de densidad progresiva que amortiguan impactos sin perder sensibilidad.",
    icon: ShieldCheck,
  },
  {
    title: "Ritual de matchday",
    copy: "Pre-activación ligera, micro-humedad y ajuste preciso para rendimiento inmediato.",
    icon: Sparkles,
  },
];

export default function PdpStory() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">Narrativa</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="section-title text-2xl font-semibold">Diseñado para segundos que cambian partidos</h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-sm text-white/70">
            No es solo un guante: es un sistema de confianza. Cada panel responde a presión real y cada
            costura sostiene el control cuando más lo necesitás.
          </p>
        </Reveal>
      </div>

      <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.1}>
        {chapters.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-[12px] border border-white/10 bg-white/5 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[8px] border border-cyber-lime/30 bg-cyber-lime/10">
                <Icon className="h-5 w-5 text-cyber-lime" aria-hidden />
              </div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-2 text-xs text-white/65">{item.copy}</p>
            </div>
          );
        })}
      </RevealGroup>

      <div className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="rounded-[12px] border border-white/10 bg-black/40 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">Fit recomendado</p>
            <p className="mt-2 text-sm text-white/70">
              Ajuste ceñido con salida limpia de muñeca. Ideal para porteros que priorizan control.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[12px] border border-white/10 bg-black/40 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">Garantía boutique</p>
            <p className="mt-2 text-sm text-white/70">
              Si el ajuste no es perfecto, activamos cambio en 30 días sin fricción.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
