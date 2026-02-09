"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { labCuts, GloveCut } from "@/lib/lab";

type LabPreviewProps = {
  cut: GloveCut;
  text: string;
};

export default function LabPreview({ cut, text }: LabPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const active = useMemo(() => labCuts.find((item) => item.id === cut) ?? labCuts[0], [cut]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const textValue = text.trim().toUpperCase().slice(0, 12);
    const rootStyles = window.getComputedStyle(document.documentElement);
    const accent = rootStyles.getPropertyValue("--accent").trim() || "#9CA3AF";
    const accentRgb = rootStyles.getPropertyValue("--accent-rgb").trim() || "156 163 175";
    const accentRgbCsv = accentRgb.replace(/\s+/g, ", ");

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (!textValue) return;

      const fontSize = Math.max(16, Math.min(34, width * 0.06));
      ctx.font = `600 ${fontSize}px "Teko", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = accent;
      ctx.shadowColor = `rgba(${accentRgbCsv}, 0.55)`;
      ctx.shadowBlur = 14;

      const x = width * 0.55;
      const y = height * 0.82;
      ctx.fillText(textValue, x, y);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(5, 5, 5, 0.65)";
      ctx.lineWidth = 2;
      ctx.strokeText(textValue, x, y);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    if (document.fonts?.ready) {
      document.fonts.ready.then(resize);
    } else {
      resize();
    }

    return () => {
      ro.disconnect();
    };
  }, [text, active.id]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px] border border-white/10 bg-black/40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 40% 20%, rgb(var(--accent-rgb) / 0.16), transparent 55%)",
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={active.image}
            alt={`Guante ${active.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 520px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </motion.div>
      </AnimatePresence>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="absolute bottom-4 left-4 rounded-[6px] border border-white/10 bg-black/70 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-white/60">
        {active.name}
      </div>
      {!text && (
        <div className="absolute bottom-4 right-4 rounded-[6px] border border-white/10 bg-black/70 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-white/50">
          Personalización
        </div>
      )}
    </div>
  );
}
