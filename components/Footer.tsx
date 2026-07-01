"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { FaCode } from "react-icons/fa";
import { ContactSection } from "@/lib/types";
import { mergeContactSection } from "@/lib/contact-defaults";
import { getFooterNavLinks, getFooterLegalLinks } from "@/lib/footer-nav";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const FooterNewsletter = dynamic(
  () => import("@/components/newsletter/FooterNewsletter").then((m) => m.FooterNewsletter),
  { ssr: false }
);

const HireMeSection = dynamic(() => import("@/components/contact/HireMeSection"), {
  ssr: false,
  loading: () => (
    <section id="contact" className="mt-20 py-20 text-center text-slate-500">
      Loading contact…
    </section>
  ),
});

const Footer = ({ contact }: { contact: ContactSection }) => {
  const merged = mergeContactSection(contact, contact.socialMedia);
  return (
    <footer className="relative w-full pb-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full overflow-hidden md:h-56">
        <OptimizedImage
          src="/footer-grid.svg"
          alt=""
          width={1200}
          height={300}
          sizes="100vw"
          className="h-full w-full object-cover object-bottom opacity-30"
          aria-hidden
        />
      </div>

      <HireMeSection contact={merged} />

      <FooterNewsletter />

      <CenteredFooterBar contact={merged} />
    </footer>
  );
};

function FooterBrand() {
  const { t } = useLocale();

  return (
    <Link
      href="#home"
      className="group flex flex-col items-center gap-2 focus-ring rounded-xl px-2 py-1"
      aria-label="Ahmad Al-Halwany — back to top"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple/25 bg-page-card-solid shadow-[0_0_24px_-6px_var(--glow-purple)] transition duration-300 group-hover:border-purple/50 group-hover:shadow-[0_0_32px_-4px_var(--glow-purple)]">
        <FaCode className="h-5 w-5 text-purple transition group-hover:scale-110" />
      </span>
      <span className="text-center">
        <span className="block text-xl font-bold tracking-tight text-page-fg md:text-2xl">
          Ahmad<span className="text-purple">.</span>dev
        </span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-page-muted transition group-hover:text-page-fg">
          {t("footer.brandTagline")}
        </span>
      </span>
    </Link>
  );
}

function CenteredFooterBar({ contact }: { contact: ContactSection }) {
  const { locale, t } = useLocale();
  const footerLinks = getFooterNavLinks(locale, {
    en: contact.resumeUrl,
    de: contact.resumeUrlDe,
  });
  const legalLinks = getFooterLegalLinks(locale);

  return (
    <div className="relative z-10 mx-auto mt-8 max-w-4xl px-4">
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-purple/30 to-transparent"
        aria-hidden
      />

      <div className="flex flex-col items-center pt-8">
        <FooterBrand />

        <nav
          className="mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8"
          aria-label="Footer navigation"
        >
          {footerLinks.map((item) => (
            <FooterNavItem key={item.label} item={item} />
          ))}
        </nav>

        {contact.socialMedia.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {contact.socialMedia.map((info) => (
              <Link
                key={info.id}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social profile"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border border-page bg-page-card backdrop-blur-md transition duration-300",
                  "hover:border-purple/40 hover:bg-purple/5 hover:shadow-[0_0_20px_-8px_var(--glow-purple)] focus-ring"
                )}
              >
                <OptimizedImage
                  src={info.img}
                  alt=""
                  width={18}
                  height={18}
                  sizes={SIZES.icon}
                />
              </Link>
            ))}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-page-muted md:text-sm">
          {contact.copyright}
        </p>

        <p className="mt-1.5 pb-2 text-center text-[10px] uppercase tracking-widest text-page-muted">
          {t("footer.hiringLine")}
        </p>

        <nav
          className="mt-4 flex items-center gap-4 text-[11px] text-page-muted"
          aria-label="Legal"
        >
          {legalLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition hover:text-purple hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

function FooterNavItem({
  item,
}: {
  item: ReturnType<typeof getFooterNavLinks>[number];
}) {
  const className = cn(
    "text-sm text-page-muted transition-colors hover:text-page-fg",
    "link-underline focus-ring rounded-sm px-0.5"
  );

  if (item.download) {
    return (
      <a href={item.href} download className={className}>
        {item.label}
      </a>
    );
  }

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

export default Footer;
