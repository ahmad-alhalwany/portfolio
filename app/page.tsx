"use client";

import React from "react";
import { SiteNavbar } from "@/components/nav/SiteNavbar";
import { getSiteNavItems } from "@/lib/site-nav";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { SectionSkeleton } from "@/components/ui/section-skeleton";
import { LocalizedSkeleton } from "@/components/ui/localized-skeleton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { RESUME_PATH } from "@/lib/resume";
import { HeroSection, ApproachSection } from "@/lib/types";
import { emptyBlogSection, emptyTestimonialsSection } from "@/lib/empty-section-defaults";
import { getFullEducationItems, resolveStatsSection } from "@/lib/certificates-catalog";
import { defaultContactSection, mergeContactSection } from "@/lib/contact-defaults";
import { defaultAboutSection } from "@/lib/about-defaults";
import { defaultWorkExperience } from "@/lib/work-defaults";
import { defaultServicesSection } from "@/lib/services-defaults";
import { defaultLanguagesSection } from "@/lib/languages-defaults";
import { defaultSkillsSection } from "@/lib/skills-defaults";
import { gridItems as defaultGridItems, projects as defaultProjects } from "@/data/indxe";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Grid = dynamic(() => import("@/components/Grid"), {
  loading: () => <SectionSkeleton />,
});
const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => <LocalizedSkeleton uiKey="loading.skills" />,
});
const LanguagesSectionBlock = dynamic(
  () =>
    import("@/components/languages/LanguagesSection").then((m) => ({
      default: m.LanguagesSection,
    })),
  { loading: () => <LocalizedSkeleton uiKey="loading.languages" /> }
);
const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <LocalizedSkeleton uiKey="loading.services" />,
});
const RecentProject = dynamic(() => import("@/components/RecentProject"), {
  loading: () => <LocalizedSkeleton uiKey="loading.projects" />,
});
const WorkExperienceSection = dynamic(
  () =>
    import("@/components/experience/WorkExperienceSection").then((m) => ({
      default: m.WorkExperienceSection,
    })),
  { loading: () => <LocalizedSkeleton uiKey="loading.experience" /> }
);
const EducationSection = dynamic(
  () => import("@/components/education/EducationSection").then((m) => ({ default: m.EducationSection })),
  { loading: () => <LocalizedSkeleton uiKey="loading.education" /> }
);
const Approach = dynamic(() => import("@/components/Approach").then((m) => ({ default: m.Approach })), {
  loading: () => <LocalizedSkeleton uiKey="loading.approach" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <LocalizedSkeleton uiKey="loading.contact" />,
});
const Testimonials = dynamic(() => import("@/components/testimonials/Testimonials"), {
  ssr: false,
  loading: () => (
    <section id="reviews" className="mt-16 rounded-3xl border border-slate-800 bg-slate-950/90 p-10 text-center text-slate-400">
      <LocalizedSkeleton uiKey="loading.testimonials" />
    </section>
  ),
});
const StatsAchievements = dynamic(() => import("@/components/stats/StatsAchievements"), {
  ssr: false,
  loading: () => (
    <section id="stats" className="mt-16 rounded-3xl border border-slate-800 bg-slate-950/90 p-10 text-center text-slate-400">
      <LocalizedSkeleton uiKey="loading.stats" />
    </section>
  ),
});
const BlogSectionBlock = dynamic(() => import("@/components/blog/BlogSection"), {
  ssr: false,
  loading: () => (
    <section id="blog" className="mt-16 rounded-3xl border border-slate-800 bg-slate-950/90 p-10 text-center text-slate-400">
      <LocalizedSkeleton uiKey="loading.blog" />
    </section>
  ),
});

const defaultHero: HeroSection = {
  subtitle: "ahmad.dev / full-stack · open to hire",
  title: "Full-stack developer open to full-time roles — Python, Next.js, and software teams can rely on.",
  headlineLead: "I build",
  flipWords: ["production web apps", "full-stack systems", "hire-ready products"],
  headlineEnd: "for teams that ship.",
  availabilityBadge: "Open to full-time roles",
  skillChips: ["Python", "Next.js", "TypeScript", "Django"],
  description:
    "Hi, I'm Ahmad — I turn complex problems into software people rely on. Looking for a long-term role where craft, ownership, and team impact matter.",
  ctaLabel: "Explore projects",
  ctaLink: "#projects",
  secondaryCtaLabel: "Hiring? Let's talk",
  secondaryCtaLink: "#contact",
  resumeUrl: RESUME_PATH,
  resumeLabel: "Extract dossier",
  resumeTagline: "Lebenslauf · encrypted",
};

