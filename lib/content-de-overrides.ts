import { Content, DeepPartial } from "@/lib/types";

/** German overlays — merged onto English `content.json` when locale is `de`. */
export const CONTENT_DE_OVERRIDES: DeepPartial<Content> = {
  hero: {
    subtitle: "ahmad.dev / full-stack · Festanstellung",
    title:
      "Full-Stack-Entwickler — offen für Festanstellungen mit Python, Next.js und produktionsreifer Software.",
    headlineLead: "Ich entwickle",
    flipWords: ["Web-Apps für Production", "Full-Stack-Systeme", "einsatzbereite Produkte"],
    headlineEnd: "für Teams, die liefern.",
    availabilityBadge: "Offen für Festanstellungen",
    description:
      "Hallo, ich bin Ahmad — ich verwandle komplexe Probleme in Software, auf die Menschen vertrauen. Ich suche eine langfristige Rolle, in der Handwerk, Verantwortung und Teamwirkung zählen.",
    ctaLabel: "Projekte entdecken",
    secondaryCtaLabel: "Einstellung? Kontakt",
    resumeLabel: "Dossier laden",
    resumeLabelDe: "Lebenslauf laden",
    resumeTagline: "Lebenslauf · verschlüsselt",
  },
  aboutSection: {
    label: "profil.sys / dekodieren",
    title: "Der Engineer",
    titleAccent: "hinter dem Produkt",
    intro:
      "Ich bin Ahmad Al-Halwany — Full-Stack-Entwickler mit Fokus auf Architektur, Developer Experience und die Menschen, die unsere Software nutzen.",
    story: [
      "Aus Neugier an Systemen wurde Verantwortung für Produktions-APIs, Dashboards und Web-Apps, von denen Teams täglich abhängen.",
      "Heute arbeite ich mit Python-Backends und Next.js-Frontends — wartbarer Code, klare Kommunikation und Ergebnisse, die über den Launch hinaus halten.",
      "Ich suche eine Festanstellung, in der Ownership, Qualität und langfristige Produktwirkung wichtiger sind als schnelle Freelance-Übergaben.",
    ],
    principles: [
      {
        id: "p1",
        title: "Ergebnis übernehmen",
        body: "Vom Schema bis zur UI — ich begleite Probleme end-to-end statt sie weiterzureichen.",
      },
      {
        id: "p2",
        title: "Klar kommunizieren",
        body: "Stakeholder und Team erhalten verständliche Sprache, realistische Schätzungen und Sichtbarkeit während der Umsetzung.",
      },
      {
        id: "p3",
        title: "Liefern & lernen",
        body: "Kleine, zuverlässige Releases schlagen Big-Bang-Demos — ich iteriere mit Metriken und Feedback.",
      },
    ],
    timeline: [
      { id: "t1", year: "Jetzt", label: "Full-Stack · offen für Festanstellung" },
      { id: "t2", year: "Fokus", label: "Python-Systeme & Next.js-Produkte" },
      { id: "t3", year: "Ziel", label: "Team mit sinnvoller Mission" },
    ],
    meta: [
      { key: "modus", value: "Festanstellung · kein Freelance" },
      { key: "stack", value: "python · next.js · typescript" },
      { key: "zeitzone", value: "EU / MENA · remote-freundlich" },
      { key: "sprachen", value: "AR Muttersprache · EN B2 · DE A2 → B1" },
    ],
    bentoTitle: "Identitätsfragmente",
  },
  gridItems: [
    {
      id: 1,
      title: "Software mit Teams bauen — nicht nur für Kunden.",
      description: "Klarheit · Ownership · nachhaltige Wirkung",
    },
    {
      id: 2,
      title: "Remote-ready · async-freundlich · direkte Kommunikation",
      description: "Globale Teams willkommen",
    },
    {
      id: 3,
      title: "Stack, den ich täglich einsetze",
      description: "Ständig am Verfeinern",
    },
    {
      id: 4,
      title: "Engineer im Herzen — Produkt im Blick.",
      description: "",
    },
    {
      id: 5,
      title: "Ständig am Leveln — Backend-Tiefe & Systemdesign",
      description: "Öffentlich lernen",
    },
    {
      id: 6,
      title: "Einstellung? Lass uns die Passung klären.",
      description: "",
    },
  ],
  skillsSection: {
    title: "Skills & Technologien, mit denen ich arbeite",
    description:
      "Programmiersprachen, Web- und App-Stack, KI/ML-Grundlagen, Tools und Soft Skills für zuverlässige Zusammenarbeit im Team.",
    categories: [
      {
        id: 1,
        title: "Programmiersprachen",
        skills: [
          { id: 1, name: "Python" },
          { id: 2, name: "JavaScript" },
          { id: 3, name: "TypeScript" },
          { id: 4, name: "SQL" },
          { id: 5, name: "PHP" },
        ],
      },
      {
        id: 2,
        title: "Web- und App-Entwicklung",
        skills: [
          { id: 1, name: "React" },
          { id: 2, name: "Next.js" },
          { id: 3, name: "Tailwind CSS" },
          { id: 4, name: "React Native" },
          { id: 5, name: "HTML5" },
          { id: 6, name: "CSS3" },
          { id: 7, name: "Bootstrap" },
          { id: 8, name: "Django" },
          { id: 9, name: "Node.js" },
          { id: 10, name: "Three.js" },
        ],
      },
      {
        id: 3,
        title: "KI und Machine Learning",
        skills: [
          { id: 1, name: "Deep Learning" },
          { id: 2, name: "Machine Learning" },
          { id: 3, name: "NLP" },
          { id: 4, name: "Data Mining" },
        ],
      },
      {
        id: 4,
        title: "Tools & Infrastruktur",
        skills: [
          { id: 1, name: "Microsoft Office" },
          { id: 2, name: "Git" },
          { id: 3, name: "Docker" },
          { id: 4, name: "Linux" },
          { id: 5, name: "PostgreSQL" },
          { id: 6, name: "SQL Server" },
          { id: 7, name: "CI/CD" },
        ],
      },
      {
        id: 5,
        title: "Soft Skills",
        skills: [
          { id: 1, name: "Problemlösung" },
          { id: 2, name: "Teamarbeit" },
          { id: 3, name: "Anpassungsfähigkeit" },
          { id: 4, name: "Projektmanagement" },
          { id: 5, name: "Analytisches Denken" },
          { id: 6, name: "Eigenverantwortung" },
        ],
      },
    ],
  },
  languagesSection: {
    title: "Sprachen, in denen ich kommuniziere",
    description:
      "Klare Kommunikation in Teams und mit Kunden — von Arabisch als Muttersprache über Englisch auf B2-Niveau bis zu Deutsch, das ich aktiv auf B1 bringe.",
    languages: [
      {
        id: "ar",
        name: "Arabisch",
        nativeLabel: "العربية",
        levelLabel: "Muttersprache",
        note: "Sicher in beruflicher und technischer Kommunikation.",
      },
      {
        id: "en",
        name: "Englisch",
        levelLabel: "B2 — Obere Mittelstufe",
        note: "Meetings, Dokumentation und tägliche Zusammenarbeit im Dev-Team.",
      },
      {
        id: "de",
        name: "Deutsch",
        nativeLabel: "Deutsch",
        levelLabel: "A2 · Lernziel B1",
        progressLabel: "Fortschritt Richtung B1",
        note: "VHS A2-Kurs + Selbststudium — auf dem Weg zu B1 für Arbeit und Alltag in Deutschland.",
        learning: true,
      },
    ],
  },
  servicesSection: {
    title: "Was ich für Produktteams entwickle",
    description:
      "Full-Stack-Engineering, durchdachtes UI und praxisnahe technische Beratung — vom Prototyp bis Production, mit klarer Kommunikation und wartbarem Code.",
    services: [
      {
        id: 1,
        title: "Full-Stack-Produktentwicklung",
        tagline: "Next.js, React & Python-Backends",
        description:
          "Webanwendungen von Anfang bis Ende: typisierte Frontends, APIs, Authentifizierung, Dashboards und Deployments, die schnell und wartbar bleiben.",
        highlights: [
          "Next.js & React-Anwendungen",
          "Python-APIs (FastAPI / Django)",
          "Datenbanken, Auth & Integrationen",
          "Performance & Production-Readiness",
        ],
      },
      {
        id: 2,
        title: "UI/UX & Frontend-Exzellenz",
        tagline: "Oberflächen, die gerne genutzt werden",
        description:
          "Moderne, barrierefreie Interfaces mit responsivem Layout, Motion und Designmustern, die mit Produkt und Team mitwachsen.",
        highlights: [
          "Design Systems & Komponenten",
          "Mobile-first, responsive UI",
          "Accessibility & Interaktionsqualität",
          "Animation & Micro-Interactions",
        ],
      },
      {
        id: 3,
        title: "Architektur & technische Beratung",
        tagline: "Klarheit, bevor Sie skalieren",
        description:
          "Stack-Entscheidungen, Systemdesign und Delivery-Pläne — damit Sie in die richtigen Grundlagen investieren und ohne teure Umwege liefern.",
        highlights: [
          "Architektur- & API-Reviews",
          "Cloud, DevOps & CI/CD",
          "Code-Qualität & Mentoring",
          "KI-/ML-Integrationsstrategie",
        ],
      },
    ],
  },
  approach: {
    title: "So arbeite ich",
    subtitle:
      "Ein klarer, kollaborativer Prozess für Produktteams — wie bei Plaze, Al Ankabot und produktiven KI-Plattformen.",
    cards: [
      {
        id: 1,
        phaseLabel: "01 · Entdecken",
        title: "Problem ausrichten",
        description:
          "Vor dem Code kläre ich Ziele, Nutzer, Rahmenbedingungen und was „fertig“ für das Business bedeutet.",
        highlights: [
          "Abstimmung mit Stakeholdern & Anforderungen",
          "Technische Machbarkeit & Scope",
          "Gemeinsame Meilensteine & Erfolgskriterien",
        ],
      },
      {
        id: 2,
        phaseLabel: "02 · Umsetzen",
        title: "Mit Ownership liefern",
        description:
          "Iterative Lieferung mit sichtbarem Fortschritt — wartbarer Code, ehrliche Schätzungen, keine Überraschungen.",
        highlights: [
          "Kleine, reviewbare Releases",
          "Saubere APIs, typisierte Frontends, dokumentierte Entscheidungen",
          "Async-freundliche Updates für verteilte Teams",
        ],
      },
      {
        id: 3,
        phaseLabel: "03 · Ausliefern",
        title: "Launch & Betrieb",
        description:
          "Produktionsreife Ergebnisse: Performance, Security-Basics und Raum zum Wachsen nach dem Go-live.",
        highlights: [
          "Deployment-Readiness & getestete Flows",
          "Monitoring, Fixes & Iteration nach Launch",
          "Wissenstransfer fürs Team",
        ],
      },
    ],
  },
  contact: {
    heading: "An Hiring Manager:",
    headingHighlight: "lass uns Ihr nächstes Produkt gemeinsam bauen.",
    description:
      "Full-Stack-Entwickler, offen für Festanstellungen — kein Freelance. Kontakt für Interviews, Tech-Screens oder Team-Fit.",
    badge: "Offen für Festanstellungen",
    availability: "Remote · Hybrid · Umzug möglich",
    highlights: [
      { id: "h1", value: "3+", label: "Jahre Erfahrung" },
      { id: "h2", value: "Full-Stack", label: "Python & Next.js" },
      { id: "h3", value: "1–2 Tage", label: "Antwortzeit Recruiter" },
    ],
    formTitle: "Einstellungsanfrage senden",
    formDescription: "Firma, Rolle und Stack angeben — für HR und Engineering-Leads.",
    primaryCtaLabel: "Auf LinkedIn verbinden",
    calendlyCtaLabel: "Intro-Call buchen",
    copyright: "Copyright © 2026 Ahmad Alhalwany",
  },
  blogSection: {
    title: "Einblicke & Artikel",
    description:
      "Praktische Notizen aus Kursen und Projekten — was ich gelernt, angewendet und teilenswert finde.",
    viewAllLabel: "Alle Artikel ansehen",
    readLatestLabel: "Neuesten Artikel lesen",
  },
  testimonialsSection: {
    title: "Stimmen rund um den Globus",
    description:
      "Jedes leuchtende Partikel ist ein echtes Testimonial von Kunden und Kollegen weltweit. Bewege den Cursor, um sie anzuziehen — klicke, um die Geschichte zu lesen.",
    ctaLabel: "Deine Bewertung hinzufügen",
  },
  statsSection: {
    title: "Wirkung, Lernen & Wachstum",
    description:
      "Was ich gerade lerne, plus verifizierte Zertifikate von IBM, Meta, Google, Stanford und mehr — mit Zusammenfassungen und Skills für echte Projekte.",
    metrics: [
      {
        id: "certs",
        label: "Erworbene Zertifikate",
        description: "Verifizierte Coursera-Credentials",
      },
      {
        id: "active",
        label: "Laufende Kurse",
        description: "Coursera, YouTube und Sprachlernen",
      },
      {
        id: "ml",
        label: "ML & KI abgeschlossen",
        description: "Mathematik, Modelle und Production",
      },
      {
        id: "platforms",
        label: "Lernplattformen",
        description: "Coursera · YouTube · VHS-Portal",
      },
    ],
    chartTitle: "Abgeschlossene Zertifikate nach Jahr",
    learningTitle: "Lernpfade",
    learningDescription:
      "Aktive Kurse mit Fortschritt plus kürzlich abgeschlossene. Karte öffnen, um fortzufahren oder auf Coursera zu verifizieren.",
  },
  workExperience: [
    {
      id: 1,
      title: "Freelancer — Full-Stack & Produktentwicklung",
      role: "Freelancer — Full-Stack Developer",
      desc: "End-to-End-Lieferung von Web-, KI- und Blockchain-Produkten — von Architektur bis Produktion.",
      overview:
        "Eigenständige Projekte über KI, Blockchain, Marketing-UIs, Spiele und E-Commerce — inkl. Discovery, Umsetzung und messbaren Ergebnissen.",
    },
    {
      id: 2,
      title: "Full-Stack Payment System — Al Ankabot",
      role: "Lead Full-Stack Developer",
      desc: "Leitung einer sicheren Transaktionsplattform mit Web- und Desktop-Clients.",
      overview:
        "Gesamter Lifecycle einer Payment-Plattform — FastAPI, JWT, Next.js und PyQt-Client mit Mehrschicht-Security.",
    },
    {
      id: 3,
      title: "Frontend Developer — LIT-Co",
      role: "Frontend Developer",
      desc: "Web-Entwicklung für Plaze E-Commerce und WordPress-Ökosystem.",
    },
    {
      id: 4,
      title: "Frontend Developer Intern — LIT-Co",
      role: "Frontend Developer Intern",
      desc: "Frontend-Grundlagen, Komponenten und WordPress-Integration im Team.",
    },
  ],
};
