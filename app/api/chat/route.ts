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

type ChatMessage = { role: string; content: string };

function historyMessages(messages: ChatMessage[]) {
  return messages.slice(-6).map((m) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content).slice(0, 800),
  }));
}

/** Call any OpenAI-compatible chat completions endpoint (OpenAI, Groq, Mistral, OpenRouter). */
async function callOpenAICompatible(
  label: string,
  baseUrl: string,
  apiKey: string,
  model: string,
  systemPrompt: string,
  context: string,
  messages: ChatMessage[],
  userQuestion: string,
  extraBody: Record<string, unknown> = {}
): Promise<string> {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      // Reasoning models (e.g. gpt-oss) spend part of the budget on hidden
      // reasoning tokens, so keep the ceiling generous to leave room for the answer.
      max_tokens: 800,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "system", content: `Context:\n${context}` },
        ...historyMessages(messages),
        { role: "user", content: userQuestion },
      ],
      ...extraBody,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`${label} error:`, response.status, text.slice(0, 300));
    throw new Error(`${label} API error ${response.status}: ${text.slice(0, 200)}`);
  }

  const data = await response.json();
  const msg = data?.choices?.[0]?.message;
  const reply = msg?.content?.trim() || msg?.reasoning?.trim();
  if (!reply) {
    console.error(`${label} empty content:`, JSON.stringify(data?.choices?.[0] ?? {}).slice(0, 300));
    throw new Error(`${label} returned empty content`);
  }
  return reply;
}

async function callGemini(apiKey: string, systemPrompt: string, context: string, messages: ChatMessage[], userQuestion: string): Promise<string> {
  const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const contents = [
    ...messages.slice(-6).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content).slice(0, 800) }],
    })),
    { role: "user", parts: [{ text: userQuestion }] },
  ];

  const body = {
    system_instruction: { parts: [{ text: `${systemPrompt}\n\n${context}` }] },
    contents,
    generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
  };

  // AQ. auth keys and legacy AIza keys both work via the x-goog-api-key header.
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
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

function cleanKey(raw?: string): string | undefined {
  const cleaned = raw
    ?.trim()
    .replace(/^[A-Z_]+=/, "")
    .replace(/^["']|["']$/g, "")
    .trim();
  return cleaned || undefined;
}

type Provider = {
  name: string;
  run: (sys: string, ctx: string, msgs: ChatMessage[], q: string) => Promise<string>;
};

/** Build the ordered list of available providers. Groq is preferred (free + fast). */
function resolveProviders(): Provider[] {
  const groqKey = cleanKey(process.env.GROQ_API_KEY);
  const geminiKey = cleanKey(process.env.GEMINI_API_KEY);
  const openaiKey = cleanKey(process.env.OPENAI_API_KEY);
  const mistralKey = cleanKey(process.env.MISTRAL_API_KEY);
  const openrouterKey = cleanKey(process.env.OPENROUTER_API_KEY);

  const providers: Provider[] = [];

  if (groqKey) {
    const model = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";
    // gpt-oss models reason before answering; "low" keeps latency + token cost down.
    const extra = model.includes("gpt-oss") ? { reasoning_effort: "low" } : {};
    providers.push({
      name: "groq",
      run: (s, c, m, q) =>
        callOpenAICompatible("Groq", "https://api.groq.com/openai/v1/chat/completions", groqKey, model, s, c, m, q, extra),
    });
  }
  if (geminiKey) {
    providers.push({ name: "gemini", run: (s, c, m, q) => callGemini(geminiKey, s, c, m, q) });
  }
  if (openaiKey) {
    const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
    providers.push({
      name: "openai",
      run: (s, c, m, q) =>
        callOpenAICompatible("OpenAI", "https://api.openai.com/v1/chat/completions", openaiKey, model, s, c, m, q),
    });
  }
  if (mistralKey) {
    const model = process.env.MISTRAL_MODEL?.trim() || "mistral-small-latest";
    providers.push({
      name: "mistral",
      run: (s, c, m, q) =>
        callOpenAICompatible("Mistral", "https://api.mistral.ai/v1/chat/completions", mistralKey, model, s, c, m, q),
    });
  }
  if (openrouterKey) {
    const model = process.env.OPENROUTER_MODEL?.trim() || "meta-llama/llama-3.3-70b-instruct:free";
    providers.push({
      name: "openrouter",
      run: (s, c, m, q) =>
        callOpenAICompatible("OpenRouter", "https://openrouter.ai/api/v1/chat/completions", openrouterKey, model, s, c, m, q),
    });
  }

  return providers;
}

export async function POST(request: NextRequest) {
  const providers = resolveProviders();
  const debug = new URL(request.url).searchParams.get("debug") === "1";

  if (providers.length === 0) {
    return NextResponse.json(
      { reply: NOT_CONFIGURED_REPLY, unconfigured: true },
      { status: 200 }
    );
  }

  try {
    const body = await request.json();
    const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];
    const lastUser = [...messages].reverse().find((m) => m?.role === "user");
    const userQuestion = (lastUser?.content ?? "").toString().slice(0, 800);

    if (!userQuestion) {
      return NextResponse.json({ error: "Empty question" }, { status: 400 });
    }

    const [content, posts] = await Promise.all([getContent(), getPublishedPosts()]);
    const context = buildContext(content, posts);

    // Try each provider in order; fall back to the next on failure (e.g. quota 429).
    let reply: string | null = null;
    let usedProvider = "";
    let lastError: unknown = null;
    for (const provider of providers) {
      try {
        reply = await provider.run(SYSTEM_PROMPT, context, messages, userQuestion);
        usedProvider = provider.name;
        break;
      } catch (providerError) {
        lastError = providerError;
        const msg = providerError instanceof Error ? providerError.message : String(providerError);
        console.error(`Provider ${provider.name} failed: ${msg}`);
      }
    }

    if (reply === null) {
      throw lastError ?? new Error("All providers failed");
    }

    return NextResponse.json({ reply, provider: usedProvider });
  } catch (error) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : String(error);
    const isQuota = /\b429\b|quota|rate.?limit|RESOURCE_EXHAUSTED/i.test(message);
    return NextResponse.json(
      {
        reply: debug
          ? `DEBUG: ${message}`
          : isQuota
            ? "I'm getting a lot of questions right now and hit my usage limit. Please try again a bit later, or email Ahmad directly at ahmad.s.alhalwany@gmail.com."
            : "Something went wrong. Please try again, or reach out via the contact form.",
      },
      { status: 200 }
    );
  }
}
