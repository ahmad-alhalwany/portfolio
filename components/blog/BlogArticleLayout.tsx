"use client";

import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { BlogPostPublic } from "@/lib/types";
import { extractTocFromHtml, injectHeadingIds, TocItem } from "@/lib/blog-toc";
import { FaArrowLeft, FaClock } from "react-icons/fa";
import { BlogComments } from "@/components/blog/BlogComments";
import { BlogArticleNewsletter } from "@/components/newsletter/BlogArticleNewsletter";

export function BlogArticleLayout({ post }: { post: BlogPostPublic }) {
  const bodyWithIds = injectHeadingIds(post.body);
  const toc = extractTocFromHtml(bodyWithIds);
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    const headings = toc.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  const date = post.publishedAt || post.createdAt;

  return (
    <main className="min-h-screen bg-page px-5 py-24 sm:px-10">
      <article className="mx-auto max-w-6xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-purple"
        >
          <FaArrowLeft /> Back to articles
        </Link>

        <header className="mb-10 space-y-6 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-purple/10 px-3 py-1 text-xs uppercase tracking-wider text-purple">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">{post.excerpt}</p>
          <ArticleMeta post={post} date={date} />
        </header>

        <div className="relative mb-12 overflow-hidden rounded-3xl border border-slate-800">
          <div className="relative aspect-[21/9] w-full">
            <OptimizedImage src={post.coverImage} alt={post.title} fill className="object-cover" priority />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <nav className="sticky top-28 rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple">On this page</p>
                <ul className="space-y-2">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(item.id)}
                        className={`block w-full text-left text-sm transition ${
                          item.level === 3 ? "pl-4" : ""
                        } ${activeId === item.id ? "text-purple font-medium" : "text-slate-400 hover:text-white"}`}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          <div className="min-w-0 space-y-10">
            <div className="blog-prose rounded-3xl border border-slate-800 bg-slate-950/50 p-6 md:p-10">
              {parse(bodyWithIds)}
            </div>
            <BlogArticleNewsletter />
            <BlogComments postSlug={post.slug} />
          </div>
        </div>
      </article>
    </main>
  );
}

function ArticleMeta({ post, date }: { post: BlogPostPublic; date: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
      <span className="text-slate-200">{post.author}</span>
      <span>·</span>
      <time dateTime={date}>
        {new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
      </time>
      <span>·</span>
      <span className="inline-flex items-center gap-1">
        <FaClock className="text-purple" /> {post.readTimeMinutes} min read
      </span>
    </div>
  );
}
