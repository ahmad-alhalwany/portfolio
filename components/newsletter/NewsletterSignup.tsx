"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  HONEYPOT_FIELD,
  validateNewsletterEmail,
} from "@/lib/security-shared";
import { formatClientError } from "@/lib/emailjs-client";
import { cn } from "@/lib/utils";

type Variant = "footer" | "inline";

type Props = {
  variant?: Variant;
  className?: string;
};

export function NewsletterSignup({ variant = "footer", className }: Props) {
  const { t } = useLocale();
  const formStartedAt = useRef(Date.now());
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");

  const isInline = variant === "inline";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setFieldError("");

    const errors = validateNewsletterEmail(email);
    if (Object.keys(errors).length > 0) {
      setFieldError(errors.email);
      setLoading(false);
      return;
    }

    if (!consent) {
      setError(t("newsletter.consentRequired"));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          [HONEYPOT_FIELD]: honeypot,
          formStartedAt: formStartedAt.current,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || data.errors?.email || "Subscribe failed");
      }

      setMessage(data.message || t("newsletter.success"));
      setEmail("");
      setConsent(false);
      formStartedAt.current = Date.now();
    } catch (err) {
      setError(formatClientError(err, t("newsletter.error")));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-purple/20",
        isInline
          ? "bg-slate-950/50 p-6 md:p-8"
          : "mx-auto max-w-2xl bg-gradient-to-br from-purple/10 via-slate-950/90 to-slate-950/90 px-6 py-8 md:px-10",
        className
      )}
      aria-labelledby="newsletter-heading"
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10">
        <div className={cn("flex gap-3", isInline ? "flex-col sm:flex-row sm:items-center" : "flex-col items-center text-center")}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-purple/30 bg-purple/10 text-purple">
            <FaEnvelope className="h-5 w-5" />
          </span>
          <div className={isInline ? "" : "max-w-lg"}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">
              {t("newsletter.kicker")}
            </p>
            <h2
              id="newsletter-heading"
              className={cn("font-bold text-white", isInline ? "text-xl" : "text-2xl")}
            >
              {t("newsletter.title")}
            </h2>
            <p className="mt-1 text-sm text-slate-400">{t("newsletter.subtitle")}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={cn("mt-6", isInline ? "max-w-xl" : "mx-auto w-full max-w-md")}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple/50 focus:ring-2 focus:ring-purple/20"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple px-5 py-3 text-sm font-semibold text-black transition hover:bg-purple/90 disabled:opacity-60"
            >
              <FaPaperPlane className="h-3.5 w-3.5" />
              {loading ? t("newsletter.sending") : t("newsletter.cta")}
            </button>
          </div>

          {fieldError && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {fieldError}
            </p>
          )}

          <label className="mt-4 flex cursor-pointer items-start gap-3 text-left text-xs text-slate-400">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-slate-950 text-purple focus:ring-purple"
            />
            <span>{t("newsletter.consent")}</span>
          </label>

          <input
            type="text"
            name={HONEYPOT_FIELD}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-sm text-emerald-400"
                role="status"
              >
                {message}
              </motion.p>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-sm text-red-400"
                role="alert"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}
