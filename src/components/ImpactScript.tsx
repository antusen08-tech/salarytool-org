"use client";

import Script from "next/script";

export default function ImpactScript() {
  return (
    <Script
      src="https://utt.impactcdn.com/P-A7213585-ef86-4ee1-9a12-0df7b9fae3cf1.js"
      strategy="afterInteractive"
      onLoad={() => {
        const w = window as any;
        if (w.impactStat) {
          w.impactStat("transformLinks");
          w.impactStat("trackImpression");
        }
      }}
    />
  );
}
