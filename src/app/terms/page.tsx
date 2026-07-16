import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use · Sunaray Gaon",
  description:
    "Terms of use for the Sunaray Gaon / Lamahatta OS website — acceptable use, accounts, content, and liability.",
};

const updated = "16 July 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Legal</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">Terms of Use</h1>
        <p className="mt-2 text-sm text-stone-500">Last updated: {updated}</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-stone-700">
          <section className="rounded-2xl border border-stone-200 bg-white p-4">
            <p>
              By using this website you agree to these Terms and our{" "}
              <Link href="/privacy" className="font-semibold text-amber-900 underline">
                Privacy Policy
              </Link>
              . If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">1. What this platform is</h2>
            <p className="mt-3">
              Sunaray Gaon / Lamahatta OS is a community information and operating platform for a village in
              Lamahatta, Darjeeling. It includes public storytelling, a civic data scorecard, optional member
              accounts, service/partner enquiries, and governance transparency tools (including RTI process
              tracking). It is <strong>not</strong> a government website and is not an official portal of the Gram
              Panchayat, Block, or State unless explicitly stated.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">2. Accounts</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Provide accurate information when registering.</li>
              <li>Keep your password confidential; you are responsible for activity under your account.</li>
              <li>Household linking and admin roles are controlled by village administrators.</li>
              <li>We may suspend accounts that abuse the service or break these Terms.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">3. Acceptable use</h2>
            <p className="mt-3">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Post unlawful, harassing, defamatory, or hateful content</li>
              <li>Upload malware or attempt to break security or access others’ data</li>
              <li>Scrape the site aggressively or overload infrastructure</li>
              <li>Impersonate others or misrepresent affiliation with government offices</li>
              <li>Use the platform to dox private individuals or publish minors’ personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">4. Civic data and RTI content</h2>
            <p className="mt-3">
              Aggregate rates and government-delivery scorecards are published in good faith from village surveys and
              public records processes. Figures may be updated as better data arrives. RTI trackers describe{" "}
              <em>process status</em>; they are not legal conclusions that any office has committed an offence.
              Government scheme enrollment rates are not invented when unknown.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">5. User content</h2>
            <p className="mt-3">
              If you submit posts or form messages, you grant the platform a non-exclusive licence to host and display
              that content for operating the service. You remain responsible for what you submit. We may remove content
              that appears unlawful or harmful.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">6. Services and enquiries</h2>
            <p className="mt-3">
              Descriptions of village services, prices, or opportunities are informational and may change. Submitting
              an enquiry does not create a binding contract until separately confirmed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">7. Intellectual property</h2>
            <p className="mt-3">
              Site design, branding, and original text/photos belong to the platform operators or their licensors
              unless otherwise noted. You may share public pages with attribution for non-commercial community use;
              do not repackage the whole site as your product without permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">8. Disclaimers</h2>
            <p className="mt-3">
              The service is provided “as is”. We do not warrant uninterrupted availability or error-free content.
              Government data, third-party portals, and survey figures may lag or contain errors. Nothing on this site
              is professional legal, medical, or financial advice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">9. Limitation of liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, operators are not liable for indirect or consequential losses
              arising from use of the site. Where liability cannot be excluded, it is limited to the greater of (a)
              fees you paid us for the specific service in the prior three months, or (b) INR 1,000.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">10. Governing law</h2>
            <p className="mt-3">
              These Terms are governed by the laws of India. Courts at Darjeeling / competent courts in West Bengal
              shall have subject-matter jurisdiction, without prejudice to mandatory consumer protections where they
              apply.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">11. Changes</h2>
            <p className="mt-3">
              We may update these Terms. The “Last updated” date will change. Continued use after changes constitutes
              acceptance of the updated Terms for future use.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">12. Contact</h2>
            <p className="mt-3">
              Use the enquiry forms on the site (
              <Link href="/services" className="font-semibold text-amber-900 underline">
                Services
              </Link>
              ,{" "}
              <Link href="/partners" className="font-semibold text-amber-900 underline">
                Partners
              </Link>
              ) for legal or policy questions.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
