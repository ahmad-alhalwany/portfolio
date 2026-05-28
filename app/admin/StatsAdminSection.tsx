"use client";

import Image from "next/image";
import {
  Content,
  LearningItem,
  LearningPlatform,
  StatMetric,
  StatsChartPoint,
  StatsSection,
} from "@/lib/types";

const defaultStatsSection: StatsSection = {
  title: "Impact, Learning & Growth",
  description:
    "Numbers that reflect real experience — plus the courses and paths I'm building on Coursera, YouTube, and beyond.",
  metrics: [],
  chartTitle: "Courses completed by year",
  chartPoints: [],
  learningTitle: "What I'm learning now",
  learningDescription: "Active paths with live progress.",
  learningItems: [],
};

const PLATFORMS: LearningPlatform[] = ["Coursera", "YouTube", "Udemy", "Other"];

type Props = {
  content: Content;
  setContent: React.Dispatch<React.SetStateAction<Content | null>>;
};

export function StatsAdminSection({ content, setContent }: Props) {
  const section = content.statsSection ?? defaultStatsSection;

  const patch = (next: StatsSection) => {
    setContent({ ...content, statsSection: next });
  };

  const updateField = (key: keyof StatsSection, value: string) => {
    patch({ ...section, [key]: value });
  };

  const uploadIcon = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "stats");
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url as string;
  };

  const updateMetric = (id: string, key: keyof StatMetric, value: string | number) => {
    patch({
      ...section,
      metrics: section.metrics.map((m) => (m.id === id ? { ...m, [key]: value } : m)),
    });
  };

  const addMetric = () => {
    patch({
      ...section,
      metrics: [
        ...section.metrics,
        {
          id: `metric-${Date.now()}`,
          label: "New metric",
          value: 0,
          suffix: "",
          description: "",
        },
      ],
    });
  };

  const removeMetric = (id: string) => {
    patch({ ...section, metrics: section.metrics.filter((m) => m.id !== id) });
  };

  const updateChartPoint = (id: string, key: keyof StatsChartPoint, value: string | number) => {
    patch({
      ...section,
      chartPoints: section.chartPoints.map((p) =>
        p.id === id ? { ...p, [key]: value } : p
      ),
    });
  };

  const addChartPoint = () => {
    patch({
      ...section,
      chartPoints: [
        ...section.chartPoints,
        { id: `chart-${Date.now()}`, label: "2026", value: 0 },
      ],
    });
  };

  const removeChartPoint = (id: string) => {
    patch({ ...section, chartPoints: section.chartPoints.filter((p) => p.id !== id) });
  };

  const updateLearning = (
    id: string,
    key: keyof LearningItem,
    value: string | number | string[]
  ) => {
    patch({
      ...section,
      learningItems: section.learningItems.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    });
  };

  const addLearning = () => {
    const item: LearningItem = {
      id: `learn-${Date.now()}`,
      title: "New course",
      platform: "Coursera",
      category: "Development",
      progress: 0,
      status: "in_progress",
    };
    patch({ ...section, learningItems: [...section.learningItems, item] });
  };

  const removeLearning = (id: string) => {
    patch({ ...section, learningItems: section.learningItems.filter((i) => i.id !== id) });
  };

  const handleMetricIcon = async (id: string, file: File | undefined) => {
    if (!file) return;
    const url = await uploadIcon(file);
    if (url) updateMetric(id, "icon", url);
  };

  const handleLearningIcon = async (id: string, file: File | undefined) => {
    if (!file) return;
    const url = await uploadIcon(file);
    if (url) updateLearning(id, "icon", url);
  };

  return (
    <section className="space-y-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/20">
      <header>
        <h2 className="text-2xl font-semibold text-white">Stats & Learning</h2>
        <p className="mt-1 text-sm text-slate-400">
          Metrics, bar chart, and learning paths. Save with the main Save button.
        </p>
      </header>

      <SectionBlock title="Section copy">
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-2 text-sm lg:col-span-2">
            Title
            <input
              value={section.title}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </label>
          <label className="space-y-2 text-sm lg:col-span-2">
            Description
            <textarea
              value={section.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full min-h-[90px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </label>
        </div>
      </SectionBlock>

      <SectionBlock
        title="Key metrics"
        action={
          <button
            type="button"
            onClick={addMetric}
            className="rounded-xl bg-purple px-4 py-2 text-sm font-medium text-white hover:bg-purple/90"
          >
            + Add metric
          </button>
        }
      >
        {section.metrics.length === 0 ? (
          <p className="text-sm text-slate-500">No metrics yet.</p>
        ) : null}
        <div className="space-y-4">
          {section.metrics.map((metric) => (
            <div
              key={metric.id}
              className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950 p-5"
            >
              <RowHeader title={metric.label || "Metric"} onRemove={() => removeMetric(metric.id)} />
              <MetricFields
                metric={metric}
                onUpdate={updateMetric}
                onIcon={handleMetricIcon}
              />
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Bar chart"
        action={
          <button
            type="button"
            onClick={addChartPoint}
            className="rounded-xl border border-slate-600 px-4 py-2 text-sm text-white hover:border-purple"
          >
            + Add bar
          </button>
        }
      >
        <label className="mb-4 block space-y-2 text-sm">
          Chart title
          <input
            value={section.chartTitle}
            onChange={(e) => updateField("chartTitle", e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </label>
        <div className="space-y-3">
          {section.chartPoints.map((point) => (
            <div
              key={point.id}
              className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <label className="space-y-1 text-xs text-slate-400">
                Label
                <input
                  value={point.label}
                  onChange={(e) => updateChartPoint(point.id, "label", e.target.value)}
                  className="block w-28 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
                />
              </label>
              <label className="space-y-1 text-xs text-slate-400">
                Value
                <input
                  type="number"
                  value={point.value}
                  onChange={(e) =>
                    updateChartPoint(point.id, "value", Number(e.target.value) || 0)
                  }
                  className="block w-24 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
                />
              </label>
              <button
                type="button"
                onClick={() => removeChartPoint(point.id)}
                className="ml-auto text-sm text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Learning paths"
        action={
          <button
            type="button"
            onClick={addLearning}
            className="rounded-xl bg-purple px-4 py-2 text-sm font-medium text-white hover:bg-purple/90"
          >
            + Add course
          </button>
        }
      >
        <div className="mb-4 grid gap-4">
          <label className="space-y-2 text-sm">
            Block title
            <input
              value={section.learningTitle}
              onChange={(e) => updateField("learningTitle", e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </label>
          <label className="space-y-2 text-sm">
            Block description
            <textarea
              value={section.learningDescription}
              onChange={(e) => updateField("learningDescription", e.target.value)}
              className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </label>
        </div>
        <div className="space-y-4">
          {section.learningItems.map((item) => (
            <LearningCardEditor
              key={item.id}
              item={item}
              onUpdate={updateLearning}
              onRemove={() => removeLearning(item.id)}
              onIconUpload={(file) => handleLearningIcon(item.id, file)}
            />
          ))}
        </div>
      </SectionBlock>
    </section>
  );
}

function SectionBlock({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function RowHeader({ title, onRemove }: { title: string; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-medium text-purple">{title}</span>
      <button type="button" onClick={onRemove} className="text-sm text-red-400 hover:text-red-300">
        Remove
      </button>
    </div>
  );
}

function MetricFields({
  metric,
  onUpdate,
  onIcon,
}: {
  metric: StatMetric;
  onUpdate: (id: string, key: keyof StatMetric, value: string | number) => void;
  onIcon: (id: string, file: File | undefined) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <label className="space-y-2 text-sm">
        Label
        <input
          value={metric.label}
          onChange={(e) => onUpdate(metric.id, "label", e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
        />
      </label>
      <label className="space-y-2 text-sm">
        Value
        <input
          type="number"
          value={metric.value}
          onChange={(e) => onUpdate(metric.id, "value", Number(e.target.value) || 0)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
        />
      </label>
      <label className="space-y-2 text-sm">
        Suffix (e.g. +)
        <input
          value={metric.suffix ?? ""}
          onChange={(e) => onUpdate(metric.id, "suffix", e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
        />
      </label>
      <label className="space-y-2 text-sm lg:col-span-2">
        Short description
        <input
          value={metric.description}
          onChange={(e) => onUpdate(metric.id, "description", e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
        />
      </label>
      <label className="space-y-2 text-sm">
        Icon (optional)
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onIcon(metric.id, e.target.files?.[0])}
          className="w-full text-xs text-slate-400"
        />
        {metric.icon ? <IconPreview src={metric.icon} /> : null}
      </label>
    </div>
  );
}

function LearningCardEditor({
  item,
  onUpdate,
  onRemove,
  onIconUpload,
}: {
  item: LearningItem;
  onUpdate: (id: string, key: keyof LearningItem, value: string | number | string[]) => void;
  onRemove: () => void;
  onIconUpload: (file: File | undefined) => void;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <RowHeader title={item.title || "Course"} onRemove={onRemove} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm md:col-span-2">
          Course title
          <input
            value={item.title}
            onChange={(e) => onUpdate(item.id, "title", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Platform
          <select
            value={item.platform}
            onChange={(e) => onUpdate(item.id, "platform", e.target.value as LearningPlatform)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          >
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm">
          Issuer
          <input
            value={item.issuer ?? ""}
            onChange={(e) => onUpdate(item.id, "issuer", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
            placeholder="IBM, Meta, Google…"
          />
        </label>
        <label className="space-y-2 text-sm">
          Category
          <input
            value={item.category}
            onChange={(e) => onUpdate(item.id, "category", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Completed
          <input
            value={item.completedAt ?? ""}
            onChange={(e) => onUpdate(item.id, "completedAt", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
            placeholder="Jun 2024"
          />
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          Summary (what you learned)
          <textarea
            value={item.summary ?? ""}
            onChange={(e) => onUpdate(item.id, "summary", e.target.value)}
            className="w-full min-h-[72px] rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          />
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          Skills (comma-separated)
          <input
            value={(item.skills ?? []).join(", ")}
            onChange={(e) =>
              onUpdate(
                item.id,
                "skills",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Progress (%)
          <input
            type="number"
            min={0}
            max={100}
            value={item.progress}
            onChange={(e) => onUpdate(item.id, "progress", Number(e.target.value) || 0)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          />
        </label>
        <label className="space-y-2 text-sm">
          Status
          <select
            value={item.status}
            onChange={(e) =>
              onUpdate(item.id, "status", e.target.value as LearningItem["status"])
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          >
            <option value="in_progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label className="space-y-2 text-sm md:col-span-2">
          URL (optional)
          <input
            value={item.url ?? ""}
            onChange={(e) => onUpdate(item.id, "url", e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-white"
            placeholder="https://..."
          />
        </label>
        <label className="space-y-2 text-sm">
          Custom icon
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onIconUpload(e.target.files?.[0])}
            className="w-full text-xs text-slate-400"
          />
          {item.icon ? (
            <IconPreview src={item.icon} />
          ) : (
            <p className="text-xs text-slate-500">Uses platform icon if empty</p>
          )}
        </label>
      </div>
    </div>
  );
}

function IconPreview({ src }: { src: string }) {
  return (
    <div className="relative mt-2 h-10 w-10">
      <Image src={src} alt="" fill className="object-contain" />
    </div>
  );
}
