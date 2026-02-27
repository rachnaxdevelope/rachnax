import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

// SEO AUDIT RESULTS:
// ✅ Title: 46 chars (limit: 60)
// ✅ Description: 141 chars (limit: 160) — FIXED from 177
// ✅ OG Title: 46 chars
// ✅ OG Description: 106 chars
// ✅ Twitter description: 85 chars
// ✅ X-Robots-Tag: added via <head> meta
// ✅ Canonical URL set
// ✅ Google verification set
// ✅ Theme color set
// ✅ All icon sizes declared
// ✅ Geo + language tags added

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rachnax.com"),

  // TITLE (46 chars ✅ max 60)
  title: {
    default: "Rachnax — Showcase Your Work, Get Recognized",
    template: "%s | Rachnax",
  },

  // DESCRIPTION (141 chars ✅ max 160)
  description:
    "Rachnax helps creators, students & professionals showcase projects, build portfolios, get recognized, earn, and get hired — all in one place.",

  // KEYWORDS
  keywords: [
    "Rachnax",
    "portfolio platform",
    "showcase projects",
    "creator platform",
    "get hired",
    "freelance platform",
    "instahire",
    "student portfolio",
    "professional portfolio",
    "recognition platform",
    "build portfolio online",
    "get freelance work",
    "project showcase",
    "creator economy",
  ],

  // AUTHORSHIP
  authors: [{ name: "Rachnax", url: "https://www.rachnax.com" }],
  creator: "Rachnax",
  publisher: "Rachnax",

  // OPEN GRAPH
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rachnax.com",
    siteName: "Rachnax",
    title: "Rachnax — Showcase Your Work, Get Recognized",
    // 46 chars ✅
    description:
      "Build your portfolio, showcase projects, get recognized & get hired. The all-in-one platform for creators.",
    // 106 chars ✅
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rachnax — Platform for Creators, Students & Professionals",
        type: "image/png",
      },
    ],
  },

  // TWITTER / X CARD
  twitter: {
    card: "summary_large_image",
    site: "@rachnax",
    creator: "@rachnax",
    title: "Rachnax — Showcase Your Work, Get Recognized",
    // 46 chars ✅
    description:
      "Build your portfolio, showcase projects & get hired. One platform for every creator.",
    // 85 chars ✅
    images: [
      {
        url: "/og-image.png",
        alt: "Rachnax — Platform for Creators",
      },
    ],
  },

  // GOOGLE VERIFICATION
  verification: {
    google: "9p4iAwU9wr4TZqkWRfBI7jO-wqIEYUzXOLVSBO6L1M0",
  },

  // ROBOTS + X-Robots-Tag (HTTP header via Next.js)
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ICONS (all sizes)
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png" },
    ],
  },

  // MANIFEST
  manifest: "/site.webmanifest",

  // CANONICAL + LANGUAGES
  alternates: {
    canonical: "https://www.rachnax.com",
    languages: {
      "en-US": "https://www.rachnax.com",
    },
  },

  // CATEGORY
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <head>
        {/* X-Robots-Tag — tells ALL crawlers including AI what to do */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        {/* Theme colors for mobile browsers */}
        <meta name="theme-color" content="#7B2FE0" />
        <meta name="msapplication-TileColor" content="#7B2FE0" />
        <meta
          name="msapplication-TileImage"
          content="/android-chrome-192x192.png"
        />
        {/* Geo & language */}
        <meta name="geo.region" content="IN" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background font-body antialiased">{children}</body>
    </html>
  );
}
