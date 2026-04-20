import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { STATES, getStateBySlug } from "@/lib/stateData";

interface Props {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};

  const title = `${state.name} Minimum Wage 2025 — $${state.minWage.toFixed(2)}/hour`;
  const description = `${state.name} minimum wage is $${state.minWage.toFixed(2)} per hour in 2025. Calculate annual, monthly, and weekly earnings at ${state.name}'s minimum wage. Updated for 2025.`;

  return {
    title,
    description,
    alternates: { canonical: `https://salarytool.org/minimum-wage/${slug}` },
    openGraph: { title, description, url: `https://salarytool.org/minimum-wage/${slug}`, siteName: "SalaryTool.org", type: "website" },
  };
}

const FEDERAL_MIN_WAGE = 7.25;

export default async function StateMinWagePage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const hourly = state.minWage;
  const daily = hourly * 8;
  const weekly = hourly * 40;
  const biweekly = weekly * 2;
  const monthly = (weekly * 52) / 12;
  const annual = weekly * 52;
  const aboveFederal = hourly > FEDERAL_MIN_WAGE;
  const diff = (hourly - FEDERAL_MIN_WAGE).toFixed(2);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-blue-600 transition-colors">SalaryTool.org</a>
            <span>/</span>
            <Link href="/minimum-wage" className="hover:text-blue-600 transition-colors">Minimum Wage</Link>
            <span>/</span>
            <span className="text-gray-600">{state.name}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {state.name} Minimum Wage 2025
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-blue-600">${hourly.toFixed(2)}</span>
            <span className="text-gray-500 text-lg">per hour</span>
            {aboveFederal ? (
              <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                +${diff} above federal
              </span>
            ) : (
              <span className="bg-gray-100 text-gray-500 text-sm font-medium px-3 py-1 rounded-full">
                Equal to federal rate
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Ad slot */}
        <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs mb-8">
          Advertisement
        </div>

        {/* Earnings breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800">
              {state.name} Minimum Wage Earnings — 2025
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: "Hourly", value: hourly, note: "base rate" },
              { label: "Daily", value: daily, note: "8 hours" },
              { label: "Weekly", value: weekly, note: "40 hours" },
              { label: "Bi-Weekly", value: biweekly, note: "80 hours" },
              { label: "Monthly", value: monthly, note: "~173 hours" },
              { label: "Annual", value: annual, note: "2,080 hours", highlight: true },
            ].map((row, i) => (
              <div key={i} className={`flex justify-between items-center px-6 py-3.5 ${row.highlight ? "bg-blue-50" : ""}`}>
                <div>
                  <span className={`font-medium ${row.highlight ? "text-blue-800" : "text-gray-700"}`}>
                    {row.label}
                  </span>
                  <span className="text-gray-400 text-xs ml-2">{row.note}</span>
                </div>
                <span className={`font-bold ${row.highlight ? "text-blue-700 text-xl" : "text-gray-800"}`}>
                  ${row.value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-500 mb-1">Federal Minimum Wage</p>
            <p className="text-2xl font-bold text-gray-800">${FEDERAL_MIN_WAGE.toFixed(2)}/hr</p>
            <p className="text-xs text-gray-400 mt-1">${(FEDERAL_MIN_WAGE * 40 * 52).toLocaleString()} annually</p>
          </div>
          <div className={`rounded-2xl border shadow-sm p-5 ${aboveFederal ? "bg-green-50 border-green-100" : "bg-gray-50 border-gray-100"}`}>
            <p className="text-xs text-gray-500 mb-1">{state.name} vs Federal</p>
            <p className={`text-2xl font-bold ${aboveFederal ? "text-green-600" : "text-gray-500"}`}>
              {aboveFederal ? `+$${diff}/hr` : "Same rate"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {aboveFederal
                ? `$${((hourly - FEDERAL_MIN_WAGE) * 40 * 52).toLocaleString()} more per year`
                : `${state.name} follows the federal minimum`}
            </p>
          </div>
        </div>

        {/* CTA — paycheck calculator */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8">
          <p className="font-semibold text-gray-800 mb-1">
            Want to see your actual take-home pay after taxes?
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Use our {state.name} paycheck calculator to see exactly how much you keep after
            federal and state taxes on a minimum wage salary.
          </p>
          <Link
            href={`/${slug}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            {state.name} Paycheck Calculator →
          </Link>
        </div>

        {/* Article content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <article className="prose prose-gray max-w-none">
            <h2>{state.name} Minimum Wage — What You Need to Know</h2>
            <p>
              The minimum wage in {state.name} is <strong>${hourly.toFixed(2)} per hour</strong> as of 2025.
              {aboveFederal
                ? ` This is $${diff} higher than the federal minimum wage of $${FEDERAL_MIN_WAGE.toFixed(2)}/hr.`
                : ` ${state.name} follows the federal minimum wage of $${FEDERAL_MIN_WAGE.toFixed(2)}/hr.`}
              A full-time worker earning {state.name}&apos;s minimum wage makes approximately{" "}
              <strong>${annual.toLocaleString()} per year</strong> before taxes.
            </p>

            <h3>Who Is Covered by {state.name}&apos;s Minimum Wage?</h3>
            <p>
              Most workers in {state.name} are covered by the state minimum wage law. Exceptions may
              include tipped employees, certain agricultural workers, and some small business employees.
              Federal law requires workers receive at least the federal minimum wage of ${FEDERAL_MIN_WAGE.toFixed(2)}/hr
              if state law provides less protection.
            </p>

            <h3>Minimum Wage vs. Living Wage in {state.name}</h3>
            <p>
              A minimum wage of ${hourly.toFixed(2)}/hr translates to ${annual.toLocaleString()} per year
              for full-time workers. Many economists and advocacy groups argue that the living wage —
              the amount needed to cover basic expenses — is higher than the minimum wage in most
              {state.name} cities, particularly in urban areas.
            </p>

            <h3>Frequently Asked Questions</h3>
            <h4>What is the minimum wage in {state.name} in 2025?</h4>
            <p>The minimum wage in {state.name} is ${hourly.toFixed(2)} per hour in 2025.</p>

            <h4>How much is {state.name} minimum wage annually?</h4>
            <p>
              A full-time worker earning {state.name}&apos;s minimum wage of ${hourly.toFixed(2)}/hr
              earns ${annual.toLocaleString()} per year (based on 40 hours/week, 52 weeks/year),
              before taxes.
            </p>

            <h4>Is {state.name}&apos;s minimum wage higher than federal?</h4>
            <p>
              {aboveFederal
                ? `Yes. ${state.name}'s minimum wage of $${hourly.toFixed(2)}/hr is $${diff} higher than the federal minimum wage of $${FEDERAL_MIN_WAGE.toFixed(2)}/hr.`
                : `${state.name} follows the federal minimum wage of $${FEDERAL_MIN_WAGE.toFixed(2)}/hr.`}
            </p>
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
