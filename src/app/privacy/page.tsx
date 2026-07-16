import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy · Sunaray Gaon",
  description:
    "How Sunaray Gaon / Lamahatta OS collects, uses, and protects personal data — public scorecards without names, member accounts, and contact forms.",
};

const updated = "16 July 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Legal</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-stone-500">Last updated: {updated}</p>

        <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-stone-700">
          <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-stone-800">
            <p className="font-semibold text-stone-900">Plain summary</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                The public <Link href="/data" className="font-semibold text-amber-900 underline">Data scorecard</Link>{" "}
                shows <strong>rates and government delivery</strong> — not a public list of villagers’ names.
              </li>
              <li>If you create an account or send a form, we store what you submit to run the village platform.</li>
              <li>You can ask to access, correct, or delete account data using the contact path below.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">1. Who we are</h2>
            <p className="mt-3">
              This website (“<strong>Sunaray Gaon</strong>”, “Lamahatta OS”, “the platform”) is operated for the
              community of Sunaray / Seemana Gaon, Lamahatta, Darjeeling district, West Bengal, India, and related
              Samaj / village operating purposes. For privacy requests, use the contact options on{" "}
              <Link href="/partners" className="font-semibold text-amber-900 underline">
                Partners
              </Link>{" "}
              / service enquiry forms, or the email channel used for official village correspondence by the platform
              operator.
            </p>
            <p className="mt-2 text-stone-500">
              This notice is written for transparency and good practice under Indian data-protection expectations
              (including the spirit of the Digital Personal Data Protection Act, 2023). It is not a substitute for
              formal legal advice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">2. What data we process</h2>
            <h3 className="mt-4 font-semibold text-stone-900">2.1 Public, non-identifying content</h3>
            <p className="mt-2">
              Aggregate statistics (for example household counts, literacy rates, occupation groups, age bands),
              official Local Government Directory codes (e.g. Gram Panchayat LGD code), public governance scorecards,
              and RTI <em>metadata</em> (subject, office, dates, question titles, status). These are intended not to
              identify a specific private individual on the public page.
            </p>
            <h3 className="mt-4 font-semibold text-stone-900">2.2 Account data (if you register)</h3>
            <p className="mt-2">
              Name, phone number and/or email, password (stored by our auth provider as secure credentials, not as
              plain text readable by staff), role (villager/admin), preferred language, and optional link to a
              household record after admin verification.
            </p>
            <h3 className="mt-4 font-semibold text-stone-900">2.3 Household registry (members / admin)</h3>
            <p className="mt-2">
              After login, authorised users may see household directory fields managed by the Samaj (for example head
              of household, occupation, family size, skills, notes). This is{" "}
              <strong>not</strong> published on the public Data scorecard. Access is restricted by authentication and
              role-based rules.
            </p>
            <h3 className="mt-4 font-semibold text-stone-900">2.4 Forms and enquiries</h3>
            <p className="mt-2">
              Service requests, partner enquiries, and similar forms may collect name, organisation, phone, email, and
              message content so we can respond.
            </p>
            <h3 className="mt-4 font-semibold text-stone-900">2.5 Community posts (Hub)</h3>
            <p className="mt-2">
              If you post in the community hub, the content you submit (and your account identity as shown) may be
              visible to other logged-in users according to product settings.
            </p>
            <h3 className="mt-4 font-semibold text-stone-900">2.6 Technical data</h3>
            <p className="mt-2">
              Standard server and security logs (IP address, browser type, timestamps), session cookies required to keep
              you signed in, and hosting telemetry from our infrastructure providers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">3. Why we use data</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Operate a village information and opportunity platform</li>
              <li>Authenticate members and administer household records</li>
              <li>Respond to service, partner, and support requests</li>
              <li>Publish aggregate civic metrics and government-delivery scorecards</li>
              <li>Track public RTI process metadata (not unredacted third-party personal files by default)</li>
              <li>Secure the service and prevent abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">4. Legal bases (plain language)</h2>
            <p className="mt-3">
              We process personal data because you ask us to (account, forms), because it is needed to run the service
              you use, for legitimate community-administration interests balanced against your rights, and where
              required by law. Where consent is the right basis, you may withdraw it for future processing by
              contacting us, subject to legal retention needs.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">5. Children and household survey data</h2>
            <p className="mt-3">
              Community surveys may include age bands that cover minors. On the public website we only show{" "}
              <strong>aggregated</strong> age and education statistics. We do not intentionally publish minors’ names
              on public pages. Guardians who believe a child’s personal data appears publicly should contact us for
              urgent removal.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">6. Sharing</h2>
            <p className="mt-3">We do not sell personal data. We share data only with:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Infrastructure processors</strong> that host the app and database (for example Vercel for the
                website; Supabase for authentication and data) under their terms and security controls
              </li>
              <li>
                <strong>Village administrators</strong> who need enquiry or household data to respond or govern the
                registry
              </li>
              <li>
                <strong>Authorities</strong> when required by applicable law
              </li>
            </ul>
            <p className="mt-2">
              Servers may be located outside India depending on provider configuration. By using the service you
              understand that processing may involve cross-border transfers subject to provider safeguards.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">7. Retention</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Account data: while the account is active, then deleted or anonymised within a reasonable period after deletion request</li>
              <li>Enquiry forms: as long as needed to respond and keep minimal operational records</li>
              <li>Security logs: short rolling windows unless investigating abuse</li>
              <li>Public aggregates and governance records: kept as part of the living village record</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">8. Security</h2>
            <p className="mt-3">
              We use industry-standard hosting, encrypted transport (HTTPS), authentication sessions, and database
              access controls (including role-based rules where configured). No method of transmission or storage is
              perfectly secure. Phone-based signup may not use OTP verification; choose a strong unique password.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">9. Your rights</h2>
            <p className="mt-3">
              Subject to law, you may request access, correction, or deletion of personal data we hold about you, or
              withdraw consent where processing is consent-based. We may need to verify identity and may retain data
              where law requires. Contact us via the platform enquiry channels. We aim to respond within a reasonable
              time.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">10. Cookies</h2>
            <p className="mt-3">
              Essential cookies keep you signed in and secure the session. We do not currently use third-party
              advertising cookies. If analytics cookies are added later, this policy will be updated.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">11. RTI and governance pages</h2>
            <p className="mt-3">
              Pages that track Right to Information applications publish process metadata for transparency. Full
              application PDFs and government replies are not automatically published; if published later, they should
              be reviewed so third-party personal data is redacted where appropriate.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">12. Changes</h2>
            <p className="mt-3">
              We may update this policy. The “Last updated” date will change. Continued use after updates means you
              accept the revised notice for future processing.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-bold text-stone-900">13. Related</h2>
            <p className="mt-3">
              <Link href="/terms" className="font-semibold text-amber-900 underline">
                Terms of Use
              </Link>
              {" · "}
              <Link href="/data" className="font-semibold text-amber-900 underline">
                Public Data scorecard
              </Link>
              {" · "}
              <Link href="/rti" className="font-semibold text-amber-900 underline">
                RTI tracker
              </Link>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
