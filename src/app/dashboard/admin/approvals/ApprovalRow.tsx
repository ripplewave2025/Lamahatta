"use client";

import { useState, useTransition } from "react";
import { Check, X } from "lucide-react";
import { approveRequest, rejectRequest } from "./actions";

interface Props {
  id: string;
  hhCode: string;
  headName: string;
  requesterName: string;
  fieldName: string;
  oldValue: string | null;
  newValue: string;
  reason: string | null;
  createdAt: string;
}

export default function ApprovalRow(props: Props) {
  const [note, setNote] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const run = (kind: "approve" | "reject") => {
    setErr(null);
    startTransition(async () => {
      const res =
        kind === "approve"
          ? await approveRequest(props.id, note || undefined)
          : await rejectRequest(props.id, note || undefined);
      if (!res.ok) setErr(res.message ?? "Failed");
    });
  };

  return (
    <li className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-stone-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
          {props.hhCode}
        </span>
        <span className="text-sm font-semibold text-stone-900">{props.headName}</span>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-700">
          {props.fieldName}
        </span>
        <span className="ml-auto text-xs text-stone-500">
          {new Date(props.createdAt).toLocaleDateString()} · by {props.requesterName}
        </span>
      </div>

      <p className="text-sm text-stone-600">
        <span className="text-stone-400 line-through">{props.oldValue || "—"}</span>
        <span className="mx-2 text-stone-400">→</span>
        <span className="font-semibold text-stone-900">{props.newValue}</span>
      </p>
      {props.reason && (
        <p className="mt-2 text-sm italic text-stone-600">&ldquo;{props.reason}&rdquo;</p>
      )}

      <div className="mt-4 space-y-3">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note to the requester…"
          className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => run("approve")}
            disabled={pending}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:opacity-60"
          >
            <Check className="h-4 w-4" /> Approve
          </button>
          <button
            type="button"
            onClick={() => run("reject")}
            disabled={pending}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            <X className="h-4 w-4" /> Reject
          </button>
        </div>
        {err && <p className="text-sm text-red-600">{err}</p>}
      </div>
    </li>
  );
}
