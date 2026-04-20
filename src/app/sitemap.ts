import type { MetadataRoute } from "next";
import { STATES } from "@/lib/stateData";
import { HOURLY_RATES } from "@/lib/hourlyRates";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://salarytool.org";
  const now = new Date();

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...STATES.map((state) => ({
      url: `${base}/${state.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${base}/minimum-wage`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...STATES.map((state) => ({
      url: `${base}/minimum-wage/${state.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/hourly-to-annual`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...HOURLY_RATES.map((r) => ({
      url: `${base}/hourly-to-annual/${r.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
