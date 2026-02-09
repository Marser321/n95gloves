"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export default function FinalCTA() {
  return (
    <section className="container py-16">
      <div className="relative overflow-hidden rounded-[16px] border border-white/10 bg-gradient-to-br from-white/5 via-black/60 to-black p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(57,255,20,0.18),transparent_45%)]" />
        <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-3">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">Última llamada</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="section-title text-3xl font-semibold">Elegí tu guante. Sentilo en cancha.</h3>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-sm text-white/70">
                Colección limitada, ajuste boutique y soporte real. Listo para el próximo partido.
              </p>
            </Reveal>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link
                href="/product/n95-pro-defender"
                className="inline-flex items-center gap-2 rounded-[2px] border border-transparent bg-cyber-lime px-5 py-3 text-sm font-semibold text-cyber-black shadow-glow"
              >
                Comprar el modelo insignia
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Link href="/collection" className="text-sm text-white/70 hover:text-cyber-gray">
              Ver la colección completa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
