"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FaHome, FaRedo } from "react-icons/fa";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-page px-5 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-red-400/80">
          error://unhandled
        </p>
        <h1 className="mt-6 text-4xl font-bold text-page-fg md:text-5xl">
          Something broke on this page.
        </h1>
        <p className="mt-4 text-base text-page-muted">
          An unexpected error occurred while rendering this page. You can try
          again, or head back to safer ground. The error has been logged for
          investigation.
        </p>

        {error.digest ? (
          <p className="mt-3 font-mono text-xs text-page-muted">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple/90"
          >
            <FaRedo className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-page px-5 py-2.5 text-sm font-semibold text-page-fg transition hover:border-purple/40 hover:text-purple"
          >
            <FaHome className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
