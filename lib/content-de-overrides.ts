import { Content, DeepPartial } from "@/lib/types";

/** German overlays — merged onto English `content.json` when locale is `de`. */
export const CONTENT_DE_OVERRIDES: DeepPartial<Content> = {
  hero: {
    subtitle: "ahmad.dev / ki-anwendungen · Festanstellung",
    title: "Hallo, ich bin Ahmad — AI Application Developer.",
    headlineLead: "",
    flipWords: [],
    headlineEnd: "",
    availabilityBadge: "Offen für Festanstellungen",
    description:
      "Ich entwickle produktionsreife KI-Produkte end-to-end — ML-Modelle, LLM/RAG-Systeme und die Full-Stack-Apps darum herum.",
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
      "AI Application Developer mit ZAB-anerkanntem Bachelor in AI Engineering und 3+ Jahren Full-Stack-Erfahrung. Ich entwickle KI-Produkte end-to-end — Machine Learning, Computer Vision (OpenCV, Keras, Grad-CAM), NLP und LLM-Assistenten — und bringe sie als produktionsreife Apps (Python/FastAPI, Next.js, TypeScript, PostgreSQL) live. Mir geht es um echte, nutzbare KI-Produkte, nicht um Notebooks.",
    story: [
      "Vom KI-Studium zu Produktionssystemen — ich verbinde ML-Modellarbeit mit Full-Stack-Delivery, die Forschung in Software verwandelt, die Menschen wirklich nutzen.",
      "Aktueller Fokus: Computer Vision mit Erklärbarkeit (Grad-CAM), RAG-Assistenten mit Quellenangaben und kontextbasierte LLM-Integrationen in echten Web-Apps.",
      "Ich suche eine Festanstellung, in der ich KI-Produkte end-to-end bauen kann — von Modell und Retrieval-Schicht bis API, UI und Deployment.",
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
      { id: "t1", year: "Jetzt", label: "KI-Anwendungen · offen für Festanstellung" },
      { id: "t2", year: "Fokus", label: "ML · LLM/RAG · produktionsreifer Full-Stack" },
      { id: "t3", year: "Ziel", label: "Team mit sinnvoller Mission" },
    ],
    meta: [
      { key: "modus", value: "Festanstellung · kein Freelance" },
      { key: "stack", value: "ml · llm/rag · python · next.js" },
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
      title: "KI-Stack, den ich täglich einsetze",
      description: "ML · LLM/RAG · Python",
    },
    {
      id: 4,
      title: "Engineer im Herzen — Produkt im Blick.",
      description: "",
    },
    {
      id: 5,
      title: "KI-Systeme, LLM/RAG & Backend-Tiefe",
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
      title: "ASD Early-Detection Platform",
      des: "Health-Tech-KI-Plattform: CNN-Bildklassifikator (MobileNetV3) mit Grad-CAM-Erklärbarkeit, ML-Fragebogen (~92 %) und RAG-Assistent (fastembed-Embeddings + semantische Suche über WHO/CDC, LLM-Generierung, Quellenangaben). Next.js + FastAPI, zweisprachig AR/EN.",
      challenge: "Zugängliches Früh-Screening mit erklärbarer KI — kein Blackbox-Label",
      solution: "Dreischichtige KI-Gesundheits-App: CNN + Grad-CAM, ML-Fragebogen und RAG-Assistent mit Quellenangaben",
      overview:
        "End-to-End-KI-Gesundheitsanwendung mit drei KI-Schichten: (1) CNN-Bildklassifikator (feinabgestimmtes MobileNetV3) mit Grad-CAM-Heatmaps für Erklärbarkeit; (2) ML-Verhaltensfragebogen-Klassifikator (neuronales Netz, ~92 % Genauigkeit) mit strukturierten Berichten; (3) RAG-Assistent mit multilingualer semantischer Suche (fastembed-Embeddings + Cosine-Similarity) über eine verifizierte medizinische Wissensbasis (WHO/CDC), LLM (Hugging Face) zur Generierung und Antworten mit Quellenangaben plus Anti-Halluzinations-Fallback.",
      challengeDetail:
        "Frühe Autismus-Anzeichen werden ohne Fachzugang leicht übersehen. Das Produkt brauchte drei KI-Schichten — visuelles Screening, Verhaltensfragebogen und einen vertrauenswürdigen Q&A-Assistenten — mit erklärbaren Ergebnissen, klaren medizinischen Hinweisen und zweisprachiger Produktions-UX.",
      solutionDetail:
        "Als Monorepo umgesetzt — Next.js 15 (Vercel) Frontend mit AR/EN-i18n (RTL/LTR), FastAPI-Backend (Hugging Face Spaces) mit Docker, Health-Checks, CORS und Swagger. Die RAG-Schicht nutzt fastembed-Embeddings, Cosine-Similarity-Retrieval über WHO/CDC-Quellen, Hugging-Face-LLM-Generierung, Quellenangaben und Anti-Halluzinations-Fallback. Privacy-First (In-Memory-Verarbeitung) mit klaren medizinischen Hinweisen.",
      keyFeatures: [
        "CNN-Bildklassifikator — feinabgestimmtes MobileNetV3 mit Grad-CAM-Heatmaps",
        "ML-Fragebogen-Klassifikator — neuronales Netz (~92 % Genauigkeit) mit strukturierten Berichten",
        "RAG-Assistent — fastembed-Embeddings, Cosine-Similarity-Suche, WHO/CDC-Wissensbasis, Quellenangaben",
        "Next.js 15 App Router — AR/EN-i18n mit RTL/LTR",
        "FastAPI-Backend auf Hugging Face Spaces — Docker, Health-Checks, CORS, Swagger",
        "Privacy-First — In-Memory-Verarbeitung mit klaren medizinischen Hinweisen",
      ],
      outcomes: [
        "Live-Demo unter autism-spectrum-six.vercel.app mit offenem GitHub-Monorepo",
        "Drei KI-Schichten — Computer Vision, ML-Fragebogen und RAG-Assistent mit Quellenangaben",
        "13 dokumentierte UI-Screens — Home, Erkennung, Ergebnisse, Über, zweisprachige Flows",
        "Produktiv-Deployment — Vercel-Frontend + Hugging-Face-Docker-API mit CORS",
      ],
      metrics: [
        { id: "m1", value: "3", label: "KI-Schichten — CV, ML, RAG" },
        { id: "m2", value: "2", label: "Sprachen — Arabisch & Englisch" },
        { id: "m3", value: "AR/EN", label: "Voll zweisprachige UI + Berichte" },
      ],
    },
    {
      id: 9,
      title: "\"Ask Ahmad\" — Portfolio-KI-Assistent",
      des: "Kontextbasierter LLM-Assistent auf dieser Website — beantwortet Recruiter-Fragen aus Portfolio-Daten. Multi-Provider-Fallback (Groq, Gemini, OpenAI, Mistral, OpenRouter), Anti-Halluzinations-Prompting, zweisprachig EN/DE. Kein Vector-RAG — kontextbasiert.",
      challenge: "Recruiter brauchen schnelle, präzise Antworten — ohne jede Seite zu lesen",
      solution: "Kontextbasierter LLM-Chat mit Multi-Provider-Fallback und striktem Anti-Halluzinations-Prompting",
      overview:
        "Ein LLM-Assistent (das Chat-Widget auf dieser Website), der Fragen zu Projekten, Erfahrung und Verfügbarkeit beantwortet — strikt auf Portfolio-Daten beschränkt. Multi-Provider-Fallback-Kette (Groq → Gemini → OpenAI → Mistral → OpenRouter), striktes Anti-Halluzinations-System-Prompting (Antworten nur aus bereitgestelltem Kontext), Kurzzeit-Gesprächsspeicher und zweisprachige EN/DE-Antworten. Next.js Route Handler (/api/chat) mit OpenAI-kompatiblen und Gemini-Endpunkten via fetch.",
      challengeDetail:
        "Portfolio-Websites sind statisch — Recruiter wollen oft schnell Antworten zu Stack-Fit, Projekt-Tiefe und Verfügbarkeit. Der Assistent musste ehrlich bleiben (keine erfundene Erfahrung), zuverlässig funktionieren wenn ein API-Provider ausfällt, und auf Deutsch oder Englisch antworten.",
      solutionDetail:
        "Next.js /api/chat Route Handler, der Portfolio-Inhalte als System-Kontext injiziert, Antworten-nur-aus-Kontext erzwingt und Provider in Prioritätsreihenfolge versucht. Probieren Sie es — der Assistent in der Ecke ist dieses Projekt.",
      keyFeatures: [
        "Multi-Provider-Fallback — Groq → Gemini → OpenAI → Mistral → OpenRouter",
        "Kontextbasiertes Prompting — Antworten nur aus Portfolio-Daten (kein Vector-RAG)",
        "Anti-Halluzinations-Guardrails — lehnt ab wenn Kontext nicht ausreicht",
        "Zweisprachige EN/DE-Antworten passend zur Site-Locale",
        "Next.js Route Handler — OpenAI-kompatibel + Gemini fetch",
        "Kurzzeit-Gesprächsspeicher für natürliche Follow-ups",
      ],
      outcomes: [
        "Probieren Sie es — der Assistent in der Ecke ist dieses Projekt",
        "5-Provider-Fallback-Kette für Zuverlässigkeit und Kostenkontrolle",
        "Strikte Einbettung in CMS-Inhalte — keine erfundenen Projekte oder Metriken",
        "Open-Source-Implementierung in dieser Next.js-Codebasis",
      ],
      metrics: [
        { id: "m1", value: "5", label: "LLM-Provider in Fallback-Kette" },
        { id: "m2", value: "EN/DE", label: "Zweisprachige Recruiter-Antworten" },
        { id: "m3", value: "Live", label: "Eingebettetes Chat-Widget auf dieser Site" },
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
      "KI/ML und LLM-Systeme zuerst — dann Backend, Frontend und DevOps für produktionsreife KI-Anwendungen.",
    categories: [
      {
        id: 1,
        title: "KI / ML",
        skills: [
          { id: 1, name: "Machine Learning" },
          { id: 2, name: "Deep Learning" },
          { id: 3, name: "Computer Vision (OpenCV, Keras, CNNs, MobileNetV3)" },
          { id: 4, name: "Grad-CAM (Explainable AI)" },
          { id: 5, name: "NLP" },
        ],
      },
      {
        id: 2,
        title: "Generative AI / LLMs",
        skills: [
          { id: 1, name: "LLM integration" },
          { id: 2, name: "RAG (retrieval-augmented generation)" },
          { id: 3, name: "Embeddings" },
          { id: 4, name: "Prompt engineering" },
          { id: 5, name: "Multi-provider LLM orchestration" },
        ],
      },
      {
        id: 3,
        title: "Backend",
        skills: [
          { id: 1, name: "Python" },
          { id: 2, name: "FastAPI" },
          { id: 3, name: "Django" },
          { id: 4, name: "REST APIs" },
          { id: 5, name: "PostgreSQL" },
        ],
      },
      {
        id: 4,
        title: "Frontend",
        skills: [
          { id: 1, name: "Next.js" },
          { id: 2, name: "React" },
          { id: 3, name: "TypeScript" },
          { id: 4, name: "Tailwind CSS" },
        ],
      },
      {
        id: 5,
        title: "DevOps",
        skills: [
          { id: 1, name: "Docker" },
          { id: 2, name: "Linux" },
          { id: 3, name: "Git" },
          { id: 4, name: "CI/CD" },
        ],
      },
      {
        id: 6,
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
    title: "Was ich für Produktteams liefere",
    description:
      "AI Application Development — ML-Modelle, LLM/RAG-Systeme und die Full-Stack-Apps darum herum. Vom Prototyp bis Production, mit klarer Kommunikation und wartbarem Code.",
    services: [
      {
        id: 1,
        title: "AI Application Development",
        tagline: "ML · LLM/RAG · Computer Vision",
        description:
          "Produktionsreife KI-Produkte end-to-end — Modelltraining und Serving, RAG-Assistenten mit Retrieval und Quellenangaben, erklärbare Computer Vision und LLM-Integrationen auf echten Daten.",
        highlights: [
          "Machine Learning & Deep-Learning-Pipelines",
          "LLM/RAG-Systeme — Embeddings, Retrieval, Prompt Engineering",
          "Computer Vision — OpenCV, Keras, Grad-CAM",
          "Anti-Halluzinations-Guardrails & Production-Deployment",
        ],
      },
      {
        id: 2,
        title: "Full-Stack Product Delivery",
        tagline: "Next.js, FastAPI & PostgreSQL",
        description:
          "Die Full-Stack-Schicht um KI — typisierte Frontends, Python-APIs, Authentifizierung, Dashboards und Deployments, die schnell und wartbar bleiben.",
        highlights: [
          "Next.js & React-Anwendungen",
          "Python-APIs (FastAPI / Django)",
          "PostgreSQL, Auth & Integrationen",
          "Performance & Production-Readiness",
        ],
      },
      {
        id: 3,
        title: "UI/UX & Frontend-Exzellenz",
        tagline: "Oberflächen, die gerne genutzt werden",
        description:
          "Moderne, barrierefreie Interfaces mit responsivem Layout, Motion und Designmustern — inklusive zweisprachig EN/DE und RTL/LTR.",
        highlights: [
          "Design Systems & Komponenten",
          "Mobile-first, responsive UI",
          "Accessibility & Interaktionsqualität",
          "Animation & Micro-Interactions",
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
      "AI Application Developer, offen für Festanstellungen — kein Freelance. Kontakt für Interviews, Tech-Screens oder Team-Fit.",
    badge: "Offen für Festanstellungen",
    availability: "Trier, Deutschland · sofort verfügbar · Chancenkarte (keine Arbeitgeber-Sponsorship nötig) · vor Ort, hybrid & remote",
    highlights: [
      { id: "h1", value: "3+", label: "Jahre Erfahrung" },
      { id: "h2", value: "KI-Apps", label: "ML · LLM/RAG · Full-Stack" },
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
      "Ausgewählte Zertifikate von Meta und DeepLearning.AI — plus Deutsch A2 — abgestimmt auf AI Application Development und Production-ML-Arbeit.",
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
      location: "Remote",
      desc: "Leitung einer sicheren Transaktionsplattform mit Web- und Desktop-Clients.",
      overview:
        "Gesamter Lifecycle einer Payment-Plattform — FastAPI, JWT, Next.js und PyQt-Client mit Mehrschicht-Security.",
      responsibilities: [
        "FastAPI-Backend mit JWT-Authentifizierung und Verschlüsselung für sensible Finanzflüsse",
        "Next.js-Web-UI und PyQt-Desktop-Client mit gemeinsamem Transaktions-Kern",
        "Mehrstufige Security-Protokolle gegen Datenlecks und Missbrauch",
        "Einführung KI-gestützter Entwicklungs-Workflows und Automatisierung wiederkehrender Prozesse mit Python",
      ],
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
