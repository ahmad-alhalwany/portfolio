// Client Sentry — keep dev bundle small (Replay is heavy and slows chunk loading).
import * as Sentry from "@sentry/nextjs";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://c75a3521c23cdfa5e7306c4cf69190e0@o4507650411855872.ingest.de.sentry.io/4507650415919184",
    tracesSampleRate: 0.1,
    debug: false,
    replaysOnErrorSampleRate: 0.25,
    replaysSessionSampleRate: 0.05,
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
  });
}
