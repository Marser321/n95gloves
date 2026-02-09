"use client";

import { CreditCard, RefreshCw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  {
    title: "Envío rápido",
    description: "Despacho prioritario en 24-48h en zonas principales.",
    icon: Truck,
  },
  {
    title: "Devolución 30 días",
    description: "Si no sentís el ajuste perfecto, lo cambiamos.",
    icon: RefreshCw,
  },
  {
    title: "Garantía oficial",
    description: "Cobertura contra fallas de fabricación.",
    icon: ShieldCheck,
  },
  {
    title: "Pago seguro",
    description: "Tus datos protegidos con cifrado.",
    icon: CreditCard,
  },
];

export default function TrustStrip() {
  return (
    <section className="container py-10">
      <div className="grid gap-4 md:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="rounded-[10px] border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-cyber-lime/30 bg-cyber-lime/10">
                  <Icon className="h-5 w-5 text-cyber-lime" aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-semibold">{benefit.title}</p>
                  <p className="text-xs text-white/60">{benefit.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/50">
        <span className="rounded border border-white/10 px-3 py-1">Visa</span>
        <span className="rounded border border-white/10 px-3 py-1">MasterCard</span>
        <span className="rounded border border-white/10 px-3 py-1">Amex</span>
        <span className="rounded border border-white/10 px-3 py-1">Apple Pay</span>
        <span className="rounded border border-white/10 px-3 py-1">Pago Seguro</span>
      </div>
    </section>
  );
}
