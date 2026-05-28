"use client";

import Image, { type ImageProps } from "next/image";
import { IMAGE_QUALITY, isOptimizableImage } from "@/lib/image-config";
import { isUploadPath, toMediaServeUrl } from "@/lib/upload-url";
import { cn } from "@/lib/utils";

type OptimizedImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Use plain img for SVG (default true) */
  allowSvgNative?: boolean;
};

/**
 * next/image wrapper: WebP/AVIF, lazy load, sizes — skips optimization for SVG.
 */
export function OptimizedImage({
  src,
  alt,
  className,
  allowSvgNative = true,
  quality = IMAGE_QUALITY,
  ...props
}: OptimizedImageProps) {
  if (!src) return null;

  const resolvedSrc = isUploadPath(src) ? toMediaServeUrl(src) : src;

  if (allowSvgNative && resolvedSrc.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={resolvedSrc} alt={alt} className={cn(className)} loading="lazy" decoding="async" />
    );
  }

  if (!isOptimizableImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={resolvedSrc} alt={alt} className={cn(className)} loading="lazy" decoding="async" />
    );
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      className={cn(className)}
      quality={quality}
      unoptimized={isUploadPath(src)}
      {...props}
    />
  );
}
