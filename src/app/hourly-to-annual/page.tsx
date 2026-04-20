import type { Metadata } from "next";
import Link from "next/link";
import HourlyCalculator from "@/components/HourlyCalculator";
import { HOURLY_RATES, calcEarnings, formatMoney } from "@/lib/hourlyRates";

export const metadata: Metadata = {
  title: "Hourly to Annual Salary Calculator 2025 — SalaryTool.org",
  description:
    "Convert your hourly wage to annual salary instantly. See weekly, monthly and yearly earnings for any hourly rate. Free hourly to salary calculator updated for 2025.",
  alternates: { canonical: "https://salarytool.org/hourly-to-annual" },
  openGraph: {
    title: "Hourly to Annual Salary Calculator 2025",
    description: "Convert any hourly wage to annual salary instantly. Free calculator.",
    url: "https://salarytool.org/hourly-to-annual",
    siteName: "SalaryTool.org",
    type: "website",
  },
};

const POPULAR = [15, 18, 20, 22, 25, 30, 35, 40, 45, 50];

export default function HourlyToAnnualPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-blue-600 transition-colors">SalaryTool.org</a>
            <span>/</span>
            <span className="text-gray-600">Hourly to Annual</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Hourly to Annual Salary Calculator
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Enter your hourly wage to instantly see your annual, monthly, and weekly salary.
            Works for full-time and part-time hours.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Ad slot */}
        <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs mb-8">
          Advertisement
        </div>

        <HourlyCalculator defaultRate={20} />

        {/* Popular rates quick links */}
        <div className="mt-10 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Popular Hourly Rates</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {POPULAR.map((r) => {
              const annual = calcEarnings(r).annual;
              return (
                <Link
                  key={r}
                  href={`/hourly-to-annual/${r}-an-hour`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-center hover:border-blue-200 hover:shadow-md transition-all group"
                >
                  <p className="font-bold text-blue-600 group-hover:text-blue-700">${r}/hr</p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatMoney(annual)}/yr</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* All rates table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800">Hourly Wage to Annual Salary — Full Table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-gray-500 font-medium">Hourly Rate</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Weekly</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Monthly</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {HOURLY_RATES.map(({ rate, slug, label }) => {
                  const e = calcEarnings(rate);
                  return (
                    <tr key={slug} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-2.5">
                        <Link href={`/hourly-to-annual/${slug}`} className="font-medium text-blue-600 hover:text-blue-700">
                          {label}
                        </Link>
                      </td>
                      <td className="px-6 py-2.5 text-gray-600">{formatMoney(e.weekly)}</td>
                      <td className="px-6 py-2.5 text-gray-600">{formatMoney(e.monthly)}</td>
                      <td className="px-6 py-2.5 font-semibold text-gray-800">{formatMoney(e.annual)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ad slot bottom */}
        <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs">
          Advertisement
        </div>
      </div>
    </main>
  );
}
