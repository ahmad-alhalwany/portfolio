"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdminField } from "@/components/admin/admin-ui";
import { RESUME_DOWNLOAD_NAME_EN } from "@/lib/resume";
import { normalizeUploadUrl, toMediaServeUrl } from "@/lib/upload-url";

type Props = {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
};

function previewUrl(url: string, version: number): string {
  if (!url) return "";
  const normalized = normalizeUploadUrl(url);
  if (normalized.startsWith("/uploads/")) {
    return toMediaServeUrl(normalized, version);
  }
  return normalized;
}

function fileNameFromUrl(url: string): string {
  return url.split("/").pop() || "";
}

const MAX_RESUME_BYTES = 8 * 1024 * 1024;

function isPdfFile(file: File): boolean {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".pdf")) return false;
  if (!file.type || file.type === "application/octet-stream") return true;
  return file.type === "application/pdf" || file.type === "application/x-pdf";
}

async function parseJsonResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text.trim()) {
    throw new Error(`Request failed (${res.status})`);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(text.slice(0, 120) || `Request failed (${res.status})`);
  }
}

export function AdminResumeUpload({ label, hint, value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [previewVersion, setPreviewVersion] = useState(0);

  const upload = useCallback(
    async (file: File, replaceName?: string) => {
      if (!isPdfFile(file)) {
        setError("Please choose a PDF file (.pdf).");
        return;
      }
      if (file.size > MAX_RESUME_BYTES) {
        setError(`File too large — max 8MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
        return;
      }

      setUploading(true);
      setError("");

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "resume");
        if (replaceName) formData.append("replace", replaceName);

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await parseJsonResponse<{ url?: string; error?: string }>(res);
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Upload failed");
        }

        const newUrl = normalizeUploadUrl(data.url);
        const previousUrl = value;

        if (
          previousUrl &&
          previousUrl !== newUrl &&
          (previousUrl.startsWith("/uploads/") || previousUrl.startsWith("/resume/")) &&
          previousUrl.startsWith("/uploads/resume/") // only auto-delete uploads-resume (not committed static PDFs)
        ) {
          await fetch("/api/resume", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: previousUrl }),
          }).catch(() => undefined);
        }

        onChange(newUrl);
        setPreviewVersion((v) => v + 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
        if (replaceInputRef.current) replaceInputRef.current.value = "";
      }
    },
    [onChange, value]
  );

  const onFile = (file: File | undefined) => {
    if (!file) return;
    void upload(file);
  };

  const onReplace = (file: File | undefined) => {
    if (!file) return;
    let replaceName: string | undefined;
    if (value.startsWith("/uploads/resume/")) {
      replaceName = fileNameFromUrl(value);
    } else if (value.startsWith("/resume/")) {
      replaceName = fileNameFromUrl(value);
    }
    void upload(file, replaceName);
  };

  const remove = async () => {
    if (!value) {
      onChange("");
      return;
    }
    if (!value.startsWith("/uploads/") && !value.startsWith("/resume/")) {
      onChange("");
      return;
    }
    setDeleting(true);
    setError("");
    try {
      const res = await fetch("/api/resume", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      if (!res.ok) {
        const data = await parseJsonResponse<{ error?: string }>(res);
        throw new Error(data.error || "Failed to delete file");
      }
      onChange("");
      setPreviewVersion((v) => v + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete file");
    } finally {
      setDeleting(false);
    }
  };

  const src = previewUrl(value, previewVersion);
  const displayName = value ? fileNameFromUrl(value) : "";

  useEffect(() => {
    if (value) setPreviewVersion((v) => v + 1);
  }, [value]);

  return (
    <AdminField label={label} hint={hint} className="lg:col-span-2">
      {value && src ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-950/80 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white" title={displayName}>
                {displayName}
              </p>
              <p className="truncate text-xs text-slate-500" title={normalizeUploadUrl(value)}>
                {normalizeUploadUrl(value)}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200 transition hover:border-purple/50 hover:text-white"
              >
                Open
              </a>
              <button
                type="button"
                onClick={() => replaceInputRef.current?.click()}
                disabled={uploading || deleting}
                className="rounded-lg border border-purple/40 px-3 py-1.5 text-xs text-purple transition hover:bg-purple/10 disabled:opacity-50"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => void remove()}
                disabled={uploading || deleting}
                className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
              >
                {deleting ? "Removing…" : "Remove"}
              </button>
            </div>
          </div>

          <iframe
            key={src}
            src={src}
            title={`CV preview — ${RESUME_DOWNLOAD_NAME_EN}`}
            className="h-72 w-full bg-white"
          />

          <input
            ref={replaceInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => onReplace(e.target.files?.[0])}
          />
        </div>
      ) : (
        <div
          className={`rounded-2xl border border-dashed p-5 text-center transition ${
            dragOver
              ? "border-purple bg-purple/10 text-white"
              : "border-white/15 bg-black/30 text-slate-400 hover:border-purple/40 hover:text-slate-200"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            onFile(e.dataTransfer.files?.[0]);
          }}
        >
          {uploading ? (
            <p className="py-4 text-sm text-purple">Uploading CV…</p>
          ) : (
            <>
              <p className="text-sm">Drag & drop your CV (PDF), or</p>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-3 inline-flex rounded-full bg-purple px-4 py-2 text-sm font-semibold text-black transition hover:bg-purple/90"
              >
                Choose PDF
              </button>
              <p className="mt-2 text-xs text-slate-500">Max 8MB · PDF only · works on mobile</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>
      )}

      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
    </AdminField>
  );
}
