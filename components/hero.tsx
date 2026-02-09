"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MotionValue,
  motion,
  useReducedMotion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import CTAButton from "@/components/cta-button";
import { Reveal } from "@/components/motion/reveal";
import HeroCanvas from "@/components/hero-canvas";

const title = "N95 Gloves".split("");

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const springX = useSpring(x, { stiffness: 120, damping: 12, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 120, damping: 12, mass: 0.15 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${springX}% ${springY}%, rgba(57,255,20,0.18), rgba(3,3,3,0) 55%)`;
  const imageX = useTransform(springX, [0, 100], [-10, 10]);
  const imageY = useTransform(springY, [0, 100], [-10, 10]);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const reduced = useReducedMotion();
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.75, 0.45, 0.15]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const combinedY = useTransform(
    [imageY, parallaxY] as MotionValue<number>[],
    (values) => {
      const [pointerY, scrollY] = values as number[];
      return pointerY + scrollY;
    }
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nextX = ((e.clientX - rect.left) / rect.width) * 100;
    const nextY = ((e.clientY - rect.top) / rect.height) * 100;
    x.set(nextX);
    y.set(nextY);
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-28 pb-20 md:pb-24"
      onPointerMove={handlePointerMove}
      id="comprar"
    >
      <HeroCanvas />
      <motion.div
        style={{ backgroundImage: spotlight, opacity: glowOpacity, scale: glowScale }}
        className="absolute inset-0 transition-all"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black/90" />
      <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div className="space-y-7">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-[2px] border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/70">
              Edición Atelier
              <span className="h-1.5 w-1.5 rounded-full bg-cyber-lime shadow-glow" />
            </div>
          </Reveal>
          <motion.h1
            className="section-title text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
            initial="hidden"
            animate="show"
            variants={{
              show: {
                transition: { staggerChildren: 0.05, delayChildren: 0.1 },
              },
            }}
          >
            {title.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 340, damping: 24 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <Reveal delay={0.15}>
            <p className="max-w-xl text-lg text-white/70">
              Boutique de guantes para arqueros que buscan agarre de élite, ingeniería
              de precisión y confort superior bajo cualquier clima.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/50">
              <span className="rounded border border-white/10 px-3 py-1">Serie limitada</span>
              <span className="rounded border border-white/10 px-3 py-1">Látex 4mm</span>
              <span className="rounded border border-white/10 px-3 py-1">Corte híbrido</span>
            </div>
          </Reveal>
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <CTAButton asChild>
              <Link href="/product/n95-pro-defender">Comprar Ahora</Link>
            </CTAButton>
            <Link
              href="/technology"
              className="text-sm text-white/60 underline-offset-4 hover:text-cyber-gray hover:underline"
            >
              Ver especificaciones
            </Link>
            <Link
              href="/collection"
              className="text-sm text-white/60 underline-offset-4 hover:text-cyber-gray hover:underline"
            >
              Ver colección
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="pointer-events-none absolute inset-0 scale-110 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.18),transparent_45%)] blur-3xl" />
          <motion.div
            className="relative isolate mx-auto max-w-[480px] overflow-visible"
            style={{ x: imageX, y: combinedY }}
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -6, 0] }}
              transition={reduced ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-6 rounded-[18px] bg-gradient-to-b from-white/6 to-transparent blur-3xl" />
              <Image
                src="/lookbook/lookbook-01.jpg"
                alt="N95 Gloves Hero"
                width={800}
                height={800}
                className="relative z-10 h-auto w-full object-cover drop-shadow-[0_35px_80px_rgba(0,0,0,0.55)]"
                sizes="(max-width: 768px) 100vw, 520px"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
