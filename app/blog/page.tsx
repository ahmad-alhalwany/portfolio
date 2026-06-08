"use client";

import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { SiteNavbar } from "@/components/nav/SiteNavbar";
import { getBlogNavItems } from "@/lib/site-nav";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { BlogPostPublic } from "@/lib/types";
import { ThreeDMarquee } from "@/components/blog/ThreeDMarquee";
import { FaArrowRight, FaClock } from "react-icons/fa";

export default function BlogPage() {
  const { locale, t } = useLocale();
  const navItems = getBlogNavItems(locale);
  const [posts, setPosts] = useState<BlogPostPublic[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => setPosts([]));
  }, []);

  const latest = posts[0];
  const older = posts.slice(1);

  return (
    <main className="relative min-h-screen bg-page px-5 pb-20 pt-28 sm:px-10">
      <SiteNavbar items={navItems} variant="minimal" />
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">{t("blog.pageTitle")}</h1>
          <p className="mt-4 text-slate-300">{t("blog.pageSubtitle")}</p>
        </header>

        {latest && (
          <Link
            href={`/blog/${latest.slug}`}
            className="group mb-16 grid overflow-hidden rounded-3xl border border-purple/20 bg-slate-950 lg:grid-cols-2"
          >
            <div className="relative min-h-[240px]">
              <OptimizedImage
                src={latest.coverImage}
                alt={latest.title}
                fill
                className={
                  latest.coverImage?.includes("/certificates/")
                    ? "object-contain bg-slate-950 p-4 transition group-hover:scale-[1.02]"
                    : "object-cover transition group-hover:scale-105"
                }
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8">
              <span className="text-xs uppercase tracking-[0.2em] text-purple">{t("blog.featured")}</span>
              <h2 className="text-2xl font-bold text-white md:text-3xl">{latest.title}</h2>
              <p className="text-slate-300">{latest.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-sm text-slate-400">
                <FaClock /> {latest.readTimeMinutes} {t("blog.minRead")}
              </span>
            </div>
          </Link>
        )}

        {older.length > 0 && (
          <>
            <h2 className="mb-6 text-2xl font-semibold text-white">{t("blog.moreArticles")}</h2>
            <ThreeDMarquee posts={older} size="large" className="mb-12" />
          </>
        )}
      </div>
    </main>
  );
}
