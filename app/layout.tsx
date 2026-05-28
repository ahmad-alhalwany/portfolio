import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientBoot } from "@/components/root/ClientBoot";
import { RootJsonLd } from "@/components/seo/RootJsonLd";
import { rootMetadata } from "@/lib/seo";
import { getCachedLocalizedContent } from "@/lib/cached-content";

const inter = Inter({ subsets: ["latin"], display: "swap", preload: true });

export const metadata: Metadata = {
  ...rootMetadata,
  icons: {
    icon: [{ url: "/profile.svg", type: "image/svg+xml" }],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
};

const themeInitScript = `(function(){try{var k="ahmad-portfolio-theme",s=localStorage.getItem(k),r=document.documentElement;if(s==="light"){r.classList.remove("dark");}else{r.classList.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialContent = await getCachedLocalizedContent("en");

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <RootJsonLd />
        <ClientBoot initialContent={initialContent}>{children}</ClientBoot>
      </body>
    </html>
  );
}
