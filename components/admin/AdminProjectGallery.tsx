"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdminField } from "@/components/admin/admin-ui";
import { ProjectCard } from "@/lib/types";
import { normalizeUploadUrl, toMediaServeUrl } from "@/lib/upload-url";

type Props = {
  label?: string;
  hint?: string;
  cards: ProjectCard[];
  /** Legacy single spare image — shown in gallery until removed */
  spareImg?: string;
  folder?: string;
  onChange: (cards: ProjectCard[]) => void;
  onSpareImgChange?: (url: string) => void;
  onUploaded?: (url: string, file: File) => void;
};

const PREVIEW_H = "h-28";

export function AdminProjectGallery({
  label = "Gallery images",
  hint = "Extra screenshots shown in the project case study gallery. Add, reorder, or remove.",
  cards = [],
  spareImg = "",
  folder = "projects",
  onChange,
  onSpareImgChange,
  onUploaded,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const blobUrlsRef = useRef<Map<string, string>>(new Map());
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [blobPreviews, setBlobPreviews] = useState<Record<string, string>>({});

  useEffect(
    () => () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current.clear();
    },
    []
  );

  const attachBlobPreview = (storedUrl: string, file: File) => {
    const blob = URL.createObjectURL(file);
    blobUrlsRef.current.set(storedUrl, blob);
    setBlobPreviews((prev) => ({ ...prev, [storedUrl]: blob }));
  };

  const clearBlobPreview = (storedUrl: string) => {
    const blob = blobUrlsRef.current.get(storedUrl);
    if (blob) {
      URL.revokeObjectURL(blob);
      blobUrlsRef.current.delete(storedUrl);
    }
    setBlobPreviews((prev) => {
      const next = { ...prev };
      delete next[storedUrl];
      return next;
    });
  };

  const legacySpare =
    spareImg?.trim() &&
    !cards.some((c) => normalizeUploadUrl(c.src) === normalizeUploadUrl(spareImg))
      ? spareImg
      : "";

  const items: ProjectCard[] = [
    ...cards,
    ...(legacySpare ? [{ src: legacySpare }] : []),
  ];

  const setItems = (next: ProjectCard[]) => {
    if (legacySpare && onSpareImgChange) {
      onSpareImgChange("");
    }
    onChange(next.map((c) => ({ src: normalizeUploadUrl(c.src) })));
  };

  const uploadOne = useCallback(
    async (file: File): Promise<string | null> => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      return normalizeUploadUrl(data.url);
    },
    [folder]
  );

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (list.length === 0) {
      setError("Please choose image files (PNG, JPG, WebP, GIF, SVG).");
      return;
    }

    setUploading(true);
    setError("");
    const added: ProjectCard[] = [];

    try {
      for (const file of list) {
        const url = await uploadOne(file);
        if (url) {
          attachBlobPreview(url, file);
          added.push({ src: url });
          onUploaded?.(url, file);
        }
      }
      if (added.length > 0) {
        setItems([...items, ...added]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index: number) => {
    const removed = items[index];
    if (removed) clearBlobPreview(normalizeUploadUrl(removed.src));
    setItems(items.filter((_, i) => i !== index));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
  };

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
          void uploadFiles(e.dataTransfer.files);
        }}
      >
        {uploading ? (
          <p className="py-4 text-sm text-purple">Uploading…</p>
        ) : (
          <>
            <p className="text-sm">Drag & drop one or more images, or</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-3 inline-flex rounded-full bg-purple px-4 py-2 text-sm font-semibold text-black transition hover:bg-purple/90"
            >
              Choose files
            </button>
            <p className="mt-2 text-xs text-slate-500">Max 2MB each · PNG, JPG, WebP, GIF, SVG</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && void uploadFiles(e.target.files)}
        />
      </div>

      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}

      {items.length > 0 ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((card, index) => {
            const src = normalizeUploadUrl(card.src);
            const previewSrc = blobPreviews[src] || toMediaServeUrl(src, src);
            return (
              <li
                key={`${src}-${index}`}
                className="overflow-hidden rounded-xl border border-white/10 bg-black/40"
              >
                <div className={`relative w-full ${PREVIEW_H} min-h-[7rem] bg-black/60`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={previewSrc}
                    src={previewSrc}
                    alt=""
                    className="absolute inset-0 h-full w-full object-contain object-center"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-slate-950/80 px-3 py-2">
                  <p className="min-w-0 flex-1 truncate text-xs text-slate-500" title={src}>
                    {src}
                  </p>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                      className="rounded border border-slate-600 px-2 py-0.5 text-xs text-slate-400 disabled:opacity-30"
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={index === items.length - 1}
                      onClick={() => move(index, 1)}
                      className="rounded border border-slate-600 px-2 py-0.5 text-xs text-slate-400 disabled:opacity-30"
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAt(index)}
                      className="rounded border border-red-500/40 px-2 py-0.5 text-xs text-red-300 hover:bg-red-500/10"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-500">No gallery images yet.</p>
      )}
    </AdminField>
  );
}
