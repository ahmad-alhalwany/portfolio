import Link from "next/link";
import { FaHome, FaEnvelope } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-page px-5 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-purple/80">
          error://404
        </p>
        <h1 className="mt-6 text-7xl font-bold text-white md:text-8xl">404</h1>
        <p className="mt-4 text-lg text-slate-300">
          This page drifted off-stack. The route you requested was not found —
          it may have been moved, renamed, or never existed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple/90"
          >
            <FaHome className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-purple/40 hover:text-white"
          >
            <FaEnvelope className="h-4 w-4" />
            Contact Ahmad
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
          <Link href="/#projects" className="hover:text-purple hover:underline">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-purple hover:underline">
            Blog
          </Link>
          <Link href="/#work" className="hover:text-purple hover:underline">
            Experience
          </Link>
          <Link href="/#education" className="hover:text-purple hover:underline">
            Education
          </Link>
        </div>
      </div>
    </main>
  );
}
