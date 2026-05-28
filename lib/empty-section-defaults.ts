import { BlogSection, StatsSection, TestimonialsSection } from "@/lib/types";

/** Section shells only — no mock metrics, posts, or reviews. Edit copy in Admin. */
export const emptyBlogSection: BlogSection = {
  title: "Insights & Articles",
  description: "",
  viewAllLabel: "View all articles",
  readLatestLabel: "Read latest article",
};

export const emptyTestimonialsSection: TestimonialsSection = {
  title: "Voices orbiting the globe",
  description: "",
  ctaLabel: "Add your review",
};

export const emptyStatsSection: StatsSection = {
  title: "Impact, Learning & Growth",
  description: "",
  metrics: [],
  chartTitle: "",
  chartPoints: [],
  learningTitle: "",
  learningDescription: "",
  learningItems: [],
};
