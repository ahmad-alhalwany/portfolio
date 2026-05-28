"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Compact icon-only on very small screens */
  compact?: boolean;
};

export function ThemeToggle({ className, compact = false }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-11 shrink-0 rounded-full border border-page bg-page-card/60",
          compact ? "w-11" : "w-[4.75rem]",
          className
        )}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={cn(
        "group relative flex h-11 shrink-0 items-center rounded-full border border-page bg-page-card p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300",
        "hover:border-purple/40 hover:shadow-[0_0_24px_-8px_var(--glow-purple)] focus-ring btn-press",
        compact ? "w-11 justify-center" : "w-[4.75rem]",
        className
      )}
    >
      {!compact && (
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 520, damping: 32 }}
          className={cn(
            "absolute top-1 h-9 w-9 rounded-full bg-gradient-to-br shadow-md",
            isDark
              ? "left-[calc(100%-2.5rem)] from-violet-600/90 to-indigo-500/90"
              : "left-1 from-amber-300 to-orange-400"
          )}
        />
      )}

      {!compact && (
        <>
          <span
            className={cn(
              "relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              !isDark ? "text-amber-600" : "text-page-muted"
            )}
          >
            <FaSun className="h-3.5 w-3.5" />
          </span>
          <span
            className={cn(
              "relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              isDark ? "text-violet-200" : "text-page-muted"
            )}
          >
            <FaMoon className="h-3.5 w-3.5" />
          </span>
        </>
      )}

      {compact && (
        <span className="relative z-10 text-purple">
          {isDark ? <FaMoon className="h-4 w-4" /> : <FaSun className="h-4 w-4" />}
        </span>
      )}

      <span className="pointer-events-none absolute -inset-1 rounded-full bg-purple/0 opacity-0 blur-md transition group-hover:bg-purple/10 group-hover:opacity-100" />
    </button>
  );
}
