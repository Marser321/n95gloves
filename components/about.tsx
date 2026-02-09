"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

export default function About() {
  return (
    <section id="about" className="container py-16">
      <div className="grid gap-8 rounded-[14px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Sobre N95</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="section-title text-3xl font-semibold">Boutique de guantes con enfoque en control total</h3>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-sm text-white/70">
              N95 no es volumen, es precisión. Cada modelo nace de pruebas en cancha, feedback de
              arqueros y un estándar de fabricación que prioriza agarre, durabilidad y comodidad.
              Una edición limitada para quienes buscan diferenciarse en cada atajada.
            </p>
          </Reveal>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/collection" className="text-cyber-lime hover:underline">
              Explorar la colección
            </Link>
            <Link href="/product/n95-pro-defender" className="inline-flex items-center gap-2 text-white/70 hover:text-cyber-gray">
              Ver el modelo insignia
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <RevealGroup className="space-y-4 rounded-[12px] border border-white/10 bg-black/40 p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">Promesa</p>
          <ul className="space-y-3 text-sm text-white/70">
            <li>· Ediciones limitadas y controladas por batch.</li>
            <li>· Materiales premium: látex alemán y tejidos técnicos.</li>
            <li>· Ajuste híbrido para control y sensibilidad.</li>
            <li>· Soporte post-venta enfocado en arqueros.</li>
          </ul>
        </RevealGroup>
      </div>
    </section>
  );
}
