"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { lookbook } from "@/lib/lookbook";
import { Reveal, RevealGroup } from "@/components/motion/reveal";

export default function Lookbook() {
  const track = [...lookbook, ...lookbook];
  const reduced = useReducedMotion();
  const chapters = [
    {
      id: "I",
      title: "Materia prima",
      copy: "Látex seleccionado y textiles técnicos en palette nocturna.",
    },
    {
      id: "II",
      title: "Gestualidad",
      copy: "Costuras y paneles que responden a presión real de partido.",
    },
    {
      id: "III",
      title: "Ritual",
      copy: "La calma antes del saque, el guante como extensión.",
    },
  ];

  return (
    <section id="lookbook" className="py-16">
      <div className="container space-y-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">Lookbook</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-title text-4xl font-semibold leading-tight">Editorial de la temporada</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-sm text-white/70">
            Una lectura visual de materiales, texturas y ritmo de juego. La boutique se
            expresa en cada detalle.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/50">
            <span>Capítulo I</span>
            <span className="h-px flex-1 bg-white/10" aria-hidden />
            <span>Capítulo II</span>
            <span className="h-px flex-1 bg-white/10" aria-hidden />
            <span>Capítulo III</span>
          </div>
        </Reveal>
        <RevealGroup className="grid gap-4 md:grid-cols-3" stagger={0.08}>
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="rounded-[12px] border border-white/10 bg-white/5 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">Capítulo {chapter.id}</p>
              <p className="mt-2 text-sm font-semibold">{chapter.title}</p>
              <p className="mt-2 text-xs text-white/60">{chapter.copy}</p>
            </div>
          ))}
        </RevealGroup>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

        <motion.div
          className="flex w-[200%] gap-5 py-6"
          animate={reduced ? {} : { x: ["0%", "-50%"] }}
          transition={reduced ? {} : { duration: 38, ease: "linear", repeat: Infinity }}
        >
          {track.map((item, idx) => (
            <article
              key={`${item.id}-${idx}`}
              className="group relative w-[260px] flex-shrink-0 overflow-hidden rounded-[14px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="relative h-[340px] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} - ${item.caption}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 220px, 260px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
              </div>
              <div className="space-y-1 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/50">{item.title}</p>
                <p className="text-sm text-white/75">{item.caption}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
