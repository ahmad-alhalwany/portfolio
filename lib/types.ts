export type HeroSection = {
  subtitle: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  headlineLead?: string;
  flipWords?: readonly string[];
  headlineEnd?: string;
  availabilityBadge?: string;
  skillChips?: readonly string[];
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  resumeUrl?: string;
  resumeUrlDe?: string;
  resumeLabel?: string;
  resumeLabelDe?: string;
  resumeTagline?: string;
};

export type AboutMeta = {
  key: string;
  value: string;
};

export type AboutPrinciple = {
  id: string;
  title: string;
  body: string;
};

export type AboutTimelineItem = {
  id: string;
  year: string;
  label: string;
};

export type AboutSection = {
  label: string;
  title: string;
  titleAccent: string;
  intro: string;
  story: string[];
  principles: AboutPrinciple[];
  timeline: AboutTimelineItem[];
  meta: AboutMeta[];
  bentoTitle?: string;
};

export type GridItem = {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName: string;
  titleClassName: string;
  img: string;
  spareImg: string;
};

export type ProjectCard = {
  src: string;
};

export type ProjectMetric = {
  id: string;
  value: string;
  label: string;
};

export type Project = {
  id: number;
  title: string;
  des: string;
  img: string;
  spareImg?: string;
  iconLists: string[];
  /** Short summary shown in challenge card header */
  challenge?: string;
  /** Extended challenge explanation (English) */
  challengeDetail?: string;
  /** Short summary shown in solution card header */
  solution?: string;
  /** Extended solution explanation (English) */
  solutionDetail?: string;
  /** Project context paragraph */
  overview?: string;
  /** Bullet list of implementation highlights */
  keyFeatures?: string[];
  /** Bullet list of results / impact */
  outcomes?: string[];
  /** Highlight metrics shown in the Outcome section (e.g. "15%", "1,000+") */
  metrics?: ProjectMetric[];
  /** Highlight on homepage showcase */
  featured?: boolean;
  /** Text-only listing — no screenshots, compact case study layout */
  compact?: boolean;
  liveDemoUrl?: string;
  githubUrl?: string;
  cards?: ProjectCard[];
};

export type EmploymentType = "internship" | "full-time" | "freelance" | "contract";

export type WorkExperience = {
  id: number;
  title: string;
  desc: string;
  className: string;
  thumbnail: string;
  company?: string;
  role?: string;
  period?: string;
  location?: string;
  employmentType?: EmploymentType;
  overview?: string;
  responsibilities?: string[];
  technologies?: string[];
  outcomes?: string[];
  featured?: boolean;
};

export type EducationKind = "degree" | "bootcamp" | "certificate";

export type EducationItem = {
  id: number;
  /** Course name or degree subtitle */
  title: string;
  desc: string;
  className: string;
  /** Small provider icon */
  thumbnail: string;
  /** Large certificate / campus image */
  coverImage?: string;
  /** Provider chip label (e.g. Meta, Tishreen University) */
  institution?: string;
  year?: string;
  kind?: EducationKind;
  highlights?: string[];
  /** Extra lines (e.g. started 2017, graduated 2023) */
  timeline?: string[];
  /** Academic or capstone projects */
  projects?: string[];
  /** Show on homepage preview */
  featured?: boolean;
  /** Coursera (or other) verification URL */
  verifyUrl?: string;
  /** Group label, e.g. Machine Learning & AI */
  category?: string;
};

export type ApproachCard = {
  id: number;
  title: string;
  description: string;
  /** e.g. "01 · Discovery" */
  phaseLabel?: string;
  /** Hiring-focused bullet points */
  highlights?: string[];
};

export type ApproachSection = {
  title: string;
  subtitle?: string;
  cards: ApproachCard[];
};

export type SkillItem = {
  id: number;
  name: string;
  level: "Junior" | "Mid" | "Senior";
  /** chip = tag list without level bar (e.g. soft skills) */
  display?: "bar" | "chip";
};

export type SkillCategory = {
  id: number;
  title: string;
  skills: SkillItem[];
};

export type SkillsSection = {
  title: string;
  description: string;
  categories: SkillCategory[];
};

export type SpokenLanguageLevel =
  | "native"
  | "c2"
  | "c1"
  | "b2"
  | "b1"
  | "a2"
  | "a1";

