import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — SalaryTool.org",
  description: "Terms of Use for SalaryTool.org. Read our terms before using our free salary and paycheck calculator tools.",
  alternates: { canonical: "https://salarytool.org/terms" },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 20, 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 prose prose-gray max-w-none">

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using SalaryTool.org, you accept and agree to be bound by these
            Terms of Use. If you do not agree to these terms, please do not use this website.
          </p>

          <h2>2. Use of the Site</h2>
          <p>SalaryTool.org provides free salary and paycheck calculator tools for informational
          purposes. You may use this site for personal, non-commercial purposes only. You agree not to:</p>
          <ul>
            <li>Scrape, crawl, or systematically download content from this site</li>
            <li>Use automated tools to access or collect data from the site</li>
            <li>Reproduce or republish our content without written permission</li>
            <li>Use the site in any way that could damage or impair its functionality</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on SalaryTool.org — including text, design, code, and data compilations —
            is the property of SalaryTool.org and is protected by copyright law. Tax rate data is
            sourced from public government records and compiled by us.
          </p>

          <h2>4. Disclaimer of Warranties</h2>
          <p>
            SalaryTool.org is provided &quot;as is&quot; without any warranties, express or implied.
            We do not warrant that the site will be error-free, uninterrupted, or that results
            obtained will be accurate or reliable. See our full{" "}
            <a href="/disclaimer">Disclaimer</a> for details.
          </p>

          <h2>5. Advertising</h2>
          <p>
            This site displays advertisements served by Google AdSense and may contain affiliate
            links. We are not responsible for the content of third-party advertisements. Clicking
            affiliate links may result in us receiving a commission.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, SalaryTool.org shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of
            this site or reliance on its calculations.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be posted on
            this page with an updated date. Continued use of the site constitutes acceptance
            of the revised terms.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms are governed by applicable law. Any disputes shall be resolved in
            accordance with applicable jurisdiction.
          </p>

        </div>
      </div>
    </main>
  );
}
