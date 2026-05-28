"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  defaultTransition,
  fadeInVariants,
  fadeUpVariants,
  scaleInVariants,
  slideFromLeftVariants,
  slideFromRightVariants,
} from "@/lib/motion-presets";

type ScrollRevealVariant =
  | "fadeUp"
  | "fadeIn"
  | "scaleIn"
  | "slideLeft"
  | "slideRight";

const variantMap: Record<ScrollRevealVariant, Variants> = {
  fadeUp: fadeUpVariants,
  fadeIn: fadeInVariants,
  scaleIn: scaleInVariants,
  slideLeft: slideFromLeftVariants,
  slideRight: slideFromRightVariants,
};

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ScrollRevealVariant;
  delay?: number;
  as?: "div" | "section" | "article";
};

function isElementInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const visibleHeight =
    Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
  if (visibleHeight <= 0) return false;
  return visibleHeight >= Math.min(rect.height * 0.05, 48);
}

export function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.05,
    margin: "0px 0px -24px 0px",
  });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(true);
      return;
    }

    if (isInView) {
      setRevealed(true);
      return;
    }

    const check = () => {
      const el = ref.current;
      if (el && isElementInViewport(el)) {
        setRevealed(true);
      }
    };

    check();
    const t1 = window.setTimeout(check, 250);
    const t2 = window.setTimeout(check, 1000);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(check)
        : null;
    if (ref.current && ro) {
      ro.observe(ref.current);
    }

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isInView, reduceMotion]);

  const show = Boolean(reduceMotion || revealed || isInView);
  const Component = motion[as];
  const variants = variantMap[variant];

  return (
    <Component
      ref={ref}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate={show ? "visible" : "hidden"}
      variants={variants}
      transition={defaultTransition(delay)}
    >
      {children}
    </Component>
  );
}
