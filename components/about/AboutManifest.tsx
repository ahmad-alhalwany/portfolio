"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { AboutSection } from "@/lib/types";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { cn } from "@/lib/utils";

type Props = {
  section: AboutSection;
};

export default function AboutManifest({ section }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-80px" });
  const [activeStory, setActiveStory] = useState(0);

  return (
    <section
      ref={rootRef}
      className="surface-panel relative mt-8 overflow-hidden px-4 py-14 sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(139,92,246,0.14)_0%,transparent_50%)]" />
        <ShootingStars
          minSpeed={10}
          maxSpeed={20}
          starColor="#c4b5fd"
          trailColor="#6366f1"
          className="opacity-30"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-mono text-[10px] uppercase tracking-[0.35em] text-violet-600/90 dark:text-cyan-400/80 sm:text-xs"
        >
          {section.label}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08 }}
          className="section-title mt-4 text-4xl leading-tight md:text-5xl lg:text-6xl"
        >
          {section.title}{" "}
          <span className="bg-gradient-to-r from-purple via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            {section.titleAccent}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15 }}
          className="section-body mt-5 max-w-3xl text-base leading-relaxed md:text-lg"
        >
          {section.intro}
        </motion.p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
          <IdentityPanel section={section} inView={inView} />

          <div className="space-y-4">
            {section.story.map((paragraph, index) => (
              <StoryBlock
                key={index}
                index={index}
                text={paragraph}
                active={activeStory === index}
                onActivate={() => setActiveStory(index)}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {section.principles.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="inner-panel group relative overflow-hidden p-5 transition hover:border-purple/40"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-purple/10 blur-2xl transition group-hover:bg-purple/25" />
              <span className="font-mono text-[10px] text-purple/80">0{i + 1}</span>
              <h3 className="section-title mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="section-body mt-2 text-sm leading-relaxed">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IdentityPanel({ section, inView }: { section: AboutSection; inView: boolean }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.2 }}
      className="inner-panel relative p-5 font-mono text-sm shadow-xl shadow-purple/5 backdrop-blur-md dark:bg-black-100/80"
    >
      <div className="mb-4 flex items-center gap-2 border-b border-page pb-3 dark:border-slate-800">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-[10px] uppercase tracking-widest text-page-muted">
          identity.json
        </span>
      </div>

      <div className="space-y-2 text-xs sm:text-sm">
        {section.meta.map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 + i * 0.06 }}
            className="flex flex-wrap gap-x-2 gap-y-0"
          >
            <span className="text-purple/90">{row.key}</span>
            <span className="text-page-muted">:</span>
            <span className="text-violet-600 dark:text-cyan-400/90">{row.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 border-t border-page pt-6 dark:border-slate-800">
        <p className="text-[10px] uppercase tracking-[0.25em] text-page-muted">timeline</p>
        <ul className="mt-4 space-y-4">
          {section.timeline.map((item, i) => (
            <li key={item.id} className="relative pl-5">
              <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-purple shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              {i < section.timeline.length - 1 ? (
                <span className="absolute left-[3px] top-4 h-[calc(100%+8px)] w-px bg-page-border dark:bg-slate-800" />
              ) : null}
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple">
                {item.year}
              </p>
              <p className="text-xs text-page-muted">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <motion.p
        className="mt-6 text-[10px] text-page-muted"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        &gt; decoding complete_
      </motion.p>
    </motion.aside>
  );
}

function StoryBlock({
  text,
  index,
  active,
  onActivate,
}: {
  text: string;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { margin: "-25%", amount: 0.45 });

  useEffect(() => {
    if (visible) onActivate();
  }, [visible, onActivate]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.35, x: 12 }}
      animate={{
        opacity: active ? 1 : 0.4,
        x: active ? 0 : 8,
      }}
      transition={{ duration: 0.35 }}
      className={cn(
        "rounded-2xl border-l-2 bg-page-card/80 px-5 py-4 backdrop-blur-sm dark:bg-slate-950/40",
        active ? "border-l-purple" : "border-l-page dark:border-l-slate-700"
      )}
    >
      <span className="font-mono text-[10px] text-page-muted">
        {String(index + 1).padStart(2, "0")} / story
      </span>
      <p className="section-body mt-2 text-sm leading-relaxed md:text-base">{text}</p>
    </motion.div>
  );
}
