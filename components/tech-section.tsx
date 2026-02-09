"use client";

import Link from "next/link";
import { ArrowRight, Flame, Gauge, Shield } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

const highlights = [
  {
    title: "Agarre húmedo",
    description: "Látex 4mm con microtextura para lluvia y césped sintético.",
    icon: Gauge,
  },
  {
    title: "Protección dorsal",
    description: "Grid estructural que absorbe impacto sin perder flexibilidad.",
    icon: Shield,
  },
  {
    title: "Respuesta rápida",
    description: "Corte híbrido que mejora la sensación en reflejos cortos.",
    icon: Flame,
  },
];

const process = [
  {
    step: "01",
    title: "Diagnóstico de grip",
    copy: "Test de adherencia en lluvia, calor y sintético para balancear respuesta.",
  },
  {
    step: "02",
    title: "Arquitectura de impacto",
    copy: "Capas de densidad progresiva para absorción sin perder sensibilidad.",
  },
  {
    step: "03",
    title: "Calce boutique",
    copy: "Corte híbrido con ajuste ceñido y salida limpia de muñeca.",
  },
];

export default function TechSection() {
  return (
    <section id="tech" className="container space-y-8 py-14">
      <div className="flex flex-col gap-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">Tecnología</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="section-title text-3xl font-semibold">Ingeniería pensada para el minuto 90</h3>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-sm text-white/65">
            Cada capa cumple una función clara. Nada decorativo: solo rendimiento, agarre y confianza
            bajo presión.
          </p>
        </Reveal>
      </div>
      <RevealGroup className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-[12px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[8px] border border-cyber-lime/30 bg-cyber-lime/10">
                <Icon className="h-5 w-5 text-cyber-lime" aria-hidden />
              </div>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-white/65">{item.description}</p>
            </div>
          );
        })}
      </RevealGroup>
      <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.1}>
        {process.map((item) => (
          <div
            key={item.step}
            className="rounded-[12px] border border-white/10 bg-black/40 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/50">
              <span className="text-cyber-lime">{item.step}</span>
              <span className="h-px flex-1 bg-white/10" aria-hidden />
            </div>
            <p className="mt-3 text-sm font-semibold">{item.title}</p>
            <p className="mt-2 text-xs text-white/60">{item.copy}</p>
          </div>
        ))}
      </RevealGroup>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <Link href="/product/n95-pro-defender" className="inline-flex items-center gap-2 text-cyber-lime hover:underline">
          Ver el modelo con tecnología completa
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/#lineup" className="text-white/70 hover:text-cyber-gray">
          Comparar toda la colección
        </Link>
      </div>
    </section>
  );
}
