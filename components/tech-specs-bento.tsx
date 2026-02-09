"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/products";

type TechSpecs = {
  wetGrip: number;
  weight: number;
  latexThickness: number;
  cushioning: number;
  ventilation: number;
  materialImage: string;
};

const defaultSpecs: TechSpecs = {
  wetGrip: 98,
  weight: 95,
  latexThickness: 4,
  cushioning: 8.5,
  ventilation: 8,
  materialImage: "/lookbook/lookbook-02.jpg",
};

const cardBase =
  "relative overflow-hidden rounded-[10px] border border-white/10 bg-card/70 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition duration-300 hover:border-accent/60 hover:shadow-glow";

const noiseOverlay = "pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

export function TechSpecsBento({
  product,
  specs,
}: {
  product: Product;
  specs?: Partial<TechSpecs>;
}) {
  const resolved = useMemo(() => ({ ...defaultSpecs, ...specs }), [specs]);
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const gripRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: gripRef, offset: ["start 90%", "end 20%"] });
  const gripFill = useTransform(scrollYProgress, [0, 1], [0, resolved.wetGrip / 100]);

  const radarData = [
    { metric: "Agarre", value: product.stats.grip },
    { metric: "Durabilidad", value: product.stats.durability },
    { metric: "Amortiguación", value: resolved.cushioning },
    { metric: "Ventilación", value: resolved.ventilation },
  ];

  return (
    <section className="container space-y-6 py-12" id="tech-specs">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.28em] text-white/60">Deconstrucción Técnica</p>
        <h3 className="text-3xl font-semibold">Bento técnico</h3>
        <p className="max-w-2xl text-sm text-white/65">
          Tres niveles de densidad: macro, micro y bloques interactivos con visuales de rendimiento estilo HUD.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 grid-flow-dense auto-rows-[180px] gap-4 md:grid-cols-4 md:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Corte Híbrido */}
        <motion.div className={cn(cardBase, "col-span-1 md:col-span-2 row-span-2 p-5")} variants={itemVariants}>
          <div className={noiseOverlay} />
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">
            <span>Corte Híbrido</span>
            <span>Macro</span>
          </div>
          <div className="relative mt-3 h-full w-full">
            <motion.svg
              viewBox="0 0 360 240"
              className="h-full w-full text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <defs>
                <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#39FF14" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#39FF14" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <motion.path
                d="M120 30 C150 40 185 65 195 100 L210 190 C213 208 200 215 188 214 L142 210 C130 209 120 200 118 188 L105 110 C100 80 90 60 78 48"
                fill="none"
                stroke="url(#glow)"
                strokeWidth={5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
              <motion.path
                d="M210 90 C235 105 250 125 258 160 L270 205"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={3}
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
              />
              <motion.circle
                cx="195"
                cy="100"
                r="8"
                fill="#39FF14"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 240, damping: 16 }}
              />
            </motion.svg>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/4 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-3 text-[11px] font-mono text-white/70">
              <span className="rounded border border-white/15 px-2 py-1">LATEX_THICKNESS: {resolved.latexThickness.toFixed(1)}mm</span>
              <span className="rounded border border-white/15 px-2 py-1">CORTE: HÍBRIDO</span>
              <span className="rounded border border-white/15 px-2 py-1">MUÑEQUERA: DUAL</span>
            </div>
          </div>
        </motion.div>

        {/* Barra de Adherencia */}
        <motion.div ref={gripRef} className={cn(cardBase, "col-span-1 row-span-2 p-5 flex flex-col gap-4")} variants={itemVariants}>
          <div className={noiseOverlay} />
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">
            <span>Agarre Húmedo</span>
            <span>{resolved.wetGrip}%</span>
          </div>
          <div className="flex-1 flex items-end justify-center">
            <div className="relative h-full w-14 overflow-hidden rounded-[12px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5">
              <motion.div
                style={{ scaleY: gripFill, transformOrigin: "bottom" }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyber-lime/90 via-cyber-lime/75 to-cyber-lime/40"
              >
                <div className="h-[360px]" />
              </motion.div>
              <div className="absolute inset-0 border border-white/5" />
            </div>
          </div>
          <p className="text-center text-xs text-white/60">Se activa al hacer scroll.</p>
        </motion.div>

        {/* Peso Pluma */}
        <motion.div className={cn(cardBase, "col-span-1 row-span-1 p-5 flex flex-col justify-between")} variants={itemVariants}>
          <div className={noiseOverlay} />
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">Peso Pluma</div>
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-5xl font-semibold text-white">{resolved.weight}g</div>
              <div className="text-xs text-white/60">Masa</div>
            </div>
            <div className="h-10 w-10 rounded-full border border-white/15 bg-white/5" />
          </div>
        </motion.div>

        {/* Material */}
        <motion.div
          className={cn(cardBase, "col-span-1 md:col-span-2 row-span-1 p-0 overflow-hidden group")}
          variants={itemVariants}
        >
          <div className={noiseOverlay} />
          <MaterialMacro image={resolved.materialImage} />
        </motion.div>

        {/* Protección */}
        <motion.div className={cn(cardBase, "col-span-1 row-span-1 p-5 flex flex-col justify-between")} variants={itemVariants}>
          <div className={noiseOverlay} />
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">
            <span>Protección</span>
            <span>Activo</span>
          </div>
          <motion.div
            className="flex items-center gap-3 text-white"
            animate={reduced ? {} : { y: [0, -4, 0] }}
            transition={reduced ? {} : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyber-lime/60 bg-cyber-lime/10">
              <ShieldCheck className="h-6 w-6 text-cyber-lime" aria-label="Protección" />
              <div className="absolute inset-0 rounded-full animate-pulse-border" />
            </div>
            <div className="text-sm text-white/80">Knuckle shield + dorsal grid</div>
          </motion.div>
        </motion.div>

        {/* Radar */}
        <motion.div className={cn(cardBase, "col-span-1 md:col-span-2 row-span-1 p-5 flex flex-col")} variants={itemVariants}>
          <div className={noiseOverlay} />
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">
            <span>Radar de rendimiento</span>
            <span>HUD</span>
          </div>
          <div className="relative mt-2 h-full">
            {!mounted ? (
              <div className="flex h-full items-center justify-center text-sm text-white/60">Cargando gráfico…</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="80%">
                  <PolarGrid stroke="rgba(255,255,255,0.12)" strokeDasharray="3 6" />
                  <PolarAngleAxis
                    dataKey="metric"
                    tick={{ fill: "#39FF14", fontSize: 11, letterSpacing: "0.18em", fontFamily: "var(--font-space-grotesk)" }}
                    tickLine={false}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#39FF14"
                    fill="#39FF14"
                    fillOpacity={0.25}
                    strokeWidth={2}
                    isAnimationActive
                    animationDuration={1100}
                    animationBegin={120}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.12),transparent_55%)]" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function MaterialMacro({ image }: { image: string }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPos({ x, y });
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "160%",
          backgroundPosition: "center",
        }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: `radial-gradient(140px at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.9), rgba(255,255,255,0) 60%)`,
          WebkitMaskImage: `radial-gradient(140px at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.9), rgba(255,255,255,0) 60%)`,
          background: "linear-gradient(135deg, rgba(57,255,20,0.25), rgba(57,255,20,0.05))",
        }}
      />
      <div className="absolute inset-0 ring-1 ring-white/10 transition group-hover:ring-cyber-lime/60" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-[6px] border border-white/15 bg-black/40 px-3 py-2 text-[11px] font-mono text-white/70">
        <span>Material</span>
        <span className="text-white/50">Macro Texture</span>
      </div>
    </div>
  );
}

export default TechSpecsBento;
