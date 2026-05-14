"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, AlertTriangle } from "lucide-react";

type FieldName = "occupation" | "family_size" | "notes" | "skills" | "status";

const FIELD_LABELS: Record<FieldName, string> = {
  occupation: "Occupation",
  family_size: "Family size",
  notes: "Notes",
  skills: "Skills (comma-separated)",
  status: "Status (Local / Migrant / Mixed)",
};

interface Props {
  householdId: string;
  requesterId: string;
  current: Record<FieldName, string>;
}

export default function RequestUpdateForm({ householdId, requesterId, current }: Props) {
  const router = useRouter();
  const [field, setField] = useState<FieldName>("occupation");
  const [newValue, setNewValue] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue.trim()) {
      setMsg({ tone: "err", text: "Enter the new value." });
      return;
    }
    setBusy(true);
    setMsg(null);
    const supabase = createClient();
    const { error } = await supabase.from("household_update_requests").insert({
      household_id: householdId,
      requested_by: requesterId,
      field_name: field,
      old_value: current[field] || null,
      new_value: newValue.trim(),
      reason: reason.trim() || null,
    });
    setBusy(false);
    if (error) {
      setMsg({ tone: "err", text: error.message });
      return;
    }
    setMsg({ tone: "ok", text: "Request submitted. The Samaj Head will review it." });
    setNewValue("");
    setReason("");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-600">
          Which field?
        </label>
        <select
          value={field}
          onChange={(e) => {
            setField(e.target.value as FieldName);
            setNewValue("");
          }}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-stone-900 focus:outline-none"
        >
          {(Object.keys(FIELD_LABELS) as FieldName[]).map((k) => (
            <option key={k} value={k}>
              {FIELD_LABELS[k]}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl bg-stone-100 p-4 text-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">
          Current value
        </p>
        <p className="mt-1 text-stone-800">{current[field] || "—"}</p>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-600">
          New value
        </label>
        {field === "notes" ? (
          <textarea
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-stone-900 focus:outline-none"
          />
        ) : field === "status" ? (
          <select
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-stone-900 focus:outline-none"
          >
            <option value="">Select…</option>
            <option value="Local">Local</option>
            <option value="Migrant">Migrant</option>
            <option value="Mixed">Mixed</option>
          </select>
        ) : (
          <input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            type={field === "family_size" ? "number" : "text"}
            min={field === "family_size" ? 1 : undefined}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-stone-900 focus:outline-none"
          />
        )}
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-600">
          Reason (optional)
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={2}
          placeholder="Why is this change needed?"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 focus:border-stone-900 focus:outline-none"
        />
      </div>

      {msg && (
        <div
          className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${
            msg.tone === "ok"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-700"
          }`}
        >
          {msg.tone === "ok" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
          ) : (
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          )}
          {msg.text}
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
