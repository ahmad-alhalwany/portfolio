import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Portfolio CMS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-layout min-h-screen bg-[#06060b] text-white antialiased">{children}</div>
  );
}
