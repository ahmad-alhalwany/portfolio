"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaCopy,
  FaDownload,
  FaLinkedinIn,
  FaCheck,
} from "react-icons/fa";
import { ContactSection } from "@/lib/types";
import { Spotlight } from "@/components/ui/Spotlight";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { HireInquiryForm } from "./HireInquiryForm";
import { cn } from "@/lib/utils";
import { RESUME_PATH, triggerResumeDownload } from "@/lib/resume";
import { buildIntroCallMailto, resolveCalendlyUrl } from "@/lib/calendly";
import { useLocale } from "@/components/i18n/LocaleProvider";

const VALUE_PROPS = [
  {
    title: "Full-stack ownership",
    body: "Python APIs to Next.js interfaces — one engineer for backend, frontend, and delivery.",
  },
  {
    title: "Built for product teams",
    body: "I ship features with clear communication, code review discipline, and maintainable architecture.",
  },
  {
    title: "Ready for employment",
    body: "Seeking full-time roles with growth-minded companies — not freelance gigs.",
  },
];

function resolveLinkedIn(contact: ContactSection): string | null {
  if (contact.linkedinUrl) return contact.linkedinUrl;
  const link = contact.socialMedia.find((s) =>
    s.link.toLowerCase().includes("linkedin.com")
  );
  return link?.link ?? null;
}

export default function HireMeSection({ contact }: { contact: ContactSection }) {
  const { locale } = useLocale();
  const [copied, setCopied] = useState(false);
  const linkedin = resolveLinkedIn(contact);
  const calendly = resolveCalendlyUrl(contact.calendlyUrl);
  const introMailto = buildIntroCallMailto(contact.email);
  const scheduleHint = calendly
    ? locale === "de"
      ? "Termin buchen? Nutzen Sie den Button oben. Eilig? LinkedIn oder Formular →"
      : "Need a call? Use the button above. Short on time? LinkedIn or the form →"
    : locale === "de"
      ? "Noch kein Kalenderlink — per E-Mail anfragen oder Formular nutzen →"
      : "Prefer email scheduling? Use the button above or the form →";

  const displayHeading = useMemo(() => {
    if (contact.headingHighlight) {
      return { lead: contact.heading, highlight: contact.headingHighlight };
    }
    const words = contact.heading.split(" ");
    return {
      lead: words.slice(0, Math.ceil(words.length / 2)).join(" "),
      highlight: words.slice(Math.ceil(words.length / 2)).join(" "),
    };
  }, [contact.heading, contact.headingHighlight]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section className="relative mt-12 w-full overflow-hidden" id="contact">
      <div className="pointer-events-none absolute inset-0">
        <Spotlight className="-top-32 left-0 md:-left-20" fill="white" />
        <Spotlight className="top-10 left-full h-[60vh] w-[40vw]" fill="#8b5cf6" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(139,92,246,0.15)_0%,_transparent_60%)]" />
        <ShootingStars
          minSpeed={8}
          maxSpeed={18}
          starColor="#e9d5ff"
          trailColor="#7c3aed"
          className="opacity-50"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-2 pb-8 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {contact.badge}
          </span>
          <p className="mt-3 text-sm text-slate-400">{contact.availability}</p>

          <h2 className="heading mt-6 max-w-4xl lg:max-w-[50vw]">
            {displayHeading.lead}{" "}
            <span className="text-purple">{displayHeading.highlight}</span>
          </h2>

          <div className="mt-4 max-w-2xl">
            <TextGenerateEffect
              words={contact.description}
              className="text-center text-sm text-slate-300 md:text-base"
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {contact.highlights.map((h, i) => (
              <motion.span
                key={h.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-full border border-slate-700 bg-slate-950/80 px-4 py-2 text-xs text-slate-300 md:text-sm"
              >
                <span className="font-semibold text-purple">{h.value}</span>{" "}
                {h.label}
              </motion.span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {linkedin ? (
              <Link
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex overflow-hidden rounded-xl p-[1px]"
              >
                <span
                  className="pointer-events-none absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                  aria-hidden
                />
                <span className="relative z-10 inline-flex items-center gap-2 rounded-[11px] bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition group-hover:bg-slate-900">
                  <FaLinkedinIn className="h-4 w-4 shrink-0 text-[#0A66C2]" />
                  {contact.primaryCtaLabel || "Connect on LinkedIn"}
                </span>
              </Link>
            ) : null}

            {calendly ? (
              <Link
                href={calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex overflow-hidden rounded-xl p-[1px]"
              >
                <span
                  className="pointer-events-none absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
                  aria-hidden
                />
                <span className="relative z-10 inline-flex items-center gap-2 rounded-[11px] bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition group-hover:bg-slate-900">
                  <FaCalendarAlt className="text-purple" />
                  {contact.calendlyCtaLabel}
                </span>
              </Link>
            ) : (
              <Link
                href={introMailto}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400/60 hover:bg-emerald-500/15"
              >
                <FaCalendarAlt className="text-emerald-400" />
                {contact.calendlyCtaLabel}
              </Link>
            )}

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-950 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-purple/40"
            >
              {copied ? (
                <>
                  <FaCheck className="text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <FaCopy className="text-purple" />
                  {contact.email}
                </>
              )}
            </button>

            {(contact.resumeUrl || RESUME_PATH) ? (
              <button
                type="button"
                onClick={() => triggerResumeDownload(contact.resumeUrl || RESUME_PATH)}
                className="inline-flex items-center gap-2 rounded-xl border border-dashed border-purple/40 bg-purple/5 px-5 py-3 text-sm font-medium text-purple transition hover:border-purple/60 hover:bg-purple/10"
              >
                <FaDownload />
                Download Resume
              </button>
            ) : null}
          </div>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple/30 bg-purple/10">
                <FaBriefcase className="h-5 w-5 text-purple" />
              </span>
              <div>
                <p className="text-lg font-semibold text-white">For recruiters & hiring managers</p>
                <p className="text-sm text-slate-500">Full-time · Remote-friendly · EU / MENA timezone</p>
              </div>
            </div>

            <ul className="space-y-4">
              {VALUE_PROPS.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    "rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-purple/30"
                  )}
                >
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.body}</p>
                </motion.li>
              ))}
            </ul>

            <p className="text-xs text-slate-500">{scheduleHint}</p>
          </motion.div>

          <HireInquiryForm title={contact.formTitle} description={contact.formDescription} />
        </div>
      </div>
    </section>
  );
}
