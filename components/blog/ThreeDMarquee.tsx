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

/** Use a static grid for small lists — avoids marquee clone duplicates. */
const MARQUEE_MIN_POSTS = 5;

function isCertificateCover(src: string): boolean {
  return src.includes("/certificates/");
}

type PostCard = { src: string; slug: string; title: string };

function toCards(posts: BlogPostPublic[]): PostCard[] {
  return posts.map((p) => ({
    src: p.coverImage || "/project/plaze1.png",
    slug: p.slug,
    title: p.title,
  }));
}

export function ThreeDMarquee({ posts, className, size = "default" }: ThreeDMarqueeProps) {
  if (posts.length === 0) return null;

  if (posts.length < MARQUEE_MIN_POSTS) {
    return <BlogPostGrid posts={posts} className={className} size={size} />;
  }

  const styles = sizeStyles[size];
  const images = toCards(posts);
  const columns = Math.min(4, Math.max(3, images.length >= 6 ? 4 : 3));
  const chunked: PostCard[][] = Array.from({ length: columns }, () => []);
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

function BlogPostGrid({
  posts,
  className,
  size,
}: {
  posts: BlogPostPublic[];
  className?: string;
  size: "default" | "large";
}) {
  const titleClass = size === "large" ? "text-base md:text-lg" : "text-sm md:text-base";

  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        size === "large" && "md:gap-6 lg:grid-cols-3",
        className
      )}
    >
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          src={post.coverImage || "/project/plaze1.png"}
          slug={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          titleClass={titleClass}
          tall={size === "large"}
        />
      ))}
    </div>
  );
}

function BlogPostCard({
  src,
  slug,
  title,
  excerpt,
  titleClass,
  tall,
}: {
  src: string;
  slug: string;
  title: string;
  excerpt?: string;
  titleClass: string;
  tall?: boolean;
}) {
  const cert = isCertificateCover(src);

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-xl shadow-black/40 transition duration-300",
        "hover:border-purple/50 hover:shadow-purple/20",
        tall ? "min-h-[280px] sm:min-h-[320px]" : "min-h-[240px]"
      )}
    >
      <div className={cn("relative h-40 sm:h-48", tall && "sm:h-52 md:h-56")}>
        <OptimizedImage
          src={src}
          alt={title}
          fill
          className={cn(
            "transition duration-500 group-hover:scale-[1.02]",
            cert ? "object-contain bg-slate-950 p-3" : "object-cover"
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
        {!cert && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        )}
      </div>
      <div className="space-y-2 p-4 md:p-5">
        <p className={cn("line-clamp-2 font-semibold leading-snug text-white", titleClass)}>{title}</p>
        {excerpt ? (
          <p className="line-clamp-2 text-sm text-slate-400">{excerpt}</p>
        ) : null}
      </div>
    </Link>
  );
}

function MarqueeInner({
  columns,
  styles,
}: {
  columns: PostCard[][];
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
  column: PostCard[];
  colIndex: number;
  styles: (typeof sizeStyles)["default"];
}) {
  if (column.length === 0) return null;

  const loopItems = column.length >= 2 ? [...column, ...column] : column;

  return (
    <div
      className={cn(
        "flex flex-col",
        styles.gap,
        column.length >= 2 && (colIndex % 2 === 0 ? "animate-marquee-up" : "animate-marquee-down")
      )}
    >
      {loopItems.map((item, i) => (
        <Link
          key={`${item.slug}-${i}`}
          href={`/blog/${item.slug}`}
          className={cn(
            "group relative shrink-0 overflow-hidden rounded-2xl border-2 border-slate-600/80 bg-slate-900 shadow-2xl shadow-black/50 transition duration-300",
            "hover:z-10 hover:scale-[1.03] hover:border-purple/60 hover:shadow-purple/25",
            styles.card
          )}
        >
          <MarqueeCardImage src={item.src} title={item.title} sizes={styles.imageSizes} />
          <MarqueeCardOverlay title={item.title} titleClass={styles.title} />
        </Link>
      ))}
    </div>
  );
}

function MarqueeCardImage({
  src,
  title,
  sizes,
}: {
  src: string;
  title: string;
  sizes: string;
}) {
  const cert = isCertificateCover(src);

  return (
    <OptimizedImage
      src={src}
      alt={title}
      fill
      className={cn(
        "transition duration-500 group-hover:scale-105",
        cert ? "object-contain bg-slate-950 p-2" : "object-cover"
      )}
      sizes={sizes}
    />
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
