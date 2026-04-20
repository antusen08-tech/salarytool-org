import { StateData, calcBracketTax } from "./stateData";

// 2025 Federal income tax brackets
const FEDERAL_BRACKETS_SINGLE = [
  { min: 0, max: 11925, rate: 0.10 },
  { min: 11925, max: 48475, rate: 0.12 },
  { min: 48475, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250525, rate: 0.32 },
  { min: 250525, max: 626350, rate: 0.35 },
  { min: 626350, max: null, rate: 0.37 },
];

const FEDERAL_BRACKETS_MARRIED = [
  { min: 0, max: 23850, rate: 0.10 },
  { min: 23850, max: 96950, rate: 0.12 },
  { min: 96950, max: 206700, rate: 0.22 },
  { min: 206700, max: 394600, rate: 0.24 },
  { min: 394600, max: 501050, rate: 0.32 },
  { min: 501050, max: 751600, rate: 0.35 },
  { min: 751600, max: null, rate: 0.37 },
];

const FEDERAL_BRACKETS_HOH = [
  { min: 0, max: 17000, rate: 0.10 },
  { min: 17000, max: 64850, rate: 0.12 },
  { min: 64850, max: 103350, rate: 0.22 },
  { min: 103350, max: 197300, rate: 0.24 },
  { min: 197300, max: 250500, rate: 0.32 },
  { min: 250500, max: 626350, rate: 0.35 },
  { min: 626350, max: null, rate: 0.37 },
];

// 2025 standard deductions
const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 15000,
  married: 30000,
  hoh: 22500,
};

// FICA limits 2025
const SS_WAGE_CAP = 176100;
const SS_RATE = 0.062;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_THRESHOLD_MARRIED = 250000;

export type FilingStatus = "single" | "married" | "hoh";
export type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly" | "annually";

export const PAY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annually: 1,
};

export const PAY_FREQUENCY_LABELS: Record<PayFrequency, string> = {
  weekly: "Weekly",
  biweekly: "Bi-Weekly",
  semimonthly: "Semi-Monthly",
  monthly: "Monthly",
  annually: "Annually",
};

export interface CalculatorInput {
  grossAnnual: number;
  filingStatus: FilingStatus;
  payFrequency: PayFrequency;
  state: StateData;
  preTaxDeductions?: number; // annual pre-tax deductions (401k, health insurance, etc.)
}

export interface PaycheckResult {
  // Annual figures
  grossAnnual: number;
  federalTaxAnnual: number;
  stateTaxAnnual: number;
  socialSecurityAnnual: number;
  medicareAnnual: number;
  sdiAnnual: number;
  preTaxDeductionsAnnual: number;
  netAnnual: number;

  // Per-period figures
  grossPerPeriod: number;
  federalTaxPerPeriod: number;
  stateTaxPerPeriod: number;
  socialSecurityPerPeriod: number;
  medicarePerPeriod: number;
  sdiPerPeriod: number;
  preTaxDeductionsPerPeriod: number;
  netPerPeriod: number;

  // Effective rates
  effectiveFederalRate: number;
  effectiveStateRate: number;
  effectiveTotalRate: number;

  payFrequency: PayFrequency;
  periods: number;
}

export function calculatePaycheck(input: CalculatorInput): PaycheckResult {
  const { grossAnnual, filingStatus, payFrequency, state, preTaxDeductions = 0 } = input;
  const periods = PAY_PERIODS[payFrequency];

  // Federal taxable income
  const standardDeduction = STANDARD_DEDUCTIONS[filingStatus];
  const federalTaxableIncome = Math.max(0, grossAnnual - preTaxDeductions - standardDeduction);

  // Federal income tax
  const federalBrackets =
    filingStatus === "married"
      ? FEDERAL_BRACKETS_MARRIED
      : filingStatus === "hoh"
      ? FEDERAL_BRACKETS_HOH
      : FEDERAL_BRACKETS_SINGLE;

  const federalTaxAnnual = calcBracketTax(federalTaxableIncome, federalBrackets);

  // State income tax
  let stateTaxAnnual = 0;
  const stateTaxable = Math.max(0, grossAnnual - preTaxDeductions);

  if (state.incomeTax.type === "flat") {
    stateTaxAnnual = stateTaxable * state.incomeTax.rate;
  } else if (state.incomeTax.type === "graduated") {
    const stateBrackets =
      filingStatus === "married"
        ? state.incomeTax.married
        : state.incomeTax.single;
    stateTaxAnnual = calcBracketTax(stateTaxable, stateBrackets);
  }

  // Social Security
  const ssWages = Math.min(grossAnnual, SS_WAGE_CAP);
  const socialSecurityAnnual = ssWages * SS_RATE;

  // Medicare
  let medicareAnnual = grossAnnual * MEDICARE_RATE;
  const additionalMedicareThreshold =
    filingStatus === "married"
      ? ADDITIONAL_MEDICARE_THRESHOLD_MARRIED
      : ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;
  if (grossAnnual > additionalMedicareThreshold) {
    medicareAnnual += (grossAnnual - additionalMedicareThreshold) * ADDITIONAL_MEDICARE_RATE;
  }

  // State Disability Insurance (SDI)
  let sdiAnnual = 0;
  if (state.sdi) {
    const sdiWages = state.sdiWageCap
      ? Math.min(grossAnnual, state.sdiWageCap)
      : grossAnnual;
    sdiAnnual = sdiWages * state.sdi;
  }

  const preTaxDeductionsAnnual = preTaxDeductions;
  const totalDeductions = federalTaxAnnual + stateTaxAnnual + socialSecurityAnnual + medicareAnnual + sdiAnnual + preTaxDeductionsAnnual;
  const netAnnual = grossAnnual - totalDeductions;

  return {
    grossAnnual,
    federalTaxAnnual,
    stateTaxAnnual,
    socialSecurityAnnual,
    medicareAnnual,
    sdiAnnual,
    preTaxDeductionsAnnual,
    netAnnual,

    grossPerPeriod: grossAnnual / periods,
    federalTaxPerPeriod: federalTaxAnnual / periods,
    stateTaxPerPeriod: stateTaxAnnual / periods,
    socialSecurityPerPeriod: socialSecurityAnnual / periods,
    medicarePerPeriod: medicareAnnual / periods,
    sdiPerPeriod: sdiAnnual / periods,
    preTaxDeductionsPerPeriod: preTaxDeductionsAnnual / periods,
    netPerPeriod: netAnnual / periods,

    effectiveFederalRate: grossAnnual > 0 ? federalTaxAnnual / grossAnnual : 0,
    effectiveStateRate: grossAnnual > 0 ? stateTaxAnnual / grossAnnual : 0,
    effectiveTotalRate: grossAnnual > 0 ? (federalTaxAnnual + stateTaxAnnual + socialSecurityAnnual + medicareAnnual) / grossAnnual : 0,

    payFrequency,
    periods,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercent(rate: number): string {
  return (rate * 100).toFixed(2) + "%";
}
