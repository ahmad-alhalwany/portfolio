import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { getPublishedPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are "Ask Ahmad" — a concise assistant embedded on Ahmad Al-Halwany's developer portfolio website.

You help recruiters, hiring managers, and fellow engineers learn about Ahmad quickly. You answer based ONLY on the provided portfolio context (projects, work experience, education, blog, contact). If a question is outside this context, politely say so and suggest using the contact form.

Tone: warm, professional, concise. Keep answers under 120 words unless asked for detail. Use markdown formatting (bold, bullet points) sparingly. When mentioning a project, link to /projects/<id>. When mentioning a blog post, link to /blog/<slug>.

Never invent information. If you don't know something from the context, say: "I don't have that detail — the best move is to email Ahmad at ahmad.s.alhalwany@gmail.com or use the contact form."

Language: respond in the language the user used (English or German).`;

function buildContext(content: any, posts: any[]): string {
  const projects = (content.projects ?? [])
    .slice(0, 8)
    .map(
      (p: any) =>
        `- Project ID ${p.id}: "${p.title}" — ${(p.des ?? "").slice(0, 200)}${
          p.iconLists?.length ? ` [tags: ${p.iconLists.join(", ")}]` : ""
        }`
    )
    .join("\n");

  const work = (content.workExperience ?? [])
    .slice(0, 5)
    .map(
      (w: any) =>
        `- ${w.role} @ ${w.company} (${w.period})${w.desc ? ` — ${w.desc.slice(0, 150)}` : ""}`
    )
    .join("\n");

  const blog = posts
    .slice(0, 5)
    .map((p: any) => `- Blog "${p.title}" (slug: ${p.slug}) — ${p.excerpt.slice(0, 120)}`)
    .join("\n");

  const education = (content.education ?? [])
    .slice(0, 5)
    .map((e: any) => `- ${e.title} @ ${e.institution}`)
    .join("\n");

  return `PORTFOLIO CONTEXT:

Projects:
${projects}

Work experience:
${work}

Education / certificates:
${education}

Blog posts:
${blog}

Contact: ahmad.s.alhalwany@gmail.com · Based in Trier, Germany · Open to on-site, hybrid & remote roles.`;
}

const NOT_CONFIGURED_REPLY =
  "The Ask Ahmad assistant is not configured yet. Please reach out via the contact form or email ahmad.s.alhalwany@gmail.com — Ahmad usually replies within 24 hours.";

async function callGemini(apiKey: string, systemPrompt: string, context: string, messages: any[], userQuestion: string): Promise<string> {
  const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const contents = [
    ...messages.slice(-6).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content).slice(0, 800) }],
    })),
    { role: "user", parts: [{ text: userQuestion }] },
  ];

  const body = {
    system_instruction: {
      parts: [{ text: `${systemPrompt}\n\n${context}` }],
    },
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 400,
    },
  };

  // AQ. auth keys and legacy AIza keys both work via the x-goog-api-key header
  // on the native Gemini endpoint.
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Gemini error:", response.status, text.slice(0, 300));
    throw new Error(`Gemini API error ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return reply || "I couldn't generate a response. Please try again.";
}

async function callOpenAI(apiKey: string, systemPrompt: string, context: string, messages: any[], userQuestion: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 400,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "system", content: `Context:\n${context}` },
        ...messages.slice(-6).map((m: any) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content).slice(0, 800),
        })),
        { role: "user", content: userQuestion },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("OpenAI error:", response.status, text.slice(0, 200));
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? "I couldn't generate a response. Please try again.";
}

export async function POST(request: NextRequest) {
  // Defensive: strip an accidental "GEMINI_API_KEY=" prefix and surrounding quotes
  // that sometimes get pasted into the value field on hosting dashboards.
  const cleanKey = (raw?: string) =>
    raw?.trim().replace(/^GEMINI_API_KEY=/, "").replace(/^OPENAI_API_KEY=/, "").replace(/^["']|["']$/g, "").trim();

  const geminiKey = cleanKey(process.env.GEMINI_API_KEY);
  const openaiKey = cleanKey(process.env.OPENAI_API_KEY);
  const debug = new URL(request.url).searchParams.get("debug") === "1";

  if (!geminiKey && !openaiKey) {
    return NextResponse.json(
      { reply: NOT_CONFIGURED_REPLY, unconfigured: true },
      { status: 200 }
    );
  }

  try {
    const body = await request.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const lastUser = [...messages].reverse().find((m: any) => m?.role === "user");
    const userQuestion = (lastUser?.content ?? "").toString().slice(0, 800);

    if (!userQuestion) {
      return NextResponse.json({ error: "Empty question" }, { status: 400 });
    }

    const [content, posts] = await Promise.all([getContent(), getPublishedPosts()]);
    const context = buildContext(content, posts);

    let reply: string;
    if (geminiKey) {
      reply = await callGemini(geminiKey, SYSTEM_PROMPT, context, messages, userQuestion);
    } else if (openaiKey) {
      reply = await callOpenAI(openaiKey, SYSTEM_PROMPT, context, messages, userQuestion);
    } else {
      reply = NOT_CONFIGURED_REPLY;
    }

    return NextResponse.json({ reply, provider: geminiKey ? "gemini" : "openai" });
  } catch (error) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        reply: debug
          ? `DEBUG: ${message}`
          : "Something went wrong. Please try again, or reach out via the contact form.",
      },
      { status: 200 }
    );
  }
}
