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
    resumeLabel: "CV laden (EN)",
    resumeLabelDe: "Lebenslauf (DE)",
    resumeTagline: "CV · Englisch & Deutsch",
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
      { key: "zeitzone", value: "Deutschland · MEZ (Trier)" },
      { key: "standort", value: "Trier, Deutschland · vor Ort, hybrid & remote" },
      { key: "arbeitserlaubnis", value: "Chancenkarte · arbeitsberechtigt · keine Arbeitgeber-Sponsorship nötig" },
      { key: "verfügbarkeit", value: "Sofort verfügbar" },
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
  projects: [
    {
      id: 1,
      title: "Plaze-Shop — E-Commerce-Website",
      des: "Produkte und Baumaterialien nahtlos entdecken — mit einer in Next.js gebauten Oberfläche.",
      challenge: "Bestandsfehler reduzieren und die Produktsuche verbessern",
      solution: "Responsiver Storefront mit strukturierten Bestands-Workflows",
      overview:
        "Plaze Shop ist ein produktiver E-Commerce-Storefront für Baumaterialien und Zubehör, gebaut mit Next.js — für schnelle Produktsuche der Kunden und eine zuverlässige Online-Bestandsverwaltung des Unternehmens.",
      challengeDetail:
        "Das Unternehmen brauchte einen modernen Webauftritt, auf dem Kunden Produkte und Materialien reibungslos entdecken können, während das interne Team mit manueller Bestandsführung kämpfte — was zu Zählfehlern und langsamen Nachbestellzyklen führte.",
      solutionDetail:
        "Ich habe einen Next.js-Storefront mit klarer Kategorienavigation, Produktdetailseiten und einem internen Bestands-Dashboard umgesetzt. Die UI ist auf Lesbarkeit auf Mobil und Desktop optimiert, und das Datenmodell hält die Lagerbestände über Admin- und öffentliche Ansichten hinweg konsistent.",
      keyFeatures: [
        "Next.js App Router mit optimierten Bildern und responsiven Layouts",
        "Produktkatalog mit suchfreundlicher Struktur und Detailseiten",
        "Interne Bestandsverwaltungs-Ansichten für Lageraktualisierungen",
        "Tailwind-basiertes Designsystem, abgestimmt auf die Marke Plaze",
        "Live-Demo bereitgestellt und mit der echten Unternehmensdomain integriert",
      ],
      outcomes: [
        "Live-Produktivsite, die echte Kunden unter plaze-shop.de bedient",
        "Einzige Bestandsquelle — Admin-Updates synchronisieren mit dem öffentlichen Katalog",
        "21+ Screens für Katalog, Produktdetail und Bestands-Workflows",
        "Mobile-First-UX für die Materialsuche vor Ort auf Handy und Tablet",
      ],
      metrics: [
        { id: "m1", value: "Live", label: "Produktiv unter plaze-shop.de" },
        { id: "m2", value: "21+", label: "Katalog- & Admin-Screens" },
        { id: "m3", value: "2", label: "Bereiche — Storefront + Bestand" },
      ],
    },
    {
      id: 6,
      des: "Full-Stack-KI-Plattform zur frühen Autismus-Früherkennung — Gesichtsbildanalyse mit Grad-CAM plus 12-Fragen-Verhaltensfragebogen, zweisprachig AR/EN.",
      challenge: "Familien einen zugänglichen ersten Screening-Weg geben — keine Blackbox-Diagnose",
      solution: "Zweigleisige Next.js- + FastAPI-Plattform mit erklärbarer KI und medizinnahen Berichten",
      overview:
        "Persönliches Portfolio-Projekt — eine Full-Stack-Health-Tech-Plattform zur frühen ASD-Früherkennung per Computer Vision und Verhaltensfragebogen (keine Kunden-Freelance-Arbeit). Unterstützt Bezugspersonen beim Screening via Gesichtsanalyse (MobileNetV3 + Grad-CAM) oder einem 12-Fragen-Test — zweisprachig AR/EN.",
      challengeDetail:
        "Frühe Autismus-Anzeichen werden ohne Fachzugang leicht übersehen, und viele KI-Demos enden bei einem Klassifikations-Label. Das Produkt brauchte zwei Screening-Wege (visuell + verhaltensbasiert), erklärbare Ergebnisse, die Bezugspersonen verstehen, klare medizinische Hinweise und eine zweisprachige UX, die in Produktion funktioniert — nicht nur im Notebook.",
      solutionDetail:
        "Ich habe ein Monorepo mit Next.js 15 auf Vercel und FastAPI auf Hugging Face Spaces gebaut. Die Bild-Pipeline verarbeitet 224×224-Eingaben durch ein feinabgestimmtes MobileNetV3, liefert Grad-CAM-Heatmaps als Base64 und erzeugt strukturierte Berichte. Der Fragebogen-Weg skaliert 12 Ja/Nein-Antworten durch ein trainiertes neuronales Netz (~92 % Genauigkeit) mit maßgeschneiderten Empfehlungen und WHO/CDC-Ressourcen. Docker, Health-Checks, CORS und Swagger halten den Stack deploybar und überprüfbar.",
      keyFeatures: [
        "Next.js 15 App Router — Bild-Upload, Fragebogen, Über-Seite, AR/EN-i18n mit RTL/LTR",
        "FastAPI-Backend — /predict-image, /predict-questions, /health, Swagger-Docs",
        "MobileNetV3 (~70 %) + Grad-CAM-Erklärbarkeit für Augen-, Stirn- und Mundregionen",
        "Neuronales Netz für Fragebogen (~92 %) mit Scaler, Berichten und Hilfsressourcen",
        "Medizinischer Hinweis, ResultPanel, ChildInfoForm — Privacy-First (In-Memory-Verarbeitung)",
        "Monorepo + Docker — Frontend auf Vercel, Backend auf Hugging Face Spaces",
      ],
      outcomes: [
        "Live-Demo unter autism-spectrum-six.vercel.app mit offenem GitHub-Monorepo",
        "2 Screening-Wege — Bild (~70 %) und Fragebogen (~92 %) mit XAI-Heatmaps",
        "13 dokumentierte UI-Screens — Home, Erkennung, Ergebnisse, Über, zweisprachige Flows",
        "Produktiv-Deployment — Vercel-Frontend + Hugging-Face-Docker-API mit CORS",
      ],
      metrics: [
        { id: "m1", value: "~92%", label: "Genauigkeit Fragebogen-Modell" },
        { id: "m2", value: "2", label: "Screening-Wege — Bild + Test" },
        { id: "m3", value: "AR/EN", label: "Voll zweisprachige UI + Berichte" },
      ],
    },
    {
      id: 7,
      des: "Full-Stack-Plattform für Geldtransfers mit mehreren Filialen — SYP & USD, rollenbasierte Dashboards, Berichte, Gewinn-Tracking, PDF-Belege und zweisprachige AR/EN-UI.",
      challenge: "Filialübergreifende Transfers brauchen RBAC, Steuerlogik und auditfähiges Reporting — keine Tabellenkalkulation",
      solution: "Produktionsreifes Next.js + FastAPI + PostgreSQL mit 3 rollenspezifischen Dashboards",
      overview:
        "Ein Portfolio-Fintech-Demo, das einen echten Geldtransfer-Betrieb mit mehreren Filialen in Syrien simuliert — mit ausgehenden und eingehenden Transfers in Syrischen Pfund (SYP) und US-Dollar (USD). Drei Rollen (Direktor, Filialleiter, Mitarbeiter) erhalten jeweils zugeschnittene Dashboards für Filialen, Personal, Transfers, Steuer-/Gewinn-Inventar, Berichte mit Diagrammen und PDF-Belege — mit voller Arabisch/Englisch-Unterstützung und Dark-/Light-Themes.",
      challengeDetail:
        "Filialnetze können nicht mit Ad-hoc-Tools laufen: Direktoren brauchen systemweite Transparenz und Mittelzuweisung, Filialleiter dürfen nur Mitarbeiter, Gewinne und Berichte ihrer Filiale sehen, und Mitarbeiter an vorderster Front brauchen einen schnellen Weg, Transfers zu erstellen, Status zu verfolgen und eingehende Zahlungen zu bestätigen. Das Produkt erfordert außerdem Steuerberechnung pro Filiale, CSV-Exporte, auditfreundliche Filter, JWT-gesicherte APIs und ein Demo, das durchgängig in Produktion funktioniert — kein gemocktes JSON im Frontend.",
      solutionDetail:
        "Ich habe einen getrennten Stack konzipiert: Next.js 14 auf Vercel spricht über HTTPS mit FastAPI auf Render mittels JWT (Middleware + RoleGuard im Frontend, get_current_user + Filial-Scoping im Backend). PostgreSQL auf Neon speichert Filialen, Nutzer, Transfers und Steuersätze. Die Geschäftslogik liegt in Service-Schichten (branch_profits, transactions, reports) mit pytest-Abdeckung; die UI nutzt React Hook Form + Zod, Recharts für Analysen, jsPDF für Belege und eine vollständige i18n-Schicht (AR/EN, RTL/LTR). GitHub Actions führt Lint + Jest + pytest aus; AUTO_SEED_DEMO legt 3 Filialen, 6 Nutzer und 20 Beispieltransfers für sofortige Demos an.",
      keyFeatures: [
        "3-Rollen-RBAC — Direktor (/dashboard), Filialleiter (/branch-dashboard), Mitarbeiter (/money-transfer)",
        "Transfer-Lebenszyklus — Erstellung, ausgehende/eingehende Listen, Status-Workflow, PDF-Beleg-Generierung",
        "Direktor-Funktionen — Filial-CRUD, Mittelzuweisung, Mitarbeiterverwaltung, Systemeinstellungen + Backup",
        "Filialleiter-Funktionen — zugeordnete Mitarbeiter, Berichte, Gewinn-/Steuertabellen, Recharts-Analysen, CSV-Export",
        "Mehrwährung — SYP & USD mit filialspezifischen Steuersätzen, Nettobetrag und Gewinnformeln",
        "Sicherheit — JWT-Auth, bcrypt-Passwörter, CORS-Allowlist, ratenbegrenzter Login, branch_id-Scoping",
        "i18n + Theming — Arabisch/Englisch mit RTL/LTR, Dark-/Light-Modus, Hilfe-Panels auf jedem wichtigen Screen",
        "CI/CD + Deploy — GitHub Actions, Vercel-Frontend, Render-API, Neon-PostgreSQL, lokal Docker Compose",
      ],
      outcomes: [
        "Live-Demo unter payment-system-portfolio.vercel.app mit Ein-Klick-Demo-Login (director / demo123)",
        "28 UI-Screens — Landing, 3 Dashboards, Transfers, Berichte, Inventar, Einstellungen, Belege",
        "17+ Backend-Testdateien — Auth, Transaktionen, Berichte, Gewinne, Filial-Scoping",
        "Produktiv-Stack — Vercel + Render + Neon, keine reinen Frontend-Mocks",
      ],
      metrics: [
        { id: "m1", value: "3", label: "Rollen — Direktor, Manager, Mitarbeiter" },
        { id: "m2", value: "2", label: "Währungen — SYP & USD" },
        { id: "m3", value: "28", label: "Dokumentierte UI-Screens" },
      ],
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
    availability: "Trier, Deutschland · sofort verfügbar · Chancenkarte (keine Arbeitgeber-Sponsorship nötig) · vor Ort, hybrid & remote",
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
      "Praktische Notizen aus Production-Projekten und Kursen — Architekturentscheidungen, Learnings und teilenswerte Inhalte.",
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
      "Ausgewählte Zertifikate von Meta und DeepLearning.AI — plus Deutsch A2 — abgestimmt auf Full-Stack- und Production-ML-Arbeit.",
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
      title: "Freelancer — Web & Backend (Festumfang)",
      role: "Freelance Full-Stack Developer",
      period: "2022 — Apr 2023",
      location: "Remote · Syrien",
      desc: "Kurzfristige Kundenverträge für Web-Backends und E-Commerce — abgeschlossen vor der Festanstellung bei LIT-Co.",
      overview:
        "Ausgewählte Freelance-Projekte mit festem Scope während des Studiums — Fokus auf Backends und Checkout-Integrationen, ohne Überschneidung mit späteren Vollzeitrollen.",
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
