"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { blurDataUrl } from "@/lib/blur";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Arquitectura de agarre",
    copy:
      "Capas de latex premium que responden con precision milimetrica en cada contacto.",
    accent: "Látex alemán 4mm",
    image: "/lookbook/lookbook-03.jpg",
  },
  {
    title: "Control de impacto",
    copy:
      "Paneles híbridos y volumen calculado para despejes seguros sin perder sensibilidad.",
    accent: "Punch zone",
    image: "/lookbook/lookbook-04.jpg",
  },
  {
    title: "Muñequera 360",
    copy:
      "Ajuste doble con compresión estable y liberación rápida para cambios en cancha.",
    accent: "Fit boutique",
    image: "/lookbook/lookbook-05.jpg",
  },
];

function StepCard({
  title,
  copy,
  accent,
  progress,
  range,
}: {
  title: string;
  copy: string;
  accent: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.15, range[1] - 0.15, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [24, -24]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="rounded-[14px] border border-white/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
    >
      <p className="text-xs uppercase tracking-[0.28em] text-white/50">{accent}</p>
      <h3 className="mt-3 text-2xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-white/65">{copy}</p>
    </motion.div>
  );
}

export default function ScrollyGlove() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [18, -12]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1]);
  const [active, setActive] = useState(0);
  const progressRail = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(latest * steps.length)));
    if (next !== active) setActive(next);
  });

  return (
    <section ref={ref} className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(43,255,79,0.08),transparent_45%)]" />
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">Scrollytelling</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="section-title text-4xl font-semibold">Desmonta el guante con el scroll.</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-sm text-white/70">
              Cada bloque cuenta una parte del rendimiento. Avanza y ve como el guante se expone por capas.
            </p>
          </Reveal>

          <motion.div
            className={cn(
              "relative overflow-hidden rounded-[18px] border border-white/10 bg-black/70 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)]",
              reduced ? "" : "will-change-transform"
            )}
            style={reduced ? {} : { y: imageY, scale: imageScale }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(43,255,79,0.12),transparent_45%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[active].image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src={steps[active].image}
                  alt="Detalle del guante N95"
                  width={900}
                  height={900}
                  className="relative z-10 h-[420px] w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 520px"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="space-y-16 lg:pt-8">
          {steps.map((step, index) => (
            <div key={step.title} className="min-h-[45vh]">
              <StepCard
                title={step.title}
                copy={step.copy}
                accent={step.accent}
                progress={scrollYProgress}
                range={[index / steps.length, (index + 1) / steps.length]}
              />
            </div>
          ))}
          <div className="relative mt-6 h-1 w-full rounded-full bg-white/10">
            <motion.span
              className="absolute left-0 top-0 h-1 rounded-full bg-white/60"
              style={{ width: progressRail }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
