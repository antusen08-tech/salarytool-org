import type { MetadataRoute } from "next";
import { STATES } from "@/lib/stateData";

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
  ];
}
