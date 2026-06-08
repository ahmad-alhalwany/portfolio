import { EducationItem } from "@/lib/types";
import { defaultEducationItems } from "@/lib/education-defaults";
import { certificateThumbnail } from "@/lib/institution-brand";
import { LearningItem, StatsChartPoint, StatsSection, StatMetric } from "@/lib/types";

type CertSeed = {
  verifyId: string;
  title: string;
  issuer: string;
  platform: "Coursera";
  category: string;
  completedAt: string;
  summary: string;
  skills: string[];
};

const CERTIFICATES: CertSeed[] = [
  {
    verifyId: "WZC7PWNSUFER",
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Stanford Online · DeepLearning.AI",
    platform: "Coursera",
    category: "Machine Learning & AI",
    completedAt: "Apr 2024",
    summary:
      "Built intuition for models that learn from labeled data — linear & logistic regression, cost functions, and gradient descent.",
    skills: ["Supervised learning", "Linear regression", "Logistic regression", "Gradient descent", "Feature scaling", "Python"],
  },
  {
    verifyId: "6QZPYE3CAU2E",
    title: "Machine Learning in Production",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    category: "Machine Learning & AI",
    completedAt: "Jun 2024",
    summary:
      "MLOps mindset: shipping models safely, monitoring drift, and keeping data + code pipelines reliable after launch.",
    skills: ["MLOps", "Model deployment", "Monitoring", "Data pipelines", "Production ML"],
  },
  {
    verifyId: "XR3EBFT7U7BF",
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    platform: "Coursera",
    category: "Software Development",
    completedAt: "Jun 2024",
    summary:
      "Role of a front-end developer, semantic HTML, CSS layout, responsive design, and how browsers render UI.",
    skills: ["HTML5", "CSS", "Responsive design", "Accessibility basics", "Developer workflow"],
  },
  {
    verifyId: "E89F6P7WD82P",
    title: "Introduction to Back-End Development",
    issuer: "Meta",
    platform: "Coursera",
    category: "Software Development",
    completedAt: "Jun 2024",
    summary:
      "Server-side fundamentals: HTTP request/response, APIs, databases at a high level, and how front-end talks to back-end.",
    skills: ["HTTP & REST", "Back-end concepts", "Databases intro", "Server hosting", "Web architecture"],
  },
  {
    verifyId: "65HJ6BA7XVTC",
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    category: "Machine Learning & AI",
    completedAt: "Jun 2024",
    summary:
      "From perceptrons to deep nets — forward/backward propagation, activation functions, and training L-layer networks.",
    skills: ["Neural networks", "Deep learning", "Backpropagation", "TensorFlow basics", "Vectorization"],
  },
  {
    verifyId: "VDK0T64Y9V3P",
    title: "Programming in Python",
    issuer: "Meta",
    platform: "Coursera",
    category: "Software Development",
    completedAt: "Sep 2024",
    summary:
      "Python building blocks: types, control flow, functions, files, and structuring small programs with clear logic.",
    skills: ["Python", "Functions", "OOP intro", "File I/O", "Debugging"],
  },
  {
    verifyId: "VIWCLGNJ4VRR",
    title: "Version Control",
    issuer: "Meta",
    platform: "Coursera",
    category: "Software Development",
    completedAt: "Nov 2024",
    summary:
      "Git workflows for real teams: commits, branches, merges, pull requests, and recovering from conflicts calmly.",
    skills: ["Git", "GitHub", "Branching", "Merge conflicts", "Code review"],
  },
];

export const CERTIFICATE_COUNT = CERTIFICATES.length;

type InProgressSeed = {
  id: string;
  title: string;
  issuer: string;
  platform: LearningItem["platform"];
  category: string;
  progress: number;
  url: string;
  summary: string;
  skills: string[];
};

/** Courses actively in progress — shown first in Impact & Growth. */
const IN_PROGRESS_COURSES: InProgressSeed[] = [
  {
    id: "progress-a2-de",
    title: "A2 German Course",
    issuer: "VHS Learning Portal",
    platform: "Other",
    category: "Languages",
    progress: 50,
    url: "https://a2.vhs-lernportal.de/wws/9.php#/wws/home.php",
    summary:
      "Structured A2 German — grammar, vocabulary, and communication for everyday situations.",
    skills: ["German A2", "Grammar", "Listening & reading"],
  },
];

const CATEGORY_ORDER = [
  "Machine Learning & AI",
  "Software Development",
  "Data & Analytics",
  "IT & Infrastructure",
  "Project Management",
  "Security",
  "Languages",
  "Business & HR",
] as const;

const STATS_COMPLETED_PREVIEW = 7;

function inProgressToLearningItem(course: InProgressSeed): LearningItem {
  return {
    id: course.id,
    title: course.title,
    platform: course.platform,
    category: course.category,
    issuer: course.issuer,
    progress: course.progress,
    status: "in_progress",
    url: course.url,
    summary: course.summary,
    skills: course.skills,
  };
}

