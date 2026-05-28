import { withSentryConfig } from "@sentry/nextjs";

const LONG_CACHE = "public, max-age=31536000, immutable";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  ...(process.env.NEXT_PUBLIC_CDN_URL?.trim()
    ? {
        assetPrefix: process.env.NEXT_PUBLIC_CDN_URL.trim().replace(/\/$/, ""),
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "react-icons",
      "@tabler/icons-react",
      "three",
      "@react-three/drei",
      "@react-three/fiber",
    ],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/:path*.jpg",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/:path*.jpeg",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/:path*.webp",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/:path*.avif",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/:path*.gif",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
      {
        source: "/:path*.woff2",
        headers: [{ key: "Cache-Control", value: LONG_CACHE }],
      },
    ];
  },
};

/** Skip Sentry webpack upload locally (avoids sentry-cli 504). Enable on Vercel/CI. */
const uploadSentry =
  process.env.SENTRY_UPLOAD === "true" ||
  process.env.CI === "true" ||
  process.env.VERCEL === "1";

const sentryOptions = {
  org: "litco-1j",
  project: "javascript-nextjs",
  silent: true,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

export default uploadSentry
  ? withSentryConfig(nextConfig, sentryOptions)
  : nextConfig;
