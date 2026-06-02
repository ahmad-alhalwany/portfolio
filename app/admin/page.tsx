"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Content, Project, GridItem, SkillsSection, SkillItem, ServicesSection, ServiceItem } from "@/lib/types";
import { ReviewsAdminSection } from "./ReviewsAdminSection";
import { BlogAdminSection } from "./BlogAdminSection";
import { StatsAdminSection } from "./StatsAdminSection";
import { LanguagesAdminSection } from "./LanguagesAdminSection";
import { ContactAdminSection } from "./ContactAdminSection";
import { AboutAdminSection } from "./AboutAdminSection";
import { AnalyticsAdminSection } from "./AnalyticsAdminSection";
import { AnalyticsOverviewCard } from "@/components/admin/AnalyticsOverviewCard";
import { AdminShell, AdminNavItem } from "@/components/admin/AdminShell";
import { AdminCard, AdminPanel } from "@/components/admin/admin-ui";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import { AdminResumeUpload } from "@/components/admin/AdminResumeUpload";
import { AdminProjectGallery } from "@/components/admin/AdminProjectGallery";
import { normalizeProjectImages, normalizeUploadUrl, toMediaServeUrl } from "@/lib/upload-url";
import { LocalesAdminSection } from "./LocalesAdminSection";
import { CommentsAdminSection } from "./CommentsAdminSection";

type AdminSection =
  | "overview"
  | "hero"
  | "about"
  | "grid"
  | "work"
  | "projects"
  | "skills"
  | "languages"
  | "services"
  | "reviews"
  | "blog"
  | "comments"
  | "stats"
  | "images"
  | "education"
  | "approach"
  | "contact"
  | "analytics"
  | "locale";

const emptyProject: Project = {
  id: Date.now(),
  title: "New project title",
  des: "Describe the project briefly.",
  img: "/project/plaze1.png",
  iconLists: [],
  overview: "",
  challenge: "",
  challengeDetail: "",
  solution: "",
  solutionDetail: "",
  keyFeatures: [],
  outcomes: [],
  metrics: [],
  liveDemoUrl: "",
  githubUrl: "",
  cards: [],
};

