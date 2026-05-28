"use client";

import {
  Content,
  LanguagesSection,
  SpokenLanguage,
  SpokenLanguageLevel,
} from "@/lib/types";
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminSectionHeader,
  AdminSelect,
  AdminTextarea,
} from "@/components/admin/admin-ui";
import { defaultLanguagesSection } from "@/lib/languages-defaults";
import { defaultAboutSection } from "@/lib/about-defaults";
import {
  CEFR_LEVELS,
  languagesMetaSummary,
  newLanguage,
  suggestedProgress,
} from "@/lib/languages-utils";

type Props = {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function LanguagesAdminSection({ content, setContent }: Props) {
  const section: LanguagesSection = {
    ...defaultLanguagesSection,
    ...content.languagesSection,
    languages: content.languagesSection?.languages?.length
      ? content.languagesSection.languages
      : defaultLanguagesSection.languages,
  };

  const patch = (next: LanguagesSection) => {
    setContent({ ...content, languagesSection: next });
  };

  const updateField = (key: "title" | "description", value: string) => {
    patch({ ...section, [key]: value });
  };

  const updateLanguage = (
    id: string,
    key: keyof SpokenLanguage,
    value: string | number | boolean
  ) => {
    patch({
      ...section,
      languages: section.languages.map((lang) =>
        lang.id === id ? { ...lang, [key]: value } : lang
      ),
    });
  };

  const updateLevel = (id: string, level: SpokenLanguageLevel) => {
    patch({
      ...section,
      languages: section.languages.map((lang) =>
        lang.id === id
          ? {
              ...lang,
              level,
              progress:
                level === "native"
                  ? 100
                  : lang.progress && lang.progress > 0
                    ? lang.progress
                    : suggestedProgress(level),
            }
          : lang
      ),
    });
  };

  const addLanguage = () => {
    patch({
      ...section,
      languages: [...section.languages, newLanguage()],
    });
  };

  const removeLanguage = (id: string) => {
    patch({
      ...section,
      languages: section.languages.filter((lang) => lang.id !== id),
    });
  };

  const moveLanguage = (id: string, direction: -1 | 1) => {
    const index = section.languages.findIndex((l) => l.id === id);
    if (index === -1) return;
    const target = index + direction;
    if (target < 0 || target >= section.languages.length) return;
    const next = [...section.languages];
    [next[index], next[target]] = [next[target], next[index]];
    patch({ ...section, languages: next });
  };

  const syncAboutMeta = () => {
    const summary = languagesMetaSummary(section.languages);
    const about = { ...defaultAboutSection, ...content.aboutSection };
    const meta = [...(about.meta ?? [])];
    const idx = meta.findIndex((m) => m.key === "languages" || m.key === "sprachen");
    const entry = { key: "languages", value: summary };
    if (idx >= 0) meta[idx] = entry;
    else meta.push(entry);
    setContent({
      ...content,
      languagesSection: section,
      aboutSection: { ...about, meta },
    });
  };

  return (
    <AdminCard className="space-y-8">
      <AdminSectionHeader
        title="Languages"
        description="Spoken languages for the portfolio — CEFR levels, progress, and learning status. Save with the main Save button."
        action={
          <AdminButton type="button" onClick={addLanguage}>
            Add language
          </AdminButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminField label="Section title">
          <AdminInput
            value={section.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </AdminField>
        <AdminField label="Section description" className="lg:col-span-2">
          <AdminTextarea
            value={section.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </AdminField>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-purple/20 bg-purple/5 px-4 py-3">
        <p className="text-sm text-slate-300">
          About meta preview:{" "}
          <span className="font-mono text-purple">{languagesMetaSummary(section.languages)}</span>
        </p>
        <AdminButton type="button" variant="secondary" onClick={syncAboutMeta}>
          Sync to About meta
        </AdminButton>
      </div>

      <div className="space-y-6">
        {section.languages.map((lang, index) => (
          <LanguageEditor
            key={lang.id}
            lang={lang}
            index={index}
            total={section.languages.length}
            onUpdate={updateLanguage}
            onUpdateLevel={updateLevel}
            onRemove={() => removeLanguage(lang.id)}
            onMoveUp={() => moveLanguage(lang.id, -1)}
            onMoveDown={() => moveLanguage(lang.id, 1)}
          />
        ))}
      </div>
    </AdminCard>
  );
}

function LanguageEditor({
  lang,
  index,
  total,
  onUpdate,
  onUpdateLevel,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  lang: SpokenLanguage;
  index: number;
  total: number;
  onUpdate: (id: string, key: keyof SpokenLanguage, value: string | number | boolean) => void;
  onUpdateLevel: (id: string, level: SpokenLanguageLevel) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const showProgress = lang.level !== "native";

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900 text-xl">
            {lang.flag || "🌐"}
          </span>
          <div>
            <p className="font-semibold text-white">{lang.name || "Untitled"}</p>
            <p className="text-xs text-slate-500">ID: {lang.id}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <AdminButton type="button" variant="ghost" onClick={onMoveUp} disabled={index === 0}>
            ↑
          </AdminButton>
          <AdminButton type="button" variant="ghost" onClick={onMoveDown} disabled={index === total - 1}>
            ↓
          </AdminButton>
          <AdminButton type="button" variant="danger" onClick={onRemove}>
            Remove
          </AdminButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AdminField label="Language name (English)">
          <AdminInput
            value={lang.name}
            onChange={(e) => onUpdate(lang.id, "name", e.target.value)}
          />
        </AdminField>
        <AdminField label="Native name" hint="e.g. العربية, Deutsch">
          <AdminInput
            value={lang.nativeLabel ?? ""}
            onChange={(e) => onUpdate(lang.id, "nativeLabel", e.target.value)}
          />
        </AdminField>
        <AdminField label="Flag emoji">
          <AdminInput
            value={lang.flag ?? ""}
            onChange={(e) => onUpdate(lang.id, "flag", e.target.value)}
            placeholder="🇸🇾 🇬🇧 🇩🇪"
          />
        </AdminField>
        <AdminField label="Internal ID" hint="Fixed key for styling (ar, en, de). Set when adding a language.">
          <AdminInput value={lang.id} readOnly className="opacity-60" />
        </AdminField>
        <AdminField label="CEFR level">
          <AdminSelect
            value={lang.level}
            onChange={(e) => onUpdateLevel(lang.id, e.target.value as SpokenLanguageLevel)}
          >
            {CEFR_LEVELS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </AdminSelect>
        </AdminField>
        <AdminField label="Level label (shown on card)">
          <AdminInput
            value={lang.levelLabel}
            onChange={(e) => onUpdate(lang.id, "levelLabel", e.target.value)}
            placeholder="B2 — Upper intermediate"
          />
        </AdminField>

        {showProgress ? (
          <>
            <AdminField label={`Progress (${lang.progress ?? 0}%)`}>
              <input
                type="range"
                min={0}
                max={100}
                value={lang.progress ?? 0}
                onChange={(e) => onUpdate(lang.id, "progress", Number(e.target.value))}
                className="w-full accent-purple"
              />
            </AdminField>
            <AdminField label="Progress bar label">
              <AdminInput
                value={lang.progressLabel ?? ""}
                onChange={(e) => onUpdate(lang.id, "progressLabel", e.target.value)}
                placeholder="Progress toward B1"
              />
            </AdminField>
          </>
        ) : null}

        <AdminField label="Note" className="md:col-span-2 lg:col-span-3">
          <AdminTextarea
            value={lang.note ?? ""}
            onChange={(e) => onUpdate(lang.id, "note", e.target.value)}
            placeholder="How you use this language professionally…"
          />
        </AdminField>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 md:col-span-2">
          <input
            type="checkbox"
            checked={lang.learning ?? false}
            onChange={(e) => onUpdate(lang.id, "learning", e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 accent-amber-500"
          />
          <span className="text-sm text-slate-200">
            <strong className="text-amber-300">Actively learning</strong> — show &quot;Learning&quot; badge
          </span>
        </label>
      </div>
    </div>
  );
}
