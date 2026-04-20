// Common hourly rates — each becomes its own rankable page
// targeting "[X] an hour is how much a year" searches

export interface HourlyRate {
  rate: number;       // e.g. 20
  slug: string;       // e.g. "20-an-hour"
  label: string;      // e.g. "$20 an hour"
}

// $10–$50 in $1 increments + $55–$100 in $5 increments
const RATES: number[] = [
  ...Array.from({ length: 41 }, (_, i) => i + 10),   // 10–50
  55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
];

export const HOURLY_RATES: HourlyRate[] = RATES.map((r) => ({
  rate: r,
  slug: `${r}-an-hour`,
  label: `$${r} an hour`,
}));

export const RATE_MAP = Object.fromEntries(HOURLY_RATES.map((r) => [r.slug, r]));

export function calcEarnings(hourlyRate: number, hoursPerWeek = 40, weeksPerYear = 52) {
  const annual = hourlyRate * hoursPerWeek * weeksPerYear;
  return {
    hourly: hourlyRate,
    daily: hourlyRate * 8,
    weekly: hourlyRate * hoursPerWeek,
    biweekly: hourlyRate * hoursPerWeek * 2,
    semimonthly: (hourlyRate * hoursPerWeek * weeksPerYear) / 24,
    monthly: annual / 12,
    annual,
  };
}

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}
