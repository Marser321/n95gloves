"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";

const links = [
  { href: "/#story", label: "Manifiesto" },
  { href: "/#lookbook", label: "Lookbook" },
  { href: "/#lineup", label: "Colección" },
  { href: "/lab", label: "N95 Lab" },
  { href: "/#tech", label: "Tecnología" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#about", label: "Sobre N95" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openCart, items, lastActionAt } = useCart();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled ? "glass" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-sm tracking-[0.24em] font-semibold uppercase text-cyber-gray">
          N95 Gloves
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-cyber-gray"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" size="icon" aria-label="Abrir carrito" onClick={openCart}>
            <motion.div
              key={lastActionAt}
              className="relative"
              initial={{ scale: 1 }}
              animate={{ scale: lastActionAt ? [1, 1.12, 1] : 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 h-5 min-w-[20px] rounded-full bg-cyber-lime px-1 text-[11px] font-semibold text-cyber-black">
                  {itemCount}
                </span>
              )}
            </motion.div>
          </Button>
          <Magnetic>
            <Button asChild size="sm">
              <Link href="/#comprar">Comprar</Link>
            </Button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
