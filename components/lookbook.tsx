"use client";

import Image from "next/image";
import { lookbook } from "@/lib/lookbook";
import { blurDataUrl } from "@/lib/blur";
import { Reveal } from "@/components/motion/reveal";

export default function Lookbook() {
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
      </div>

      <div className="relative mt-10">
        <div className="container">
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/50">
            <span>Desliza horizontal</span>
            <span className="h-px flex-1 bg-white/10" aria-hidden />
            <span>{lookbook.length} escenas</span>
          </div>
        </div>

        <div className="relative mt-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

          <div
            className="no-scrollbar flex h-[70vh] min-h-[420px] snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-10 pt-4 md:h-[78vh] lg:h-[82vh]"
            aria-label="Lookbook editorial"
          >
            {lookbook.map((item, index) => {
              const chapter = chapters[index % chapters.length];
              return (
                <article
                  key={item.id}
                  className="group relative h-full min-w-[86vw] snap-center overflow-hidden rounded-[18px] border border-white/10 bg-white/5 shadow-[0_28px_80px_rgba(0,0,0,0.35)] md:min-w-[70vw] lg:min-w-[58vw]"
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.caption}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 58vw"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                      Capítulo {chapter.id} · {chapter.title}
                    </p>
                    <h3 className="section-title text-3xl font-semibold md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="max-w-xl text-sm text-white/70">{item.caption}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
