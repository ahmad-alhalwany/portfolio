"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SIZES } from "@/lib/image-config";
import { IconX } from "@tabler/icons-react";

type Props = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const unique = Array.from(new Set(images.filter(Boolean)));

  if (unique.length === 0) return null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {unique.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActive(src)}
            className="group relative aspect-video min-h-[11rem] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 transition hover:border-purple/40 hover:shadow-[0_0_30px_rgba(203,172,249,0.12)] sm:min-h-0"
          >
            <OptimizedImage
              src={src}
              alt={`${title} screenshot ${index + 1}`}
              fill
              sizes={SIZES.blogCard}
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-3 left-3 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
              View full size
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 rounded-full border border-slate-700 bg-slate-900 p-2 text-white"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <IconX className="h-5 w-5" />
            </button>
            <motion.div
              className="relative max-h-[90vh] w-full max-w-5xl"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={active}
                alt={title}
                width={1200}
                height={800}
                className="h-auto max-h-[90vh] w-full rounded-2xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

