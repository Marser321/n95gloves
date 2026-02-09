"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/providers/cart-provider";
import { Product } from "@/lib/products";
import TechSpecsBento from "@/components/tech-specs-bento";
import { Reveal } from "@/components/motion/reveal";
import SizeAssistant from "@/components/size-assistant";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import PdpStory from "@/components/pdp-story";
import ProductGallery from "@/components/product-gallery";

const focusPoints = {
  dorsal: { top: "28%", left: "52%" },
  palm: { top: "55%", left: "42%" },
  wrist: { top: "78%", left: "50%" },
};

type SizeRecommendation = {
  size: string;
  fit: "ajustado" | "holgado";
  lengthCm: number;
  timestamp: number;
};

const SIZE_RECO_KEY = "n95-size-reco";

export default function ProductDetail({ product }: { product: Product }) {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: imageScroll } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const hotspotOffset = useTransform(imageScroll, [0, 1], [-6, 6]);
  const imageRotate = useTransform(imageScroll, [0, 1], reduced ? [0, 0] : [-2, 2]);
  const imageTilt = useTransform(imageScroll, [0, 1], reduced ? [0, 0] : [1.5, -1.5]);
  const [focus, setFocus] = useState<keyof typeof focusPoints>("palm");
  const [hovered, setHovered] = useState<keyof typeof focusPoints | null>(null);
  const [adding, setAdding] = useState(false);
  const { addItem, openCart } = useCart();
  const [sizeOpen, setSizeOpen] = useState(false);
  const readSavedSize = () => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem(SIZE_RECO_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as SizeRecommendation;
    } catch {
      return null;
    }
  };
  const [savedSize, setSavedSize] = useState<SizeRecommendation | null>(() => readSavedSize());
  const [justAdded, setJustAdded] = useState(false);

  const anatomyCopy = {
    dorsal: product.featureCopy.dorsal,
    palm: product.featureCopy.palm,
    wrist: product.featureCopy.wrist,
  };
  const scrollySteps = [
    {
      key: "dorsal",
      kicker: "Control de impacto",
      title: "Dorso técnico de respuesta rápida",
      copy: anatomyCopy.dorsal,
    },
    {
      key: "palm",
      kicker: "Agarre boutique",
      title: "Palma con grip de precisión",
      copy: anatomyCopy.palm,
    },
    {
      key: "wrist",
      kicker: "Sujeción estable",
      title: "Muñequera 360 de ajuste firme",
      copy: anatomyCopy.wrist,
    },
  ] as const;

  const handleAdd = () => {
    if (adding) return;
    setAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      image: product.image,
    }, { openCart: false });
    window.setTimeout(() => setAdding(false), 900);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  const handleSizeOpenChange = (open: boolean) => {
    setSizeOpen(open);
    setSavedSize(readSavedSize());
  };

  const galleryOverlay = (
    <>
      <motion.div
        className="pointer-events-none absolute z-20 h-24 w-24 rounded-full border border-cyber-lime/60 bg-cyber-lime/10 blur-[0.2px]"
        animate={{ top: focusPoints[focus].top, left: focusPoints[focus].left }}
        style={{ y: reduced ? 0 : hotspotOffset }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      />
      <div className="absolute left-4 top-4 z-30 rounded-[6px] border border-white/10 bg-black/60 px-3 py-2 text-[11px] uppercase tracking-[0.28em] text-white/70">
        Anatomía del N95
      </div>
      <motion.div className="absolute inset-0 z-30" style={{ y: reduced ? 0 : hotspotOffset }}>
        {(Object.keys(focusPoints) as Array<keyof typeof focusPoints>).map((key) => (
          <div
            key={key}
            className="absolute"
            style={{ top: focusPoints[key].top, left: focusPoints[key].left }}
          >
            <button
              type="button"
              aria-label={`Destacar ${key === "dorsal" ? "dorso" : key === "palm" ? "palma" : "muñequera"}`}
              aria-pressed={focus === key}
              aria-controls="anatomy-panel"
              className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyber-lime/40 bg-cyber-lime/10 p-2 shadow-glow transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-lime/60"
              onMouseEnter={() => {
                setHovered(key);
                setFocus(key);
              }}
              onClick={() => setFocus(key)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => {
                setHovered(key);
                setFocus(key);
              }}
              onBlur={() => setHovered(null)}
            >
              <span className="block h-2.5 w-2.5 rounded-full bg-cyber-lime" />
            </button>
            <AnimatePresence>
              {hovered === key && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-4 top-4 w-56 rounded-[10px] border border-white/10 bg-black/90 p-3 text-xs text-white/80 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyber-lime">
                    {key === "dorsal" ? "Dorso" : key === "palm" ? "Palma" : "Muñequera"}
                  </p>
                  <p className="mt-2">{anatomyCopy[key]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
    </>
  );

  return (
    <section className="container grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative">
        <div
          ref={imageRef}
          className="sticky top-24 overflow-hidden rounded-[16px] border border-white/12 bg-gradient-to-b from-white/8 via-black/40 to-black/70 p-4 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.35)]"
        >
          <div className="relative perspective-[1200px]">
            <motion.div
              className="relative [transform-style:preserve-3d]"
              style={{ rotateX: imageTilt, rotateZ: imageRotate }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(43,255,79,0.16),transparent_50%)] blur-3xl" />
              <ProductGallery media={product.media} name={product.name} overlay={galleryOverlay} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-3">
          <Reveal>
            <Badge>Edición Pro</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="section-title text-4xl font-semibold leading-tight">{product.name}</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-lg text-white/70">
              Ingeniería visual para porteros de élite. Cada capa está pensada para absorber impacto, mantener
              agarre constante y liberar tus reflejos.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-3xl font-semibold text-cyber-lime">${product.price.toFixed(0)}</p>
          </Reveal>
          <div className="flex flex-wrap gap-3 text-xs text-white/60">
            <span className="rounded-[4px] border border-white/10 bg-white/5 px-2 py-1">
              Envío rápido 24-48h
            </span>
            <span className="rounded-[4px] border border-white/10 bg-white/5 px-2 py-1">
              Devolución 30 días
            </span>
            <span className="rounded-[4px] border border-white/10 bg-white/5 px-2 py-1">
              Garantía oficial
            </span>
          </div>
          {savedSize && (
            <div className="text-xs text-white/60">
              Tu talla recomendada:{" "}
              <span className="text-cyber-lime font-semibold">Talla {savedSize.size}</span> ·{" "}
              {savedSize.fit === "ajustado" ? "Ceñido" : "Holgado"}
            </div>
          )}
          <div className="flex items-center gap-3">
            <Button type="button" onClick={handleAdd} className="shadow-glow min-w-[220px]" size="lg" disabled={adding} aria-busy={adding}>
              <span className="flex items-center gap-2" role="status" aria-live="polite">
                {adding && <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />}
                {adding ? "Agregando..." : "Añadir al Carrito"}
              </span>
            </Button>
            <Button type="button" variant="ghost" onClick={() => setSizeOpen(true)}>
              {savedSize ? "Editar talla" : "Encuentra tu talla"}
            </Button>
          </div>
          <AnimatePresence>
            {justAdded && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 text-xs text-white/60"
                role="status"
                aria-live="polite"
              >
                <span>Agregado al carrito.</span>
                <Button type="button" variant="ghost" size="sm" onClick={openCart}>
                  Ver carrito
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="rounded-[8px] border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">Completa tu kit</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-white/60">
              <span className="rounded border border-white/10 px-2 py-1">Spray de grip</span>
              <span className="rounded border border-white/10 px-2 py-1">Toalla técnica</span>
              <span className="rounded border border-white/10 px-2 py-1">Bolsa premium</span>
            </div>
            <p className="mt-2 text-xs text-white/50">Accesorios boutique disponibles próximamente.</p>
          </div>
        </div>

        <div className="space-y-4" id="tech">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Anatomía del N95</p>
          <div className="flex flex-wrap gap-3">
            {(["dorsal", "palm", "wrist"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setFocus(key)}
                type="button"
                aria-pressed={focus === key}
                aria-controls="anatomy-panel"
                className={`rounded-[2px] border px-3 py-2 text-sm transition ${
                  focus === key
                    ? "border-cyber-lime bg-cyber-lime/10 text-cyber-lime"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-cyber-lime/40"
                }`}
              >
                {key === "dorsal" ? "Dorso" : key === "palm" ? "Palma" : "Muñequera"}
              </button>
            ))}
          </div>
          <div
            id="anatomy-panel"
            role="status"
            aria-live="polite"
            className="rounded-[8px] border border-white/10 bg-white/5 p-4 text-sm text-white/80"
          >
            {focus === "dorsal" && anatomyCopy.dorsal}
            {focus === "palm" && anatomyCopy.palm}
            {focus === "wrist" && anatomyCopy.wrist}
          </div>
        </div>

        <div className="space-y-4" id="story">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Ritual de rendimiento</p>
          <div className="space-y-10">
            {scrollySteps.map((step) => (
              <div key={step.key} className="min-h-[32vh]">
                <motion.div
                  onViewportEnter={() => setFocus(step.key)}
                  viewport={{ amount: 0.6 }}
                  className={`rounded-[12px] border p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition ${
                    focus === step.key
                      ? "border-cyber-lime/60 bg-cyber-lime/10"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">{step.kicker}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{step.copy}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Especificaciones</p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>· Corte: {product.tags.join(", ")}</li>
            <li>· Palma: Látex alemán 4mm + espuma visco</li>
            <li>· Cuerpo: Neopreno microperforado de compresión</li>
            <li>· Clima: Seco, lluvia y sintético</li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Qué incluye</p>
          <div className="rounded-[8px] border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <ul className="space-y-2">
              <li>· 1 par de guantes N95 en su funda protectora.</li>
              <li>· Tarjeta de cuidado y guía de ajuste.</li>
              <li>· Acceso a soporte post-venta boutique.</li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-[8px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Cuidado</p>
            <p className="text-sm text-white/70">
              Enjuagar con agua fría después de cada uso. Secar a la sombra.
            </p>
          </div>
          <div className="space-y-2 rounded-[8px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Fit</p>
            <p className="text-sm text-white/70">
              Ajuste híbrido firme. Recomendamos media talla arriba si preferís más espacio.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Tallas disponibles</p>
          <p className="text-sm text-white/70">7 · 8 · 9 · 10 · 11 · 12</p>
        </div>

        <PdpStory />
      </div>

      <TechSpecsBento product={product} />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/80 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <div>
            <p className="text-sm text-white/70">{product.name}</p>
            <p className="text-lg font-semibold text-cyber-lime">${product.price.toFixed(0)}</p>
          </div>
          <Button type="button" onClick={handleAdd} className="shadow-glow" aria-busy={adding} disabled={adding}>
            <span role="status" aria-live="polite">
              {adding ? "Agregando..." : "Añadir al Carrito"}
            </span>
          </Button>
        </div>
      </div>

      <Sheet open={sizeOpen} onOpenChange={handleSizeOpenChange}>
        <SheetContent side="right" className="space-y-6">
          <SheetTitle className="text-lg font-semibold text-cyber-gray">Encuentra tu talla</SheetTitle>
          <SizeAssistant />
        </SheetContent>
      </Sheet>
    </section>
  );
}
