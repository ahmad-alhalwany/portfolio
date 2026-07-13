"use client";

import { motion } from "framer-motion";
import { SkillsSection, SkillCategory, SkillItem } from "@/lib/types";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { viewportOnce } from "@/lib/motion-presets";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const LEVEL_WIDTH: Record<string, string> = {
  Junior: "w-1/3",
  Mid: "w-2/3",
  Senior: "w-full",
};

const LEVEL_COLOR: Record<string, string> = {
  Junior: "bg-amber-400",
  Mid: "bg-sky-400",
  Senior: "bg-fuchsia-500",
};

const LEVEL_LABEL: Record<string, Record<"en" | "de", string>> = {
  Junior: { en: "Junior", de: "Junior" },
  Mid: { en: "Mid", de: "Mittel" },
  Senior: { en: "Senior", de: "Senior" },
};

const COUNT_LABEL: Record<"en" | "de", string> = {
  en: "skills",
  de: "Skills",
};

function SkillBar({ skill }: { skill: SkillItem }) {
  const { locale } = useLocale();
  const widthClass = LEVEL_WIDTH[skill.level] || "w-1/2";
  const colorClass = LEVEL_COLOR[skill.level] || "bg-purple";
  const levelLabel = LEVEL_LABEL[skill.level]?.[locale] ?? skill.level;

  return (
    <div className="inner-panel min-w-0 space-y-2 p-4 transition-colors hover:border-purple/30">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3 text-sm text-page-fg dark:text-slate-200">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <span className="mt-1.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-purple" />
          <span className="break-words leading-snug">{skill.name}</span>
        </div>
        <span className="shrink-0 self-start rounded-full bg-page-elevated px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-page-muted dark:bg-slate-800 dark:text-slate-300">
          {levelLabel}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-page-elevated dark:bg-slate-800">
        <motion.div
          className={`h-2 origin-left rounded-full ${colorClass} ${widthClass}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function SkillChips({ skills }: { skills: SkillItem[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <li
          key={skill.id}
          className="rounded-full border border-purple/25 bg-purple/10 px-3.5 py-2 text-sm font-medium text-purple transition hover:border-purple/40 hover:bg-purple/15"
        >
          {skill.name}
        </li>
      ))}
    </ul>
  );
}

function SkillCard({
  category,
  className,
}: {
  category: SkillCategory;
  className?: string;
}) {
  const { locale } = useLocale();
  const isChipCategory = category.skills.every((s) => s.display === "chip");
  const barSkills = category.skills.filter((s) => s.display !== "chip");
  const chipSkills = category.skills.filter((s) => s.display === "chip");

  return (
    <StaggerItem className={className}>
      <div className="interactive-card h-full min-w-0 bg-page-card-solid p-6 dark:bg-slate-950 dark:shadow-lg dark:shadow-slate-950/20">
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm uppercase tracking-[0.24em] text-purple">{category.title}</p>
          <span className="rounded-full bg-page-elevated px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-page-muted dark:bg-slate-900 dark:text-slate-300">
            {category.skills.length} {COUNT_LABEL[locale]}
          </span>
        </div>
        <div className="space-y-4">
          {isChipCategory ? (
            <SkillChips skills={category.skills} />
          ) : (
            <>
              {barSkills.map((skill) => (
                <SkillBar key={skill.id} skill={skill} />
              ))}
              {chipSkills.length > 0 ? <SkillChips skills={chipSkills} /> : null}
            </>
          )}
        </div>
      </div>
    </StaggerItem>
  );
}

const Skills = ({ skillsSection }: { skillsSection: SkillsSection }) => {
  const categories = skillsSection.categories;

  return (
    <section id="skills" className="section-shell mt-10 max-w-full overflow-x-hidden p-6">
      <div className="grid min-w-0 gap-10 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="inner-panel min-w-0 space-y-6 p-6 sm:p-8 hover-glow">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-purple">
            Skills & Technologies
          </div>
          <div className="space-y-4">
            <h2 className="section-title text-3xl">{skillsSection.title}</h2>
            <p className="section-body max-w-2xl">{skillsSection.description}</p>
          </div>
        </div>
        <StaggerReveal className="grid min-w-0 gap-6 md:grid-cols-2 [&>*]:min-w-0">
          {categories.map((category) => (
            <SkillCard
              key={category.id}
              category={category}
              className={cn(category.id === 6 && "md:col-span-2")}
            />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Skills;
