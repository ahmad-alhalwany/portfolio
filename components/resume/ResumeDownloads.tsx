"use client";

import { FaDownload, FaFilePdf } from "react-icons/fa";
import {
  RESUME_DOWNLOAD_NAME_DE,
  RESUME_DOWNLOAD_NAME_EN,
  RESUME_PATH_DE,
  RESUME_PATH_EN,
  getResumeDeUrl,
  getResumeEnUrl,
  resolveResumeUrl,
  triggerResumeDownload,
  type ResumeUrls,
} from "@/lib/resume";
import { cn } from "@/lib/utils";

type Variant = "buttons" | "compact" | "links";

type Props = {
  urls?: ResumeUrls;
  enLabel?: string;
  deLabel?: string;
  variant?: Variant;
  className?: string;
};

export function ResumeDownloads({
  urls,
  enLabel = "CV · English",
  deLabel = "CV · Deutsch",
  variant = "buttons",
  className,
}: Props) {
  const enUrl = getResumeEnUrl(urls);
  const deUrl = getResumeDeUrl(urls);

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        <button
          type="button"
          onClick={() => triggerResumeDownload(enUrl, RESUME_DOWNLOAD_NAME_EN)}
          className="inline-flex items-center gap-1.5 rounded-full border border-purple/40 bg-purple/10 px-3 py-1.5 text-xs font-semibold text-purple transition hover:bg-purple/20"
        >
          <FaFilePdf className="h-3 w-3" />
          EN
        </button>
        <button
          type="button"
          onClick={() => triggerResumeDownload(deUrl, RESUME_DOWNLOAD_NAME_DE)}
          className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
        >
          <FaFilePdf className="h-3 w-3" />
          DE
        </button>
      </div>
    );
  }

  if (variant === "links") {
    return (
      <div className={cn("flex flex-wrap justify-center gap-3", className)}>
        <a
          href={resolveResumeUrl(enUrl)}
          download={RESUME_DOWNLOAD_NAME_EN}
          className="btn-press inline-flex items-center gap-2 rounded-full border border-purple/40 bg-purple/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-purple/20"
        >
          <FaFilePdf className="h-4 w-4 text-purple" />
          {enLabel}
        </a>
        <a
          href={resolveResumeUrl(deUrl)}
          download={RESUME_DOWNLOAD_NAME_DE}
          className="btn-press inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500/15"
        >
          <FaFilePdf className="h-4 w-4 text-cyan-300" />
          {deLabel}
        </a>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row", className)}>
      <button
        type="button"
        onClick={() => triggerResumeDownload(enUrl, RESUME_DOWNLOAD_NAME_EN)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-purple/40 bg-purple/10 px-5 py-3 text-sm font-semibold text-purple transition hover:border-purple/60 hover:bg-purple/15"
      >
        <FaDownload className="h-3.5 w-3.5" />
        {enLabel}
      </button>
      <button
        type="button"
        onClick={() => triggerResumeDownload(deUrl, RESUME_DOWNLOAD_NAME_DE)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-500/50 hover:bg-cyan-500/15"
      >
        <FaDownload className="h-3.5 w-3.5" />
        {deLabel}
      </button>
    </div>
  );
}

export function resumeUrlsFromContent(hero?: ResumeUrls & { resumeUrl?: string; resumeUrlDe?: string }) {
  return {
    en: hero?.resumeUrl ?? hero?.en ?? RESUME_PATH_EN,
    de: hero?.resumeUrlDe ?? hero?.de ?? RESUME_PATH_DE,
  };
}
