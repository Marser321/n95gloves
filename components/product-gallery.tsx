"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductMedia } from "@/lib/products";

type ProductGalleryProps = {
  media: ProductMedia[];
  name: string;
  overlay?: ReactNode;
};

export default function ProductGallery({ media, name, overlay }: ProductGalleryProps) {
  const items = useMemo<ProductMedia[]>(
    () => (media.length ? media : [{ type: "image", src: "/products/product-01.jpg" }]),
    [media]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const active = items[activeIndex];
  const isImage = active.type === "image";
  const zoomScale = zoomed ? 1.18 : hovered && !reduced ? 1.05 : 1;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isImage) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    setZoomed(false);
    setOrigin("50% 50%");
  };

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-[12px] border border-white/10 bg-black/40"
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          if (!zoomed) setOrigin("50% 50%");
        }}
      >
        {isImage ? (
          <motion.div
            className={cn(
              "relative transition-transform",
              zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            )}
            style={{ transformOrigin: origin }}
            animate={{ scale: zoomScale }}
            transition={reduced ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
          >
            <Image
              src={active.src}
              alt={name}
              width={900}
              height={1200}
              className="w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 520px"
              priority={activeIndex === 0}
            />
          </motion.div>
        ) : (
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            poster={active.poster}
          >
            <source src={active.src} />
          </video>
        )}

        {isImage && overlay && (
          <div className="absolute inset-0 z-20">{overlay}</div>
        )}

        {isImage && (
          <button
            type="button"
            onClick={() => setZoomed((prev) => !prev)}
            className="absolute bottom-3 right-3 z-30 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 transition hover:border-cyber-lime/60 hover:text-white"
            aria-pressed={zoomed}
            aria-label={zoomed ? "Cerrar zoom" : "Activar zoom"}
          >
            {zoomed ? "Cerrar zoom" : "Zoom"}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => handleSelect(index)}
            className={cn(
              "relative h-16 w-16 overflow-hidden rounded-[6px] border transition",
              activeIndex === index
                ? "border-cyber-lime shadow-glow"
                : "border-white/10 hover:border-cyber-lime/40"
            )}
            aria-label={item.type === "video" ? "Ver video" : "Ver imagen"}
          >
            {item.type === "image" ? (
              <Image src={item.src} alt={name} fill className="object-cover" sizes="64px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-black/70 text-[10px] uppercase tracking-[0.2em] text-white/60">
                Video
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
