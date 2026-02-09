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
      <span
        className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
        style={{
          background:
            "linear-gradient(to right, rgb(var(--accent-rgb) / 0.4), rgb(255 255 255 / 0.2), rgb(var(--accent-rgb) / 0.4))",
        }}
      />
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
            "group relative overflow-hidden border border-transparent text-black shadow-[var(--glow)] transition-all hover:shadow-[var(--glow)]",
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
          "group relative overflow-hidden border border-transparent text-black shadow-[var(--glow)] transition-all hover:shadow-[var(--glow)]",
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
