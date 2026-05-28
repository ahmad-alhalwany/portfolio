"use client";

import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { BlogPostPublic } from "@/lib/types";

type ThreeDMarqueeProps = {
  posts: BlogPostPublic[];
  className?: string;
  size?: "default" | "large";
};

const sizeStyles = {
  default: {
    container: "min-h-[520px] md:min-h-[580px]",
    inner: "scale-[1.02]",
    card: "h-44 w-64 sm:h-48 sm:w-72",
    gap: "gap-5 md:gap-6",
    title: "text-sm",
    imageSizes: "(max-width: 640px) 256px, 288px",
  },
  large: {
    container: "min-h-[600px] md:min-h-[720px] lg:min-h-[780px]",
    inner: "scale-[1.08] md:scale-110",
    card: "h-52 w-72 sm:h-60 sm:w-80 md:h-64 md:w-[22rem]",
    gap: "gap-6 md:gap-8",
    title: "text-sm md:text-base",
    imageSizes: "(max-width: 640px) 288px, 352px",
  },
};

export function ThreeDMarquee({ posts, className, size = "default" }: ThreeDMarqueeProps) {
  if (posts.length === 0) return null;

  const styles = sizeStyles[size];

  const images = posts.map((p) => ({
    src: p.coverImage || "/project/plaze1.png",
    slug: p.slug,
    title: p.title,
  }));

  const columns = Math.min(4, Math.max(3, images.length >= 6 ? 4 : 3));
  const chunked: typeof images[] = Array.from({ length: columns }, () => []);
  images.forEach((img, i) => {
    chunked[i % columns].push(img);
  });

  return (
    <div className={cn("relative w-full overflow-hidden", styles.container, className)}>
      <MarqueeInner columns={chunked} styles={styles} />
      <MarqueeTopFade />
      <MarqueeBottomFade />
    </div>
  );
}

function MarqueeInner({
  columns,
  styles,
}: {
  columns: { src: string; slug: string; title: string }[][];
  styles: (typeof sizeStyles)["default"];
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center [perspective:1600px]",
        styles.gap
      )}
    >
      <div
        className={cn("flex justify-center", styles.gap, styles.inner)}
        style={{ transform: "rotateX(38deg) rotateZ(-6deg)" }}
      >
        {columns.map((column, colIndex) => (
          <MarqueeColumn key={colIndex} column={column} colIndex={colIndex} styles={styles} />
        ))}
      </div>
    </div>
  );
}

function MarqueeColumn({
  column,
  colIndex,
  styles,
}: {
  column: { src: string; slug: string; title: string }[];
  colIndex: number;
  styles: (typeof sizeStyles)["default"];
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        styles.gap,
        colIndex % 2 === 0 ? "animate-marquee-up" : "animate-marquee-down"
      )}
    >
      {[...column, ...column].map((item, i) => (
        <Link
          key={`${item.slug}-${i}`}
          href={`/blog/${item.slug}`}
          className={cn(
            "group relative shrink-0 overflow-hidden rounded-2xl border-2 border-slate-600/80 bg-slate-900 shadow-2xl shadow-black/50 transition duration-300",
            "hover:z-10 hover:scale-[1.03] hover:border-purple/60 hover:shadow-purple/25",
            styles.card
          )}
        >
          <OptimizedImage
            src={item.src}
            alt={item.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes={styles.imageSizes}
          />
          <MarqueeCardOverlay title={item.title} titleClass={styles.title} />
        </Link>
      ))}
    </div>
  );
}

function MarqueeCardOverlay({ title, titleClass }: { title: string; titleClass: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-4 pb-4 pt-10">
      <p className={cn("line-clamp-2 font-semibold leading-snug text-white", titleClass)}>{title}</p>
    </div>
  );
}

function MarqueeTopFade() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950 to-transparent md:h-20" />
  );
}

function MarqueeBottomFade() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 to-transparent md:h-24" />
  );
}