import { Content, DeepPartial } from "@/lib/types";

type IdItem = { id: number | string };

function mergeSection<T extends object>(base: T, patch?: DeepPartial<T>): T {
  if (!patch) return base;
  return { ...base, ...patch } as T;
}

function mergeById<T extends IdItem>(
  base: T[],
  patch?: ReadonlyArray<DeepPartial<T>>
): T[] {
  if (!patch?.length) return base;
  return base.map((item) => {
    const over = patch.find((p) => p.id === item.id);
    return over ? { ...item, ...over } : item;
  });
}

/** Deep-merge CMS content with locale overrides (arrays matched by `id`). */
export function mergeContent(base: Content, patch: DeepPartial<Content>): Content {
  const { localeDe: _localeDe, ...patchRest } = patch;

  return {
    ...base,
    ...patchRest,
    hero: mergeSection(base.hero, patch.hero),
    aboutSection:
      patch.aboutSection && base.aboutSection
        ? mergeSection(base.aboutSection, patch.aboutSection)
        : base.aboutSection,
    approach: patch.approach
      ? {
          ...mergeSection(base.approach, patch.approach),
          cards: patch.approach.cards
            ? mergeById(base.approach.cards, patch.approach.cards)
            : base.approach.cards,
        }
      : base.approach,
    contact: patch.contact
      ? {
          ...mergeSection(base.contact, patch.contact),
          highlights: patch.contact.highlights
            ? mergeById(base.contact.highlights, patch.contact.highlights)
            : base.contact.highlights,
        }
      : base.contact,
    skillsSection:
      patch.skillsSection && base.skillsSection
        ? {
            ...mergeSection(base.skillsSection, patch.skillsSection),
            categories: patch.skillsSection.categories
              ? mergeById(base.skillsSection.categories, patch.skillsSection.categories).map(
                  (cat) => {
                    const patchCat = patch.skillsSection!.categories!.find((c) => c.id === cat.id);
                    if (!patchCat) return cat;
                    return {
                      ...cat,
                      ...patchCat,
                      skills: patchCat.skills?.length
                        ? mergeById(cat.skills, patchCat.skills)
                        : cat.skills,
                    };
                  }
                )
              : base.skillsSection.categories,
          }
        : base.skillsSection,
    languagesSection:
      patch.languagesSection && base.languagesSection
        ? {
            ...mergeSection(base.languagesSection, patch.languagesSection),
            languages: patch.languagesSection.languages
              ? mergeById(base.languagesSection.languages, patch.languagesSection.languages)
              : base.languagesSection.languages,
          }
        : base.languagesSection,
    servicesSection:
      patch.servicesSection && base.servicesSection
        ? {
            ...mergeSection(base.servicesSection, patch.servicesSection),
            services: patch.servicesSection.services
              ? mergeById(base.servicesSection.services, patch.servicesSection.services)
              : base.servicesSection.services,
          }
        : base.servicesSection,
    statsSection:
      patch.statsSection && base.statsSection
        ? {
            ...mergeSection(base.statsSection, patch.statsSection),
            metrics: patch.statsSection.metrics
              ? mergeById(base.statsSection.metrics, patch.statsSection.metrics)
              : base.statsSection.metrics,
            learningItems: patch.statsSection.learningItems
              ? mergeById(base.statsSection.learningItems, patch.statsSection.learningItems)
              : base.statsSection.learningItems,
            chartPoints: patch.statsSection.chartPoints
              ? mergeById(base.statsSection.chartPoints, patch.statsSection.chartPoints)
              : base.statsSection.chartPoints,
          }
        : base.statsSection,
    gridItems: patch.gridItems ? mergeById(base.gridItems, patch.gridItems) : base.gridItems,
    projects: patch.projects ? mergeById(base.projects, patch.projects) : base.projects,
    workExperience: patch.workExperience
      ? mergeById(base.workExperience, patch.workExperience)
      : base.workExperience,
    education: patch.education ? mergeById(base.education, patch.education) : base.education,
    blogSection:
      patch.blogSection && base.blogSection
        ? mergeSection(base.blogSection, patch.blogSection)
        : base.blogSection,
    testimonialsSection:
      patch.testimonialsSection && base.testimonialsSection
        ? mergeSection(base.testimonialsSection, patch.testimonialsSection)
        : base.testimonialsSection,
    localeDe: base.localeDe,
  };
}
