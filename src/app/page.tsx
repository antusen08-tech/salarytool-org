import type { Metadata } from "next";
import Link from "next/link";
import { STATES } from "@/lib/stateData";

export const metadata: Metadata = {
  title: "Free Paycheck Calculator by State 2025 — SalaryTool.org",
  description:
    "Calculate your exact take-home pay for all 50 US states. Free paycheck calculator with federal and state income tax, Social Security, and Medicare. Updated for 2025.",
  alternates: { canonical: "https://salarytool.org" },
  openGraph: {
    title: "Free Paycheck Calculator by State 2025",
    description:
      "Calculate your exact take-home pay for all 50 US states. Free, instant, updated for 2025.",
    url: "https://salarytool.org",
    siteName: "SalaryTool.org",
    type: "website",
  },
};

const NO_TAX_STATES = STATES.filter((s) => s.incomeTax.type === "none");
const HIGH_TRAFFIC_SLUGS = ["california", "texas", "florida", "new-york", "washington", "illinois"];
const FEATURED = STATES.filter((s) => HIGH_TRAFFIC_SLUGS.includes(s.slug));

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Paycheck Calculator
            <br />
            <span className="text-blue-600">For Every US State</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            See exactly how much of your salary you actually take home — after federal taxes,
            state taxes, Social Security, and Medicare. Free, instant, updated for 2025.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {["2025 Tax Rates", "All 50 States", "Federal + State + FICA", "Free Forever"].map((f) => (
              <span
                key={f}
                className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium"
              >
                <span>✓</span> {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Featured states */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">Most Popular States</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {FEATURED.map((state) => {
            const noTax = state.incomeTax.type === "none";
            const flatRate =
              state.incomeTax.type === "flat"
                ? `${(state.incomeTax.rate * 100).toFixed(1)}% flat`
                : null;
            return (
              <Link
                key={state.slug}
                href={`/${state.slug}`}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {state.name}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-mono">
                    {state.abbr}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {noTax ? (
                    <span className="text-green-600 font-medium">No state income tax</span>
                  ) : flatRate ? (
                    <span>{flatRate} state tax</span>
                  ) : (
                    <span>Graduated state tax</span>
                  )}
                </p>
              </Link>
            );
          })}
        </div>

        {/* No-tax callout */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-10">
          <h3 className="font-semibold text-green-800 mb-2">
            States With No Income Tax ({NO_TAX_STATES.length})
          </h3>
          <p className="text-sm text-green-700 mb-3">
            These states don&apos;t tax wages — residents only pay federal income tax and FICA.
          </p>
          <div className="flex flex-wrap gap-2">
            {NO_TAX_STATES.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="bg-white text-green-700 border border-green-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white hover:border-green-600 transition-all"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>

        {/* All states A-Z */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">All States A–Z</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {[
              STATES.slice(0, Math.ceil(STATES.length / 2)),
              STATES.slice(Math.ceil(STATES.length / 2)),
            ].map((col, ci) => (
              <div key={ci} className={`divide-y divide-gray-50 ${ci === 1 ? "border-t sm:border-t-0 sm:border-l border-gray-100" : ""}`}>
                {col.map((state) => {
                  const noTax = state.incomeTax.type === "none";
                  const flatRate =
                    state.incomeTax.type === "flat"
                      ? `${(state.incomeTax.rate * 100).toFixed(2)}%`
                      : null;
                  return (
                    <Link
                      key={state.slug}
                      href={`/${state.slug}`}
                      className="flex items-center justify-between px-5 py-3 hover:bg-blue-50 group transition-colors"
                    >
                      <span className="text-gray-700 group-hover:text-blue-600 font-medium text-sm">
                        {state.name}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          noTax ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        {noTax ? "No tax" : flatRate ? flatRate : "Graduated"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              step: "1",
              title: "Enter your salary",
              desc: "Input your annual gross salary, pay frequency, and filing status.",
            },
            {
              step: "2",
              title: "Pick your state",
              desc: "Select your state to apply the correct local income tax rates.",
            },
            {
              step: "3",
              title: "See your take-home",
              desc: "Get an instant breakdown of every deduction per paycheck and annually.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400">
          SalaryTool.org provides estimates based on 2025 federal and state tax rates.
          Not tax advice — consult a professional for your specific situation.
        </p>
      </div>
    </main>
  );
}
