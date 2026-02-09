"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  duration = 0.6,
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  y = 16,
  once = true,
  amount = 0.3,
}: RevealGroupProps) {
  const reduced = useReducedMotion();
  const variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? "show" : "show"}
      viewport={{ once, amount }}
      variants={variants}
    >
      {React.Children.map(children, (child, index) => (
        <RevealItem key={index} y={y}>
          {child}
        </RevealItem>
      ))}
    </motion.div>
  );
}

type RevealItemProps = {
  children: React.ReactNode;
  className?: string;
  y?: number;
};

export function RevealItem({ children, className, y = 16 }: RevealItemProps) {
  const reduced = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <motion.div className={cn(className)} variants={reduced ? {} : variants}>
      {children}
    </motion.div>
  );
}
