"use client";

import { useState } from "react";
import { calcEarnings, formatMoney } from "@/lib/hourlyRates";

export default function HourlyCalculator({ defaultRate = 20 }: { defaultRate?: number }) {
  const [rate, setRate] = useState(String(defaultRate));
  const [hours, setHours] = useState("40");

  const r = parseFloat(rate) || 0;
  const h = parseFloat(hours) || 40;
  const e = r > 0 ? calcEarnings(r, h) : null;

  const rows = e
    ? [
        { label: "Hourly", value: e.hourly, note: "" },
        { label: "Daily", value: e.daily, note: "8 hrs" },
        { label: "Weekly", value: e.weekly, note: `${h} hrs` },
        { label: "Bi-Weekly", value: e.biweekly, note: "every 2 weeks" },
        { label: "Semi-Monthly", value: e.semimonthly, note: "twice/month" },
        { label: "Monthly", value: e.monthly, note: "" },
        { label: "Annual", value: e.annual, note: "52 weeks", highlight: true },
      ]
    : [];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Calculate Your Salary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Hourly Rate ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                placeholder="20"
                min="1"
                step="0.25"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">
              Hours Per Week
            </label>
            <select
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 bg-white"
            >
              {[20, 25, 30, 35, 40].map((h) => (
                <option key={h} value={h}>{h} hours/week {h === 40 ? "(full-time)" : "(part-time)"}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {e && (
        <>
          {/* Hero result */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white text-center mb-6">
            <p className="text-blue-200 text-sm mb-1">{formatMoney(r)}/hr × {h} hrs/week =</p>
            <p className="text-5xl font-bold mb-1">{formatMoney(e.annual)}</p>
            <p className="text-blue-200">per year</p>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {rows.map((row, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center px-6 py-3.5 ${row.highlight ? "bg-blue-50" : ""}`}
                >
                  <div>
                    <span className={`font-medium ${row.highlight ? "text-blue-800" : "text-gray-700"}`}>
                      {row.label}
                    </span>
                    {row.note && <span className="text-gray-400 text-xs ml-2">{row.note}</span>}
                  </div>
                  <span className={`font-bold ${row.highlight ? "text-blue-700 text-xl" : "text-gray-800"}`}>
                    {formatMoney(row.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
