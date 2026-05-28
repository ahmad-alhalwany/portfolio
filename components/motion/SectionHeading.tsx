"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { defaultTransition, viewportOnce } from "@/lib/motion-presets";

type Props = {
  children: React.ReactNode;
  className?: string;
  accentClassName?: string;
};

/** Section title with scroll reveal + animated underline */
export function SectionHeading({ children, className, accentClassName }: Props) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <h1 className={cn("heading", className)}>{children}</h1>;
  }

  return (
    <motion.h1
      className={cn("heading relative", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={defaultTransition()}
    >
      {children}
      <motion.span
        className={cn(
          "absolute -bottom-2 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-purple to-transparent",
          accentClassName
        )}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 96, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ ...defaultTransition(0.2), duration: 0.6 }}
      />
    </motion.h1>
  );
}
