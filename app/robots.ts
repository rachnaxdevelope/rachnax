import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── All crawlers — default rule ────────────────────────
      {
        userAgent: "*",
        allow: ["/", "/explore"],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/login",
          "/signup",
          "/*.json$",
          "/private/",
        ],
      },

      // ── Major search engines ───────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login", "/signup"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/login", "/signup"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },

      // ── AI assistants & LLM crawlers ──────────────────────
      {
        userAgent: "GPTBot",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "meta-externalagent",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "FacebookBot",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "msnbot",
        allow: "/",
      },
      {
        userAgent: "cohere-ai",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "YouBot",
        allow: ["/", "/explore"],
      },
      {
        userAgent: "AI2Bot",
        allow: ["/", "/explore"],
      },

      // ── Block aggressive SEO / data scrapers ──────────────
      // These crawlers waste crawl budget without adding value
      {
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      {
        userAgent: "BLEXBot",
        disallow: "/",
      },
      {
        userAgent: "PetalBot",
        disallow: "/",
      },
    ],

    sitemap: "https://www.rachnax.com/sitemap.xml",
    host: "https://www.rachnax.com",
  };
}