export type SpokenLanguage = {
  id: string;
  /** English name */
  name: string;
  /** Name in the language itself, e.g. العربية */
  nativeLabel?: string;
  /** CEFR or role label shown on the card */
  levelLabel: string;
  level: SpokenLanguageLevel;
  /** 0–100 for progress bar (e.g. studying toward next level) */
  progress?: number;
  /** Label above progress bar, e.g. "Progress toward B1" */
  progressLabel?: string;
  /** Short context, e.g. self-study note */
  note?: string;
  flag?: string;
  /** Show "Learning" badge — for languages you are actively improving */
  learning?: boolean;
};

export type LanguagesSection = {
  title: string;
  description: string;
  languages: SpokenLanguage[];
};

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  /** Short line under the title in the selector */
  tagline?: string;
  /** Bullet points shown for the active service */
  highlights?: string[];
};

export type ServicesSection = {
  title: string;
  description: string;
  services: ServiceItem[];
};

export type SocialLink = {
  id: number;
  img: string;
  link: string;
};

export type ContactHighlight = {
  id: string;
  label: string;
  value: string;
};

export type ContactSection = {
  heading: string;
  headingHighlight?: string;
  description: string;
  badge: string;
  availability: string;
  email: string;
  calendlyUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  resumeUrlDe?: string;
  highlights: ContactHighlight[];
  formTitle: string;
  formDescription: string;
  primaryCtaLabel: string;
  calendlyCtaLabel: string;
  copyright: string;
  socialMedia: SocialLink[];
};

export type ReviewStatus = "pending" | "approved" | "rejected";

export type BlogComment = {
  id: string;
  postSlug: string;
  name: string;
  email: string;
  message: string;
  status: ReviewStatus;
  createdAt: string;
};

export type BlogCommentPublic = Pick<
  BlogComment,
  "id" | "postSlug" | "name" | "message" | "createdAt"
>;

export type Review = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  rating: number;
  message: string;
  status: ReviewStatus;
  createdAt: string;
  lat: number;
  lng: number;
};

export type ReviewPublic = Pick<
  Review,
  "id" | "name" | "avatar" | "rating" | "message" | "createdAt" | "lat" | "lng"
>;

export type TestimonialsSection = {
  title: string;
  description: string;
  ctaLabel: string;
};

export type BlogPostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  tags: string[];
  status: BlogPostStatus;
  readTimeMinutes: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostPublic = Omit<BlogPost, "status">;

export type BlogSection = {
  title: string;
  description: string;
  viewAllLabel: string;
  readLatestLabel: string;
};

export type StatMetric = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  description: string;
  icon?: string;
};

export type LearningPlatform = "Coursera" | "YouTube" | "Udemy" | "Other";

export type LearningItem = {
  id: string;
  title: string;
  platform: LearningPlatform;
  category: string;
  progress: number;
  status: "in_progress" | "completed";
  icon?: string;
  url?: string;
  /** e.g. IBM, Meta, Google */
  issuer?: string;
  /** Display date, e.g. "Nov 2024" */
  completedAt?: string;
  /** Short plain-language summary of what you learned */
  summary?: string;
  skills?: string[];
};

export type StatsChartPoint = {
  id: string;
  label: string;
  value: number;
};

export type StatsSection = {
  title: string;
  description: string;
  metrics: StatMetric[];
  learningTitle: string;
  learningDescription: string;
  learningItems: LearningItem[];
  chartTitle: string;
  chartPoints: StatsChartPoint[];
};

/** Locale/CMS patches may omit nested fields (merged onto full Content). */
export type DeepPartial<T> = T extends readonly (infer U)[]
  ? readonly DeepPartial<U>[]
  : T extends (infer U)[]
    ? DeepPartial<U>[]
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

export type Content = {
  hero: HeroSection;
  aboutSection?: AboutSection;
  gridItems: GridItem[];
  projects: Project[];
  workExperience: WorkExperience[];
  education: EducationItem[];
  approach: ApproachSection;
  skillsSection?: SkillsSection;
  languagesSection?: LanguagesSection;
  servicesSection?: ServicesSection;
  testimonialsSection?: TestimonialsSection;
  blogSection?: BlogSection;
  statsSection?: StatsSection;
  contact: ContactSection;
  /** German overrides stored in CMS (merged over file defaults). */
  localeDe?: DeepPartial<Content>;
};
