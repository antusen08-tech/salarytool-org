import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { HOURLY_RATES, RATE_MAP, calcEarnings, formatMoney } from "@/lib/hourlyRates";
import HourlyCalculator from "@/components/HourlyCalculator";

interface Props {
  params: Promise<{ rate: string }>;
}

export async function generateStaticParams() {
  return HOURLY_RATES.map((r) => ({ rate: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rate: slug } = await params;
  const rateData = RATE_MAP[slug];
  if (!rateData) return {};

  const annual = calcEarnings(rateData.rate).annual;
  const title = `$${rateData.rate} an Hour is How Much a Year? — ${formatMoney(annual)}/year`;
  const description = `$${rateData.rate} an hour is ${formatMoney(annual)} per year working full-time. See weekly, monthly, and annual salary breakdown for $${rateData.rate}/hr. Free calculator.`;

  return {
    title,
    description,
    alternates: { canonical: `https://salarytool.org/hourly-to-annual/${slug}` },
    openGraph: { title, description, url: `https://salarytool.org/hourly-to-annual/${slug}`, siteName: "SalaryTool.org", type: "website" },
  };
}

export default async function HourlyRatePage({ params }: Props) {
  const { rate: slug } = await params;
  const rateData = RATE_MAP[slug];
  if (!rateData) notFound();

  const { rate } = rateData;
  const e40 = calcEarnings(rate, 40);
  const HOURS_OPTIONS = [20, 25, 30, 35, 40];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-blue-600 transition-colors">SalaryTool.org</a>
            <span>/</span>
            <Link href="/hourly-to-annual" className="hover:text-blue-600 transition-colors">Hourly to Annual</Link>
            <span>/</span>
            <span className="text-gray-600">${rate}/hr</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            ${rate} an Hour is How Much a Year?
          </h1>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-blue-600">{formatMoney(e40.annual)}</span>
            <span className="text-gray-500 text-xl">per year</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Based on 40 hours/week, 52 weeks/year</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Ad slot */}
        <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs mb-8">
          Advertisement
        </div>

        {/* Quick answer cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Per Hour", value: formatMoney(e40.hourly) },
            { label: "Per Week", value: formatMoney(e40.weekly) },
            { label: "Per Month", value: formatMoney(e40.monthly) },
            { label: "Per Year", value: formatMoney(e40.annual) },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">{card.label}</p>
              <p className="font-bold text-xl text-gray-800">{card.value}</p>
            </div>
          ))}
        </div>

        {/* By hours worked table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800">${rate}/hr Annual Salary by Hours Worked</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 text-gray-500 font-medium">Hours/Week</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Weekly</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Monthly</th>
                  <th className="px-6 py-3 text-gray-500 font-medium">Annual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {HOURS_OPTIONS.map((h) => {
                  const e = calcEarnings(rate, h);
                  return (
                    <tr key={h} className={h === 40 ? "bg-blue-50" : "hover:bg-gray-50"}>
                      <td className="px-6 py-3 font-medium text-gray-700">
                        {h} hrs {h === 40 ? <span className="text-blue-600 text-xs ml-1">(full-time)</span> : <span className="text-gray-400 text-xs ml-1">(part-time)</span>}
                      </td>
                      <td className="px-6 py-3 text-gray-600">{formatMoney(e.weekly)}</td>
                      <td className="px-6 py-3 text-gray-600">{formatMoney(e.monthly)}</td>
                      <td className="px-6 py-3 font-bold text-gray-800">{formatMoney(e.annual)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive calculator */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">Try a Different Rate</h2>
        <HourlyCalculator defaultRate={rate} />

        {/* CTA — paycheck calculator */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 my-8">
          <p className="font-semibold text-gray-800 mb-1">
            Want to see ${rate}/hr after taxes?
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Use our paycheck calculator to see your exact take-home pay after federal and state taxes.
          </p>
          <a
            href="/california"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Calculate Take-Home Pay →
          </a>
        </div>

        {/* Article */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <article className="prose prose-gray max-w-none">
            <h2>${rate} an Hour — Full Breakdown</h2>
            <p>
              If you earn <strong>${rate} per hour</strong> and work full-time (40 hours per week),
              your annual salary is <strong>{formatMoney(e40.annual)}</strong>. This breaks down to{" "}
              {formatMoney(e40.monthly)} per month, {formatMoney(e40.weekly)} per week, and{" "}
              {formatMoney(e40.biweekly)} per bi-weekly paycheck.
            </p>

            <h3>Is ${rate} an Hour a Good Wage?</h3>
            <p>
              The federal minimum wage is $7.25/hr. At ${rate}/hr, you earn{" "}
              {((rate / 7.25 - 1) * 100).toFixed(0)}% more than the federal minimum wage.
              Whether ${rate}/hr is a good wage depends heavily on your location —
              it goes much further in low cost-of-living states like Mississippi or Arkansas
              than in high-cost states like California or New York.
            </p>

            <h3>How Much is ${rate}/hr After Taxes?</h3>
            <p>
              Your take-home pay on ${rate}/hr will be lower than {formatMoney(e40.annual)} due to
              federal income tax, state income tax (varies by state), Social Security (6.2%),
              and Medicare (1.45%). Use our paycheck calculator above to see your exact after-tax
              income based on your state.
            </p>

            <h3>Frequently Asked Questions</h3>
            <h4>${rate} an hour is how much a year?</h4>
            <p>
              ${rate} an hour is <strong>{formatMoney(e40.annual)} per year</strong> working
              40 hours per week, 52 weeks per year.
            </p>
            <h4>${rate} an hour is how much a month?</h4>
            <p>${rate} an hour is <strong>{formatMoney(e40.monthly)} per month</strong> (full-time).</p>
            <h4>${rate} an hour is how much a week?</h4>
            <p>${rate} an hour is <strong>{formatMoney(e40.weekly)} per week</strong> working 40 hours.</p>
          </article>
        </div>

        {/* Ad slot bottom */}
        <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs">
          Advertisement
        </div>
      </div>
    </main>
  );
}
