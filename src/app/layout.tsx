import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ImpactScript from "@/components/ImpactScript";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://salarytool.org"),
  title: {
    default: "Free Paycheck Calculator by State 2025 — SalaryTool.org",
    template: "%s | SalaryTool.org",
  },
  description:
    "Free paycheck calculator for all 50 US states. Calculate your exact take-home pay after federal and state taxes. Updated for 2025.",
  keywords: ["paycheck calculator", "salary calculator", "take home pay", "income tax calculator"],
  authors: [{ name: "SalaryTool.org" }],
  robots: { index: true, follow: true },
  verification: {
    other: { "impact-site-verification": "deb71713-22c2-4586-b7e1-65c4da3fe027" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2752875256706783"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <ImpactScript />

        {/* Site header */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-bold text-gray-900 text-lg tracking-tight">
              Salary<span className="text-blue-600">Tool</span>
              <span className="text-gray-400 font-normal text-sm">.org</span>
            </a>
            <nav className="flex items-center gap-6 text-sm text-gray-500">
              <a href="/" className="hover:text-blue-600 transition-colors">All States</a>
              <a href="/california" className="hover:text-blue-600 transition-colors hidden sm:block">California</a>
              <a href="/texas" className="hover:text-blue-600 transition-colors hidden sm:block">Texas</a>
              <a href="/new-york" className="hover:text-blue-600 transition-colors hidden sm:block">New York</a>
              <a href="/minimum-wage" className="hover:text-blue-600 transition-colors hidden sm:block">Min. Wage</a>
            </nav>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-gray-800">
                  Salary<span className="text-blue-600">Tool</span>.org
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Free paycheck calculator for all 50 US states. Updated for 2025.
                </p>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="/" className="hover:text-gray-600">All States</a>
                <a href="/california" className="hover:text-gray-600">California</a>
                <a href="/texas" className="hover:text-gray-600">Texas</a>
                <a href="/florida" className="hover:text-gray-600">Florida</a>
                <a href="/new-york" className="hover:text-gray-600">New York</a>
              </div>
            </div>
            <p className="text-xs text-gray-300 mt-6 text-center">
              Results are estimates only. Tax laws change — verify with a licensed tax professional.
              © {new Date().getFullYear()} SalaryTool.org
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
