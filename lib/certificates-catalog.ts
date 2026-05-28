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
    verifyId: "NQVQXD24Y7WJ",
    title: "Preparing to Manage Human Resources",
    issuer: "University of Minnesota",
    platform: "Coursera",
    category: "Business & HR",
    completedAt: "Dec 2023",
    summary:
      "Foundations of modern HR: how organizations attract talent, structure jobs, and align people practices with business goals.",
    skills: ["HR strategy", "Talent management", "Organizational design", "Employment law basics"],
  },
  {
    verifyId: "8RDFX3WXT6F4",
    title: "Introduction to Data Analytics",
    issuer: "IBM",
    platform: "Coursera",
    category: "Data & Analytics",
    completedAt: "Jan 2024",
    summary:
      "How data moves from raw sources to decisions — the analytics lifecycle, types of analysis, and the tools teams use daily.",
    skills: ["Data lifecycle", "Descriptive analytics", "SQL basics", "Data visualization", "Business storytelling"],
  },
  {
    verifyId: "DBNMSDWF2ZKA",
    title: "Foundations of Project Management",
    issuer: "Google",
    platform: "Coursera",
    category: "Project Management",
    completedAt: "Feb 2024",
    summary:
      "Core PM vocabulary, project phases, and when to use Waterfall vs Agile — plus how culture shapes delivery.",
    skills: ["Project lifecycle", "Agile & Waterfall", "Stakeholder communication", "Scrum basics", "Change management"],
  },
  {
    verifyId: "UGXY6GL5WDN8",
    title: "Excel Basics for Data Analysis",
    issuer: "IBM",
    platform: "Coursera",
    category: "Data & Analytics",
    completedAt: "Feb 2024",
    summary:
      "Cleaning spreadsheets, building summaries with formulas, and turning rows into charts stakeholders actually read.",
    skills: ["Excel", "Pivot tables", "Data cleaning", "Charts", "VLOOKUP & formulas"],
  },
  {
    verifyId: "YKZPXQR3ERY3",
    title: "Project Initiation: Starting a Successful Project",
    issuer: "Google",
    platform: "Coursera",
    category: "Project Management",
    completedAt: "Apr 2024",
    summary:
      "Defining scope, goals, and stakeholders up front — writing charters and success criteria before execution starts.",
    skills: ["Project charter", "Scope definition", "Stakeholder mapping", "SMART goals", "Risk awareness"],
  },
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
    verifyId: "FIRMWLAYBLM6",
    title: "Introduction to Hardware and Operating Systems",
    issuer: "IBM",
    platform: "Coursera",
    category: "IT & Infrastructure",
    completedAt: "Nov 2024",
    summary:
      "How computers are built (CPU, memory, storage) and what operating systems do to run apps and manage resources.",
    skills: ["Computer hardware", "Operating systems", "Processes & memory", "I/O systems", "Troubleshooting"],
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
  {
    verifyId: "ICF2ADH90WCR",
    title: "Algebra and Differential Calculus for Data Science",
    issuer: "University of Colorado Boulder",
    platform: "Coursera",
    category: "Machine Learning & AI",
    completedAt: "Jan 2025",
    summary:
      "Math behind ML: vectors, matrices, derivatives, and gradients — the language optimization algorithms speak.",
    skills: ["Linear algebra", "Calculus", "Gradients", "Optimization", "Data science math"],
  },
  {
    verifyId: "CDMDLEXQ6NT3",
    title: "Mathematics for Machine Learning: Linear Algebra",
    issuer: "Imperial College London",
    platform: "Coursera",
    category: "Machine Learning & AI",
    completedAt: "Mar 2025",
    summary:
      "Geometric view of linear algebra — transformations, eigenvalues, and why matrix math powers modern AI models.",
    skills: ["Vectors", "Matrices", "Eigenvalues", "Linear transformations", "ML foundations"],
  },
  {
    verifyId: "2WIWFGF9W8LB",
    title: "Introduction to Software Engineering",
    issuer: "IBM",
    platform: "Coursera",
    category: "Software Development",
    completedAt: "Apr 2025",
    summary:
      "SDLC phases, Agile/Scrum rituals, testing discipline, and professional practices for building software in teams.",
    skills: ["SDLC", "Agile", "Scrum", "Git workflows", "Software design", "QA basics"],
  },
  {
    verifyId: "IPRGE2XB7R6L",
    title: "HTML and CSS in depth",
    issuer: "Meta",
    platform: "Coursera",
    category: "Software Development",
    completedAt: "May 2025",
    summary:
      "Production-grade UI: Flexbox, Grid, semantic markup, responsive patterns, motion, and accessible components.",
    skills: ["HTML5", "CSS Grid", "Flexbox", "Responsive UI", "CSS animations", "Accessibility"],
  },
  {
    verifyId: "IB79ARVQ2NN6",
    title: "An Introduction to Ethical Hacking with Kali Linux",
    issuer: "Packt",
    platform: "Coursera",
    category: "Security",
    completedAt: "Jul 2025",
    summary:
      "Ethical hacker mindset, reconnaissance, and hands-on security tooling in Kali — always within legal scope.",
    skills: ["Ethical hacking", "Kali Linux", "Reconnaissance", "Vulnerability basics", "Security tooling"],
  },
  {
    verifyId: "6LRMHSCGRC8M",
    title: "Technical Support Fundamentals",
    issuer: "Google",
    platform: "Coursera",
    category: "IT & Infrastructure",
    completedAt: "Sep 2025",
    summary:
      "IT support foundations: troubleshooting methodically, customer communication, hardware, networking, and OS basics.",
    skills: ["IT support", "Troubleshooting", "Networking basics", "Operating systems", "Customer service"],
  },
  {
    verifyId: "QNMBYQOL4Q4F",
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    platform: "Coursera",
    category: "IT & Infrastructure",
    completedAt: "Feb 2026",
    summary:
      "TCP/IP stack, DNS, DHCP, routing, and how packets move — the networking layer every full-stack dev should understand.",
    skills: ["TCP/IP", "DNS", "Routing", "Network troubleshooting", "Cloud networking intro"],
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
    id: "progress-os-power",
    title: "Operating Systems: Becoming a Power User",
    issuer: "Google",
    platform: "Coursera",
    category: "IT & Infrastructure",
    progress: 15,
    url: "https://www.coursera.org/learn/os-power-user/home/module/1",
    summary:
      "Shell workflows, processes, package management, and day-to-day power-user skills on desktop OS.",
    skills: ["Linux CLI", "Process management", "OS fundamentals"],
  },
  {
    id: "progress-cybersec",
    title: "Introduction to Cybersecurity Tools & Cyber Attacks",
    issuer: "IBM",
    platform: "Coursera",
    category: "Security",
    progress: 50,
    url: "https://www.coursera.org/learn/introduction-cybersecurity-cyber-attacks/home/welcome",
    summary:
      "Security tooling, common attack types, and how defenders reason about protecting systems.",
    skills: ["Cybersecurity basics", "Threat landscape", "Security tools"],
  },
  {
    id: "progress-nestjs",
    title: "Mastering NestJS",
    issuer: "Packt",
    platform: "Coursera",
    category: "Software Development",
    progress: 12,
    url: "https://www.coursera.org/learn/packt-mastering-nestjs-4opl7/home/welcome",
    summary:
      "Modular Node back-ends with NestJS — modules, dependency injection, guards, and API structure.",
    skills: ["NestJS", "TypeScript", "Node.js", "REST APIs"],
  },
  {
    id: "progress-youtube",
    title: "Developer skills playlist",
    issuer: "YouTube",
    platform: "YouTube",
    category: "Software Development",
    progress: 50,
    url: "https://www.youtube.com/show/VLPLF9mJC4RrjIhv0_YjWvC0pmM1EZlVylBt?sbp=KgtEbmV3S01WeWZsRUAB",
    summary:
      "Self-paced video series alongside formal courses — practical topics I apply on real projects.",
    skills: ["Self-paced learning", "Hands-on tutorials"],
  },
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

const STATS_COMPLETED_PREVIEW = 8;

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

const CHART_BY_YEAR: StatsChartPoint[] = [
  { id: "2023", label: "2023", value: 1 },
  { id: "2024", label: "2024", value: 12 },
  { id: "2025", label: "2025", value: 6 },
  { id: "2026", label: "2026", value: 1 },
];

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
      description: "Verified Coursera credentials",
    },
    {
      id: "active",
      label: "Courses in progress",
      value: inProgress.length,
      description: "Coursera, YouTube, and language learning",
    },
    {
      id: "ml",
      label: "ML & AI completed",
      value: completed.filter((i) => i.category === "Machine Learning & AI").length,
      description: "Math, models, and production",
    },
    {
      id: "platforms",
      label: "Learning platforms",
      value: 3,
      suffix: "",
      description: "Coursera · YouTube · VHS portal",
    },
  ];

  return {
    title: "Impact, Learning & Growth",
    description:
      "What I am learning now, plus verified certificates from IBM, Meta, Google, Stanford, and more — with summaries and skills I use on real work.",
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
