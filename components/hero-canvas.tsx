"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  radius: number;
  drift: number;
  speed: number;
  phase: number;
  orbit: number;
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
    let particles: Particle[] = [];
    let raf = 0;
    let lastTime = 0;

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 1.8,
      drift: 0.3 + Math.random() * 0.8,
      speed: 0.002 + Math.random() * 0.006,
      phase: Math.random() * Math.PI * 2,
      orbit: 12 + Math.random() * 34,
      alpha: 0.08 + Math.random() * 0.18,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(26, Math.floor(width / 18));
      particles = Array.from({ length: count }, createParticle);
    };

    const drawFrame = (time: number) => {
      const t = time * 0.00035;
      const delta = Math.min((time - lastTime) / 16.67, 2);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const particle of particles) {
        const angle = t * (1 + particle.speed * 120) + particle.phase;
        const driftX = Math.cos(angle) * particle.orbit;
        const driftY = Math.sin(angle * 1.1) * particle.orbit * 0.55;
        const x = (particle.x + driftX + width) % width;
        const y = (particle.y + driftY + height) % height;
        const pulse = 1 + Math.sin(angle * 1.4) * 0.12;
        const size = particle.radius * pulse * 10;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(43, 255, 79, ${particle.alpha})`);
        gradient.addColorStop(0.55, `rgba(43, 255, 79, ${particle.alpha * 0.4})`);
        gradient.addColorStop(1, "rgba(3,3,3,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(245, 255, 248, ${particle.alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(x, y, particle.radius * 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(43, 255, 79, ${particle.alpha * 0.35})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(x - 6 * particle.drift, y - 2 * particle.drift);
        ctx.lineTo(x + 6 * particle.drift, y + 2 * particle.drift);
        ctx.stroke();

        particle.x += particle.drift * 0.12 * delta;
        if (particle.x > width + particle.orbit) particle.x = -particle.orbit;
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
      ctx.fillStyle = "rgba(43, 255, 79, 0.06)";
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
