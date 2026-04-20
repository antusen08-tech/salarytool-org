import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { STATES, getStateBySlug } from "@/lib/stateData";
import Calculator from "@/components/Calculator";

interface Props {
  params: Promise<{ state: string }>;
}

// Pre-render all 50 state pages at build time (SSG)
export async function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) return {};

  const noTax = state.incomeTax.type === "none";
  const title = `${state.name} Paycheck Calculator 2025 — Free Salary Calculator`;
  const description = noTax
    ? `Free ${state.name} paycheck calculator. ${state.name} has no state income tax — calculate your exact take-home pay after federal taxes and FICA. Updated for 2025.`
    : `Free ${state.name} paycheck calculator. ${state.tagline} Calculate your exact take-home pay after federal and state taxes. Updated for 2025.`;

  return {
    title,
    description,
    alternates: { canonical: `https://salarytool.org/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://salarytool.org/${slug}`,
      siteName: "SalaryTool.org",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function StatePage({ params }: Props) {
  const { state: slug } = await params;
  const state = getStateBySlug(slug);
  if (!state) notFound();

  const noTax = state.incomeTax.type === "none";
  const flatRate =
    state.incomeTax.type === "flat"
      ? `${(state.incomeTax.rate * 100).toFixed(2)}%`
      : null;

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <a href="/" className="hover:text-blue-600 transition-colors">
                SalaryTool.org
              </a>
              <span>/</span>
              <span className="text-gray-600">{state.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {state.name} Paycheck Calculator
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl">
              {noTax
                ? `${state.name} has no state income tax. Enter your salary below to calculate your exact take-home pay after federal taxes.`
                : flatRate
                ? `${state.name} charges a flat ${flatRate} state income tax. See exactly how much lands in your bank account each paycheck.`
                : `Calculate your exact ${state.name} take-home pay after federal and state taxes, Social Security, and Medicare.`}
            </p>
          </div>
        </div>

        {/* Ad slot — top */}
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs mb-6">
            {/* Replace with AdSense unit after approval */}
            Advertisement
          </div>
        </div>

        {/* Calculator */}
        <div className="max-w-4xl mx-auto px-4 pb-10">
          <Calculator state={state} />
        </div>

        {/* State tax info article */}
        <div className="bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Ad slot — mid */}
            <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs mb-8">
              Advertisement
            </div>

            <article className="prose prose-gray max-w-none">
              <h2>{state.name} Paycheck &amp; Tax Overview</h2>

              <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    label: "State Income Tax",
                    value: noTax ? "None" : flatRate ? flatRate + " flat" : "Graduated",
                    color: noTax ? "text-green-600" : "text-gray-800",
                  },
                  { label: "Min. Wage (2025)", value: `$${state.minWage.toFixed(2)}/hr`, color: "text-gray-800" },
                  { label: "Federal SS Tax", value: "6.2%", color: "text-gray-800" },
                  { label: "Federal Medicare", value: "1.45%", color: "text-gray-800" },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                    <p className={`font-bold text-lg ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <h3>How {state.name} Taxes Your Paycheck</h3>
              {noTax ? (
                <p>
                  <strong>{state.name} is one of the nine states with no state income tax.</strong>{" "}
                  Your paycheck only faces federal income tax and FICA deductions (Social Security
                  and Medicare). This saves residents thousands annually compared to high-tax states
                  like California or New York.
                </p>
              ) : (
                <p>
                  {state.tagline} On top of federal income tax, {state.name} residents pay state
                  income tax on their wages. Total deductions include federal income tax,{" "}
                  {state.name} state income tax, Social Security (6.2%), and Medicare (1.45%).
                </p>
              )}

              <h3>Federal Taxes Everyone Pays</h3>
              <ul>
                <li>
                  <strong>Federal Income Tax</strong> — Progressive brackets from 10% to 37%. The
                  2025 standard deduction is $15,000 (single) and $30,000 (married filing jointly).
                </li>
                <li>
                  <strong>Social Security</strong> — 6.2% on wages up to $176,100 (2025 wage base).
                </li>
                <li>
                  <strong>Medicare</strong> — 1.45% on all wages, plus 0.9% on wages above $200,000.
                </li>
              </ul>

              <h3>How to Increase Your {state.name} Take-Home Pay</h3>
              <ul>
                <li>
                  <strong>Maximize 401(k) contributions</strong> — Reduces federal and state taxable
                  income. The 2025 limit is $23,500 (under 50) or $31,000 (50+).
                </li>
                <li>
                  <strong>Contribute to an HSA</strong> — Pre-tax if you have a high-deductible
                  health plan.
                </li>
                <li>
                  <strong>Review your W-4</strong> — Accurate withholding allowances prevent
                  over- or under-withholding.
                </li>
              </ul>

              <h3>Frequently Asked Questions — {state.name} Paycheck Calculator</h3>

              <h4>How much of my {state.name} paycheck goes to taxes?</h4>
              <p>
                For a typical {state.name} resident earning $75,000 annually (single filer), expect
                roughly 22–28% of gross pay toward taxes.{" "}
                {noTax ? `${state.name} has no state income tax, so you only pay federal and FICA.` : ""}
                Use the calculator above for your exact figure.
              </p>

              <h4>Is this calculator accurate for {state.name}?</h4>
              <p>
                This calculator uses 2025 federal and {state.name} state tax rates. It provides
                estimates — actual withholding depends on your W-4 elections, employer benefits, and
                additional income. Verify with your employer or a tax professional.
              </p>

              <h4>What is {state.name}&apos;s minimum wage in 2025?</h4>
              <p>
                {state.name}&apos;s minimum wage is ${state.minWage.toFixed(2)} per hour in 2025.
              </p>
            </article>

            {/* Ad slot — bottom */}
            <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-xs mt-8">
              Advertisement
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
