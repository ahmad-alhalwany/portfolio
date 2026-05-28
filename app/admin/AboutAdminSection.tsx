"use client";

import { Content, AboutSection, AboutPrinciple, AboutTimelineItem, AboutMeta } from "@/lib/types";
import { defaultAboutSection } from "@/lib/about-defaults";
import { AdminCard, AdminSectionHeader } from "@/components/admin/admin-ui";

type Props = {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function AboutAdminSection({ content, setContent }: Props) {
  const section: AboutSection = {
    ...defaultAboutSection,
    ...content.aboutSection,
    story: content.aboutSection?.story?.length
      ? content.aboutSection.story
      : defaultAboutSection.story,
    principles: content.aboutSection?.principles?.length
      ? content.aboutSection.principles
      : defaultAboutSection.principles,
    timeline: content.aboutSection?.timeline?.length
      ? content.aboutSection.timeline
      : defaultAboutSection.timeline,
    meta: content.aboutSection?.meta?.length
      ? content.aboutSection.meta
      : defaultAboutSection.meta,
  };

  const patch = (next: AboutSection) => {
    setContent({ ...content, aboutSection: next });
  };

  const setField = <K extends keyof AboutSection,>(key: K, value: AboutSection[K]) => {
    patch({ ...section, [key]: value });
  };

  const updateStory = (index: number, value: string) => {
    const story = [...section.story];
    story[index] = value;
    patch({ ...section, story });
  };

  const addStory = () => patch({ ...section, story: [...section.story, "New paragraph…"] });
  const removeStory = (index: number) =>
    patch({ ...section, story: section.story.filter((_, i) => i !== index) });

  const updatePrinciple = (id: string, key: keyof AboutPrinciple, value: string) => {
    patch({
      ...section,
      principles: section.principles.map((p) => (p.id === id ? { ...p, [key]: value } : p)),
    });
  };

  const addPrinciple = () =>
    patch({
      ...section,
      principles: [
        ...section.principles,
        { id: `p-${Date.now()}`, title: "Principle", body: "Description…" },
      ],
    });

  const updateTimeline = (id: string, key: keyof AboutTimelineItem, value: string) => {
    patch({
      ...section,
      timeline: section.timeline.map((t) => (t.id === id ? { ...t, [key]: value } : t)),
    });
  };

  const updateMeta = (index: number, key: keyof AboutMeta, value: string) => {
    const meta = [...section.meta];
    meta[index] = { ...meta[index], [key]: value };
    patch({ ...section, meta });
  };

  return (
    <AdminCard className="space-y-8">
      <AdminSectionHeader
        title="About manifest"
        description="Professional bio, story blocks, principles. Bento cards stay in the Grid tab."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2 text-sm lg:col-span-2">
          Label (mono)
          <input
            value={section.label}
            onChange={(e) => setField("label", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Title
          <input
            value={section.title}
            onChange={(e) => setField("title", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Title accent (gradient)
          <input
            value={section.titleAccent}
            onChange={(e) => setField("titleAccent", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Intro
          <textarea
            value={section.intro}
            onChange={(e) => setField("intro", e.target.value)}
            className="min-h-[80px] w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <label className="space-y-2 text-sm lg:col-span-2">
          Bento subtitle
          <input
            value={section.bentoTitle ?? ""}
            onChange={(e) => setField("bentoTitle", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Story paragraphs</h3>
          <button
            type="button"
            onClick={addStory}
            className="rounded-xl bg-purple px-3 py-1.5 text-sm text-white"
          >
            + Add
          </button>
        </div>
        {section.story.map((para, i) => (
          <div key={i} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="mb-2 flex justify-between">
              <span className="text-xs text-slate-500">Paragraph {i + 1}</span>
              <button type="button" onClick={() => removeStory(i)} className="text-xs text-red-400">
                Remove
              </button>
            </div>
            <textarea
              value={para}
              onChange={(e) => updateStory(i, e.target.value)}
              className="min-h-[70px] w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <SectionHeader title="Principles" onAdd={addPrinciple} />
        {section.principles.map((p) => (
          <div key={p.id} className="grid gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 md:grid-cols-2">
            <input
              value={p.title}
              onChange={(e) => updatePrinciple(p.id, "title", e.target.value)}
              placeholder="Title"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
            />
            <textarea
              value={p.body}
              onChange={(e) => updatePrinciple(p.id, "body", e.target.value)}
              placeholder="Body"
              className="min-h-[60px] rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white md:col-span-2"
            />
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white">Timeline</h3>
          {section.timeline.map((t) => (
            <div key={t.id} className="flex gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3">
              <input
                value={t.year}
                onChange={(e) => updateTimeline(t.id, "year", e.target.value)}
                className="w-20 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-white"
              />
              <input
                value={t.label}
                onChange={(e) => updateTimeline(t.id, "label", e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-white"
              />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white">Meta (identity.json)</h3>
          {section.meta.map((m, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={m.key}
                onChange={(e) => updateMeta(i, "key", e.target.value)}
                className="w-28 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-white"
              />
              <input
                value={m.value}
                onChange={(e) => updateMeta(i, "value", e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </AdminCard>
  );
}

function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <button type="button" onClick={onAdd} className="rounded-xl bg-purple px-3 py-1.5 text-sm text-white">
        + Add
      </button>
    </div>
  );
}
