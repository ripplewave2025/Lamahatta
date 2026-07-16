import Link from "next/link";
import { ArrowLeft, Inbox, Mail, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/getProfile";
import MarkReadButton from "./MarkReadButton";

export const dynamic = "force-dynamic";

type Enquiry = {
  id: string;
  phone: string;
  message: string | null;
  type: string;
  status: string;
  created_at: string;
};

export default async function AdminEnquiriesPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_requests")
    .select("id, phone, message, type, status, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  const rows = (data ?? []) as Enquiry[];
  const newCount = rows.filter((r) => r.status === "new").length;

  return (
    <div className="min-h-screen bg-[#f4efe4] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <header className="mb-8 border-b border-stone-300 pb-6">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-stone-700">
            <Inbox className="h-3.5 w-3.5 text-amber-600" />
            Admin · Enquiries
          </div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
            Leads inbox
          </h1>
          <p className="mt-2 text-stone-600">
            Partner, service, and investor form submissions.{" "}
            <strong className="text-stone-900">{newCount}</strong> new of {rows.length} shown.
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            Could not load enquiries. Apply migration{" "}
            <code className="rounded bg-white px-1">0003_app_surfaces.sql</code> in Supabase if
            the table is missing. ({error.message})
          </div>
        )}

        {rows.length === 0 && !error ? (
          <p className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-12 text-center text-sm text-stone-500">
            No enquiries yet. When forms submit successfully, they land here.
          </p>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li
                key={r.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm ${
                  r.status === "new" ? "border-amber-300" : "border-stone-200"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                        {r.type}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          r.status === "new"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-stone-100 text-stone-600"
                        }`}
                      >
                        {r.status}
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(r.created_at).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-900">
                      <Phone className="h-3.5 w-3.5 text-stone-400" />
                      <a href={`tel:${r.phone}`} className="hover:underline">
                        {r.phone}
                      </a>
                    </p>
                  </div>
                  {r.status === "new" && <MarkReadButton id={r.id} />}
                </div>
                {r.message && (
                  <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-stone-50 p-3 font-sans text-sm text-stone-700">
                    {r.message}
                  </pre>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-8 text-center text-xs text-stone-500">
          <Mail className="mr-1 inline h-3 w-3" />
          Data stays admin-only under RLS · see Privacy Policy
        </p>
      </div>
    </div>
  );
}
