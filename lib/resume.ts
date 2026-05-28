import { isUploadPath, toMediaServeUrl } from "@/lib/upload-url";

export const RESUME_PATH = "/resume/ahmad-alhalwany-cv.pdf";
export const RESUME_DOWNLOAD_NAME = "Ahmad-Al-Halwany-CV.pdf";

export function resolveResumeUrl(resumeUrl: string = RESUME_PATH): string {
  if (isUploadPath(resumeUrl)) return toMediaServeUrl(resumeUrl);
  return resumeUrl;
}

export function triggerResumeDownload(resumeUrl: string = RESUME_PATH) {
  const anchor = document.createElement("a");
  anchor.href = resolveResumeUrl(resumeUrl);
  anchor.download = RESUME_DOWNLOAD_NAME;
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
