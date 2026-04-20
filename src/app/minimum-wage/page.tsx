import type { Metadata } from "next";
import Link from "next/link";
import { STATES } from "@/lib/stateData";

export const metadata: Metadata = {
  title: "Minimum Wage by State 2025 — All 50 States — SalaryTool.org",
  description:
    "Current minimum wage rates for all 50 US states in 2025. See which states pay above federal minimum wage and calculate your annual earnings.",
  alternates: { canonical: "https://salarytool.org/minimum-wage" },
  openGraph: {
    title: "Minimum Wage by State 2025 — All 50 States",
    description: "Current minimum wage rates for all 50 US states in 2025.",
    url: "https://salarytool.org/minimum-wage",
    siteName: "SalaryTool.org",
    type: "website",
  },
};

const FEDERAL_MIN_WAGE = 7.25;
const sorted = [...STATES].sort((a, b) => b.minWage - a.minWage);

export default function MinimumWagePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-blue-600 transition-colors">SalaryTool.org</a>
            <span>/</span>
            <span className="text-gray-600">Minimum Wage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Minimum Wage by State 2025
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Current minimum wage rates for all 50 US states. The federal minimum wage is
            ${FEDERAL_MIN_WAGE.toFixed(2)}/hr — {STATES.filter(s => s.minWage > FEDERAL_MIN_WAGE).length} states
            pay more than the federal rate.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Ad slot */}
        <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs mb-8">
          Advertisement
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Federal Minimum", value: `$${FEDERAL_MIN_WAGE.toFixed(2)}/hr`, color: "text-gray-800" },
            { label: "Highest State", value: `$${sorted[0].minWage.toFixed(2)}/hr`, sub: sorted[0].name, color: "text-green-600" },
            { label: "States Above Federal", value: `${STATES.filter(s => s.minWage > FEDERAL_MIN_WAGE).length} states`, color: "text-blue-600" },
            { label: "States At Federal", value: `${STATES.filter(s => s.minWage === FEDERAL_MIN_WAGE).length} states`, color: "text-gray-800" },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-500 mb-1">{card.label}</p>
              <p className={`font-bold text-xl ${card.color}`}>{card.value}</p>
              {card.sub && <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>}
            </div>
          ))}
        </div>

        {/* Full table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">All States — Ranked by Minimum Wage</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-gray-500 font-medium">State</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Min. Wage/hr</th>
                  <th className="px-6 py-3 text-gray-500 font-medium hidden sm:table-cell">Annual (40hr/wk)</th>
                  <th className="px-6 py-3 text-gray-500 font-medium hidden sm:table-cell">vs Federal</th>
                  <th className="px-6 py-3 text-gray-500 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sorted.map((state) => {
                  const annual = state.minWage * 40 * 52;
                  const diff = state.minWage - FEDERAL_MIN_WAGE;
                  const aboveFederal = diff > 0;
                  return (
                    <tr key={state.slug} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-3">
                        <Link href={`/minimum-wage/${state.slug}`} className="font-medium text-gray-800 hover:text-blue-600">
                          {state.name}
                        </Link>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`font-bold ${state.minWage > 10 ? "text-green-600" : "text-gray-800"}`}>
                          ${state.minWage.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-3 hidden sm:table-cell text-gray-600">
                        ${annual.toLocaleString()}
                      </td>
                      <td className="px-6 py-3 hidden sm:table-cell">
                        {aboveFederal ? (
                          <span className="text-green-600 font-medium">+${diff.toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-400">Federal rate</span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <Link href={`/minimum-wage/${state.slug}`} className="text-blue-500 hover:text-blue-700 text-xs">
                          Details →
                        </Link>
                      </td>
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
