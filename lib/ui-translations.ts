import { Locale } from "@/lib/locale";

export type UiKey =
  | "nav.home"
  | "nav.about"
  | "nav.skills"
  | "nav.languages"
  | "nav.stats"
  | "nav.services"
  | "nav.projects"
  | "nav.reviews"
  | "nav.blog"
  | "nav.education"
  | "nav.experience"
  | "nav.approach"
  | "nav.contact"
  | "nav.cv"
  | "nav.cvEn"
  | "nav.cvDe"
  | "nav.portfolio"
  | "nav.navigate"
  | "nav.close"
  | "nav.openToHire"
  | "nav.portalTitle"
  | "nav.portalSubtitle"
  | "nav.portalSubtitleBlog"
  | "nav.youAreHere"
  | "nav.downloadPdf"
  | "nav.hireReady"
  | "nav.insights"
  | "footer.hiringLine"
  | "footer.brandTagline"
  | "blog.commentsKicker"
  | "blog.commentsTitle"
  | "blog.commentsSubtitle"
  | "blog.commentsLoading"
  | "blog.commentsEmpty"
  | "blog.commentFormTitle"
  | "blog.commentName"
  | "blog.commentEmail"
  | "blog.commentMessage"
  | "blog.commentSubmit"
  | "blog.commentSending"
  | "blog.commentPending"
  | "blog.commentError"
  | "newsletter.kicker"
  | "newsletter.title"
  | "newsletter.subtitle"
  | "newsletter.placeholder"
  | "newsletter.cta"
  | "newsletter.sending"
  | "newsletter.consent"
  | "newsletter.consentRequired"
  | "newsletter.success"
  | "newsletter.error"
  | "hero.dossierHint"
  | "bento.contactRoles"
  | "approach.hireBadge"
  | "approach.metricsBadge"
  | "approach.hoverHint"
  | "lang.en"
  | "lang.de"
  | "lang.switchToEn"
  | "lang.switchToDe"
  | "loading.about"
  | "loading.skills"
  | "loading.projects"
  | "loading.contact"
  | "loading.languages"
  | "loading.services"
  | "loading.experience"
  | "loading.education"
  | "loading.approach"
  | "loading.testimonials"
  | "loading.stats"
  | "loading.blog"
  | "stats.badge"
  | "stats.noMetrics"
  | "learning.currentlyLearning"
  | "learning.currentlySubtitle"
  | "learning.activeBadge"
  | "learning.recentCerts"
  | "learning.recentSubtitle"
  | "learning.shownBadge"
  | "learning.viewAllCerts"
  | "projects.featuredLead"
  | "projects.featuredAccent"
  | "projects.featuredDesc"
  | "projects.viewAll"
  | "projects.viewAllCount"
  | "work.titleLead"
  | "work.titleAccent"
  | "work.subtitle"
  | "work.moreRoles"
  | "work.viewTimeline"
  | "work.type.internship"
  | "work.type.freelance"
  | "work.type.fulltime"
  | "work.type.contract"
  | "education.badgeHome"
  | "education.badgePage"
  | "education.titleLead"
  | "education.titleAccent"
  | "education.subtitleHome"
  | "education.subtitlePage"
  | "education.viewAll"
  | "education.moreCerts"
  | "education.kind.degree"
  | "education.kind.bootcamp"
  | "education.kind.certificate"
  | "education.page.back"
  | "education.page.badge"
  | "education.page.titleLead"
  | "education.page.titleAccent"
  | "education.page.subtitle"
  | "education.page.stat.credentials"
  | "education.page.stat.degrees"
  | "education.page.stat.certificates"
  | "education.page.filter.all"
  | "education.page.filter.degrees"
  | "education.page.filter.certificates"
  | "education.page.filter.bootcamps"
  | "experience.page.back"
  | "experience.page.badge"
  | "experience.page.titleLead"
  | "experience.page.titleAccent"
  | "experience.page.subtitle"
  | "experience.page.stat.roles"
  | "experience.page.stat.companies"
  | "experience.page.stat.years"
  | "experience.page.downloadCv"
  | "experience.page.downloadCvDe"
  | "contact.downloadCvEn"
  | "contact.downloadCvDe"
  | "experience.page.filter.all"
  | "experience.page.filter.fulltime"
  | "experience.page.filter.internship"
  | "experience.page.filter.freelance"
  | "blog.badge"
  | "blog.loading"
  | "blog.empty"
  | "blog.pageTitle"
  | "blog.pageSubtitle"
  | "blog.featured"
  | "blog.moreArticles"
  | "blog.minRead"
  | "testimonials.loading"
  | "testimonials.badge"
  | "testimonials.hint"
  | "services.badge";

