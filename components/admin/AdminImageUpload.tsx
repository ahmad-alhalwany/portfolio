"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdminField } from "@/components/admin/admin-ui";
import { normalizeUploadUrl, toMediaServeUrl } from "@/lib/upload-url";

type Props = {
  label: string;
  hint?: string;
  value: string;
  /** Subfolder under public/uploads, e.g. education */
  folder: string;
  onChange: (url: string) => void;
  /** Called after a successful file upload (e.g. refresh media library) */
  onUploaded?: (url: string, file: File) => void;
  /** Show a collapsible manual path field (for legacy /public paths) */
  allowManualUrl?: boolean;
  previewHeight?: "sm" | "md" | "lg";
};

const PREVIEW_H = { sm: "h-24", md: "h-32", lg: "h-40" };
const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export function AdminImageUpload({
  label,
  hint,
  value,
  folder,
  onChange,
  allowManualUrl = true,
  previewHeight = "md",
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const blobRef = useRef<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [manualOpen, setManualOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [previewVersion, setPreviewVersion] = useState(0);

  const clearBlob = useCallback(() => {
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current);
      blobRef.current = null;
    }
    setLocalPreview(null);
  }, []);

  useEffect(() => () => clearBlob(), [clearBlob]);

  const setBlobPreview = useCallback((file: File) => {
    clearBlob();
    const blob = URL.createObjectURL(file);
    blobRef.current = blob;
    setLocalPreview(blob);
  }, [clearBlob]);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError("");
      setBlobPreview(file);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = (await res.json()) as { url?: string; error?: string };
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Upload failed");
        }
        const url = normalizeUploadUrl(data.url);
        onChange(url);
        onUploaded?.(url, file);
        setPreviewVersion((v) => v + 1);
      } catch (e) {
        clearBlob();
        setError(e instanceof Error ? e.message : "Upload failed");
      } finally {
        setUploading(false);
        if (inputRef.current) inputRef.current.value = "";
      }
    },
    [clearBlob, folder, onChange, onUploaded, setBlobPreview]
  );

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (PNG, JPG, WebP, GIF, SVG).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError(`File too large — max 2MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`);
      return;
    }
    void upload(file);
  };

  const storedPreview =
    value && !value.startsWith("/uploads/") && !value.startsWith("/api/media/")
      ? value
      : value
        ? toMediaServeUrl(value, previewVersion || value)
        : "";

  const previewSrc = localPreview || storedPreview;

  return (
    <AdminField label={label} hint={hint}>
      <div
        className={`rounded-2xl border border-dashed p-4 text-center transition ${
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
          <p className="py-4 text-sm text-purple">Uploading…</p>
        ) : (
          <>
            <p className="text-sm">Drag & drop an image, or</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-3 inline-flex rounded-full bg-purple px-4 py-2 text-sm font-semibold text-black transition hover:bg-purple/90"
            >
              Choose file
            </button>
            <p className="mt-2 text-xs text-slate-500">Max 2MB · PNG, JPG, WebP, GIF, SVG</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>

      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}

      {previewSrc ? (
        <div className="relative mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <div
            className={`relative w-full ${PREVIEW_H[previewHeight]} min-h-[8rem] bg-black/60`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={previewSrc}
              src={previewSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-contain object-center"
              onError={() => {
                if (localPreview) return;
                setError("Preview failed to load. Save changes and refresh the page.");
              }}
            />
          </div>
          <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-slate-950/80 px-3 py-2">
            <p className="min-w-0 truncate text-xs text-slate-500" title={normalizeUploadUrl(value)}>
              {value ? normalizeUploadUrl(value) : "Local preview"}
            </p>
            <button
              type="button"
              onClick={() => {
                clearBlob();
                onChange("");
              }}
              className="shrink-0 rounded-lg border border-red-500/40 px-2 py-1 text-xs text-red-300 transition hover:bg-red-500/10"
            >
              Remove
            </button>
          </div>
        </div>
      ) : null}

      {allowManualUrl ? (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setManualOpen((o) => !o)}
            className="text-xs text-slate-500 underline-offset-2 hover:text-purple hover:underline"
          >
            {manualOpen ? "Hide manual path" : "Use existing path instead (e.g. /certificates/…)"}
          </button>
          {manualOpen ? (
            <input
              type="text"
              value={value}
              onChange={(e) => {
                clearBlob();
                onChange(normalizeUploadUrl(e.target.value));
                setPreviewVersion((v) => v + 1);
              }}
              placeholder="/education/example.png"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            />
          ) : null}
        </div>
      ) : null}
    </AdminField>
  );
}
