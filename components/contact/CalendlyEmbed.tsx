"use client";

import { useEffect, useRef, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const SCRIPT_ID = "calendly-widget-script";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

function loadCalendlyScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Calendly script failed")), {
        once: true,
      });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly script failed"));
    document.body.appendChild(script);
  });
}

type Props = {
  url: string;
  title?: string;
  className?: string;
};

export function CalendlyEmbed({
  url,
  title = "Pick a time for a 30-minute intro call",
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !url) return;

    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || cancelled) return;
        observer.disconnect();

        loadCalendlyScript()
          .then(() => {
            if (cancelled || !containerRef.current || !window.Calendly) return;
            containerRef.current.innerHTML = "";
            window.Calendly.initInlineWidget({
              url,
              parentElement: containerRef.current,
            });
            setReady(true);
          })
          .catch(() => {
            if (!cancelled) setFailed(true);
          });
      },
      { rootMargin: "120px" }
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [url]);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple/30 bg-purple/10">
          <FaCalendarAlt className="h-4 w-4 text-purple" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-slate-500">30 min · Video call · No account needed</p>
        </div>
      </div>

      <div className="relative min-h-[680px] bg-white/[0.02]">
        {!ready && !failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple/30 border-t-purple" />
            <p className="text-sm text-slate-400">Loading scheduler…</p>
          </div>
        ) : null}

        {failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-8 text-center">
            <p className="text-sm text-slate-300">Could not load the scheduler.</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-purple hover:underline"
            >
              Open Calendly in a new tab →
            </a>
          </div>
        ) : null}

        <div ref={containerRef} className="calendly-inline-widget min-h-[680px] w-full" />
      </div>
    </div>
  );
}