const defaultApproach: ApproachSection = {
  title: "How I work",
  subtitle:
    "A clear, collaborative process for product teams — aligned with how I deliver on real projects.",
  cards: [
    {
      id: 1,
      phaseLabel: "01 · Discover",
      title: "Align on the problem",
      description: "Before code, I clarify goals, users, constraints, and what success means.",
      highlights: ["Stakeholder alignment", "Scope & feasibility", "Clear milestones"],
    },
    {
      id: 2,
      phaseLabel: "02 · Build",
      title: "Ship with ownership",
      description: "Iterative delivery with maintainable code and transparent progress.",
      highlights: ["Reviewable releases", "Documented decisions", "Async-friendly updates"],
    },
    {
      id: 3,
      phaseLabel: "03 · Deliver",
      title: "Launch & sustain",
      description: "Production-ready outcomes with post-launch support.",
      highlights: ["Deployment readiness", "Monitoring & fixes", "Team handoff"],
    },
  ],
};

const defaultContactSocial = [
  { id: 1, img: "/git.svg", link: "https://github.com/ahmad-alhalwany" },
  { id: 2, img: "/twit.svg", link: "https://x.com/ahmad_alhalwany" },
  { id: 3, img: "/link.svg", link: "https://www.linkedin.com/in/ahmad-alhalwany/" },
  { id: 4, img: "/insta.png", link: "https://www.instagram.com/ahmad_al_halwany/" },
  { id: 5, img: "/facebook.png", link: "https://www.facebook.com/ahmad.alhalwany123" },
];

const Home = () => {
  const { content, locale, t } = useLocale();
  const navItems = React.useMemo(() => getSiteNavItems(locale), [locale]);

  const hero = content?.hero ?? defaultHero;
  const gridItems = content?.gridItems ?? defaultGridItems;
  const projects = content?.projects ?? defaultProjects;
  const workExperience =
    content?.workExperience?.length ? content.workExperience : defaultWorkExperience;
  const education = getFullEducationItems(content?.education);
  const approach = content?.approach ?? defaultApproach;
  const contact = mergeContactSection(
    content?.contact ?? { ...defaultContactSection, socialMedia: defaultContactSocial },
    defaultContactSocial
  );
  const servicesSection = content?.servicesSection ?? defaultServicesSection;
  const languagesSection = content?.languagesSection ?? defaultLanguagesSection;

  return (
    <main id="main-content" className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-page px-5 sm:px-10">
      <div className="max-w-7xl w-full">
        <SiteNavbar items={navItems} />
        <Hero hero={hero} />
        <ScrollReveal variant="fadeUp">
          <Grid
            gridItems={gridItems}
            aboutSection={{ ...defaultAboutSection, ...content?.aboutSection }}
          />
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.05}>
          <Skills skillsSection={content?.skillsSection ?? defaultSkillsSection} />
        </ScrollReveal>
        <ScrollReveal variant="fadeUp" delay={0.05}>
          <LanguagesSectionBlock section={languagesSection} />
        </ScrollReveal>
        <StatsAchievements section={resolveStatsSection(content?.statsSection)} />
        <ScrollReveal variant="slideRight" delay={0.05}>
          <Services servicesSection={servicesSection} />
        </ScrollReveal>
        <ScrollReveal variant="fadeUp">
          <RecentProject projects={projects} />
        </ScrollReveal>
        <ScrollReveal variant="fadeUp">
          <EducationSection items={education} variant="home" />
        </ScrollReveal>
        <ScrollReveal variant="slideLeft">
          <WorkExperienceSection items={workExperience} />
        </ScrollReveal>
        <ScrollReveal variant="scaleIn">
          <Testimonials section={content?.testimonialsSection ?? emptyTestimonialsSection} />
        </ScrollReveal>
        <ScrollReveal variant="fadeUp">
          <BlogSectionBlock section={content?.blogSection ?? emptyBlogSection} />
        </ScrollReveal>
        <ScrollReveal variant="fadeUp">
          <Approach approach={approach} />
        </ScrollReveal>
        <Footer contact={contact} />
      </div>
    </main>
  );
};

export default Home;


