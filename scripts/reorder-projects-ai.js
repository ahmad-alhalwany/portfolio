const fs = require("fs");
const path = require("path");

const contentPath = path.join(__dirname, "..", "data", "content.json");
const data = JSON.parse(fs.readFileSync(contentPath, "utf8"));

const askAhmad = {
  id: 9,
  title: '"Ask Ahmad" — Portfolio AI Assistant',
  des: "A context-grounded LLM assistant embedded in this site that answers recruiter questions about my work — with a multi-provider fallback chain for reliability.",
  img: "/b1.svg",
  iconLists: ["/next.svg", "/ts.svg", "/re.svg", "/tail.svg"],
  challenge:
    "Recruiters need quick, accurate answers about experience — without digging through every page",
  solution:
    "Context-grounded LLM chat widget with multi-provider fallback and strict anti-hallucination prompting",
  liveDemoUrl: "",
  githubUrl: "https://github.com/ahmad-alhalwany",
  cards: [],
  overview:
    "An LLM assistant (the chat widget on this site) that answers questions about my projects, experience and availability, grounded strictly in my portfolio data. Built with a multi-provider fallback chain (Groq → Gemini → OpenAI → Mistral → OpenRouter) for reliability and cost control, strict anti-hallucination system prompting (answers only from provided context), short-term conversation memory, and bilingual EN/DE responses. Next.js Route Handler (/api/chat) calling OpenAI-compatible and Gemini endpoints via fetch.",
  challengeDetail:
    "Portfolio sites are static — recruiters and hiring managers often want quick answers about stack fit, project depth, and availability without reading every case study. The assistant had to stay honest (no invented experience), work reliably when one API provider fails, and respond in English or German.",
  solutionDetail:
    "I built a Next.js /api/chat Route Handler that injects portfolio content as system context, enforces answers-only-from-context rules, and tries providers in priority order until one succeeds. Short-term conversation memory keeps follow-up questions coherent. Try it — the assistant in the corner is this project.",
  keyFeatures: [
    "Multi-provider fallback — Groq → Gemini → OpenAI → Mistral → OpenRouter",
    "Context-grounded prompting — answers only from portfolio data (not vector RAG)",
    "Anti-hallucination guardrails — refuses when context is insufficient",
    "Bilingual EN/DE responses aligned with site locale",
    "Next.js Route Handler — OpenAI-compatible + Gemini fetch integration",
    "Short-term conversation memory for natural follow-ups",
  ],
  outcomes: [
    "Try it — the assistant in the corner is this project",
    "5-provider fallback chain for reliability and cost control",
    "Strict grounding in CMS content — no invented projects or metrics",
    "Open-source implementation in this Next.js codebase",
  ],
  metrics: [
    { id: "m1", value: "5", label: "LLM providers in fallback chain" },
    { id: "m2", value: "EN/DE", label: "Bilingual recruiter responses" },
    { id: "m3", value: "Live", label: "Embedded chat widget on this site" },
  ],
  featured: true,
};

const byId = {};
for (const p of data.projects) {
  byId[p.id] = { ...p };
}

const payment = Object.values(byId).find((p) => p.title.includes("Payment Transfer"));
const vote = Object.values(byId).find((p) => p.title.includes("VoteChain"));
const plaze = Object.values(byId).find((p) => p.title.includes("plaze"));

if (payment) {
  payment.id = 7;
  payment.featured = false;
  byId[7] = payment;
  delete byId[8];
}
if (vote) {
  vote.id = 8;
  vote.featured = true;
  byId[8] = vote;
}
if (byId[6]) byId[6].featured = true;
if (plaze) plaze.featured = false;
byId[9] = askAhmad;

const order = [6, 9, 8, 7, 1, 2, 5];
const reordered = [];
for (const id of order) {
  if (byId[id]) reordered.push(byId[id]);
}
for (const p of Object.values(byId)) {
  if (!reordered.find((r) => r.id === p.id)) reordered.push(p);
}

data.projects = reordered;
fs.writeFileSync(contentPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(
  reordered.map((p) => `${p.id}: ${p.title.slice(0, 40)}${p.featured ? " *" : ""}`).join("\n")
);
