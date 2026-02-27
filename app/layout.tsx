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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rachnax.com"),
  title: {
    default: "Rachnax — Showcase Your Work, Get Recognized",
    template: "%s | Rachnax",
  },
  description:
    "Rachnax is the platform where creators, students, and professionals showcase their projects, build stunning portfolios, earn opportunities, and get hired or work as freelancers.",
  keywords: [
    "Rachnax",
    "portfolio platform",
    "showcase projects",
    "get hired",
    "freelance",
    "creator platform",
    "student projects",
    "professional portfolio",
    "instahire",
    "recognition platform",
  ],
  authors: [{ name: "Rachnax", url: "https://www.rachnax.com" }],
  creator: "Rachnax",
  publisher: "Rachnax",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rachnax.com",
    siteName: "Rachnax",
    title: "Rachnax — Showcase Your Work, Get Recognized",
    description:
      "The platform where creators, students, and professionals build portfolios, get recognized, earn, and get hired.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rachnax — Platform for Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rachnax — Showcase Your Work, Get Recognized",
    description:
      "Build your portfolio, showcase projects, get hired or freelance with Rachnax.",
    images: ["/og-image.png"],
    creator: "@rachnax",
  },
  verification: {
    google: "9p4iAwU9wr4TZqkWRfBI7jO-wqIEYUzXOLVSBO6L1M0",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.rachnax.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body className="bg-background font-body antialiased">{children}</body>
    </html>
  );
}