const UI: Record<Locale, Record<UiKey, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.languages": "Languages",
    "nav.stats": "Stats",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.reviews": "Reviews",
    "nav.blog": "Blog",
    "nav.education": "Education",
    "nav.experience": "Experience",
    "nav.approach": "Approach",
    "nav.contact": "Contact",
    "nav.cv": "CV",
    "nav.cvEn": "CV · EN",
    "nav.cvDe": "CV · DE",
    "nav.portfolio": "Portfolio",
    "nav.navigate": "Navigate",
    "nav.close": "Close",
    "nav.openToHire": "Open to hire",
    "nav.portalTitle": "Pick a dimension",
    "nav.portalSubtitle": "Every section of the portfolio — one click away.",
    "nav.portalSubtitleBlog": "Jump between portfolio and articles.",
    "nav.youAreHere": "You are here",
    "nav.downloadPdf": "Download PDF",
    "nav.hireReady": "AI apps",
    "nav.insights": "insights",
    "footer.hiringLine": "Built for hiring teams · Open to full-time roles",
    "footer.brandTagline": "AI Application Developer",
    "blog.commentsKicker": "Discussion",
    "blog.commentsTitle": "Comments",
    "blog.commentsSubtitle": "Questions or feedback on this article — published after review.",
    "blog.commentsLoading": "Loading comments…",
    "blog.commentsEmpty": "No comments yet. Be the first to share your thoughts.",
    "blog.commentFormTitle": "Leave a comment",
    "blog.commentName": "Name",
    "blog.commentEmail": "Email (not shown publicly)",
    "blog.commentMessage": "Your comment",
    "blog.commentSubmit": "Post comment",
    "blog.commentSending": "Sending…",
    "blog.commentPending": "Thanks! Your comment will appear after approval.",
    "blog.commentError": "Could not post your comment. Try again later.",
    "newsletter.kicker": "Newsletter",
    "newsletter.title": "Stay in the loop",
    "newsletter.subtitle": "Occasional notes on engineering, projects, and new articles — no spam.",
    "newsletter.placeholder": "you@company.com",
    "newsletter.cta": "Subscribe",
    "newsletter.sending": "Subscribing…",
    "newsletter.consent": "I agree to receive email updates and can unsubscribe anytime.",
    "newsletter.consentRequired": "Please confirm you want to receive emails.",
    "newsletter.success": "Thanks — you are on the list.",
    "newsletter.error": "Could not subscribe. Try again later.",
    "hero.dossierHint": "↓ CV on the right — tap to download (EN / DE)",
    "bento.contactRoles": "Contact for roles",
    "approach.hireBadge": "Built for long-term hires",
    "approach.metricsBadge": "Metrics-driven phases",
    "approach.hoverHint": "Hover for live effect",
    "lang.en": "EN",
    "lang.de": "DE",
    "lang.switchToEn": "Switch to English",
    "lang.switchToDe": "Switch to German",
    "loading.about": "Loading about…",
    "loading.skills": "Loading skills…",
    "loading.projects": "Loading projects…",
    "loading.contact": "Loading contact…",
    "loading.languages": "Loading languages…",
    "loading.services": "Loading services…",
    "loading.experience": "Loading experience…",
    "loading.education": "Loading education…",
    "loading.approach": "Loading approach…",
    "loading.testimonials": "Loading testimonials…",
    "loading.stats": "Loading stats…",
    "loading.blog": "Loading articles…",
    "stats.badge": "Impact & Growth",
    "stats.noMetrics": "No metrics yet. Add them from the admin panel.",
    "learning.currentlyLearning": "Currently learning",
    "learning.currentlySubtitle": "Courses I am taking right now",
    "learning.activeBadge": "{n} active",
    "learning.recentCerts": "Recent certificates",
    "learning.recentSubtitle": "Verified credentials — open to verify on Coursera",
    "learning.shownBadge": "{n} shown",
    "learning.viewAllCerts": "View all {n} certificates",
    "projects.featuredLead": "Featured",
    "projects.featuredAccent": "case studies",
    "projects.featuredDesc":
      "A curated selection of production work — each with a full technical breakdown, live links, and outcomes.",
    "projects.viewAll": "View all projects",
    "projects.viewAllCount": "View all {n} projects",
    "work.titleLead": "Work",
    "work.titleAccent": "experience",
    "work.subtitle": "Roles where I shipped real products — from internship to full-stack ownership.",
    "work.moreRoles": "+{n} more roles with full breakdown",
    "work.viewTimeline": "View full career timeline",
    "work.type.internship": "internship",
    "work.type.freelance": "freelance",
    "work.type.fulltime": "full time",
    "work.type.contract": "contract",
    "education.badgeHome": "Learning path",
    "education.badgePage": "Credentials",
    "education.titleLead": "Education",
    "education.titleAccent": "& certificates",
    "education.subtitleHome": "Degree highlights and a path to every certificate and course.",
    "education.subtitlePage":
      "University studies and professional certificates — the same journey shown on my previous portfolio, now integrated here.",
    "education.viewAll": "View all credentials",
    "education.moreCerts": "+{n} more certificates on the full page",
    "education.kind.degree": "Degree",
    "education.kind.bootcamp": "Bootcamp",
    "education.kind.certificate": "Certificate",
    "education.page.back": "Back to portfolio",
    "education.page.badge": "Learning journey",
    "education.page.titleLead": "Education",
    "education.page.titleAccent": "& Certificates",
    "education.page.subtitle":
      "University foundation, professional certificates, and continuous upskilling — presented as a visual timeline of everything I studied and shipped.",
    "education.page.stat.credentials": "Credentials",
    "education.page.stat.degrees": "Degrees",
    "education.page.stat.certificates": "Certificates",
    "education.page.filter.all": "All credentials",
    "education.page.filter.degrees": "Degrees",
    "education.page.filter.certificates": "Certificates",
    "education.page.filter.bootcamps": "Bootcamps",
    "experience.page.back": "Back to portfolio",
    "experience.page.badge": "Career timeline",
    "experience.page.titleLead": "Work",
    "experience.page.titleAccent": "experience",
    "experience.page.subtitle":
      "Every role, responsibility, and stack — laid out so recruiters and hiring managers can understand how I work without opening a PDF first.",
    "experience.page.stat.roles": "Roles",
    "experience.page.stat.companies": "Companies",
    "experience.page.stat.years": "Years active",
    "experience.page.downloadCv": "Download CV (English)",
    "experience.page.downloadCvDe": "Download CV (German)",
    "contact.downloadCvEn": "Download CV · English",
    "contact.downloadCvDe": "Download CV · Deutsch",
    "experience.page.filter.all": "All roles",
    "experience.page.filter.fulltime": "Full-time",
    "experience.page.filter.internship": "Internships",
    "experience.page.filter.freelance": "Freelance",
    "blog.badge": "Blog",
    "blog.loading": "Loading articles…",
    "blog.empty": "No published articles yet. Check back soon.",
    "blog.pageTitle": "Articles & Insights",
    "blog.pageSubtitle": "Technical notes, project breakdowns, and lessons from the field.",
    "blog.featured": "Featured",
    "blog.moreArticles": "More articles",
    "blog.minRead": "min read",
    "testimonials.loading": "Loading testimonials…",
    "testimonials.badge": "Testimonials",
    "testimonials.hint": "{n} voices · hover to attract · click to explore",
    "services.badge": "What I deliver",
  },
  de: {
    "nav.home": "Start",
    "nav.about": "Profil",
    "nav.skills": "Skills",
    "nav.languages": "Sprachen",
    "nav.stats": "Statistik",
    "nav.services": "Leistungen",
    "nav.projects": "Projekte",
    "nav.reviews": "Stimmen",
    "nav.blog": "Blog",
    "nav.education": "Bildung",
    "nav.experience": "Erfahrung",
    "nav.approach": "Arbeitsweise",
    "nav.contact": "Kontakt",
    "nav.cv": "CV",
    "nav.cvEn": "CV · EN",
    "nav.cvDe": "CV · DE",
    "nav.portfolio": "Portfolio",
    "nav.navigate": "Navigation",
    "nav.close": "Schließen",
    "nav.openToHire": "Offen für Jobs",
    "nav.portalTitle": "Wähle eine Dimension",
    "nav.portalSubtitle": "Jeder Bereich des Portfolios — ein Klick entfernt.",
    "nav.portalSubtitleBlog": "Zwischen Portfolio und Artikeln wechseln.",
    "nav.youAreHere": "Du bist hier",
    "nav.downloadPdf": "PDF herunterladen",
    "nav.hireReady": "KI-Apps",
    "nav.insights": "Einblicke",
    "footer.hiringLine": "Für HR-Teams · Offen für Festanstellung",
    "footer.brandTagline": "AI Application Developer",
    "blog.commentsKicker": "Diskussion",
    "blog.commentsTitle": "Kommentare",
    "blog.commentsSubtitle": "Fragen oder Feedback — nach Freigabe sichtbar.",
    "blog.commentsLoading": "Kommentare werden geladen…",
    "blog.commentsEmpty": "Noch keine Kommentare. Schreib den ersten.",
    "blog.commentFormTitle": "Kommentar schreiben",
    "blog.commentName": "Name",
    "blog.commentEmail": "E-Mail (nicht öffentlich)",
    "blog.commentMessage": "Dein Kommentar",
    "blog.commentSubmit": "Absenden",
    "blog.commentSending": "Wird gesendet…",
    "blog.commentPending": "Danke! Dein Kommentar erscheint nach Freigabe.",
    "blog.commentError": "Kommentar konnte nicht gesendet werden.",
    "newsletter.kicker": "Newsletter",
    "newsletter.title": "Auf dem Laufenden bleiben",
    "newsletter.subtitle": "Gelegentliche Updates zu Engineering, Projekten und neuen Artikeln.",
    "newsletter.placeholder": "du@firma.de",
    "newsletter.cta": "Abonnieren",
    "newsletter.sending": "Wird gesendet…",
    "newsletter.consent": "Ich möchte E-Mails erhalten und kann mich jederzeit abmelden.",
    "newsletter.consentRequired": "Bitte bestätige den Erhalt von E-Mails.",
    "newsletter.success": "Danke — du bist auf der Liste.",
    "newsletter.error": "Anmeldung fehlgeschlagen. Bitte später erneut versuchen.",
    "hero.dossierHint": "↓ Lebenslauf rechts — zum Download tippen (EN / DE)",
    "bento.contactRoles": "Kontakt für Stellen",
    "approach.hireBadge": "Für langfristige Festanstellungen",
    "approach.metricsBadge": "Phasen mit klaren Metriken",
    "approach.hoverHint": "Hover für Live-Effekt",
    "lang.en": "EN",
    "lang.de": "DE",
    "lang.switchToEn": "Auf Englisch wechseln",
    "lang.switchToDe": "Auf Deutsch wechseln",
    "loading.about": "Profil wird geladen…",
    "loading.skills": "Skills werden geladen…",
    "loading.projects": "Projekte werden geladen…",
    "loading.contact": "Kontakt wird geladen…",
    "loading.languages": "Sprachen werden geladen…",
    "loading.services": "Leistungen werden geladen…",
    "loading.experience": "Erfahrung wird geladen…",
    "loading.education": "Bildung wird geladen…",
    "loading.approach": "Arbeitsweise wird geladen…",
    "loading.testimonials": "Stimmen werden geladen…",
    "loading.stats": "Statistik wird geladen…",
    "loading.blog": "Artikel werden geladen…",
    "stats.badge": "Wirkung & Wachstum",
    "stats.noMetrics": "Noch keine Metriken. Im Admin-Panel hinzufügen.",
    "learning.currentlyLearning": "Aktuell im Lernen",
    "learning.currentlySubtitle": "Kurse, die ich gerade absolviere",
    "learning.activeBadge": "{n} aktiv",
    "learning.recentCerts": "Neueste Zertifikate",
    "learning.recentSubtitle": "Verifizierte Credentials — auf Coursera prüfbar",
    "learning.shownBadge": "{n} angezeigt",
    "learning.viewAllCerts": "Alle {n} Zertifikate ansehen",
    "projects.featuredLead": "Ausgewählte",
    "projects.featuredAccent": "Fallstudien",
    "projects.featuredDesc":
      "Eine kuratierte Auswahl produktiver Arbeit — mit technischem Breakdown, Live-Links und Ergebnissen.",
    "projects.viewAll": "Alle Projekte ansehen",
    "projects.viewAllCount": "Alle {n} Projekte ansehen",
    "work.titleLead": "Berufs",
    "work.titleAccent": "erfahrung",
    "work.subtitle":
      "Rollen, in denen ich echte Produkte ausgeliefert habe — vom Praktikum bis zur Full-Stack-Verantwortung.",
    "work.moreRoles": "+{n} weitere Rollen mit vollem Breakdown",
    "work.viewTimeline": "Vollständige Karriere-Timeline",
    "work.type.internship": "Praktikum",
    "work.type.freelance": "Freelance",
    "work.type.fulltime": "Vollzeit",
    "work.type.contract": "Vertrag",
    "education.badgeHome": "Lernpfad",
    "education.badgePage": "Qualifikationen",
    "education.titleLead": "Bildung",
    "education.titleAccent": "& Zertifikate",
    "education.subtitleHome": "Studien-Highlights und der Weg zu jedem Zertifikat und Kurs.",
    "education.subtitlePage":
      "Universitätsstudium und berufliche Zertifikate — dieselbe Reise wie im früheren Portfolio, jetzt integriert.",
    "education.viewAll": "Alle Qualifikationen ansehen",
    "education.moreCerts": "+{n} weitere Zertifikate auf der vollständigen Seite",
    "education.kind.degree": "Abschluss",
    "education.kind.bootcamp": "Bootcamp",
    "education.kind.certificate": "Zertifikat",
    "education.page.back": "Zurück zum Portfolio",
    "education.page.badge": "Lernreise",
    "education.page.titleLead": "Bildung",
    "education.page.titleAccent": "& Zertifikate",
    "education.page.subtitle":
      "Universitätsgrundlage, berufliche Zertifikate und kontinuierliches Upskilling — als visuelle Timeline dessen, was ich gelernt und umgesetzt habe.",
    "education.page.stat.credentials": "Qualifikationen",
    "education.page.stat.degrees": "Abschlüsse",
    "education.page.stat.certificates": "Zertifikate",
    "education.page.filter.all": "Alle Qualifikationen",
    "education.page.filter.degrees": "Abschlüsse",
    "education.page.filter.certificates": "Zertifikate",
    "education.page.filter.bootcamps": "Bootcamps",
    "experience.page.back": "Zurück zum Portfolio",
    "experience.page.badge": "Karriere-Timeline",
    "experience.page.titleLead": "Berufs",
    "experience.page.titleAccent": "erfahrung",
    "experience.page.subtitle":
      "Jede Rolle, Verantwortung und jeder Stack — damit Recruiter und Hiring Manager verstehen, wie ich arbeite, ohne zuerst ein PDF zu öffnen.",
    "experience.page.stat.roles": "Rollen",
    "experience.page.stat.companies": "Unternehmen",
    "experience.page.stat.years": "Aktive Jahre",
    "experience.page.downloadCv": "CV laden (Englisch)",
    "experience.page.downloadCvDe": "CV laden (Deutsch)",
    "contact.downloadCvEn": "CV · Englisch",
    "contact.downloadCvDe": "CV · Deutsch",
    "experience.page.filter.all": "Alle Rollen",
    "experience.page.filter.fulltime": "Vollzeit",
    "experience.page.filter.internship": "Praktika",
    "experience.page.filter.freelance": "Freelance",
    "blog.badge": "Blog",
    "blog.loading": "Artikel werden geladen…",
    "blog.empty": "Noch keine veröffentlichten Artikel. Schau bald wieder vorbei.",
    "blog.pageTitle": "Artikel & Einblicke",
    "blog.pageSubtitle": "Technische Notizen, Projekt-Breakdowns und Learnings aus der Praxis.",
    "blog.featured": "Empfohlen",
    "blog.moreArticles": "Weitere Artikel",
    "blog.minRead": "Min. Lesezeit",
    "testimonials.loading": "Stimmen werden geladen…",
    "testimonials.badge": "Stimmen",
    "testimonials.hint": "{n} Stimmen · Hover zum Anziehen · Klick zum Lesen",
    "services.badge": "Was ich liefere",
  },
};

export function t(locale: Locale, key: UiKey): string {
  return UI[locale][key] ?? UI.en[key] ?? key;
}
