"use client";

import { useEffect, useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

/**
 * Scans the parent container for <pre><code> blocks and injects a copy
 * button at the top-right of each. Lightweight, no syntax-highlighter dependency.
 */
export function CodeBlockCopyEnhancer({ containerSelector = ".blog-prose" }: { containerSelector?: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const pres = Array.from(container.querySelectorAll("pre"));
    const handled = new WeakSet<Element>();

    const wrap = (pre: HTMLPreElement) => {
      if (handled.has(pre)) return;
      handled.add(pre);

      // Already wrapped?
      if (pre.parentElement?.dataset?.codeWrapper === "true") return;

      const wrapper = document.createElement("div");
      wrapper.dataset.codeWrapper = "true";
      wrapper.className = "relative group/code";

      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-black/60 text-slate-300 opacity-0 transition group-hover/code:opacity-100 hover:border-purple/40 hover:text-purple";
      button.setAttribute("aria-label", "Copy code");

      const icon = document.createElement("span");
      icon.innerHTML =
        '<svg viewBox="0 0 448 512" width="11" height="11" fill="currentColor" aria-hidden="true"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-80V90.941L404.941 184H400z"/></svg>';
      button.appendChild(icon);

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.innerHTML =
            '<svg viewBox="0 0 512 512" width="12" height="12" fill="currentColor" style="color:#34d399" aria-hidden="true"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.68 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>';
          window.setTimeout(() => {
            button.replaceChild(icon, button.firstChild as Node);
          }, 1800);
        } catch {
          // Ignore — clipboard not available.
        }
      });

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(button);
      wrapper.appendChild(pre);
    };

    pres.forEach(wrap);
    setReady(true);

    // Re-run when content changes (e.g., when blog body re-parses).
    const observer = new MutationObserver(() => {
      const freshPres = Array.from(container.querySelectorAll("pre"));
      freshPres.forEach((p) => wrap(p as HTMLPreElement));
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [containerSelector]);

  return ready ? null : null;
}
