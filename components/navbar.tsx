"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/providers/cart-provider";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";
import ThemeSwitcher from "@/components/theme/theme-switcher";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/collection", label: "Colección" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/technology", label: "Tecnología" },
  { href: "/lab", label: "N95 Lab" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "Sobre N95" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openCart, items, lastActionAt } = useCart();
  const pathname = usePathname();

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
        <nav className="hidden items-center gap-5 text-sm text-white/70 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-cyber-gray",
                pathname === link.href ? "text-[var(--accent)]" : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <ThemeSwitcher compact />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="gap-6">
              <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">Menú</p>
                <p className="text-lg font-semibold">N95 Gloves</p>
              </div>
              <div className="grid gap-3 text-sm text-white/70">
                {links.map((link) => (
                  <SheetClose asChild key={`mobile-${link.href}`}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[color:rgb(var(--accent-rgb)/0.4)]",
                        pathname === link.href ? "text-[var(--accent)]" : ""
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className={cn(
                      "rounded-md border border-white/10 bg-white/5 px-4 py-3 transition hover:border-[color:rgb(var(--accent-rgb)/0.4)]",
                      pathname === "/contact" ? "text-[var(--accent)]" : ""
                    )}
                  >
                    Contacto
                  </Link>
                </SheetClose>
              </div>
              <div className="rounded-[10px] border border-white/10 bg-black/35 p-4">
                <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/50">Tema</p>
                <ThemeSwitcher />
              </div>
            </SheetContent>
          </Sheet>
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
                <span className="absolute -right-2 -top-2 h-5 min-w-[20px] rounded-full bg-[var(--accent)] px-1 text-[11px] font-semibold text-black">
                  {itemCount}
                </span>
              )}
            </motion.div>
          </Button>
          <Magnetic>
            <Button asChild size="sm">
              <Link href="/collection">Comprar</Link>
            </Button>
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
