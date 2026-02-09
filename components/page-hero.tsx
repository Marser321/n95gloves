"use client";

import Link from "next/link";
import CTAButton from "@/components/cta-button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  badges?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  badges = [],
  primaryCta,
  secondaryCta,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pt-28 pb-12", className)}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgb(var(--accent-rgb) / 0.15), transparent 40%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
      <div className="container relative z-10 space-y-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/60">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="section-title text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="max-w-2xl text-sm text-white/75 md:text-base">{description}</p>
        </Reveal>
        {badges.length > 0 && (
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/50">
              {badges.map((badge) => (
                <span key={badge} className="rounded border border-white/10 px-3 py-1">
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>
        )}
        {(primaryCta || secondaryCta) && (
          <Reveal delay={0.24}>
            <div className="flex flex-wrap items-center gap-4">
              {primaryCta && (
                <CTAButton asChild>
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </CTAButton>
              )}
              {secondaryCta && (
                <Magnetic>
                  <Link
                    href={secondaryCta.href}
                    className="text-sm text-white/75 underline-offset-4 hover:text-cyber-gray hover:underline"
                  >
                    {secondaryCta.label}
                  </Link>
                </Magnetic>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