const AdminPage = () => {
  const [content, setContent] = useState<Content | null>(null);
  const [savedMessage, setSavedMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const router = useRouter();

  useEffect(() => {
    // Check authentication first
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        setAuthenticated(data.authenticated);
        if (!data.authenticated) {
          router.push("/admin/login");
        }
      })
      .catch(() => {
        setAuthenticated(false);
        router.push("/admin/login");
      });
  }, [router]);

  useEffect(() => {
    if (authenticated) {
      fetch("/api/content")
        .then((response) => response.json())
        .then((data: Content) =>
          setContent({
            ...data,
            projects: (data.projects ?? []).map((p) => normalizeProjectImages(p)),
          })
        )
        .catch((error) => setErrorMessage(String(error)));
    }
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) {
      fetch("/api/images")
        .then((response) => response.json())
        .then((data) => setUploadedImages(data))
        .catch((error) => console.error("Failed to fetch uploaded images:", error));
    }
  }, [authenticated]);

  const sectionTabs: AdminNavItem[] = [
    { id: "overview", label: "Overview", group: "main" },
    { id: "hero", label: "Hero", group: "content" },
    { id: "about", label: "About", group: "content" },
    { id: "grid", label: "Bento grid", group: "content" },
    { id: "work", label: "Experience", group: "content" },
    { id: "projects", label: "Projects", group: "content" },
    { id: "education", label: "Education", group: "content" },
    { id: "approach", label: "How I work", group: "content" },
    { id: "skills", label: "Skills", group: "content" },
    { id: "languages", label: "Languages", group: "content" },
    { id: "services", label: "Services", group: "content" },
    { id: "stats", label: "Stats", group: "content" },
    { id: "reviews", label: "Testimonials", group: "content" },
    { id: "blog", label: "Blog", group: "content" },
    { id: "comments", label: "Comments", group: "content" },
    { id: "contact", label: "Contact", group: "content" },
    { id: "locale", label: "German (DE)", group: "content" },
    { id: "images", label: "Media library", group: "media" },
    { id: "analytics", label: "Analytics", group: "system" },
  ];

  const updateHeroField = (key: keyof Content["hero"], value: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero: {
        ...content.hero,
        [key]: value,
      },
    });
  };

  const updateResumeUrlEn = (url: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero: { ...content.hero, resumeUrl: url },
      contact: { ...content.contact, resumeUrl: url },
    });
  };

  const updateResumeUrlDe = (url: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero: { ...content.hero, resumeUrlDe: url },
      contact: { ...content.contact, resumeUrlDe: url },
    });
  };

  const updateProjectField = <K extends keyof Project>(
    projectId: number,
    key: K,
    value: Project[K]
  ) => {
    if (!content) return;
    setContent({
      ...content,
      projects: content.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              [key]: value,
            }
          : project
      ),
    });
  };

  const updateEducationField = (
    educationId: number,
    key: keyof Content["education"][number],
    value: string | string[] | boolean
  ) => {
    if (!content) return;
    setContent({
      ...content,
      education: content.education.map((item) =>
        item.id === educationId
          ? {
              ...item,
              [key]: value,
            }
          : item
      ),
    });
  };

  const updateApproachField = (key: keyof Content['approach'], value: string) => {
    if (!content) return;
    setContent({
      ...content,
      approach: {
        ...content.approach,
        [key]: value,
      },
    });
  };

  const updateApproachCardField = (
    cardId: number,
    key: keyof Content["approach"]["cards"][number],
    value: string | string[]
  ) => {
    if (!content) return;
    setContent({
      ...content,
      approach: {
        ...content.approach,
        cards: content.approach.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                [key]: value,
              }
            : card
        ),
      },
    });
  };

  const updateContactField = (key: keyof Content['contact'], value: string) => {
    if (!content) return;
    setContent({
      ...content,
      contact: {
        ...content.contact,
        [key]: value,
      },
    });
  };

  const updateSocialLinkField = (linkId: number, key: keyof Content['contact']['socialMedia'][number], value: string) => {
    if (!content) return;
    setContent({
      ...content,
      contact: {
        ...content.contact,
        socialMedia: content.contact.socialMedia.map((link) =>
          link.id === linkId
            ? {
                ...link,
                [key]: value,
              }
            : link
        ),
      },
    });
  };

  const ensureSkillsSection = (): SkillsSection => {
    if (content?.skillsSection) return content.skillsSection;

    const emptySkills: SkillsSection = {
      title: "Skills & Technologies",
      description: "Add your skill categories and levels here.",
      categories: [],
    };

    if (content) {
      setContent({
        ...content,
        skillsSection: emptySkills,
      });
    }

    return emptySkills;
  };

  const updateSkillsField = (key: "title" | "description", value: string) => {
    if (!content) return;
    setContent({
      ...content,
      skillsSection: {
        ...(content.skillsSection ?? ensureSkillsSection()),
        [key]: value,
      },
    });
  };

  const addSkillCategory = () => {
    if (!content) return;
    const skillsSection = ensureSkillsSection();
    const categoryId = Date.now();

    setContent({
      ...content,
      skillsSection: {
        ...skillsSection,
        categories: [
          ...skillsSection.categories,
          {
            id: categoryId,
            title: "New category",
            skills: [
              { id: categoryId + 1, name: "New skill", level: "Junior" },
            ],
          },
        ],
      },
    });
  };

  const removeSkillCategory = (categoryId: number) => {
    if (!content?.skillsSection) return;
    setContent({
      ...content,
      skillsSection: {
        ...content.skillsSection,
        categories: content.skillsSection.categories.filter((category) => category.id !== categoryId),
      },
    });
  };

  const updateSkillCategoryTitle = (categoryId: number, title: string) => {
    if (!content?.skillsSection) return;
    setContent({
      ...content,
      skillsSection: {
        ...content.skillsSection,
        categories: content.skillsSection.categories.map((category) =>
          category.id === categoryId ? { ...category, title } : category
        ),
      },
    });
  };

  const addSkillItem = (categoryId: number) => {
    if (!content?.skillsSection) return;
    setContent({
      ...content,
      skillsSection: {
        ...content.skillsSection,
        categories: content.skillsSection.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                skills: [
                  ...category.skills,
                  { id: Date.now(), name: "New skill", level: "Junior" },
                ],
              }
            : category
        ),
      },
    });
  };

  const updateSkillItemField = (
    categoryId: number,
    skillId: number,
    key: keyof Omit<SkillItem, "id">,
    value: string
  ) => {
    if (!content?.skillsSection) return;
    setContent({
      ...content,
      skillsSection: {
        ...content.skillsSection,
        categories: content.skillsSection.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                skills: category.skills.map((skill) =>
                  skill.id === skillId
                    ? {
                        ...skill,
                        [key]: key === "display" && value === "bar" ? undefined : value,
                      }
                    : skill
                ),
              }
            : category
        ),
      },
    });
  };

  const removeSkillItem = (categoryId: number, skillId: number) => {
    if (!content?.skillsSection) return;
    setContent({
      ...content,
      skillsSection: {
        ...content.skillsSection,
        categories: content.skillsSection.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                skills: category.skills.filter((skill) => skill.id !== skillId),
              }
            : category
        ),
      },
    });
  };

  const ensureServicesSection = (): ServicesSection => {
    if (content?.servicesSection) return content.servicesSection;

    const emptyServices: ServicesSection = {
      title: "Professional Services",
      description: "Define the services you offer and describe how they help your clients succeed.",
      services: [],
    };

    if (content) {
      setContent({
        ...content,
        servicesSection: emptyServices,
      });
    }

    return emptyServices;
  };

  const updateServicesField = (key: keyof Omit<ServicesSection, "services">, value: string) => {
    if (!content) return;
    setContent({
      ...content,
      servicesSection: {
        ...(content.servicesSection ?? ensureServicesSection()),
        [key]: value,
      },
    });
  };

  const addServiceItem = () => {
    if (!content) return;
    const servicesSection = ensureServicesSection();
    const itemId = Date.now();

    setContent({
      ...content,
      servicesSection: {
        ...servicesSection,
        services: [
          ...servicesSection.services,
          {
            id: itemId,
            title: "New service",
            description: "Describe the service and the value it brings to the client.",
            image: "/WD.png",
          } as ServiceItem,
        ],
      },
    });
  };

  const updateServiceItemField = (
    serviceId: number,
    key: keyof Omit<ServiceItem, "id">,
    value: string
  ) => {
    if (!content?.servicesSection) return;
    setContent({
      ...content,
      servicesSection: {
        ...content.servicesSection,
        services: content.servicesSection.services.map((service) =>
          service.id === serviceId
            ? {
                ...service,
                [key]: value,
              }
            : service
        ),
      },
    });
  };

  const removeServiceItem = (serviceId: number) => {
    if (!content?.servicesSection) return;
    setContent({
      ...content,
      servicesSection: {
        ...content.servicesSection,
        services: content.servicesSection.services.filter((service) => service.id !== serviceId),
      },
    });
  };

  const moveSkillCategory = (categoryId: number, direction: 'up' | 'down') => {
    if (!content?.skillsSection) return;
    const categories = [...content.skillsSection.categories];
    const index = categories.findIndex((category) => category.id === categoryId);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;
    [categories[index], categories[targetIndex]] = [categories[targetIndex], categories[index]];
    setContent({
      ...content,
      skillsSection: {
        ...content.skillsSection,
        categories,
      },
    });
  };

  const moveSkillItem = (categoryId: number, skillId: number, direction: 'up' | 'down') => {
    if (!content?.skillsSection) return;
    setContent({
      ...content,
      skillsSection: {
        ...content.skillsSection,
        categories: content.skillsSection.categories.map((category) => {
          if (category.id !== categoryId) return category;
          const skills = [...category.skills];
          const index = skills.findIndex((skill) => skill.id === skillId);
          if (index === -1) return category;
          const targetIndex = direction === 'up' ? index - 1 : index + 1;
          if (targetIndex < 0 || targetIndex >= skills.length) return category;
          [skills[index], skills[targetIndex]] = [skills[targetIndex], skills[index]];
          return {
            ...category,
            skills,
          };
        }),
      },
    });
  };

  const updateGridItemField = (
    gridItemId: number,
    key: keyof Content['gridItems'][number],
    value: string
  ) => {
    if (!content) return;
    setContent({
      ...content,
      gridItems: content.gridItems.map((item) =>
        item.id === gridItemId
          ? {
              ...item,
              [key]: value,
            }
          : item
      ),
    });
  };

  const addGridItem = () => {
    if (!content) return;

    setContent({
      ...content,
      gridItems: [
        ...content.gridItems,
        {
          id: Date.now(),
          title: "New grid item title",
          description: "Add a description here.",
          className: "lg:col-span-2 md:col-span-3 md:row-span-1",
          imgClassName: "",
          titleClassName: "justify-center",
          img: "",
          spareImg: "",
        },
      ],
    });
  };

  const removeGridItem = (gridItemId: number) => {
    if (!content) return;
    setContent({
      ...content,
      gridItems: content.gridItems.filter((item) => item.id !== gridItemId),
    });
  };

  const updateWorkExperienceField = (
    workExpId: number,
    key: keyof Content["workExperience"][number],
    value: string | string[] | boolean
  ) => {
    if (!content) return;
    setContent({
      ...content,
      workExperience: content.workExperience.map((item) =>
        item.id === workExpId
          ? {
              ...item,
              [key]: value,
            }
          : item
      ),
    });
  };

  const addWorkExperience = () => {
    if (!content) return;

    setContent({
      ...content,
      workExperience: [
        ...content.workExperience,
        {
          id: Date.now(),
          title: "New work experience title",
          desc: "Add a description here.",
          className: "md:col-span-2",
          thumbnail: "/exp1.svg",
        },
      ],
    });
  };

  const removeWorkExperience = (workExpId: number) => {
    if (!content) return;
    setContent({
      ...content,
      workExperience: content.workExperience.filter((item) => item.id !== workExpId),
    });
  };

  const addProject = () => {
    if (!content) return;

    setContent({
      ...content,
      projects: [
        ...content.projects,
        {
          ...emptyProject,
          id: Date.now(),
        },
      ],
    });
  };

  const removeProject = (projectId: number) => {
    if (!content) return;
    setContent({
      ...content,
      projects: content.projects.filter((project) => project.id !== projectId),
    });
  };

  const registerUploadedImage = (url: string, file: File) => {
    const fileName = url.split("/").pop() || "";
    const newImage = {
      name: fileName,
      url,
      size: file.size,
      modified: new Date().toISOString(),
    };
    setUploadedImages((prev) => {
      const existing = prev.find((img) => img.name === fileName);
      if (existing) {
        return prev.map((img) => (img.name === fileName ? newImage : img));
      }
      return [...prev, newImage];
    });
  };

  const addProjectIcon = (projectId: number, icon: string) => {
    if (!content) return;
    setContent({
      ...content,
      projects: content.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              iconLists: [...(project.iconLists || []), icon],
            }
          : project
      ),
    });
  };

  const removeProjectIcon = (projectId: number, iconIndex: number) => {
    if (!content) return;
    setContent({
      ...content,
      projects: content.projects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              iconLists: project.iconLists?.filter((_, index) => index !== iconIndex) || [],
            }
          : project
      ),
    });
  };

  const deleteUploadedImage = async (imageName: string) => {
    try {
      const response = await fetch(`/api/images/${encodeURIComponent(imageName)}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUploadedImages(uploadedImages.filter((img) => img.name !== imageName));
        const uploadPath = normalizeUploadUrl(`/uploads/projects/${imageName}`);
        if (content) {
          setContent({
            ...content,
            projects: content.projects.map((project) => ({
              ...project,
              img: normalizeUploadUrl(project.img) === uploadPath ? "" : project.img,
              spareImg:
                project.spareImg && normalizeUploadUrl(project.spareImg) === uploadPath
                  ? ""
                  : project.spareImg,
              cards: project.cards?.filter((c) => normalizeUploadUrl(c.src) !== uploadPath),
            })),
          });
        }
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const replaceUploadedImage = async (imageName: string, newFile: File) => {
    try {
      const formData = new FormData();
      formData.append("file", newFile);
      formData.append("folder", "projects");
      formData.append("replace", imageName);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const newUrl = normalizeUploadUrl(data.url as string);
        const oldPath = normalizeUploadUrl(`/uploads/projects/${imageName}`);
        setUploadedImages(
          uploadedImages.map((img) =>
            img.name === imageName
              ? { ...img, url: newUrl, modified: new Date().toISOString() }
              : img
          )
        );
        if (content) {
          setContent({
            ...content,
            projects: content.projects.map((project) => ({
              ...project,
              img: normalizeUploadUrl(project.img) === oldPath ? newUrl : project.img,
              spareImg:
                project.spareImg && normalizeUploadUrl(project.spareImg) === oldPath
                  ? newUrl
                  : project.spareImg,
              cards: project.cards?.map((c) =>
                normalizeUploadUrl(c.src) === oldPath ? { src: newUrl } : c
              ),
            })),
          });
        }
      } else {
        console.error("Failed to replace image");
      }
    } catch (error) {
      console.error("Error replacing image:", error);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const saveContent = async () => {
    if (!content) return;
    setSaving(true);
    setSavedMessage("");
    setErrorMessage("");

    try {
      const payload: Content = {
        ...content,
        projects: content.projects.map((p) => normalizeProjectImages(p)),
      };
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as Content & { error?: string };
      if (!response.ok) {
        throw new Error(data.error || `Save failed (${response.status})`);
      }

      setContent({
        ...data,
        projects: data.projects.map((p) => normalizeProjectImages(p)),
      });
      setSavedMessage("Content saved successfully.");
    } catch (error) {
      setErrorMessage(String(error));
    } finally {
      setSaving(false);
    }
  };

  if (authenticated === null || !content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06060b] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-purple border-t-transparent" />
          <p className="text-slate-400">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <AdminShell
      activeSection={activeSection}
      onSectionChange={(id) => setActiveSection(id as AdminSection)}
      navItems={sectionTabs}
      onSave={saveContent}
      saving={saving}
      savedMessage={savedMessage}
      errorMessage={errorMessage}
      onLogout={logout}
    >
        <AdminPanel active={activeSection} section="overview">
        <AdminCard>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Admin Overview</h2>
              <p className="text-slate-400">Quick summary of the current content and fast access to the main sections.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Projects</p>
              <p className="mt-4 text-3xl font-semibold text-white">{content.projects.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Grid items</p>
              <p className="mt-4 text-3xl font-semibold text-white">{content.gridItems.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Uploaded images</p>
              <p className="mt-4 text-3xl font-semibold text-white">{uploadedImages.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 md:col-span-2">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Education items</p>
              <p className="mt-4 text-3xl font-semibold text-white">{content.education.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 md:col-span-1">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Approach cards</p>
              <p className="mt-4 text-3xl font-semibold text-white">{content.approach.cards.length}</p>
            </div>
            <AnalyticsOverviewCard onOpen={() => setActiveSection("analytics")} />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sectionTabs
              .filter((s) => s.id !== "overview")
              .slice(0, 8)
              .map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSection(s.id as AdminSection)}
                  className="rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3 text-left text-sm text-slate-300 transition hover:border-purple/30 hover:text-white"
                >
                  Edit {s.label} →
                </button>
              ))}
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="hero">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Hero section</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2 text-sm">
              Subtitle (mono line)
              <input
                value={content.hero.subtitle}
                onChange={(event) => updateHeroField("subtitle", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              Availability badge
              <input
                value={content.hero.availabilityBadge ?? ""}
                onChange={(event) => updateHeroField("availabilityBadge", event.target.value)}
                placeholder="Open to full-time roles"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm lg:col-span-2">
              Headline — first line
              <input
                value={content.hero.headlineLead ?? ""}
                onChange={(event) => updateHeroField("headlineLead", event.target.value)}
                placeholder="I engineer"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm lg:col-span-2">
              Flip words (comma-separated, animated line)
              <input
                value={(content.hero.flipWords ?? []).join(", ")}
                onChange={(event) => {
                  if (!content) return;
                  const flipWords = event.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  setContent({ ...content, hero: { ...content.hero, flipWords } });
                }}
                placeholder="production APIs, hire-ready products"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm lg:col-span-2">
              Headline — last line
              <input
                value={content.hero.headlineEnd ?? ""}
                onChange={(event) => updateHeroField("headlineEnd", event.target.value)}
                placeholder="for teams that ship."
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm lg:col-span-2">
              Skill chips (comma-separated)
              <input
                value={(content.hero.skillChips ?? []).join(", ")}
                onChange={(event) => {
                  if (!content) return;
                  const skillChips = event.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean);
                  setContent({ ...content, hero: { ...content.hero, skillChips } });
                }}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              Cta label
              <input
                value={content.hero.ctaLabel}
                onChange={(event) => updateHeroField("ctaLabel", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm lg:col-span-2">
              Title (fallback if flip headline empty)
              <textarea
                value={content.hero.title}
                onChange={(event) => updateHeroField("title", event.target.value)}
                className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm lg:col-span-2">
              Description
              <textarea
                value={content.hero.description}
                onChange={(event) => updateHeroField("description", event.target.value)}
                className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              CTA link
              <input
                value={content.hero.ctaLink}
                onChange={(event) => updateHeroField("ctaLink", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              Secondary CTA label
              <input
                value={content.hero.secondaryCtaLabel ?? ""}
                onChange={(event) => updateHeroField("secondaryCtaLabel", event.target.value)}
                placeholder="Hiring? Let's talk"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              Secondary CTA link
              <input
                value={content.hero.secondaryCtaLink ?? ""}
                onChange={(event) => updateHeroField("secondaryCtaLink", event.target.value)}
                placeholder="#contact"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <AdminResumeUpload
              label="Resume PDF (English)"
              hint="English CV — used in Hero, nav, Contact, and Experience page."
              value={content.hero.resumeUrl ?? ""}
              onChange={updateResumeUrlEn}
            />
            <AdminResumeUpload
              label="Resume PDF (German / Deutsch)"
              hint="German CV (Lebenslauf) — second download option across the site."
              value={content.hero.resumeUrlDe ?? ""}
              onChange={updateResumeUrlDe}
            />
            <label className="space-y-2 text-sm">
              CV button label (English)
              <input
                value={content.hero.resumeLabel ?? ""}
                onChange={(event) => updateHeroField("resumeLabel", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              CV button label (German)
              <input
                value={content.hero.resumeLabelDe ?? ""}
                onChange={(event) => updateHeroField("resumeLabelDe", event.target.value)}
                placeholder="Lebenslauf laden"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              CV card tagline
              <input
                value={content.hero.resumeTagline ?? ""}
                onChange={(event) => updateHeroField("resumeTagline", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="about">
          <AboutAdminSection content={content} setContent={setContent} />
        </AdminPanel>

        <AdminPanel active={activeSection} section="grid">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Grid items</h2>
              <p className="text-slate-400">Edit the bento cards below the About manifest.</p>
            </div>
            <button
              type="button"
              onClick={addGridItem}
              className="rounded-full bg-purple px-5 py-3 text-sm font-semibold text-black transition hover:bg-purple/90"
            >
              Add grid item
            </button>
          </div>
          <div className="space-y-6">
            {content.gridItems.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.title || "Untitled grid item"}</h3>
                    <p className="text-slate-400">Grid item ID: {item.id}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGridItem(item.id)}
                    className="rounded-full border border-red-500 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-4 pt-4 lg:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    Title
                    <input
                      value={item.title}
                      onChange={(event) => updateGridItemField(item.id, 'title', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Description
                    <textarea
                      value={item.description}
                      onChange={(event) => updateGridItemField(item.id, 'description', event.target.value)}
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Image URL
                    <input
                      value={item.img}
                      onChange={(event) => updateGridItemField(item.id, 'img', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Spare Image URL
                    <input
                      value={item.spareImg}
                      onChange={(event) => updateGridItemField(item.id, 'spareImg', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Class name
                    <input
                      value={item.className}
                      onChange={(event) => updateGridItemField(item.id, 'className', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Image class name
                    <input
                      value={item.imgClassName}
                      onChange={(event) => updateGridItemField(item.id, 'imgClassName', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Title class name
                    <input
                      value={item.titleClassName}
                      onChange={(event) => updateGridItemField(item.id, 'titleClassName', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="work">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Work Experience</h2>
              <p className="text-slate-400">Edit your work experience items.</p>
            </div>
            <button
              type="button"
              onClick={addWorkExperience}
              className="rounded-full bg-purple px-5 py-3 text-sm font-semibold text-black transition hover:bg-purple/90"
            >
              Add work experience
            </button>
          </div>
          <div className="space-y-6">
            {content.workExperience.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{item.title || "Untitled work experience"}</h3>
                    <p className="text-slate-400">Work Experience ID: {item.id}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(item.id)}
                    className="rounded-full border border-red-500 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-4 pt-4 lg:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    Title
                    <input
                      value={item.title}
                      onChange={(event) => updateWorkExperienceField(item.id, 'title', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Description
                    <textarea
                      value={item.desc}
                      onChange={(event) => updateWorkExperienceField(item.id, 'desc', event.target.value)}
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Thumbnail
                    <input
                      value={item.thumbnail}
                      onChange={(event) => updateWorkExperienceField(item.id, 'thumbnail', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Class name
                    <input
                      value={item.className}
                      onChange={(event) => updateWorkExperienceField(item.id, 'className', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Company
                    <input
                      value={item.company || ""}
                      onChange={(event) => updateWorkExperienceField(item.id, "company", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Role
                    <input
                      value={item.role || ""}
                      onChange={(event) => updateWorkExperienceField(item.id, "role", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Period
                    <input
                      value={item.period || ""}
                      onChange={(event) => updateWorkExperienceField(item.id, "period", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                      placeholder="2023 — 2024"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Location
                    <input
                      value={item.location || ""}
                      onChange={(event) => updateWorkExperienceField(item.id, "location", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Employment type
                    <select
                      value={item.employmentType || "full-time"}
                      onChange={(event) =>
                        updateWorkExperienceField(item.id, "employmentType", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                      <option value="contract">Contract</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Overview
                    <textarea
                      value={item.overview || ""}
                      onChange={(event) => updateWorkExperienceField(item.id, "overview", event.target.value)}
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Responsibilities (one per line)
                    <textarea
                      value={(item.responsibilities || []).join("\n")}
                      onChange={(event) =>
                        updateWorkExperienceField(
                          item.id,
                          "responsibilities",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Technologies (one per line)
                    <textarea
                      value={(item.technologies || []).join("\n")}
                      onChange={(event) =>
                        updateWorkExperienceField(
                          item.id,
                          "technologies",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Outcomes (one per line)
                    <textarea
                      value={(item.outcomes || []).join("\n")}
                      onChange={(event) =>
                        updateWorkExperienceField(
                          item.id,
                          "outcomes",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300 lg:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(item.featured)}
                      onChange={(event) =>
                        updateWorkExperienceField(item.id, "featured", event.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-purple focus:ring-purple"
                    />
                    Show on homepage preview
                  </label>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="projects">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Projects</h2>
              <p className="text-slate-400">Edit case study fields: Problem → Solution → Stack → Outcome.</p>
            </div>
            <button
              type="button"
              onClick={addProject}
              className="rounded-full bg-purple px-5 py-3 text-sm font-semibold text-black transition hover:bg-purple/90"
            >
              Add new project
            </button>
          </div>
          <div className="space-y-6">
            {content.projects.map((project) => (
              <div key={project.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{project.title || "Untitled project"}</h3>
                    <p className="text-slate-400">Project ID: {project.id}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className="rounded-full border border-red-500 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 pt-4 lg:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    Title
                    <input
                      type="text"
                      value={project.title}
                      onChange={(event) => updateProjectField(project.id, "title", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Description
                    <textarea
                      value={project.des}
                      onChange={(event) => updateProjectField(project.id, "des", event.target.value)}
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Overview (English)
                    <textarea
                      value={project.overview || ""}
                      onChange={(event) => updateProjectField(project.id, "overview", event.target.value)}
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Challenge headline
                    <textarea
                      value={project.challenge || ""}
                      onChange={(event) => updateProjectField(project.id, "challenge", event.target.value)}
                      className="w-full min-h-[60px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Challenge detail
                    <textarea
                      value={project.challengeDetail || ""}
                      onChange={(event) => updateProjectField(project.id, "challengeDetail", event.target.value)}
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Solution headline
                    <textarea
                      value={project.solution || ""}
                      onChange={(event) => updateProjectField(project.id, "solution", event.target.value)}
                      className="w-full min-h-[60px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Solution detail
                    <textarea
                      value={project.solutionDetail || ""}
                      onChange={(event) => updateProjectField(project.id, "solutionDetail", event.target.value)}
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Key features (one per line)
                    <textarea
                      value={(project.keyFeatures || []).join("\n")}
                      onChange={(event) =>
                        updateProjectField(
                          project.id,
                          "keyFeatures",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[120px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Outcome metrics (one per line: value | label)
                    <textarea
                      value={(project.metrics || [])
                        .map((m) => `${m.value} | ${m.label}`)
                        .join("\n")}
                      onChange={(event) =>
                        updateProjectField(
                          project.id,
                          "metrics",
                          event.target.value
                            .split("\n")
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line, i) => {
                              const [value, ...rest] = line.split("|");
                              return {
                                id: `m-${project.id}-${i}`,
                                value: value?.trim() ?? "",
                                label: rest.join("|").trim() || "Metric",
                              };
                            })
                        )
                      }
                      placeholder={"Live | Production site\n21+ | Screens shipped"}
                      className="w-full min-h-[90px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Outcomes (one per line)
                    <textarea
                      value={(project.outcomes || []).join("\n")}
                      onChange={(event) =>
                        updateProjectField(
                          project.id,
                          "outcomes",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[120px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Live Demo URL
                    <input
                      type="text"
                      value={project.liveDemoUrl || ""}
                      onChange={(event) => updateProjectField(project.id, "liveDemoUrl", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    GitHub URL
                    <input
                      type="text"
                      value={project.githubUrl || ""}
                      onChange={(event) => updateProjectField(project.id, "githubUrl", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={Boolean(project.featured)}
                      onChange={(event) =>
                        updateProjectField(project.id, "featured", event.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-purple focus:ring-purple"
                    />
                    Show on homepage (featured)
                  </label>
                </div>
                <div className="space-y-4 pt-4">
                  <label className="space-y-2 text-sm">
                    Tech Stack Icons (one per line)
                    <textarea
                      value={project.iconLists?.join('\n') || ''}
                      onChange={(event) => updateProjectField(project.id, "iconLists", event.target.value.split('\n').filter(icon => icon.trim()))}
                      placeholder="Add icon paths, one per line (e.g., /re.svg)"
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                </div>
                <div className="grid gap-4 pt-4 lg:grid-cols-2">
                  <AdminImageUpload
                    label="Main image"
                    hint="Primary screenshot shown on the project card and detail page."
                    value={project.img}
                    folder="projects"
                    previewHeight="lg"
                    onChange={(url) => updateProjectField(project.id, "img", url)}
                    onUploaded={registerUploadedImage}
                  />
                </div>
                <div className="pt-4">
                  <AdminProjectGallery
                    cards={project.cards ?? []}
                    spareImg={project.spareImg}
                    folder="projects"
                    onChange={(cards) => updateProjectField(project.id, "cards", cards)}
                    onSpareImgChange={(url) => updateProjectField(project.id, "spareImg", url)}
                    onUploaded={registerUploadedImage}
                  />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="images">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Uploaded Images</h2>
              <p className="text-slate-400">View and manage all uploaded project images.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {uploadedImages.map((image) => (
              <div key={image.name} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={toMediaServeUrl(image.url)}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded-2xl"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <label className="cursor-pointer rounded-full bg-purple p-2 text-black hover:bg-purple/90">
                      ↻
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            await replaceUploadedImage(image.name, file);
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => deleteUploadedImage(image.name)}
                      className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-400">
                  <p className="truncate">{image.name}</p>
                  <p className="text-xs">
                    {(image.size / 1024).toFixed(1)} KB
                  </p>
                  <p className="text-xs">
                    {new Date(image.modified).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {uploadedImages.length === 0 && (
            <p className="text-center text-slate-400 py-8">No uploaded images yet.</p>
          )}
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="skills">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Skills Section</h2>
              <p className="text-slate-400">Manage skill categories, levels, and display content.</p>
            </div>
            <button
              type="button"
              onClick={addSkillCategory}
              className="rounded-full bg-purple px-5 py-3 text-sm font-semibold text-black transition hover:bg-purple/90"
            >
              Add category
            </button>
          </div>
          <div className="grid gap-4">
            <label className="space-y-2 text-sm">
              Section title
              <input
                value={content.skillsSection?.title || ""}
                onChange={(event) => updateSkillsField("title", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              Section description
              <textarea
                value={content.skillsSection?.description || ""}
                onChange={(event) => updateSkillsField("description", event.target.value)}
                className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <div className="space-y-6">
              {(content.skillsSection?.categories || []).map((category) => (
                <div key={category.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{category.title || "Untitled category"}</h3>
                      <p className="text-slate-400 text-sm">Category ID: {category.id}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => moveSkillCategory(category.id, 'up')}
                        className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-purple/50"
                        disabled={content?.skillsSection ? content.skillsSection.categories[0]?.id === category.id : false}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSkillCategory(category.id, 'down')}
                        className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-purple/50"
                        disabled={content?.skillsSection ? content.skillsSection.categories[content.skillsSection.categories.length - 1]?.id === category.id : false}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSkillCategory(category.id)}
                        className="rounded-full border border-red-500 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10"
                      >
                        Remove category
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-4 pt-4 lg:grid-cols-2">
                    <label className="space-y-2 text-sm">
                      Category title
                      <input
                        type="text"
                        value={category.title}
                        onChange={(event) => updateSkillCategoryTitle(category.id, event.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                      />
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">Skills</p>
                        <button
                          type="button"
                          onClick={() => addSkillItem(category.id)}
                          className="rounded-full bg-purple px-4 py-2 text-sm font-semibold text-black transition hover:bg-purple/90"
                        >
                          Add skill
                        </button>
                      </div>
                      <div className="space-y-4">
                        {category.skills.map((skill) => (
                          <div key={skill.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                            <div className="grid gap-4 lg:grid-cols-[1.6fr_0.9fr_0.8fr] items-center">
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(event) => updateSkillItemField(category.id, skill.id, "name", event.target.value)}
                                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                              />
                              <select
                                value={skill.level}
                                onChange={(event) => updateSkillItemField(category.id, skill.id, "level", event.target.value)}
                                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                                disabled={skill.display === "chip"}
                              >
                                <option value="Junior">Junior</option>
                                <option value="Mid">Mid</option>
                                <option value="Senior">Senior</option>
                              </select>
                              <label className="flex items-center gap-2 text-xs text-slate-400">
                                <input
                                  type="checkbox"
                                  checked={skill.display === "chip"}
                                  onChange={(event) =>
                                    updateSkillItemField(
                                      category.id,
                                      skill.id,
                                      "display",
                                      event.target.checked ? "chip" : "bar"
                                    )
                                  }
                                  className="accent-purple"
                                />
                                Tag style (soft skill)
                              </label>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => moveSkillItem(category.id, skill.id, 'up')}
                                  className="rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:border-purple/50"
                                  disabled={category.skills[0]?.id === skill.id}
                                >
                                  ↑
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveSkillItem(category.id, skill.id, 'down')}
                                  className="rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 transition hover:border-purple/50"
                                  disabled={category.skills[category.skills.length - 1]?.id === skill.id}
                                >
                                  ↓
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeSkillItem(category.id, skill.id)}
                                  className="rounded-full bg-red-500 px-4 py-3 text-sm text-white transition hover:bg-red-600"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(content.skillsSection?.categories || []).length === 0 && (
                <p className="text-slate-400">No skill categories yet. Add a category to get started.</p>
              )}
            </div>
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="languages">
          <LanguagesAdminSection content={content} setContent={setContent} />
        </AdminPanel>

        <AdminPanel active={activeSection} section="services">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Services Section</h2>
              <p className="text-slate-400">Define your professional services, ideas, and descriptions without prices.</p>
            </div>
            <button
              type="button"
              onClick={addServiceItem}
              className="rounded-full bg-purple px-5 py-3 text-sm font-semibold text-black transition hover:bg-purple/90"
            >
              Add service
            </button>
          </div>
          <div className="grid gap-4">
            <label className="space-y-2 text-sm">
              Section title
              <input
                value={content.servicesSection?.title || ""}
                onChange={(event) => updateServicesField("title", event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              Section description
              <textarea
                value={content.servicesSection?.description || ""}
                onChange={(event) => updateServicesField("description", event.target.value)}
                className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <div className="space-y-6">
              {(content.servicesSection?.services || []).map((service) => (
                <div key={service.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <label className="space-y-2 text-sm">
                      Service title
                      <input
                        type="text"
                        value={service.title}
                        onChange={(event) => updateServiceItemField(service.id, "title", event.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                      />
                    </label>
                    <label className="space-y-2 text-sm">
                      Service description
                      <textarea
                        value={service.description}
                        onChange={(event) => updateServiceItemField(service.id, "description", event.target.value)}
                        className="w-full min-h-[90px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                      />
                    </label>
                    <label className="space-y-2 text-sm">
                      Service image
                      <input
                        type="text"
                        value={service.image}
                        onChange={(event) => updateServiceItemField(service.id, "image", event.target.value)}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                      />
                      <p className="text-xs text-slate-500">Use a public image path like /WD.png or a hosted URL.</p>
                    </label>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeServiceItem(service.id)}
                      className="rounded-full bg-red-500 px-4 py-3 text-sm text-white transition hover:bg-red-600"
                    >
                      Delete service
                    </button>
                  </div>
                </div>
              ))}
              {(content.servicesSection?.services || []).length === 0 && (
                <p className="text-slate-400">No services yet. Add a service to get started.</p>
              )}
            </div>
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="education">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Education</h2>
            <p className="text-slate-400">Add and edit your education items.</p>
          </div>
          <div className="space-y-6">
            {content.education.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    Title
                    <input
                      value={item.title}
                      onChange={(event) => updateEducationField(item.id, 'title', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Description
                    <textarea
                      value={item.desc}
                      onChange={(event) => updateEducationField(item.id, 'desc', event.target.value)}
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <div className="lg:col-span-2 grid gap-4 md:grid-cols-2">
                    <AdminImageUpload
                      label="Thumbnail (logo / small icon)"
                      hint="Provider logo or small badge — shown in the card header."
                      value={item.thumbnail}
                      folder="education"
                      previewHeight="sm"
                      onChange={(url) => updateEducationField(item.id, "thumbnail", url)}
                    />
                    <AdminImageUpload
                      label="Cover image (certificate / campus)"
                      hint="Large credential preview on the education page."
                      value={item.coverImage || ""}
                      folder="education"
                      previewHeight="lg"
                      onChange={(url) => updateEducationField(item.id, "coverImage", url)}
                    />
                  </div>
                  <label className="space-y-2 text-sm">
                    Class name
                    <input
                      value={item.className}
                      onChange={(event) => updateEducationField(item.id, 'className', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Year / period
                    <input
                      value={item.year || ""}
                      onChange={(event) => updateEducationField(item.id, "year", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Institution
                    <input
                      value={item.institution || ""}
                      onChange={(event) => updateEducationField(item.id, "institution", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Type
                    <select
                      value={item.kind || "degree"}
                      onChange={(event) => updateEducationField(item.id, "kind", event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    >
                      <option value="degree">Degree</option>
                      <option value="bootcamp">Bootcamp</option>
                      <option value="certificate">Certificate</option>
                    </select>
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Timeline lines (one per line)
                    <textarea
                      value={(item.timeline || []).join("\n")}
                      onChange={(event) =>
                        updateEducationField(
                          item.id,
                          "timeline",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Projects (one per line)
                    <textarea
                      value={(item.projects || []).join("\n")}
                      onChange={(event) =>
                        updateEducationField(
                          item.id,
                          "projects",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300 lg:col-span-2">
                    <input
                      type="checkbox"
                      checked={Boolean(item.featured)}
                      onChange={(event) =>
                        updateEducationField(item.id, "featured", event.target.checked)
                      }
                      className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-purple focus:ring-purple"
                    />
                    Show on homepage preview
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Highlights (one per line)
                    <textarea
                      value={(item.highlights || []).join("\n")}
                      onChange={(event) =>
                        updateEducationField(
                          item.id,
                          "highlights",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="approach">
        <AdminCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Approach</h2>
            <p className="text-slate-400">Update the section heading and the three approach cards.</p>
          </div>
          <div className="grid gap-4">
            <label className="space-y-2 text-sm">
              Section title
              <input
                value={content.approach.title}
                onChange={(event) => updateApproachField('title', event.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            <label className="space-y-2 text-sm">
              Subtitle
              <textarea
                value={content.approach.subtitle || ""}
                onChange={(event) => updateApproachField("subtitle", event.target.value)}
                className="w-full min-h-[60px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
              />
            </label>
            {content.approach.cards.map((card) => (
              <div key={card.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <h3 className="text-lg font-semibold">Card {card.id}</h3>
                <div className="grid gap-4 lg:grid-cols-2 pt-4">
                  <label className="space-y-2 text-sm">
                    Phase label
                    <input
                      value={card.phaseLabel || ""}
                      onChange={(event) =>
                        updateApproachCardField(card.id, "phaseLabel", event.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                      placeholder="01 · Discover"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Title
                    <input
                      value={card.title}
                      onChange={(event) => updateApproachCardField(card.id, 'title', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Description
                    <textarea
                      value={card.description}
                      onChange={(event) => updateApproachCardField(card.id, 'description', event.target.value)}
                      className="w-full min-h-[80px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm lg:col-span-2">
                    Highlights (one per line)
                    <textarea
                      value={(card.highlights || []).join("\n")}
                      onChange={(event) =>
                        updateApproachCardField(
                          card.id,
                          "highlights",
                          event.target.value.split("\n").filter((line) => line.trim())
                        )
                      }
                      className="w-full min-h-[100px] rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        </AdminPanel>

        <AdminPanel active={activeSection} section="reviews">
          <ReviewsAdminSection content={content} setContent={setContent} />
        </AdminPanel>

        <AdminPanel active={activeSection} section="blog">
          <BlogAdminSection content={content} setContent={setContent} />
        </AdminPanel>

        <AdminPanel active={activeSection} section="comments">
          <CommentsAdminSection />
        </AdminPanel>

        <AdminPanel active={activeSection} section="stats">
          <StatsAdminSection content={content} setContent={setContent} />
        </AdminPanel>

        <AdminPanel active={activeSection} section="analytics">
          <AnalyticsAdminSection />
        </AdminPanel>

        <AdminPanel active={activeSection} section="locale">
          <LocalesAdminSection content={content} setContent={setContent} />
        </AdminPanel>

        <AdminPanel active={activeSection} section="contact">
        <AdminCard className="space-y-4">
          <ContactAdminSection content={content} setContent={setContent} />
          <h3 className="mb-4 mt-8 text-lg font-medium text-white">Social links</h3>
          <div className="space-y-6">
            {content.contact.socialMedia.map((link) => (
              <div key={link.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                <div className="grid gap-4 lg:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    Icon URL
                    <input
                      value={link.img}
                      onChange={(event) => updateSocialLinkField(link.id, 'img', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    Link URL
                    <input
                      value={link.link}
                      onChange={(event) => updateSocialLinkField(link.id, 'link', event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
        </AdminPanel>
    </AdminShell>
  );
};

export default AdminPage;
