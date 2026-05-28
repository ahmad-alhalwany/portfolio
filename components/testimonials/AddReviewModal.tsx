"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  isTurnstileConfigured,
  TurnstileWidget,
} from "@/components/security/TurnstileWidget";
import {
  HONEYPOT_FIELD,
  normalizeReviewInput,
  validateReviewSubmit,
} from "@/lib/security-shared";
import { StarRating } from "./StarRating";

type AddReviewModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
};

function formatSubmitError(message: string, retryAfterSec?: number): string {
  if (retryAfterSec && retryAfterSec > 0) {
    const minutes = Math.ceil(retryAfterSec / 60);
    return `${message} Try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`;
  }
  return message;
}

const inputClass =
  "w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-purple";

export function AddReviewModal({ open, onClose, onSubmitted }: AddReviewModalProps) {
  const formStartedAt = useRef(Date.now());
  const avatarBlobRef = useRef<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const captchaRequired = isTurnstileConfigured();

  const clearAvatarPreview = () => {
    if (avatarBlobRef.current) {
      URL.revokeObjectURL(avatarBlobRef.current);
      avatarBlobRef.current = null;
    }
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  useEffect(() => () => clearAvatarPreview(), []);

  const reset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setRating(5);
    clearAvatarPreview();
    setHoneypot("");
    setTurnstileToken("");
    setFieldErrors({});
    setSuccess(false);
    setError("");
    formStartedAt.current = Date.now();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const onAvatarChange = (file: File | null) => {
    clearAvatarPreview();
    if (!file) return;
    const blob = URL.createObjectURL(file);
    avatarBlobRef.current = blob;
    setAvatarPreview(blob);
    setAvatarFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const input = normalizeReviewInput({ name, email, message, rating });
    const errors = validateReviewSubmit(input);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    if (captchaRequired && !turnstileToken) {
      setError("Please complete the security check.");
      setLoading(false);
      return;
    }

    try {
      let avatarUrl: string | undefined;

      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("folder", "reviews");
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json().catch(() => ({}));
        if (!uploadRes.ok) {
          throw new Error(
            formatSubmitError(uploadData.error || "Image upload failed", uploadData.retryAfterSec)
          );
        }
        avatarUrl = uploadData.url;
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          avatar: avatarUrl,
          [HONEYPOT_FIELD]: honeypot,
          formStartedAt: formStartedAt.current,
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setFieldErrors(data.errors);
        throw new Error(formatSubmitError(data.error || "Submission failed", data.retryAfterSec));
      }

      setSuccess(true);
      onSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
            aria-label="Close form"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative z-10 flex max-h-[min(92dvh,100%)] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-purple/30 bg-slate-950 shadow-2xl shadow-purple/20 sm:max-h-[90vh] sm:rounded-3xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            {success ? (
              <div className="px-6 py-8 text-center sm:px-8">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl">
                  ✓
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Thank you!</h3>
                <p className="mt-2 text-sm text-slate-300">
                  Your review is pending approval. Once approved, it will appear on the globe.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-purple px-6 py-2.5 text-sm font-semibold text-black"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="border-b border-slate-800 px-5 py-4 sm:px-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 id="review-modal-title" className="text-xl font-bold text-white">
                        Add your review
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                        Share your experience — we verify every submission.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-400 hover:text-white"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                  <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 sm:py-5">
                  <input
                    type="text"
                    name={HONEYPOT_FIELD}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                    aria-hidden
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="block space-y-1">
                      <span className="text-xs text-slate-300 sm:text-sm">Your name *</span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                        placeholder="Jane Doe"
                      />
                      {fieldErrors.name ? (
                        <span className="text-xs text-red-400">{fieldErrors.name}</span>
                      ) : null}
                    </label>

                    <label className="block space-y-1">
                      <span className="text-xs text-slate-300 sm:text-sm">Email *</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClass}
                        placeholder="you@email.com"
                      />
                      {fieldErrors.email ? (
                        <span className="text-xs text-red-400">{fieldErrors.email}</span>
                      ) : null}
                    </label>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-300 sm:text-sm">Rating *</span>
                      <div className="flex min-h-[42px] items-center rounded-xl border border-slate-700 bg-slate-900 px-3">
                        <StarRating value={rating} onChange={setRating} size="lg" />
                      </div>
                      {fieldErrors.rating ? (
                        <span className="text-xs text-red-400">{fieldErrors.rating}</span>
                      ) : null}
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-slate-300 sm:text-sm">Photo (optional)</span>
                      <div className="flex min-h-[42px] items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                        {avatarPreview ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={avatarPreview}
                            alt=""
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs text-slate-500">
                            ?
                          </div>
                        )}
                        <label className="min-w-0 flex-1 cursor-pointer">
                          <span className="block truncate text-xs text-purple hover:underline">
                            {avatarFile ? avatarFile.name : "Choose image (max 2MB)"}
                          </span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            onChange={(e) => onAvatarChange(e.target.files?.[0] ?? null)}
                            className="hidden"
                          />
                        </label>
                        {avatarFile ? (
                          <button
                            type="button"
                            onClick={clearAvatarPreview}
                            className="shrink-0 text-xs text-slate-500 hover:text-red-300"
                          >
                            ✕
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <label className="mt-3 block space-y-1">
                    <span className="text-xs text-slate-300 sm:text-sm">Your message *</span>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClass} resize-none`}
                      placeholder="What was it like working together?"
                    />
                    {fieldErrors.message ? (
                      <span className="text-xs text-red-400">{fieldErrors.message}</span>
                    ) : null}
                  </label>

                  </div>

                  <div className="shrink-0 space-y-3 border-t border-slate-800 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
                    <TurnstileWidget
                      onToken={setTurnstileToken}
                      onExpire={() => setTurnstileToken("")}
                      className="flex justify-center scale-[0.82] origin-center sm:scale-100"
                    />

                    {error ? (
                      <p className="text-center text-xs text-red-400 sm:text-sm">{error}</p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full bg-purple py-2.5 text-sm font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Submit review"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
