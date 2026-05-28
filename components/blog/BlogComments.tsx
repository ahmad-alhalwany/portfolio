"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComment } from "react-icons/fa";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  HONEYPOT_FIELD,
  validateCommentSubmit,
} from "@/lib/security-shared";
import {
  isTurnstileConfigured,
  TurnstileWidget,
} from "@/components/security/TurnstileWidget";
import { BlogCommentPublic } from "@/lib/types";

type Props = {
  postSlug: string;
};

export function BlogComments({ postSlug }: Props) {
  const { t } = useLocale();
  const formStartedAt = useRef(Date.now());
  const [comments, setComments] = useState<BlogCommentPublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const captchaRequired = isTurnstileConfigured();

  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(postSlug)}`);
      if (!res.ok) throw new Error("load failed");
      const data = await res.json();
      setComments(data.comments ?? []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [postSlug]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setFeedback("");
    setFieldErrors({});

    const input = { postSlug, name, email, message };
    const errors = validateCommentSubmit(input);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitting(false);
      return;
    }

    if (captchaRequired && !turnstileToken) {
      setError(t("blog.commentCaptcha"));
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          [HONEYPOT_FIELD]: honeypot,
          formStartedAt: formStartedAt.current,
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || data.errors?.message || "Failed");
      }
      setFeedback(data.message || t("blog.commentPending"));
      setName("");
      setEmail("");
      setMessage("");
      setTurnstileToken("");
      formStartedAt.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("blog.commentError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-16" aria-label="Comments">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple">
          {t("blog.commentsKicker")}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-white">{t("blog.commentsTitle")}</h2>
        <p className="mt-1 text-sm text-slate-400">{t("blog.commentsSubtitle")}</p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500">{t("blog.commentsLoading")}</p>
      ) : comments.length > 0 ? (
        <ul className="mb-8 space-y-4">
          {comments.map((c) => (
            <li
              key={c.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-white">{c.name}</span>
                <time className="text-xs text-slate-500" dateTime={c.createdAt}>
                  {new Date(c.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-6 text-sm text-slate-500">{t("blog.commentsEmpty")}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-800 bg-slate-950/50 p-6 md:p-8"
      >
        <div className="mb-4 flex items-center gap-2 text-white">
          <FaComment className="text-purple" />
          <span className="font-medium">{t("blog.commentFormTitle")}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2 text-sm">
            <span className="text-slate-300">{t("blog.commentName")}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-purple/50"
              disabled={submitting}
            />
            {fieldErrors.name && (
              <span className="text-xs text-red-400">{fieldErrors.name}</span>
            )}
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-slate-300">{t("blog.commentEmail")}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-purple/50"
              disabled={submitting}
            />
            {fieldErrors.email && (
              <span className="text-xs text-red-400">{fieldErrors.email}</span>
            )}
          </label>
        </div>

        <label className="mt-4 block space-y-2 text-sm">
          <span className="text-slate-300">{t("blog.commentMessage")}</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full resize-y rounded-xl border border-slate-700 bg-black/40 px-4 py-2.5 text-white outline-none focus:border-purple/50"
            disabled={submitting}
          />
          {fieldErrors.message && (
            <span className="text-xs text-red-400">{fieldErrors.message}</span>
          )}
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

        {captchaRequired && (
          <div className="mt-4">
            <TurnstileWidget onToken={setTurnstileToken} onExpire={() => setTurnstileToken("")} />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 rounded-xl bg-purple px-6 py-2.5 text-sm font-semibold text-black transition hover:bg-purple/90 disabled:opacity-60"
        >
          {submitting ? t("blog.commentSending") : t("blog.commentSubmit")}
        </button>

        <AnimatePresence mode="wait">
          {feedback && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm text-emerald-400"
              role="status"
            >
              {feedback}
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
    </section>
  );
}
