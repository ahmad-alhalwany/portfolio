"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaCheck, FaPaperPlane } from "react-icons/fa";
import {
  HONEYPOT_FIELD,
  type HireInquiryInput,
  validateHireInquiry,
} from "@/lib/security-shared";
import { sendHireInquiryEmail, formatClientError } from "@/lib/emailjs-client";

type FormState = {
  name: string;
  company: string;
  email: string;
  role: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

type Props = {
  title: string;
  description: string;
};

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  role: "",
  message: "",
};

export function HireInquiryForm({ title, description }: Props) {
  const formStartedAt = useRef(Date.now());
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const input: HireInquiryInput = {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      role: form.role.trim(),
      message: form.message.trim(),
    };

    const nextErrors = validateHireInquiry(input);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact/hire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...input,
          [HONEYPOT_FIELD]: honeypot,
          formStartedAt: formStartedAt.current,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors as FieldErrors);
        throw new Error(data.error || "Submission failed");
      }

      await sendHireInquiryEmail(input);

      setStatus("success");
      setForm(initialForm);
      formStartedAt.current = Date.now();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        formatClientError(
          err,
          "Could not send right now. Try LinkedIn or email directly."
        )
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-purple/5 md:p-8"
    >
      <FormGlow />
      <h3 className="text-xl font-bold text-white md:text-2xl">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex flex-col items-center gap-4 py-12 text-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <FaCheck className="h-8 w-8" />
            </span>
            <p className="text-lg font-semibold text-white">Message received</p>
            <p className="max-w-sm text-sm text-slate-400">
              Thanks for reaching out. I typically reply to hiring teams within 1–2 business days.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm text-purple hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="relative mt-6 space-y-4">
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

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Your name"
                id="hire-name"
                value={form.name}
                onChange={(v) => update("name", v)}
                error={errors.name}
                placeholder="Sarah Chen"
              />
              <Field
                label="Company"
                id="hire-company"
                value={form.company}
                onChange={(v) => update("company", v)}
                error={errors.company}
                placeholder="Acme Corp"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Work email"
                id="hire-email"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                placeholder="you@company.com"
              />
              <Field
                label="Role / team hiring for"
                id="hire-role"
                value={form.role}
                onChange={(v) => update("role", v)}
                error={errors.role}
                placeholder="Senior Full-Stack Engineer"
              />
            </div>
            <Field
              label="Message"
              id="hire-message"
              as="textarea"
              value={form.message}
              onChange={(v) => update("message", v)}
              error={errors.message}
              placeholder="Tell me about the team, stack, and what success looks like in the first 90 days…"
            />

            {status === "error" && errorMessage ? (
              <p className="text-sm text-red-400">{errorMessage}</p>
            ) : null}
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-press focus-ring group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-purple to-violet-600 py-3.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send to hiring inbox"}
              <FaPaperPlane className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FormGlow() {
  return (
    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple/20 blur-3xl" />
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  as,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  as?: "textarea";
}) {
  const base =
    "w-full rounded-xl border bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple/60";
  const border = error ? "border-red-500/60" : "border-slate-700";

  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      {as === "textarea" ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(base, border, "resize-y min-h-[100px]")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(base, border)}
        />
      )}
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </label>
  );
}
