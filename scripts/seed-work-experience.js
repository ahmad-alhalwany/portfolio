const fs = require("fs");
const path = "data/content.json";
const data = JSON.parse(fs.readFileSync(path, "utf8"));

data.workExperience = [
  {
    id: 2,
    title: "Full-Stack Payment System — Al Ankabot",
    company: "Al Ankabot",
    role: "Lead Full-Stack Developer",
    period: "Oct 2024 — Jan 2026",
    location: "Syria — Remote",
    employmentType: "full-time",
    desc: "Led end-to-end development of a secure transaction platform with web and desktop clients.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
    featured: true,
    overview:
      "Led the full lifecycle of a secure payments platform — backend APIs, encrypted auth, Next.js web app, and a PyQt desktop client — built for reliability at scale with multi-layer security.",
    responsibilities: [
      "Architected FastAPI backend with JWT authentication and encryption for sensitive financial flows",
      "Built Next.js web interface and PyQt desktop client sharing the same transaction core",
      "Implemented multi-stage security protocols to mitigate data-leak and abuse scenarios",
      "Monitored uptime and performance for production traffic exceeding 1,000 transactions per month",
    ],
    technologies: ["FastAPI", "Next.js", "PyQt", "Python", "JWT", "PostgreSQL", "Docker"],
    outcomes: [
      "1,000+ transactions processed monthly at 99.9% system availability",
      "Secure, auditable payment flows with layered protection against data leaks",
    ],
  },
  {
    id: 3,
    title: "Frontend Developer — LIT-Co",
    company: "LIT-Co",
    role: "Frontend Developer",
    period: "Jun 2023 — Aug 2024",
    location: "Lebanon — Hybrid / On-site",
    employmentType: "full-time",
    desc: "Led web development for the Plaze e-commerce platform and WordPress ecosystem.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
    featured: true,
    overview:
      "Drove frontend and platform work at LIT-Co — owning the Plaze e-commerce build, WordPress customizations, and a full site redesign that materially improved mobile and conversion metrics.",
    responsibilities: [
      "Led development of the Plaze e-commerce platform with Next.js and GraphQL, raising conversion rate by 15%",
      "Customized 10+ WordPress themes and plugins, increasing user interaction by 20%",
      "Led a comprehensive website redesign that improved responsiveness and grew mobile traffic by 40%",
      "Participated in agile stand-ups, code reviews, and incremental feature delivery in a production team",
    ],
    technologies: ["Next.js", "GraphQL", "React", "WordPress", "TypeScript", "Tailwind CSS"],
    outcomes: [
      "Plaze shop live as a production e-commerce storefront at plaze-shop.de",
      "Measurable gains in conversion, engagement, and mobile reach",
    ],
  },
  {
    id: 4,
    title: "Frontend Developer Intern — LIT-Co",
    company: "LIT-Co",
    role: "Frontend Developer Intern",
    period: "Apr 2023 — Jun 2023",
    location: "Lebanon — On-site / Hybrid",
    employmentType: "internship",
    desc: "Assisted in the development of a web-based platform using Next.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
    overview:
      "Started at LIT-Co on the frontend team — shipping UI components, fixing bugs, and learning production Next.js practices before moving into the Frontend Developer role.",
    responsibilities: [
      "Built and refined React/Next.js UI components under senior developer guidance",
      "Improved interactivity and client-side flows on the company web platform",
      "Participated in code reviews, stand-ups, and incremental feature delivery",
      "Supported WordPress and frontend tasks that prepared me for leading Plaze development",
    ],
    technologies: ["Next.js", "React", "JavaScript", "TypeScript", "CSS", "WordPress", "Git"],
    outcomes: [
      "Solid foundation in component-driven development and team workflow",
      "Promoted to Frontend Developer at LIT-Co (Jun 2023 — Aug 2024)",
    ],
  },
  {
    id: 1,
    title: "Freelancer — Web & Backend (Fixed-Scope Contracts)",
    company: "Independent / Freelance",
    role: "Freelance Full-Stack Developer",
    period: "2022 — Apr 2023",
    location: "Remote",
    employmentType: "freelance",
    desc: "Short-term client contracts for web backends and e-commerce flows — completed before joining LIT-Co full-time.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
    featured: false,
    overview:
      "Selected fixed-scope freelance work while finishing university — focused on deliverable backends and checkout integrations, not overlapping with later full-time roles.",
    responsibilities: [
      "Online shisha shop backend (2022): streamlined checkout and operations, improving customer-service efficiency by 25%",
      "Delivered REST APIs and admin tooling for small retail clients under agreed scope and deadlines",
    ],
    technologies: ["Python", "Django", "Node.js", "PostgreSQL", "REST APIs"],
    outcomes: [
      "Shipped production backends for e-commerce clients on fixed timelines",
      "Moved to full-time employment at LIT-Co (Apr 2023)",
    ],
  },
];

fs.writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
console.log("seeded", data.workExperience.length, "roles");
