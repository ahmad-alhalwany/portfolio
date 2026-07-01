import type { Metadata } from "next";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Impressum",
  description:
    "Impressum / Legal notice — contact and responsibility information for ahmad-alhalwany.dev according to §5 TMG.",
  path: "/imprint",
});

export default function ImprintPage() {
  return (
    <main className="relative min-h-screen bg-page px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-purple"
        >
          <FaHome className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">Legal</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">Impressum</h1>
          <p className="mt-3 text-sm text-slate-500">
            Legal notice according to § 5 TMG (Telemediengesetz, Germany).
          </p>
        </header>

        <div className="space-y-10 text-slate-300">
          <section className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Diensteanbieter / Service provider</h2>
            <dl className="space-y-1.5 text-sm">
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">Name:</dt>
                <dd>Ahmad Al-Halwany</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">Anschrift:</dt>
                <dd>
                  Trier, Germany
                  <br />
                  <span className="text-xs text-slate-500">
                    Full street address available on request (private residence).
                  </span>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">E-Mail:</dt>
                <dd>
                  <a
                    href="mailto:ahmad.s.alhalwany@gmail.com"
                    className="text-purple hover:underline"
                  >
                    ahmad.s.alhalwany@gmail.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">LinkedIn:</dt>
                <dd>
                  <a
                    href="https://www.linkedin.com/in/ahmad-alhalwany/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple hover:underline"
                  >
                    linkedin.com/in/ahmad-alhalwany
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-32 shrink-0 text-slate-500">GitHub:</dt>
                <dd>
                  <a
                    href="https://github.com/ahmad-alhalwany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple hover:underline"
                  >
                    github.com/ahmad-alhalwany
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Inhaltlich Verantwortlicher / Responsible for content</h2>
            <p className="text-sm leading-relaxed">
              Ahmad Al-Halwany (same as above). Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
              Ahmad Al-Halwany, Trier, Germany.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Haftung für Inhalte / Liability for content</h2>
            <p className="text-sm leading-relaxed">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
              rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Haftung für Links / Liability for links</h2>
            <p className="text-sm leading-relaxed">
              Dieses Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
              keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr
              übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">Urheberrecht / Copyright</h2>
            <p className="text-sm leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
              unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
              Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>

          <p className="text-xs text-slate-500">
            Need to contact me about this site?{" "}
            <Link href="/#contact" className="text-purple hover:underline">
              Use the contact form
            </Link>{" "}
            or send an email directly.
          </p>
        </div>
      </div>
    </main>
  );
}
