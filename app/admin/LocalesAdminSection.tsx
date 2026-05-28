"use client";

import { Content, DeepPartial } from "@/lib/types";
import {
  AdminCard,
  AdminField,
  AdminInput,
  AdminSectionHeader,
  AdminTextarea,
} from "@/components/admin/admin-ui";

type Props = {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content | null>>;
};

function patchLocale(content: Content, patch: DeepPartial<Content>): DeepPartial<Content> {
  return { ...content.localeDe, ...patch };
}

export function LocalesAdminSection({ content, setContent }: Props) {
  const de = content.localeDe ?? {};

  const setDe = (patch: DeepPartial<Content>) => {
    setContent({
      ...content,
      localeDe: patchLocale(content, patch),
    });
  };

  const setHero = (key: keyof NonNullable<Content["hero"]>, value: string) => {
    setDe({
      hero: { ...(de.hero ?? {}), [key]: value },
    });
  };

  const setApproach = (key: "title" | "subtitle", value: string) => {
    setDe({
      approach: {
        ...(de.approach ?? content.approach),
        [key]: value,
        cards: de.approach?.cards ?? [],
      },
    });
  };

  const setApproachCard = (
    cardId: number,
    key: "phaseLabel" | "title" | "description",
    value: string
  ) => {
    const cards = content.approach.cards.map((card) => {
      const over = de.approach?.cards?.find((c) => c.id === card.id);
      return { ...card, ...over };
    });
    setDe({
      approach: {
        ...(de.approach ?? { title: content.approach.title, cards: [] }),
        title: de.approach?.title ?? content.approach.title,
        subtitle: de.approach?.subtitle,
        cards: cards.map((card) =>
          card.id === cardId ? { ...card, [key]: value } : card
        ),
      },
    });
  };

  const setSectionPair = (
    key:
      | "blogSection"
      | "testimonialsSection"
      | "skillsSection"
      | "servicesSection"
      | "statsSection"
      | "languagesSection",
    field: "title" | "description",
    value: string
  ) => {
    const base = content[key];
    setDe({
      [key]: {
        ...(de[key] ?? base ?? {}),
        [field]: value,
      },
    } as Partial<Content>);
  };

  return (
    <AdminCard>
      <AdminSectionHeader
        title="German (DE) translations"
        description="Overrides English copy when visitors switch to Deutsch. Saved in content.json — no code edits needed."
      />

      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple">Hero</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            <AdminField label="Subtitle">
              <AdminInput
                value={de.hero?.subtitle ?? ""}
                onChange={(e) => setHero("subtitle", e.target.value)}
                placeholder="e.g. Full-Stack Engineer"
              />
            </AdminField>
            <AdminField label="Availability badge">
              <AdminInput
                value={de.hero?.availabilityBadge ?? ""}
                onChange={(e) => setHero("availabilityBadge", e.target.value)}
              />
            </AdminField>
            <AdminField label="Headline — first line">
              <AdminInput
                value={de.hero?.headlineLead ?? ""}
                onChange={(e) => setHero("headlineLead", e.target.value)}
              />
            </AdminField>
            <AdminField label="Headline — last line">
              <AdminInput
                value={de.hero?.headlineEnd ?? ""}
                onChange={(e) => setHero("headlineEnd", e.target.value)}
              />
            </AdminField>
            <AdminField label="Flip words (comma-separated)" className="lg:col-span-2">
              <AdminInput
                value={(de.hero?.flipWords ?? []).join(", ")}
                onChange={(e) => {
                  const flipWords = e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  setDe({
                    hero: { ...(de.hero ?? {}), flipWords },
                  });
                }}
              />
            </AdminField>
            <AdminField label="Description" className="lg:col-span-2">
              <AdminTextarea
                value={de.hero?.description ?? ""}
                onChange={(e) => setHero("description", e.target.value)}
              />
            </AdminField>
            <AdminField label="Primary CTA label">
              <AdminInput
                value={de.hero?.ctaLabel ?? ""}
                onChange={(e) => setHero("ctaLabel", e.target.value)}
              />
            </AdminField>
            <AdminField label="Secondary CTA label">
              <AdminInput
                value={de.hero?.secondaryCtaLabel ?? ""}
                onChange={(e) => setHero("secondaryCtaLabel", e.target.value)}
              />
            </AdminField>
            <AdminField label="Resume label">
              <AdminInput
                value={de.hero?.resumeLabel ?? ""}
                onChange={(e) => setHero("resumeLabel", e.target.value)}
              />
            </AdminField>
            <AdminField label="Resume tagline">
              <AdminInput
                value={de.hero?.resumeTagline ?? ""}
                onChange={(e) => setHero("resumeTagline", e.target.value)}
              />
            </AdminField>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple">How I work</h3>
          <div className="grid gap-4">
            <AdminField label="Section title">
              <AdminInput
                value={de.approach?.title ?? ""}
                onChange={(e) => setApproach("title", e.target.value)}
              />
            </AdminField>
            <AdminField label="Subtitle">
              <AdminTextarea
                value={de.approach?.subtitle ?? ""}
                onChange={(e) => setApproach("subtitle", e.target.value)}
              />
            </AdminField>
            {content.approach.cards.map((card) => (
              <div
                key={card.id}
                className="rounded-xl border border-white/[0.06] bg-black/30 p-4"
              >
                <p className="mb-3 text-xs text-slate-500">Card {card.id} — EN: {card.title}</p>
                <div className="grid gap-3 lg:grid-cols-2">
                  <AdminField label="Phase label">
                    <AdminInput
                      value={
                        de.approach?.cards?.find((c) => c.id === card.id)?.phaseLabel ?? ""
                      }
                      onChange={(e) =>
                        setApproachCard(card.id, "phaseLabel", e.target.value)
                      }
                    />
                  </AdminField>
                  <AdminField label="Title">
                    <AdminInput
                      value={de.approach?.cards?.find((c) => c.id === card.id)?.title ?? ""}
                      onChange={(e) => setApproachCard(card.id, "title", e.target.value)}
                    />
                  </AdminField>
                  <AdminField label="Description" className="lg:col-span-2">
                    <AdminTextarea
                      value={
                        de.approach?.cards?.find((c) => c.id === card.id)?.description ?? ""
                      }
                      onChange={(e) =>
                        setApproachCard(card.id, "description", e.target.value)
                      }
                    />
                  </AdminField>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple">
            Section headings
          </h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {(
              [
                ["skillsSection", "Skills"],
                ["languagesSection", "Languages"],
                ["servicesSection", "Services"],
                ["statsSection", "Stats"],
                ["blogSection", "Blog"],
                ["testimonialsSection", "Testimonials"],
              ] as const
            ).map(([key, label]) => (
              <div key={key} className="space-y-3 rounded-xl border border-white/[0.06] p-4">
                <p className="text-sm font-medium text-slate-300">{label}</p>
                <AdminField label="Title">
                  <AdminInput
                    value={(de[key] as { title?: string })?.title ?? ""}
                    onChange={(e) => setSectionPair(key, "title", e.target.value)}
                  />
                </AdminField>
                <AdminField label="Description">
                  <AdminTextarea
                    value={(de[key] as { description?: string })?.description ?? ""}
                    onChange={(e) => setSectionPair(key, "description", e.target.value)}
                  />
                </AdminField>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple">
            Skill categories (German)
          </h3>
          <div className="space-y-6">
            {(content.skillsSection?.categories ?? []).map((category) => {
              const deCat = de.skillsSection?.categories?.find((c) => c.id === category.id);
              const setCatTitle = (value: string) => {
                const mergedCats = content.skillsSection!.categories.map((c) => {
                  const over = de.skillsSection?.categories?.find((x) => x.id === c.id);
                  return { ...c, ...over };
                });
                setDe({
                  skillsSection: {
                    ...(de.skillsSection ?? {
                      title: content.skillsSection?.title ?? "",
                      categories: [],
                    }),
                    title: de.skillsSection?.title,
                    description: de.skillsSection?.description,
                    categories: mergedCats.map((c) =>
                      c.id === category.id ? { ...c, title: value } : c
                    ),
                  },
                });
              };
              const setSkillName = (skillId: number, value: string) => {
                const mergedCats = content.skillsSection!.categories.map((c) => {
                  const over = de.skillsSection?.categories?.find((x) => x.id === c.id);
                  const baseSkills = c.skills;
                  const overSkills = over?.skills;
                  return {
                    ...c,
                    ...over,
                    skills: baseSkills.map((s) => {
                      const overSkill = overSkills?.find((os) => os.id === s.id);
                      return { ...s, ...overSkill };
                    }),
                  };
                });
                setDe({
                  skillsSection: {
                    ...(de.skillsSection ?? {
                      title: content.skillsSection?.title ?? "",
                      categories: [],
                    }),
                    title: de.skillsSection?.title,
                    description: de.skillsSection?.description,
                    categories: mergedCats.map((c) =>
                      c.id === category.id
                        ? {
                            ...c,
                            skills: c.skills.map((s) =>
                              s.id === skillId ? { ...s, name: value } : s
                            ),
                          }
                        : c
                    ),
                  },
                });
              };
              return (
                <div
                  key={category.id}
                  className="rounded-xl border border-white/[0.06] bg-black/30 p-4"
                >
                  <p className="mb-3 text-xs text-slate-500">EN: {category.title}</p>
                  <AdminField label="Category title (DE)" className="mb-4">
                    <AdminInput
                      value={deCat?.title ?? ""}
                      onChange={(e) => setCatTitle(e.target.value)}
                    />
                  </AdminField>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {category.skills.map((skill) => (
                      <AdminField
                        key={skill.id}
                        label={`${skill.name}`}
                        hint="German label"
                      >
                        <AdminInput
                          value={
                            de.skillsSection?.categories
                              ?.find((c) => c.id === category.id)
                              ?.skills?.find((s) => s.id === skill.id)?.name ?? ""
                          }
                          onChange={(e) => setSkillName(skill.id, e.target.value)}
                        />
                      </AdminField>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple">
            Language cards (German text)
          </h3>
          <div className="space-y-4">
            {(content.languagesSection?.languages ?? []).map((lang) => {
              const deLang = de.languagesSection?.languages?.find((l) => l.id === lang.id);
              const setLangField = (
                field: "name" | "nativeLabel" | "levelLabel" | "note" | "progressLabel",
                value: string
              ) => {
                const baseLangs = content.languagesSection?.languages ?? [];
                const merged = baseLangs.map((l) => {
                  const over = de.languagesSection?.languages?.find((x) => x.id === l.id);
                  return { ...l, ...over };
                });
                setDe({
                  languagesSection: {
                    ...(de.languagesSection ?? {
                      title: content.languagesSection?.title ?? "",
                      languages: [],
                    }),
                    title: de.languagesSection?.title,
                    description: de.languagesSection?.description,
                    languages: merged.map((l) =>
                      l.id === lang.id ? { ...l, [field]: value } : l
                    ),
                  },
                });
              };
              return (
                <div
                  key={lang.id}
                  className="rounded-xl border border-white/[0.06] bg-black/30 p-4"
                >
                  <p className="mb-3 text-xs text-slate-500">
                    {lang.flag} {lang.name} — EN: {lang.levelLabel}
                  </p>
                  <div className="grid gap-3 lg:grid-cols-2">
                    <AdminField label="Name (DE)">
                      <AdminInput
                        value={deLang?.name ?? ""}
                        onChange={(e) => setLangField("name", e.target.value)}
                      />
                    </AdminField>
                    <AdminField label="Native label">
                      <AdminInput
                        value={deLang?.nativeLabel ?? ""}
                        onChange={(e) => setLangField("nativeLabel", e.target.value)}
                      />
                    </AdminField>
                    <AdminField label="Level label">
                      <AdminInput
                        value={deLang?.levelLabel ?? ""}
                        onChange={(e) => setLangField("levelLabel", e.target.value)}
                      />
                    </AdminField>
                    <AdminField label="Progress label">
                      <AdminInput
                        value={deLang?.progressLabel ?? ""}
                        onChange={(e) => setLangField("progressLabel", e.target.value)}
                      />
                    </AdminField>
                    <AdminField label="Note" className="lg:col-span-2">
                      <AdminTextarea
                        value={deLang?.note ?? ""}
                        onChange={(e) => setLangField("note", e.target.value)}
                      />
                    </AdminField>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminCard>
  );
}
