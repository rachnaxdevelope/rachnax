import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all standard search engines
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      // Google
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      // ChatGPT / OpenAI
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      // ChatGPT browsing plugin
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      // OpenAI other crawlers
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      // Claude / Anthropic
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Google Gemini / Bard
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Meta AI (Llama)
      {
        userAgent: "meta-externalagent",
        allow: "/",
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      // Microsoft Copilot
      {
        userAgent: "msnbot",
        allow: "/",
      },
      // Apple
      {
        userAgent: "Applebot",
        allow: "/",
      },
      // Common AI research crawlers
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      {
        userAgent: "YouBot",
        allow: "/",
      },
      {
        userAgent: "AI2Bot",
        allow: "/",
      },
    ],
    sitemap: "https://www.rachnax.com/sitemap.xml",
    host: "https://www.rachnax.com",
  };
}
