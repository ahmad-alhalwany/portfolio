"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaAward, FaBookOpen, FaCalendarAlt, FaExternalLinkAlt, FaLightbulb } from "react-icons/fa";
import { EducationItem, EducationKind } from "@/lib/types";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";
import { resolveInstitutionBrand } from "@/lib/institution-brand";
import { InstitutionBrandMark } from "./InstitutionBrandMark";

const KIND_THEME: Record<
  EducationKind,
  { label: string; accent: string; ring: string; glow: string; gradient: string }
> = {
  degree: {
    label: "University degree",
    accent: "text-cyan-300",
    ring: "ring-cyan-500/30",
    glow: "from-cyan-500/25 via-cyan-500/5",
    gradient: "from-cyan-500/20 to-transparent",
  },
  bootcamp: {
    label: "Bootcamp",
    accent: "text-amber-300",
    ring: "ring-amber-500/30",
    glow: "from-amber-500/25 via-amber-500/5",
    gradient: "from-amber-500/20 to-transparent",
  },
  certificate: {
    label: "Professional certificate",
    accent: "text-purple",
    ring: "ring-purple/30",
    glow: "from-purple/30 via-purple/5",
    gradient: "from-purple/25 to-transparent",
  },
};

function inferKind(item: EducationItem): EducationKind {
  if (item.kind) return item.kind;
  const t = item.title.toLowerCase();
  if (t.includes("bootcamp")) return "bootcamp";
  if (item.institution && !t.includes("engineer")) return "certificate";
  return "degree";
}

/** Split long certificate copy into readable paragraphs */
function descriptionParagraphs(text: string): string[] {
  if (!text.trim()) return [];
  const byNewline = text.split(/\n+/).filter((p) => p.trim());
  if (byNewline.length > 1) return byNewline;
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences || sentences.length <= 2) return [text.trim()];
  const chunks: string[] = [];
  let buf = "";
  sentences.forEach((s, i) => {
    buf += s;
    if ((i + 1) % 2 === 0 || i === sentences.length - 1) {
      chunks.push(buf.trim());
      buf = "";
    }
  });
  return chunks.filter(Boolean);
}

type Props = {
  item: EducationItem;
  index: number;
};

export function EducationCredentialCard({ item, index }: Props) {
  const kind = inferKind(item);
  const theme = KIND_THEME[kind];
  const cover = item.coverImage || item.thumbnail;
  const paragraphs = descriptionParagraphs(item.desc);
  const alignImageRight = index % 2 === 1;
  const brand = resolveInstitutionBrand(item.institution);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.25) }}
      className="group relative"
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 blur-sm transition duration-500 group-hover:opacity-100",
          `bg-gradient-to-br ${theme.glow}`
        )}
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-[1.65rem] border border-slate-800/90 bg-slate-950/90 shadow-2xl shadow-black/40 ring-1 backdrop-blur-xl transition duration-500 group-hover:border-slate-700",
          theme.ring
        )}
      >
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", theme.gradient)} />

        <div className="relative p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3.5">
              <InstitutionBrandMark
                brand={brand}
                size="lg"
              />
              <div>
                <p className="text-sm font-bold tracking-wide text-white md:text-base">
                  {brand.displayName}
                </p>
                {item.institution && item.institution !== brand.displayName ? (
                  <p className="mt-0.5 text-[11px] text-slate-500">{item.institution}</p>
                ) : null}
                <span
                  className={cn(
                    "mt-1 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    theme.accent,
                    "border-current/25 bg-black/40"
                  )}
                >
                  <FaAward className="h-3 w-3" />
                  {theme.label}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {item.category && kind === "certificate" ? (
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-300">
                  {item.category}
                </span>
              ) : null}
              {item.year && (
                <span className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs text-slate-400">
                  {item.year}
                </span>
              )}
            </div>
          </div>

          <h2 className="mt-6 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-[2rem]">
            {item.title}
          </h2>

          {/* Cover + content layout */}
          <div
            className={cn(
              "mt-8 grid gap-8",
              cover ? "lg:grid-cols-2 lg:items-start" : "lg:grid-cols-1"
            )}
          >
            {cover && (
              <div
                className={cn(
                  "relative order-1 overflow-hidden rounded-2xl border border-slate-800/80",
                  alignImageRight && "lg:order-2"
                )}
              >
                <div className="relative aspect-[16/10] w-full">
                  <OptimizedImage
                    src={cover}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Credential preview
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className={cn("order-2 space-y-6", alignImageRight && cover && "lg:order-1")}>
              {/* Timeline milestones */}
              {(item.timeline?.length ?? 0) > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {item.timeline!.map((line) => (
                    <div
                      key={line}
                      className="flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4"
                    >
                      <FaCalendarAlt className={cn("mt-0.5 h-4 w-4 shrink-0", theme.accent)} />
                      <p className="text-sm leading-relaxed text-slate-300">{line}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Course insight */}
              {paragraphs.length > 0 && (
                <div className="rounded-2xl border border-slate-800/90 bg-slate-900/40 p-5 md:p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-black/50", theme.accent)}>
                      <FaBookOpen className="h-4 w-4" />
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                      What I learned
                    </h3>
                  </div>
                  <div className="space-y-4 border-l-2 border-purple/40 pl-4 md:pl-5">
                    {paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="text-sm leading-[1.75] text-slate-300 md:text-[0.95rem]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {(item.highlights?.length ?? 0) > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights!.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-purple/25 bg-purple/10 px-3 py-1.5 text-xs font-medium text-purple"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.verifyUrl ? (
                <Link
                  href={item.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-purple/40 bg-purple/10 px-5 py-2.5 text-sm font-semibold text-purple transition hover:bg-purple/20"
                >
                  Verify on Coursera
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>
          </div>

          {/* Academic projects */}
          {(item.projects?.length ?? 0) > 0 && (
            <div className="mt-8 border-t border-slate-800/80 pt-8">
              <div className="mb-5 flex items-center gap-2">
                <FaLightbulb className={cn("h-4 w-4", theme.accent)} />
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-white">
                  Key projects
                </h3>
              </div>
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {item.projects!.map((project, i) => (
                  <li
                    key={project}
                    className="interactive-card flex gap-4 bg-slate-900/60 p-4"
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-bold",
                        theme.accent,
                        "border-current/30 bg-black/50"
                      )}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-400">{project}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
