import type { Metadata } from "next";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Datenschutz / Privacy Policy",
  description:
    "Privacy policy (Datenschutzerklärung) for ahmad-alhalwany.dev — what data is collected, why, and your GDPR rights.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen bg-page px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-page-muted transition hover:text-purple"
        >
          <FaHome className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">Legal</p>
          <h1 className="mt-2 text-4xl font-bold text-page-fg md:text-5xl">Datenschutzerklärung</h1>
          <p className="mt-3 text-sm text-page-muted">
            Privacy Policy according to Art. 13 GDPR (DSGVO).
          </p>
        </header>

        <div className="space-y-8 text-page-muted">
          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">1. Verantwortlicher / Controller</h2>
            <p className="text-sm leading-relaxed">
              Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
              Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <p className="mt-3 text-sm">
              Ahmad Al-Halwany
              <br />
              Trier, Germany
              <br />
              E-Mail:{" "}
              <a
                href="mailto:ahmad.s.alhalwany@gmail.com"
                className="text-purple hover:underline"
              >
                ahmad.s.alhalwany@gmail.com
              </a>
            </p>
          </section>

          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">2. Hosting & Server</h2>
            <p className="text-sm leading-relaxed">
              Diese Website wird bei <strong>Vercel Inc.</strong> gehostet (340 S Lemon Ave #2699,
              Walnut, CA 91789, USA). Beim Aufruf der Website werden durch Vercel automatisch
              technische Metadaten erfasst (IP-Adresse, Referrer, User-Agent, Zeitstempel), die für
              die Auslieferung der Website technisch erforderlich sind. Rechtsgrundlage: Art. 6 Abs.
              1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung der Website).
            </p>
          </section>

          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">3. Server-side Caching (Upstash Redis)</h2>
            <p className="text-sm leading-relaxed">
              Inhalte dieser Website (Projekte, Blogposts, Kommentare, Rezensionen) werden in einer
              <strong> Upstash Redis</strong>-Instanz zwischengespeichert, um die Performance zu
              verbessern. dabei werden keine personenbezogenen Nutzerdaten gespeichert — nur die
              Inhalte selbst sowie Metadaten wie Zeitstempel.
            </p>
          </section>

          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">4. Web-Analyse (Google Analytics 4)</h2>
            <p className="text-sm leading-relaxed">
              Diese Website verwendet <strong>Google Analytics 4</strong> (Google Ireland Ltd.,
              Gordon House, Barrow Street, Dublin 4, Irland) zur Erfassung anonymisierter
              Nutzungsmetriken (Seitenaufrufe, Herkunft, Gerätetyp). Es werden keine
              personenbezogenen Daten an Werbedienste weitergegeben.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              <strong>Google Analytics wird erst nach Ihrer ausdrücklichen Einwilligung geladen</strong>
              (Cookie-Banner beim ersten Besuch). Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO
              (Einwilligung). Sie können die Einwilligung jederzeit über den Link &bdquo;Cookie-Einstellungen&ldquo;
              im Footer widerrufen.
            </p>
          </section>

          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">5. Fehler-Monitoring (Sentry)</h2>
            <p className="text-sm leading-relaxed">
              Zur Erkennung technischer Fehler verwendet diese Website <strong>Sentry</strong>{" "}
              (Functional Software, Inc., USA). Sentry empfängt bei Client-Fehlern automatisch
              Metadaten wie Browsertyp, URL und Fehlerbeschreibung. IP-Adressen werden von Sentry
              gekürzt und nicht dauerhaft gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Fehlerbehebung und Stabilität der Website).
            </p>
          </section>

          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">6. Kontaktformular & E-Mail</h2>
            <p className="text-sm leading-relaxed">
              Wenn Sie mir über das Kontaktformular, die Kommentar- oder Bewertungsfunktion
              schreiben, werden Ihre Angaben (Name, E-Mail-Adresse, Nachricht) zur Bearbeitung
              Ihrer Anfrage gespeichert. Die Verarbeitung erfolgt über <strong>EmailJS</strong> als
              Dienstleister. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Bearbeitung Ihrer Anfrage)
              bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung zur Veröffentlichung bei Kommentaren).
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Diese Daten werden nach Erledigung Ihrer Anfrage gelöscht (spätestens 12 Monate nach
              letzter Interaktion).
            </p>
          </section>

          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">7. Newsletter (Buttondown)</h2>
            <p className="text-sm leading-relaxed">
              Wenn Sie sich für den Newsletter anmelden, wird Ihre E-Mail-Adresse über{" "}
              <strong>Buttondown</strong> gespeichert. Sie können jederzeit über den Link in jeder
              E-Mail abmelden. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung, jederzeit
              widerrufbar).
            </p>
          </section>

          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">8. Ihre Rechte / Your GDPR rights</h2>
            <p className="text-sm leading-relaxed">
              Sie haben gemäß DSGVO die folgenden Rechte:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-sm">
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO, &bdquo;Recht auf Vergessenwerden&ldquo;)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              Zur Ausübung Ihrer Rechte senden Sie eine E-Mail an{" "}
              <a
                href="mailto:ahmad.s.alhalwany@gmail.com"
                className="text-purple hover:underline"
              >
                ahmad.s.alhalwany@gmail.com
              </a>
              . Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu
              beschweren (für Trier: Landesbeauftragte für den Datenschutz und die
              Informationsfreiheit Rheinland-Pfalz, <a href="https://www.datenschutz.rlp.de" target="_blank" rel="noopener noreferrer" className="text-purple hover:underline">datenschutz.rlp.de</a>).
            </p>
          </section>

          <section className="rounded-2xl border border-page bg-page-card p-6">
            <h2 className="mb-3 text-xl font-semibold text-page-fg">9. Cookies</h2>
            <p className="text-sm leading-relaxed">
              Diese Website verwendet zwei Arten von Cookies:
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-sm">
              <li>
                <strong>Technisch notwendige Cookies:</strong> Session-Cookies, Theme-Präferenz
                (hell/dunkel), Sprache. Diese werden ohne Einwilligung gesetzt (Art. 6 Abs. 1 lit. f
                DSGVO).
              </li>
              <li>
                <strong>Analytics-Cookies:</strong> Google Analytics. Diese werden erst nach Ihrer
                Einwilligung über das Cookie-Banner aktiviert.
              </li>
            </ul>
          </section>

          <p className="text-xs text-page-muted">
            Stand: Juli 2026. Änderungen vorbehalten. Questions about privacy?{" "}
            <a
              href="mailto:ahmad.s.alhalwany@gmail.com"
              className="text-purple hover:underline"
            >
              Email me
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
