"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCookieBite, FaTimes } from "react-icons/fa";

const STORAGE_KEY = "ahmad-portfolio-cookie-consent";
const CONSENT_VERSION = "v1";

type ConsentChoice = "all" | "essential" | null;

type StoredConsent = {
  version: string;
  choice: Exclude<ConsentChoice, null>;
  timestamp: string;
};

function readStored(): ConsentChoice {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.version !== CONSENT_VERSION) return null;
    return parsed.choice;
  } catch {
    return null;
  }
}

function writeStored(choice: Exclude<ConsentChoice, null>) {
  if (typeof window === "undefined") return;
  const payload: StoredConsent = {
    version: CONSENT_VERSION,
    choice,
    timestamp: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: choice }));
}

export function getConsentChoice(): ConsentChoice {
  return readStored();
}

export function isAnalyticsAllowed(): boolean {
  return readStored() === "all";
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      if (readStored() === null) setVisible(true);
    }, 600);
    return () => window.clearTimeout(t);
  }, []);

  const acceptAll = () => {
    writeStored("all");
    setVisible(false);
  };

  const acceptEssential = () => {
    writeStored("essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-950/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
        <div className="flex items-start gap-4">
          <span className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple/30 bg-purple/10 text-purple sm:flex">
            <FaCookieBite className="h-5 w-5" />
          </span>
          <div className="flex-1 text-sm text-slate-300">
            <p className="leading-relaxed">
              I use cookies for essential functionality (theme, language, session) and — only with
              your permission — anonymous analytics via Google Analytics to understand which
              content is useful. See the{" "}
              <Link href="/privacy" className="text-purple hover:underline">
                privacy policy
              </Link>{" "}
              for details.
            </p>

            {openSettings ? (
              <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
                <div className="flex items-center justify-between gap-3">
                  <span>
                    <strong className="text-slate-200">Essential</strong> — theme, language, session
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                    Always on
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>
                    <strong className="text-slate-200">Analytics</strong> — Google Analytics 4
                    (anonymous, opt-in)
                  </span>
                  <span className="text-slate-500">Optional</span>
                </div>
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-lg bg-purple px-4 py-2 text-xs font-semibold text-white transition hover:bg-purple/90"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={acceptEssential}
                className="rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-purple/40 hover:text-white"
              >
                Essential only
              </button>
              <button
                type="button"
                onClick={() => setOpenSettings((o) => !o)}
                className="rounded-lg px-3 py-2 text-xs text-slate-400 underline-offset-2 hover:text-purple hover:underline"
              >
                {openSettings ? "Hide details" : "Details"}
              </button>
              <button
                type="button"
                aria-label="Close"
                onClick={acceptEssential}
                className="ml-auto rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
              >
                <FaTimes className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
