"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FaFilePdf } from "react-icons/fa";
import { ConfettiLottie } from "@/components/ui/ConfettiLottie";
import {
  RESUME_DOWNLOAD_NAME_DE,
  RESUME_DOWNLOAD_NAME_EN,
  RESUME_PATH_DE,
  RESUME_PATH_EN,
  triggerResumeDownload,
} from "@/lib/resume";
import { cn } from "@/lib/utils";

type Props = {
  resumeUrl?: string;
  resumeUrlDe?: string;
  label?: string;
  labelDe?: string;
  tagline?: string;
  variant?: "hero" | "compact";
  className?: string;
};

type Phase = "idle" | "extracting" | "done";

const ORBIT_WORDS = ["HIRABLE", "PDF", "FULL-STACK", "OPEN"];

export function CVShowcase({
  resumeUrl = RESUME_PATH_EN,
  resumeUrlDe = RESUME_PATH_DE,
  label = "Extract dossier",
  labelDe = "Lebenslauf laden",
  tagline = "Lebenslauf · classified",
  variant = "hero",
  className,
}: Props) {
  const [celebrate, setCelebrate] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hovering, setHovering] = useState(false);
  const [tick, setTick] = useState(0);

  const shellRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 22,
  });

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 2200);
    return () => window.clearInterval(id);
  }, []);

  const statusLines = [
    "Scanning recruiter signal…",
    "Decrypting career graph…",
    "Dossier ready — pull to download",
  ];
  const statusText = statusLines[tick % statusLines.length];

  const onMove = (e: React.MouseEvent) => {
    const el = shellRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
    setHovering(false);
  };

  const downloadEn = () => {
    if (phase === "extracting") return;
    setPhase("extracting");
    window.setTimeout(() => {
      triggerResumeDownload(resumeUrl, RESUME_DOWNLOAD_NAME_EN);
      setCelebrate(true);
      setPhase("done");
      window.setTimeout(() => {
        setCelebrate(false);
        setPhase("idle");
      }, 2600);
    }, 700);
  };

  const downloadDe = () => {
    triggerResumeDownload(resumeUrlDe, RESUME_DOWNLOAD_NAME_DE);
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        <button
          type="button"
          onClick={() => triggerResumeDownload(resumeUrl, RESUME_DOWNLOAD_NAME_EN)}
          className="relative inline-flex items-center gap-1.5 rounded-full border border-purple/40 bg-purple/10 px-3 py-1.5 text-xs font-semibold text-purple transition hover:bg-purple/20"
        >
          <FaFilePdf className="h-3 w-3" />
          EN
        </button>
        <button
          type="button"
          onClick={() => triggerResumeDownload(resumeUrlDe, RESUME_DOWNLOAD_NAME_DE)}
          className="relative inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/15"
        >
          <FaFilePdf className="h-3 w-3" />
          DE
        </button>
      </div>
    );
  }

  const extracting = phase === "extracting";
  const done = phase === "done";

  return (
    <motion.div
      className={cn("relative flex flex-col items-center", className)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <AnimatePresence>
        {celebrate ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -top-4 left-1/2 z-[60] -translate-x-1/2"
          >
            <ConfettiLottie play height={240} width={380} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400/80">
        signal://recruiter-channel
      </p>

      <motion.div
        ref={shellRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={resetTilt}
        onClick={downloadEn}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            downloadEn();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`${label} — ${RESUME_DOWNLOAD_NAME_EN}`}
        className="group relative h-[min(88vw,340px)] w-[min(88vw,340px)] cursor-pointer sm:h-[360px] sm:w-[360px]"
        style={{ perspective: 1600 }}
        animate={extracting ? { scale: 0.96 } : { scale: 1 }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          {/* ambient glow */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.35)_0%,transparent_65%)]"
            animate={{ opacity: hovering || extracting ? 1 : 0.5, scale: extracting ? 1.15 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* outer orbit labels */}
          <motion.div
            className="pointer-events-none absolute inset-0 animate-cv-orbit"
            animate={extracting ? { scale: 0.2, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.55 }}
          >
            {ORBIT_WORDS.map((word, i) => (
              <span
                key={word}
                className="absolute left-1/2 top-1/2 font-mono text-[9px] font-bold uppercase tracking-widest text-purple/70"
                style={{
                  transform: `rotate(${i * 90}deg) translateY(-155px) rotate(${-i * 90}deg)`,
                }}
              >
                {word}
              </span>
            ))}
          </motion.div>

          {/* ring 1 */}
          <motion.div
            className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-purple/25"
            animate={extracting ? { scale: 0.3, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          {/* ring 2 - counter rotate */}
          <motion.div
            className="pointer-events-none absolute inset-8 rounded-full border border-cyan-500/20 animate-cv-orbit-reverse"
            animate={extracting ? { scale: 0.4, opacity: 0 } : {}}
          />
          {/* ring 3 - pulse */}
          <motion.div
            className="pointer-events-none absolute inset-14 rounded-full border-2 border-purple/30 shadow-[0_0_30px_rgba(139,92,246,0.25)]"
            animate={
              extracting
                ? { scale: 0.5, opacity: 0 }
                : hovering
                  ? { scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }
                  : { scale: 1, opacity: 0.45 }
            }
            transition={{ duration: extracting ? 0.45 : 2, repeat: extracting ? 0 : Infinity }}
          />

          {/* radar sweep */}
          <div className="pointer-events-none absolute inset-10 overflow-hidden rounded-full">
            <motion.div
              className="absolute left-1/2 top-1/2 h-1/2 w-[2px] origin-bottom bg-gradient-to-t from-transparent via-cyan-400/80 to-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ marginLeft: -1 }}
            />
          </div>

          {/* core dossier */}
          <motion.div
            className="absolute left-1/2 top-1/2 w-[58%] -translate-x-1/2 -translate-y-1/2"
            animate={
              extracting
                ? { scale: 1.08, z: 40 }
                : hovering
                  ? { scale: 1.03, z: 20 }
                  : { scale: 1, z: 0 }
            }
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className={cn(
                "relative overflow-hidden rounded-2xl border p-[1px] shadow-2xl",
                done
                  ? "border-emerald-400/50 shadow-emerald-500/20"
                  : "border-purple/40 shadow-purple/30"
              )}
              animate={extracting ? { boxShadow: "0 0 60px rgba(139,92,246,0.6)" } : {}}
            >
              <motion.div className="relative rounded-2xl bg-black-100/95 px-5 pb-5 pt-6 backdrop-blur-md">
                {/* hex grid */}
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0 L20 5.8 L20 14.2 L10 20 L0 14.2 L0 5.8 Z' fill='none' stroke='%23a78bfa' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: "18px 20px",
                  }}
                />

                {/* scan beam */}
                <div
                  className={cn(
                    "pointer-events-none absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)]",
                    !extracting && "animate-cv-scan"
                  )}
                />

                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[9px] text-emerald-400/90">● LIVE</span>
                  <span className="rounded border border-red-500/40 bg-red-500/10 px-1.5 py-0.5 font-mono text-[8px] text-red-300">
                    PDF
                  </span>
                </div>

                <p className="relative mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
                  dossier://
                </p>
                <p
                  className={cn(
                    "relative mt-1 text-xl font-bold leading-tight text-white",
                    hovering && !extracting && "animate-cv-glitch"
                  )}
                >
                  Ahmad
                  <span className="block bg-gradient-to-r from-purple via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                    Al-Halwany
                  </span>
                </p>
                <p className="relative mt-2 font-mono text-[10px] text-purple/80">{tagline}</p>

                {/* fake data stream */}
                <div className="relative mt-4 space-y-1.5 border-t border-slate-800/80 pt-3 font-mono text-[9px] text-slate-600">
                  <DataLine label="role" value="full_stack.dev" active={hovering} />
                  <DataLine label="stack" value="python.next" active={hovering} />
                  <DataLine label="status" value="open_to_hire" active />
                </div>

                <motion.div
                  className={cn(
                    "relative mt-5 grid grid-cols-2 gap-2",
                    done
                      ? "bg-emerald-500/20 text-emerald-300"
                      : ""
                  )}
                >
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadEn();
                    }}
                    className={cn(
                      "col-span-2 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider sm:col-span-1",
                      done
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-gradient-to-r from-purple/90 to-violet-600 text-white"
                    )}
                    animate={hovering && !extracting ? { letterSpacing: "0.16em" } : { letterSpacing: "0.1em" }}
                  >
                    {extracting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        …
                      </span>
                    ) : done ? (
                      "EN ✓"
                    ) : (
                      label
                    )}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadDe();
                    }}
                    className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/10 py-2.5 text-xs font-bold uppercase tracking-wider text-cyan-100 transition hover:bg-cyan-500/20 sm:col-span-1"
                  >
                    {labelDe}
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* corner ticks */}
          {[0, 90, 180, 270].map((deg) => (
            <span
              key={deg}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[42%] w-px origin-bottom bg-gradient-to-t from-purple/50 to-transparent"
              style={{ transform: `rotate(${deg}deg) translateY(-100%)` }}
            />
          ))}
        </motion.div>
      </motion.div>

      <motion.p
        className="mt-5 max-w-[280px] text-center font-mono text-[11px] leading-relaxed text-slate-500"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        {extracting ? "Packaging encrypted dossier…" : statusText}
      </motion.p>
      <p className="mt-1 text-center text-[10px] text-slate-600">
        Tap the core for English · {labelDe} for German
      </p>
    </motion.div>
  );
}

function DataLine({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <motion.div
      className="flex justify-between gap-2"
      animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.7 }}
      transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
    >
      <span className="text-purple/60">{label}</span>
      <span className="truncate text-cyan-500/70">{value}</span>
    </motion.div>
  );
}
