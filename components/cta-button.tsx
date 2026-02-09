"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";

export default function CTAButton({ className, children, asChild, ...props }: ButtonProps) {
  const label = React.isValidElement(children)
    ? (children.props as { children?: React.ReactNode }).children
    : children;
  const content = (
    <>
      <span className="absolute inset-0 rounded-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.6),transparent_45%)]" />
      <span className="pointer-events-none absolute -inset-10 bg-gradient-to-r from-cyber-lime/40 via-white/20 to-cyber-lime/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50" />
      <Sparkles className="mr-2 h-4 w-4" />
      <span className="relative z-10">{label}</span>
    </>
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ children?: React.ReactNode }>;
    return (
      <Magnetic>
        <Button
          className={cn(
            "group relative overflow-hidden border border-transparent text-cyber-black shadow-glow transition-all hover:shadow-[0_0_0_1px_rgba(212,243,74,0.5),0_0_35px_rgba(212,243,74,0.45)]",
            className
          )}
          {...props}
          asChild
        >
          {React.cloneElement(child, { children: content })}
        </Button>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <Button
        className={cn(
          "group relative overflow-hidden border border-transparent text-cyber-black shadow-glow transition-all hover:shadow-[0_0_0_1px_rgba(212,243,74,0.5),0_0_35px_rgba(212,243,74,0.45)]",
          className
        )}
        {...props}
        asChild={false}
      >
        {content}
      </Button>
    </Magnetic>
  );
}
