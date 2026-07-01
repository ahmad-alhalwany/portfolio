"use client";

import { useEffect, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaCircle } from "react-icons/fa";

type Message = { role: "user" | "assistant"; content: string };

const QUICK_PROMPTS = [
  "What's Ahmad's strongest backend stack?",
  "Has he worked with PostgreSQL in production?",
  "Is he open to on-site roles in Germany?",
  "Show me his most relevant project for a backend role.",
];

export function AskAhmadChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Ask Ahmad — I can answer questions about Ahmad's projects, experience, and availability based on his portfolio. What would you like to know?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || sending) return;

    setSending(true);
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: question }],
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, I couldn't generate a response." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble responding right now. Please try the contact form instead.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Ask Ahmad — AI assistant"}
        className="fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full border border-purple/40 bg-slate-950/90 text-purple shadow-[0_0_30px_-6px_var(--glow-purple)] backdrop-blur-xl transition hover:scale-105 hover:bg-purple/15"
      >
        {open ? <FaTimes className="h-5 w-5" /> : <FaRobot className="h-6 w-6" />}
        {!open ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/60" />
            <span className="relative h-3 w-3 rounded-full bg-emerald-400" />
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Ask Ahmad chat"
          className="fixed bottom-24 right-5 z-[90] flex h-[min(70vh,520px)] w-[min(92vw,400px)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 border-b border-white/10 bg-black/30 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple/15 text-purple">
              <FaRobot className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">Ask Ahmad</p>
              <p className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                <FaCircle className="h-1.5 w-1.5" /> Online · answers from portfolio context
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-purple/80 text-white"
                      : "rounded-bl-md border border-white/10 bg-black/40 text-slate-200"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {sending ? (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-black/40 px-3 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple" style={{ animationDelay: "0.15s" }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            ) : null}

            {messages.length <= 1 ? (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {QUICK_PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-slate-300 transition hover:border-purple/40 hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 bg-black/30 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, stack, availability…"
              className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-purple/50 focus:outline-none focus:ring-1 focus:ring-purple/40"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple text-white transition hover:bg-purple/90 disabled:opacity-40"
            >
              <FaPaperPlane className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
