"use client";

import { useState, useMemo } from "react";
import {
  calculatePaycheck,
  formatCurrency,
  formatPercent,
  PAY_FREQUENCY_LABELS,
  type FilingStatus,
  type PayFrequency,
} from "@/lib/calculator";
import { type StateData } from "@/lib/stateData";

interface Props {
  state: StateData;
}

export default function Calculator({ state }: Props) {
  const [salary, setSalary] = useState("75000");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");
  const [preTax, setPreTax] = useState("0");

  const result = useMemo(() => {
    const gross = parseFloat(salary.replace(/,/g, "")) || 0;
    const deductions = parseFloat(preTax.replace(/,/g, "")) || 0;
    if (gross <= 0) return null;
    return calculatePaycheck({
      grossAnnual: gross,
      filingStatus,
      payFrequency,
      state,
      preTaxDeductions: deductions,
    });
  }, [salary, filingStatus, payFrequency, preTax, state]);

  const rows = result
    ? [
        { label: "Gross Pay", amount: result.grossPerPeriod, highlight: false },
        { label: "Federal Income Tax", amount: -result.federalTaxPerPeriod, highlight: false },
        ...(result.stateTaxPerPeriod > 0
          ? [{ label: `${state.name} State Tax`, amount: -result.stateTaxPerPeriod, highlight: false }]
          : []),
        { label: "Social Security (6.2%)", amount: -result.socialSecurityPerPeriod, highlight: false },
        { label: "Medicare (1.45%)", amount: -result.medicarePerPeriod, highlight: false },
        ...(result.sdiPerPeriod > 0
          ? [{ label: "State Disability (SDI)", amount: -result.sdiPerPeriod, highlight: false }]
          : []),
        ...(result.preTaxDeductionsPerPeriod > 0
          ? [{ label: "Pre-Tax Deductions", amount: -result.preTaxDeductionsPerPeriod, highlight: false }]
          : []),
        { label: "Take-Home Pay", amount: result.netPerPeriod, highlight: true },
      ]
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Input section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Enter Your Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Annual Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Annual Gross Salary ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                placeholder="75,000"
              />
            </div>
          </div>

          {/* Pay Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Pay Frequency
            </label>
            <select
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
            >
              {(Object.entries(PAY_FREQUENCY_LABELS) as [PayFrequency, string][]).map(
                ([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Filing Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 bg-white"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>

          {/* Pre-Tax Deductions */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Annual Pre-Tax Deductions ($)
              <span className="text-gray-400 font-normal ml-1">(401k, HSA, etc.)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input
                type="text"
                value={preTax}
                onChange={(e) => setPreTax(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-600 rounded-2xl p-5 text-white">
              <p className="text-blue-200 text-sm font-medium mb-1">Take-Home Pay</p>
              <p className="text-3xl font-bold">{formatCurrency(result.netPerPeriod)}</p>
              <p className="text-blue-200 text-xs mt-1">per {PAY_FREQUENCY_LABELS[payFrequency].toLowerCase().replace("bi-", "bi").replace("semi-", "semi ").replace("ly", "").trim()} paycheck</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm font-medium mb-1">Annual Take-Home</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(result.netAnnual)}</p>
              <p className="text-gray-400 text-xs mt-1">after all taxes</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm font-medium mb-1">Effective Tax Rate</p>
              <p className="text-2xl font-bold text-gray-800">{formatPercent(result.effectiveTotalRate)}</p>
              <p className="text-gray-400 text-xs mt-1">federal + state + FICA</p>
            </div>
          </div>

          {/* Breakdown table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-50">
              <h3 className="font-semibold text-gray-800">
                Paycheck Breakdown —{" "}
                <span className="text-blue-600">{PAY_FREQUENCY_LABELS[payFrequency]}</span>
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center px-6 py-3.5 ${
                    row.highlight
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  <span className={row.highlight ? "text-blue-800" : "text-gray-600"}>
                    {row.label}
                  </span>
                  <span
                    className={
                      row.highlight
                        ? "text-blue-700 font-bold text-lg"
                        : row.amount < 0
                        ? "text-red-500"
                        : "text-gray-800 font-medium"
                    }
                  >
                    {row.amount < 0
                      ? `−${formatCurrency(Math.abs(row.amount))}`
                      : formatCurrency(row.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Annual breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-50">
              <h3 className="font-semibold text-gray-800">Annual Tax Summary</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { label: "Gross Annual Salary", value: result.grossAnnual },
                { label: "Federal Income Tax", value: result.federalTaxAnnual, rate: result.effectiveFederalRate },
                { label: `${state.name} State Tax`, value: result.stateTaxAnnual, rate: result.effectiveStateRate, hide: state.incomeTax.type === "none" },
                { label: "Social Security", value: result.socialSecurityAnnual },
                { label: "Medicare", value: result.medicareAnnual },
                ...(result.sdiAnnual > 0 ? [{ label: "SDI", value: result.sdiAnnual }] : []),
              ]
                .filter((r) => !r.hide)
                .map((row, i) => (
                  <div key={i} className="flex justify-between items-center px-6 py-3 text-sm">
                    <span className="text-gray-600">{row.label}</span>
                    <div className="text-right">
                      <span className="text-gray-800 font-medium">{formatCurrency(row.value)}</span>
                      {row.rate !== undefined && (
                        <span className="text-gray-400 ml-2 text-xs">({formatPercent(row.rate)})</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Affiliate CTA */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-5 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-2xl">🧾</div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">
                  Ready to file your {state.name} taxes?
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  TurboTax guides you step-by-step through {state.name} state and federal filing.
                  Get your maximum refund — guaranteed.
                </p>
                <a
                  href="https://turbotax.intuit.com"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  File with TurboTax →
                </a>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            * Estimates based on 2025 tax rates. Actual withholding may vary. Consult a tax
            professional for personalized advice.
          </p>
        </>
      )}
    </div>
  );
}
