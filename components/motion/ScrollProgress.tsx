"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Thin progress bar at top of viewport while scrolling */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[9999] h-[2px] origin-left bg-gradient-to-r from-purple via-violet-500 to-cyan-400"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
