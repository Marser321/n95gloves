"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 32 }, (_, i) => {
  const base = (i * 37) % 100;
  const offset = (i * 17) % 50;
  return {
    id: i,
    left: (base + offset) % 100,
    top: (base + i * 3) % 100,
    delay: (i % 7) * 0.15,
    duration: 6 + (i % 5),
  };
});

export default function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="particle"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{ y: [-8, 8, -8], x: [-4, 4, -4], opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: p.duration + 2, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
