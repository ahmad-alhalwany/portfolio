import { isUploadPath, toMediaServeUrl } from "@/lib/upload-url";

export const RESUME_PATH_EN = "/resume/ahmad-alhalwany-ai-en.pdf";
export const RESUME_PATH_DE = "/resume/ahmad-alhalwany-ai-de.pdf";
/** @deprecated Use RESUME_PATH_EN */
export const RESUME_PATH = RESUME_PATH_EN;

export const RESUME_DOWNLOAD_NAME_EN = "Ahmad-Halwany-AI-Application-Developer-CV-EN.pdf";
export const RESUME_DOWNLOAD_NAME_DE = "Ahmad-Halwany-AI-Application-Developer-CV-DE.pdf";
/** @deprecated Use RESUME_DOWNLOAD_NAME_EN */
export const RESUME_DOWNLOAD_NAME = RESUME_DOWNLOAD_NAME_EN;

export type ResumeUrls = {
  en?: string;
  de?: string;
};

export function resolveResumeUrl(resumeUrl: string = RESUME_PATH_EN): string {
  if (isUploadPath(resumeUrl)) return toMediaServeUrl(resumeUrl);
  return resumeUrl;
}

export function getResumeEnUrl(urls?: ResumeUrls): string {
  return urls?.en?.trim() || RESUME_PATH_EN;
}

export function getResumeDeUrl(urls?: ResumeUrls): string {
  return urls?.de?.trim() || RESUME_PATH_DE;
}

export function triggerResumeDownload(
  resumeUrl: string = RESUME_PATH_EN,
  downloadName: string = RESUME_DOWNLOAD_NAME_EN
) {
  const anchor = document.createElement("a");
  anchor.href = resolveResumeUrl(resumeUrl);
  anchor.download = downloadName;
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function downloadNameForUrl(resumeUrl: string, locale: "en" | "de"): string {
  const dePath = getResumeDeUrl({ de: resumeUrl });
  if (locale === "de" || resumeUrl === dePath || resumeUrl.includes("-de.")) {
    return RESUME_DOWNLOAD_NAME_DE;
  }
  return RESUME_DOWNLOAD_NAME_EN;
}