function parseCompletedAt(value?: string): number {
  if (!value) return 0;
  const t = Date.parse(value);
  return Number.isNaN(t) ? 0 : t;
}

function getRecentCompletedItems(items: LearningItem[], limit: number): LearningItem[] {
  return [...items]
    .sort((a, b) => parseCompletedAt(b.completedAt) - parseCompletedAt(a.completedAt))
    .slice(0, limit);
}

export function certificateToLearningItem(cert: CertSeed): LearningItem {
  return {
    id: cert.verifyId,
    title: cert.title,
    platform: cert.platform,
    category: cert.category,
    issuer: cert.issuer,
    completedAt: cert.completedAt,
    summary: cert.summary,
    skills: cert.skills,
    progress: 100,
    status: "completed",
    url: `https://coursera.org/verify/${cert.verifyId}`,
    icon: `/certificates/${cert.verifyId}.png`,
  };
}

export function certificateToEducationItem(cert: CertSeed, id: number): EducationItem {
  return {
    id,
    title: cert.title,
    desc: cert.summary,
    className: "md:col-span-2",
    thumbnail: certificateThumbnail(cert.issuer, cert.verifyId),
    coverImage: `/certificates/${cert.verifyId}.png`,
    institution: cert.issuer,
    year: cert.completedAt,
    kind: "certificate",
    category: cert.category,
    highlights: cert.skills,
    verifyUrl: `https://coursera.org/verify/${cert.verifyId}`,
    featured: false,
  };
}

export function getDegreeEducationItem(cmsEducation?: EducationItem[]): EducationItem {
  const degree =
    cmsEducation?.find((e) => e.kind === "degree") ??
    defaultEducationItems.find((e) => e.kind === "degree");
  return degree ?? defaultEducationItems[0];
}

export function getCertificateEducationItems(): EducationItem[] {
  return CERTIFICATES.map((cert, index) => certificateToEducationItem(cert, index + 2));
}

export function getFullEducationItems(cmsEducation?: EducationItem[]): EducationItem[] {
  return [getDegreeEducationItem(cmsEducation), ...getCertificateEducationItems()];
}

export function getCertificateLearningItems(): LearningItem[] {
  const items = CERTIFICATES.map(certificateToLearningItem);
  return items.sort((a, b) => {
    const order = (c: string) => {
      const i = CATEGORY_ORDER.indexOf(c as (typeof CATEGORY_ORDER)[number]);
      return i === -1 ? 99 : i;
    };
    const catA = order(a.category);
    const catB = order(b.category);
    if (catA !== catB) return catA - catB;
    return a.title.localeCompare(b.title);
  });
}

const CHART_BY_YEAR: StatsChartPoint[] = [{ id: "2024", label: "2024", value: 7 }];

export function getInProgressLearningItems(): LearningItem[] {
  return IN_PROGRESS_COURSES.map(inProgressToLearningItem);
}

export function getCertificatesStatsSection(): StatsSection {
  const inProgress = getInProgressLearningItems();
  const completed = getCertificateLearningItems();
  const completedPreview = getRecentCompletedItems(completed, STATS_COMPLETED_PREVIEW);
  const learningItems = [...inProgress, ...completedPreview];

  const metrics: StatMetric[] = [
    {
      id: "certs",
      label: "Certificates earned",
      value: completed.length,
      description: "Meta & DeepLearning.AI credentials",
    },
    {
      id: "active",
      label: "Courses in progress",
      value: inProgress.length,
      description: "German A2 — VHS learning portal",
    },
    {
      id: "ml",
      label: "ML & AI completed",
      value: completed.filter((i) => i.category === "Machine Learning & AI").length,
      description: "Supervised ML, deep learning, MLOps",
    },
    {
      id: "platforms",
      label: "Learning platforms",
      value: 2,
      suffix: "",
      description: "Coursera · VHS portal",
    },
  ];

  return {
    title: "Impact, Learning & Growth",
    description:
      "Focused professional credentials from Meta and DeepLearning.AI — plus German language progress — aligned with full-stack and production ML work.",
    metrics,
    chartTitle: "Certificates completed by year",
    chartPoints: CHART_BY_YEAR,
    learningTitle: "Learning paths",
    learningDescription:
      "Active courses with progress, plus recent completions. Open a card to continue a course or verify a certificate on Coursera.",
    learningItems,
  };
}

/** Homepage stats — learning data always comes from the catalog; CMS may override copy only. */
export function resolveStatsSection(cms?: StatsSection): StatsSection {
  const catalog = getCertificatesStatsSection();
  if (!cms) return catalog;

  return {
    ...catalog,
    title: cms.title?.trim() || catalog.title,
    description: cms.description?.trim() || catalog.description,
    learningTitle: cms.learningTitle?.trim() || catalog.learningTitle,
    learningDescription: cms.learningDescription?.trim() || catalog.learningDescription,
  };
}
