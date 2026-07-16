import type { Metadata } from "next";
import Link from "next/link";
import { Clock, FileText, MapPin, Shield } from "lucide-react";
import filings from "@/data/rti-filings.json";
import lgd from "@/data/lgd-identity.json";

export const metadata: Metadata = {
  title: "RTI Tracker · Sunaray Gaon",
  description:
    "Public process tracker for Right to Information applications about Lamahatta Gram Panchayat — status and question titles only, no private annexes.",
};

function addDays(iso: string, days: number) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RtiTrackerPage() {
  const list = filings.filings;
  const gp = lgd.hierarchy.gram_panchayat;

  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
          Governance · sunlight
        </p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">RTI tracker</h1>
        <p className="mt-3 max-w-2xl text-stone-600">
          Public clock for Right to Information filings that ask the state to publish works, water,
          and assets. We show <strong>process metadata</strong> only — not full personal PDFs.
          Short link: <span className="font-mono text-amber-900">/rti</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/data" className="font-semibold text-amber-900 underline">
            ← Village scorecard
          </Link>
          <Link href="/privacy" className="text-stone-600 underline">
            Privacy
          </Link>
        </div>

        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 text-sm text-stone-600 shadow-sm">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p>
              Official identity: {lgd.hierarchy.state.name} · {lgd.hierarchy.district.name} ·{" "}
              {lgd.hierarchy.block.name} · GP <strong>{gp.name}</strong> (LGD{" "}
              <strong>{gp.code}</strong>)
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-8">
          {list.map((f) => {
            const due =
              f.receipt_status === "received" && f.filed_on
                ? addDays(f.filed_on, f.due_days)
                : null;
            const drafted = new Date(f.filed_on + "T12:00:00");

            return (
              <article
                key={f.id}
                className="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    {f.status}
                  </span>
                  <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                    {f.act}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-stone-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    <Shield className="h-3 w-3" />
                    Meta only
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-2xl font-bold text-stone-900">{f.title}</h2>
                <p className="mt-2 text-sm text-stone-600">{f.public_summary}</p>

                <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-xl bg-stone-50 p-3">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      To
                    </dt>
                    <dd className="mt-1 text-stone-800">{f.to_office}</dd>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-3">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Copy
                    </dt>
                    <dd className="mt-1 text-stone-800">{f.copy_to}</dd>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-3">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Application date
                    </dt>
                    <dd className="mt-1 font-medium text-stone-900">{formatDate(drafted)}</dd>
                  </div>
                  <div className="rounded-xl bg-stone-50 p-3">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Statutory due
                    </dt>
                    <dd className="mt-1 flex items-center gap-1.5 font-medium text-stone-900">
                      <Clock className="h-4 w-4 text-amber-600" />
                      {due
                        ? formatDate(due)
                        : "Starts when PIO receipt is logged (~30 days)"}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 rounded-xl border border-amber-100 bg-amber-50/80 px-3 py-2 text-xs text-stone-700">
                  {f.receipt_note}
                </p>

                <h3 className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-stone-500">
                  <FileText className="h-4 w-4" />
                  Public question titles ({f.points.length})
                </h3>
                <ol className="mt-3 space-y-2">
                  {f.points.map((p) => {
                    const ans = f.answer_matrix.find((a) => a.n === p.n);
                    return (
                      <li
                        key={p.n}
                        className="flex flex-col gap-1 rounded-xl border border-stone-100 bg-stone-50/80 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="text-sm text-stone-800">
                          <span className="font-bold text-amber-800">{p.n}.</span> {p.title}
                        </span>
                        <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          {ans?.state ?? "awaiting"}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                <p className="mt-6 text-xs text-stone-500">{f.privacy.note}</p>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-stone-500">
          Not a government website · RTI is a citizen right · See{" "}
          <Link href="/terms" className="underline">
            Terms
          </Link>
        </p>
      </div>
    </div>
  );
}
