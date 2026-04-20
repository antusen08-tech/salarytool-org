import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer — SalaryTool.org",
  description: "Disclaimer for SalaryTool.org — our salary and paycheck calculators provide estimates only and are not tax or legal advice.",
  alternates: { canonical: "https://salarytool.org/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 20, 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 prose prose-gray max-w-none">

          <h2>Estimates Only — Not Tax or Legal Advice</h2>
          <p>
            All calculators on SalaryTool.org provide <strong>estimates only</strong>. Results are
            based on generalized 2025 federal and state tax rates and are intended for informational
            and educational purposes only.
          </p>
          <p>
            The information provided by SalaryTool.org does <strong>not</strong> constitute:
          </p>
          <ul>
            <li>Tax advice</li>
            <li>Legal advice</li>
            <li>Financial planning advice</li>
            <li>Accounting services</li>
          </ul>

          <h2>Why Your Actual Paycheck May Differ</h2>
          <p>Your actual take-home pay may differ from our estimates due to:</p>
          <ul>
            <li>Your specific W-4 withholding elections</li>
            <li>Employer-provided benefits (health insurance, retirement plans)</li>
            <li>Local or city income taxes (not included in our calculations)</li>
            <li>Tax credits and deductions specific to your situation</li>
            <li>Supplemental wages (bonuses, overtime) taxed at different rates</li>
            <li>Mid-year tax law changes</li>
          </ul>

          <h2>Consult a Professional</h2>
          <p>
            For accurate paycheck calculations, tax filing, or financial planning, we strongly
            recommend consulting a <strong>licensed tax professional or certified public
            accountant (CPA)</strong> who can account for your full personal and financial situation.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            While we make every effort to keep tax rates and wage data current and accurate,
            SalaryTool.org makes no warranty — express or implied — regarding the accuracy,
            completeness, or timeliness of the information on this site. Tax laws change frequently
            and without notice.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            SalaryTool.org and its operators shall not be liable for any errors, omissions, or
            delays in the information provided, or for any actions taken in reliance on such
            information. Use of this site is at your own risk.
          </p>

          <h2>External Links</h2>
          <p>
            This site contains links to third-party websites (including affiliate links). We are
            not responsible for the content, accuracy, or privacy practices of those sites.
          </p>

        </div>
      </div>
    </main>
  );
}
