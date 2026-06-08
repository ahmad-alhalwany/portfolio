"use client";

import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPostPublic, BlogSection as BlogSectionType } from "@/lib/types";
import { ThreeDMarquee } from "./ThreeDMarquee";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { useLocale } from "@/components/i18n/LocaleProvider";

const defaultSection: BlogSectionType = {
  title: "Insights & Articles",
  description: "Technical writing, lessons from real projects, and ideas worth sharing.",
  viewAllLabel: "View all articles",
  readLatestLabel: "Read latest article",
};

export default function BlogSection({ section = defaultSection }: { section?: BlogSectionType }) {
  const { t } = useLocale();
  const [posts, setPosts] = useState<BlogPostPublic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => setPosts(data.posts ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const latest = posts[0];
  const older = posts.slice(1);

  return (
    <section id="blog" className="mt-16 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-2xl shadow-purple/10 lg:p-10">
      <div className="mb-10 text-center">
        <span className="inline-flex rounded-full bg-purple/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-purple">
          {t("blog.badge")}
        </span>
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{section.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">{section.description}</p>
      </div>

      {loading && <p className="text-center text-slate-400">{t("blog.loading")}</p>}

      {!loading && !latest && (
        <p className="text-center text-slate-400">{t("blog.empty")}</p>
      )}

      {!loading && latest && (
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-purple/20 bg-gradient-to-br from-slate-950 via-slate-900 to-purple/10"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[280px] lg:min-h-[360px]">
                <OptimizedImage
                  src={latest.coverImage}
                  alt={latest.title}
                  fill
                  className={
                    latest.coverImage?.includes("/certificates/")
                      ? "object-contain bg-slate-950 p-4"
                      : "object-cover"
                  }
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
                <p className="text-xs uppercase tracking-[0.24em] text-purple">Latest article</p>
                <h3 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">{latest.title}</h3>
                <p className="text-slate-300">{latest.excerpt}</p>
                <FeaturedMeta post={latest} />
                <Link
                  href={`/blog/${latest.slug}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-purple px-6 py-3 font-semibold text-black transition hover:scale-105"
                >
                  {section.readLatestLabel}
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>

          {older.length > 0 && (
            <div>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Previous articles</h3>
                  <p className="text-sm text-slate-400">More articles from production work and learning</p>
                </div>
                <Link href="/blog" className="text-sm text-purple hover:underline">
                  {section.viewAllLabel}
                </Link>
              </div>
              <ThreeDMarquee posts={older} size="large" />
            </div>
          )}

          <ViewAllLink label={section.viewAllLabel} show={older.length === 0} />
        </div>
      )}
    </section>
  );
}

function FeaturedMeta({ post }: { post: BlogPostPublic }) {
  const date = post.publishedAt || post.createdAt;
  return (
    <div className="flex flex-wrap gap-3 text-sm text-slate-400">
      <span>{post.author}</span>
      <span>·</span>
      <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
      <span>·</span>
      <span className="inline-flex items-center gap-1">
        <FaClock className="text-purple" /> {post.readTimeMinutes} min
      </span>
    </div>
  );
}

function ViewAllLink({ label, show }: { label: string; show: boolean }) {
  if (!show) return null;
  return (
    <div className="flex justify-center">
      <Link href="/blog" className="rounded-full border border-purple/40 px-6 py-3 text-purple hover:bg-purple/10">
        {label}
      </Link>
    </div>
  );
}
