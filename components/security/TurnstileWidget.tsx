"use client";

import { useEffect, useRef, useState } from "react";
import {
  getTurnstileSiteKey,
  isTurnstileConfigured,
} from "@/lib/turnstile-config";

type Props = {
  onToken: (token: string) => void;
  onExpire?: () => void;
  className?: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export { isTurnstileConfigured };

export function TurnstileWidget({ onToken, onExpire, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const mountedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!isTurnstileConfigured()) return;

    const siteKey = getTurnstileSiteKey(window.location.hostname);
    if (!siteKey) return;

    mountedRef.current = true;
    setLoadError(null);

    const renderWidget = () => {
      if (!mountedRef.current || !containerRef.current || !window.turnstile) return;

      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        callback: (token) => {
          setLoadError(null);
          onToken(token);
        },
        "expired-callback": () => {
          onExpire?.();
        },
        "error-callback": () => {
          setLoadError(
            `Turnstile could not load on "${window.location.hostname}". In Cloudflare Turnstile → Hostname Management, add this exact domain, confirm Site Key + Secret Key match the same widget, then redeploy on Vercel.`
          );
          onExpire?.();
        },
      });
      setReady(true);
    };

    if (window.turnstile) {
      renderWidget();
      return () => {
        mountedRef.current = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            /* ignore */
          }
        }
      };
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT}"]`
    );

    const onLoad = () => renderWidget();
    const onScriptError = () => {
      setLoadError(
        "Could not load Cloudflare Turnstile. Check your network or ad-blocker."
      );
    };

    if (existing) {
      if (window.turnstile) {
        renderWidget();
      } else {
        existing.addEventListener("load", onLoad);
        existing.addEventListener("error", onScriptError);
      }
      return () => {
        mountedRef.current = false;
        existing.removeEventListener("load", onLoad);
        existing.removeEventListener("error", onScriptError);
      };
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.defer = true;
    script.onload = onLoad;
    script.onerror = onScriptError;
    document.head.appendChild(script);

    return () => {
      mountedRef.current = false;
      script.onload = null;
      script.onerror = null;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          /* ignore */
        }
      }
    };
  }, [onToken, onExpire]);

  if (!isTurnstileConfigured()) return null;

  return (
    <div className={className}>
      <div ref={containerRef} className="min-h-[65px]" aria-hidden={!ready} />
      {loadError ? (
        <p className="mt-2 text-center text-xs text-amber-400/90">{loadError}</p>
      ) : null}
    </div>
  );
}
