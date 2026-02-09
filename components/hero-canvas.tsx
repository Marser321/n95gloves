"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Drop = {
  x: number;
  y: number;
  v: number;
  len: number;
  w: number;
  alpha: number;
};

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let drops: Drop[] = [];
    let raf = 0;

    const createDrop = (): Drop => ({
      x: Math.random() * width,
      y: Math.random() * height,
      v: 0.6 + Math.random() * 1.4,
      len: 12 + Math.random() * 28,
      w: 0.6 + Math.random() * 1.2,
      alpha: 0.12 + Math.random() * 0.2,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor(width / 14);
      drops = Array.from({ length: count }, createDrop);
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const drop of drops) {
        drop.y += drop.v;
        if (drop.y - drop.len > height) {
          drop.y = -drop.len;
          drop.x = Math.random() * width;
        }
        ctx.strokeStyle = `rgba(57, 255, 20, ${drop.alpha})`;
        ctx.lineWidth = drop.w;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.len);
        ctx.stroke();

        ctx.fillStyle = `rgba(245, 245, 245, ${drop.alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, drop.w * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(drawFrame);
    };

    resize();
    window.addEventListener("resize", resize);

    if (!reduced) {
      raf = requestAnimationFrame(drawFrame);
    } else {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(57, 255, 20, 0.06)";
      ctx.fillRect(0, 0, width, height);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden
    />
  );
}
