"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FlipWords({
  words,
  className,
  duration = 2800,
}: {
  words: readonly string[];
  className?: string;
  duration?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (words.length <= 1 || reduceMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), duration);
    return () => window.clearInterval(id);
  }, [words, duration, reduceMotion]);

  if (words.length === 0) return null;

  const textClass =
    "whitespace-nowrap bg-gradient-to-r from-purple via-violet-300 to-cyan-300 bg-clip-text font-bold text-transparent";

  if (reduceMotion || words.length === 1) {
    return (
      <span className={cn("inline-block text-left", className)}>
        <span className={textClass}>{words[0]}</span>
      </span>
    );
  }

  return (
    <span className={cn("relative inline-grid align-bottom text-left", className)}>
      {/* Every phrase stacked in one cell — grid size = widest + tallest phrase */}
      <span aria-hidden className="invisible col-start-1 row-start-1 inline-grid select-none">
        {words.map((word) => (
          <span key={word} className={cn("col-start-1 row-start-1", textClass)}>
            {word}
          </span>
        ))}
      </span>

      <span className="col-start-1 row-start-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className={cn("inline-block will-change-transform", textClass)}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
