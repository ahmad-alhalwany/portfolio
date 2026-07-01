import { Metadata } from "next";
import { EducationPageView } from "@/components/education/EducationPageView";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Education & Certificates | Ahmad Al-Halwany",
  description:
    "University degree, professional certifications (Meta, DeepLearning.AI), and in-progress German course — full timeline with credential details.",
  path: "/education",
});

export default function EducationPage() {
  return <EducationPageView />;
}
