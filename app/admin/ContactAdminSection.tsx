"use client";

import { Content, ContactHighlight, ContactSection } from "@/lib/types";
import { isCalendlyUrl, normalizeCalendlyUrl } from "@/lib/calendly";
import { AdminResumeUpload } from "@/components/admin/AdminResumeUpload";

const defaultContact: ContactSection = {
  heading: "Hiring managers:",
  headingHighlight: "let's build your next product together.",
  description:
    "I'm a full-stack developer open to full-time roles — not freelance. Reach out for interviews, technical screens, or team fit conversations.",
  badge: "Open to full-time opportunities",
  availability: "Remote · Hybrid · Relocation considered",
  email: "ahmad.alhalwany@example.com",
  calendlyUrl: "",
  linkedinUrl: "https://www.linkedin.com/in/ahmad-alhalwany/",
  resumeUrl: "",
  highlights: [
    { id: "h1", value: "3+", label: "years experience" },
    { id: "h2", value: "Full-stack", label: "Python & Next.js" },
    { id: "h3", value: "Fast", label: "reply to recruiters" },
  ],
  formTitle: "Send a hiring inquiry",
  formDescription:
    "Recruiters: include company, role, and stack. I reply within 1–2 business days.",
  primaryCtaLabel: "Connect on LinkedIn",
  calendlyCtaLabel: "Book an intro call",
  copyright: "Copyright © 2026 Ahmad Alhalwany",
  socialMedia: [],
};

type Props = {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function ContactAdminSection({ content, setContent }: Props) {
  const contact = { ...defaultContact, ...content.contact, socialMedia: content.contact.socialMedia };

  const patch = (next: ContactSection) => {
    setContent({ ...content, contact: next });
  };

  const setField = <K extends keyof ContactSection>(key: K, value: ContactSection[K]) => {
    patch({ ...contact, [key]: value });
  };

  const updateHighlight = (id: string, key: keyof ContactHighlight, value: string) => {
    patch({
      ...contact,
      highlights: contact.highlights.map((h) => (h.id === id ? { ...h, [key]: value } : h)),
    });
  };

  const addHighlight = () => {
    patch({
      ...contact,
      highlights: [
        ...contact.highlights,
        { id: `h-${Date.now()}`, label: "label", value: "value" },
      ],
    });
  };

  const removeHighlight = (id: string) => {
    patch({ ...contact, highlights: contact.highlights.filter((h) => h.id !== id) });
  };

  const calendlyInput = contact.calendlyUrl ?? "";
  const calendlyValid = !calendlyInput.trim() || isCalendlyUrl(calendlyInput);

  const normalizeCalendlyField = () => {
    const normalized = normalizeCalendlyUrl(calendlyInput);
    if (normalized && normalized !== calendlyInput) {
      setField("calendlyUrl", normalized);
    }
  };

  return (
    <section className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
      <header>
        <h2 className="text-2xl font-semibold text-white">Hire Me / Contact</h2>
        <p className="mt-1 text-sm text-slate-400">
          Optimized for recruiters and full-time hiring. Save with the main Save button.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2 text-sm lg:col-span-2">
          Heading (before highlight)
          <input
            value={contact.heading}
            onChange={(e) => setField("heading", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Heading highlight (purple)
          <input
            value={contact.headingHighlight ?? ""}
            onChange={(e) => setField("headingHighlight", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Description
          <textarea
            value={contact.description}
            onChange={(e) => setField("description", e.target.value)}
            className="min-h-[90px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Status badge
          <input
            value={contact.badge}
            onChange={(e) => setField("badge", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Availability line
          <input
            value={contact.availability}
            onChange={(e) => setField("availability", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Public email (copy button)
          <input
            value={contact.email}
            onChange={(e) => setField("email", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          LinkedIn URL (primary CTA)
          <input
            value={contact.linkedinUrl ?? ""}
            onChange={(e) => setField("linkedinUrl", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Calendly event URL
          <input
            value={calendlyInput}
            onChange={(e) => setField("calendlyUrl", e.target.value)}
            onBlur={normalizeCalendlyField}
            placeholder="https://calendly.com/your-username/intro-call"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
          <span className="block text-xs text-slate-500">
            Paste your event link (not just calendly.com). Powers the “Book an intro call” button only — no inline embed.
          </span>
          {!calendlyValid ? (
            <span className="block text-xs text-amber-400">
              URL must be a valid Calendly link, e.g. https://calendly.com/username/30min
            </span>
          ) : calendlyInput.trim() ? (
            <a
              href={normalizeCalendlyUrl(calendlyInput)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs text-purple hover:underline"
            >
              Preview booking page →
            </a>
          ) : (
            <span className="block rounded-xl border border-dashed border-slate-700 bg-slate-950/60 px-4 py-3 text-xs leading-relaxed text-slate-400">
              <strong className="text-slate-300">Setup (5 min):</strong>{" "}
              <a
                href="https://calendly.com/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple hover:underline"
              >
                Create a free Calendly account
              </a>
              {" → "}
              add event type <em>Intro call (30 min)</em> → copy event link → paste here → Save.
              Until then, visitors can request a call via email.
            </span>
          )}
        </label>
        <AdminResumeUpload
          label="Resume PDF"
          hint="Same CV as Hero. Updating here also updates the Hero section."
          value={contact.resumeUrl ?? ""}
          onChange={(url) => {
            setContent({
              ...content,
              hero: { ...content.hero, resumeUrl: url },
              contact: { ...contact, resumeUrl: url },
            });
          }}
        />
        <label className="space-y-2 text-sm">
          LinkedIn button label
          <input
            value={contact.primaryCtaLabel}
            onChange={(e) => setField("primaryCtaLabel", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Calendly button label
          <input
            value={contact.calendlyCtaLabel}
            onChange={(e) => setField("calendlyCtaLabel", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Form title
          <input
            value={contact.formTitle}
            onChange={(e) => setField("formTitle", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Form description
          <textarea
            value={contact.formDescription}
            onChange={(e) => setField("formDescription", e.target.value)}
            className="min-h-[70px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Copyright
          <input
            value={contact.copyright}
            onChange={(e) => setField("copyright", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
      </div>

      <HighlightsEditor
        highlights={contact.highlights}
        onAdd={addHighlight}
        onRemove={removeHighlight}
        onUpdate={updateHighlight}
      />
    </section>
  );
}

function HighlightsEditor({
  highlights,
  onAdd,
  onRemove,
  onUpdate,
}: {
  highlights: ContactHighlight[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, key: keyof ContactHighlight, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <HighlightsHeader onAdd={onAdd} />
      {highlights.map((h) => (
        <div
          key={h.id}
          className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
        >
          <label className="space-y-1 text-xs text-slate-400">
            Value (bold)
            <input
              value={h.value}
              onChange={(e) => onUpdate(h.id, "value", e.target.value)}
              className="block w-28 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="space-y-1 text-xs text-slate-400">
            Label
            <input
              value={h.label}
              onChange={(e) => onUpdate(h.id, "label", e.target.value)}
              className="block w-40 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            />
          </label>
          <button
            type="button"
            onClick={() => onRemove(h.id)}
            className="ml-auto text-sm text-red-400"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

function HighlightsHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-white">Highlight pills</h3>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-xl bg-purple px-3 py-1.5 text-sm text-white"
      >
        + Add
      </button>
    </div>
  );
}
