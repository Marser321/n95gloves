"use client";

import Link from "next/link";
import CheckoutBricks from "@/components/checkout/checkout-bricks";
import { Reveal } from "@/components/motion/reveal";

export default function CheckoutPage() {
  return (
    <section className="container py-16">
      <div className="space-y-4">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">Checkout Boutique</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="section-title text-4xl font-semibold leading-tight">Finalizá tu compra con confianza</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-sm text-white/70">
            Cobro seguro con Mercado Pago, orden registrada en sistema y seguimiento boutique.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <Link href="/#lineup" className="text-sm text-cyber-lime hover:underline">
            Seguir explorando modelos
          </Link>
        </Reveal>
      </div>

      <div className="mt-10">
        <CheckoutBricks />
      </div>
    </section>
  );
}
