import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SalaryTool.org",
  description: "Privacy Policy for SalaryTool.org — how we collect, use, and protect your information.",
  alternates: { canonical: "https://salarytool.org/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-8">Last updated: April 20, 2026</p>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 prose prose-gray max-w-none">

          <h2>1. Overview</h2>
          <p>
            SalaryTool.org (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website located at{" "}
            <strong>salarytool.org</strong>. This Privacy Policy explains how we collect, use, and
            protect information when you use our free salary and paycheck calculator tools.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            <strong>Information you enter:</strong> Our calculators run entirely in your browser.
            Salary figures, tax inputs, and other data you enter are <strong>never sent to our
            servers</strong> and are not stored or collected by us.
          </p>
          <p>
            <strong>Automatically collected data:</strong> Like most websites, we collect standard
            usage data including IP addresses, browser type, pages visited, and time spent on pages.
            This is collected via third-party analytics and advertising services.
          </p>

          <h2>3. Google AdSense &amp; Cookies</h2>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements. Google AdSense uses
            cookies to serve ads based on your prior visits to this or other websites. You can opt
            out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google&apos;s Ads Settings
            </a>.
          </p>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on prior visits.
            Google&apos;s use of advertising cookies enables it and its partners to serve ads based
            on your visit to our site and/or other sites on the Internet.
          </p>

          <h2>4. Affiliate Links</h2>
          <p>
            Some links on SalaryTool.org are affiliate links. If you click an affiliate link and
            make a purchase, we may receive a commission at no extra cost to you. We only link to
            products and services we believe are relevant to our users.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>We may use the following third-party services:</p>
          <ul>
            <li><strong>Google AdSense</strong> — advertising (google.com/adsense)</li>
            <li><strong>Google Analytics</strong> — usage analytics (analytics.google.com)</li>
            <li><strong>Impact.com</strong> — affiliate tracking</li>
          </ul>
          <p>
            Each of these services has their own privacy policies governing the use of your data.
          </p>

          <h2>6. Children&apos;s Privacy</h2>
          <p>
            SalaryTool.org is not directed at children under 13. We do not knowingly collect
            personal information from children under 13.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated date. Continued use of the site after changes constitutes
            acceptance of the updated policy.
          </p>

          <h2>8. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, you can contact us via the contact
            form on this website.
          </p>
        </div>
      </div>
    </main>
  );
}
