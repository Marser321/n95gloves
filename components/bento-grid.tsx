"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/products";
import { Reveal } from "@/components/motion/reveal";
import { useCart } from "@/providers/cart-provider";
import { blurDataUrl } from "@/lib/blur";

const spans = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2", "md:col-span-1", "md:col-span-1"];

type BentoCardProps = {
  product: Product;
  span: string;
  onAdd: (product: Product) => void;
  adding: boolean;
};

function BentoCard({ product, span, onAdd, adding }: BentoCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.2 });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 140, damping: 18, mass: 0.2 });
  const springRotateY = useSpring(rotateY, { stiffness: 140, damping: 18, mass: 0.2 });

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    x.set((dx / rect.width) * 8);
    y.set((dy / rect.height) * 8);
    rotateX.set((-dy / rect.height) * 8);
    rotateY.set((dx / rect.width) * 8);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-[10px] border border-white/10 bg-[#111] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition-all",
        "hover:border-accent/40",
        span
      )}
      style={reduced ? {} : { rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      whileHover={reduced ? {} : { y: -6 }}
      whileTap={{ scale: 0.99 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant={tag === "Nuevo" ? "default" : "muted"}>
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-sm text-white/60">${product.price.toFixed(0)}</p>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/50">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: product.accent }} aria-hidden />
          {product.variant}
        </div>
      </div>
      <div className="relative mt-4 overflow-hidden rounded-[8px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
        <motion.div
          className="absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 space-y-2 text-xs text-white/80">
            <div className="flex items-center justify-between">
              <span>Grip</span>
              <span className="text-white/60">{product.stats.grip}/10</span>
            </div>
            <Progress value={(product.stats.grip / 10) * 100} />
            <div className="flex items-center justify-between">
              <span>Durabilidad</span>
              <span className="text-white/60">{product.stats.durability}/10</span>
            </div>
            <Progress value={(product.stats.durability / 10) * 100} />
          </div>
        </motion.div>
        <motion.div
          className="relative z-0"
          style={{ x: springX, y: springY }}
          whileHover={reduced ? {} : { scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className="h-[260px] w-full object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        </motion.div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Link href={`/product/${product.slug}`} className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white/70">
          Ver ficha
        </Link>
        <Button
          type="button"
          size="sm"
          onClick={() => onAdd(product)}
          disabled={adding}
          aria-busy={adding}
        >
          <span role="status" aria-live="polite">
            {adding ? "Agregando..." : "Añadir"}
          </span>
        </Button>
      </div>
    </motion.article>
  );
}

export default function BentoGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.35, 0]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  const handleAdd = (product: Product) => {
    if (addingId === product.id) return;
    setAddingId(product.id);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      image: product.image,
    }, { openCart: false });
    window.setTimeout(() => setAddingId(null), 800);
  };

  return (
    <section ref={sectionRef} id="lineup" className="relative container space-y-10 py-16">
      <motion.div
        className="pointer-events-none absolute -top-6 right-10 h-32 w-32 rounded-full bg-cyber-lime/10 blur-3xl"
        style={{ opacity: glowOpacity, scale: glowScale }}
        aria-hidden
      />
      <div className="flex items-center justify-between">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.28em] text-white/60">La Colección</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-2 text-3xl font-semibold">Escasez. Ingeniería. Exclusividad.</h2>
          </Reveal>
        </div>
        <Link href="/collection" className="text-sm text-white/70 hover:text-cyber-lime hover:underline">
          Ver colección completa
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {products.map((product, idx) => (
          <BentoCard
            key={product.id}
            product={product}
            span={spans[idx % spans.length]}
            onAdd={handleAdd}
            adding={addingId === product.id}
          />
        ))}
      </div>
    </section>
  );
}
