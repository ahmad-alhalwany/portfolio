"use client";

import { useState } from "react";
import { FaLinkedin, FaTwitter, FaLink, FaCheck } from "react-icons/fa";

type Props = {
  title: string;
  slug: string;
};

export function BlogShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `https://portfolio-xi-opal-35.vercel.app/blog/${slug}`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for older browsers.
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
      <span className="mr-1 text-xs uppercase tracking-[0.18em] text-slate-500">Share</span>

      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#0a66c2]/40 bg-[#0a66c2]/10 text-[#3ba3ff] transition hover:bg-[#0a66c2]/20"
      >
        <FaLinkedin className="h-3.5 w-3.5" />
      </a>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-purple/40 hover:text-purple"
      >
        <FaTwitter className="h-3.5 w-3.5" />
      </a>

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-purple/40 hover:text-purple"
      >
        {copied ? <FaCheck className="h-3.5 w-3.5 text-emerald-400" /> : <FaLink className="h-3.5 w-3.5" />}
      </button>

      {copied ? (
        <span className="ml-1 text-xs text-emerald-400">Link copied to clipboard</span>
      ) : null}
    </div>
  );
}
