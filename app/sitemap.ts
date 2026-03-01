import { MetadataRoute } from "next";

const BASE_URL = "https://www.rachnax.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Core pages ────────────────────────────────────────────
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/explore`,
      lastModified: new Date(),
      changeFrequency: "daily", // creator content updates frequently
      priority: 0.9,
    },

    // ── Future pages (uncomment as they go live) ──────────────
    // {
    //   url: `${BASE_URL}/login`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.3,
    // },
    // {
    //   url: `${BASE_URL}/signup`,
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.4,
    // },
  ];
}
