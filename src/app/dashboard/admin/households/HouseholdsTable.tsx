"use client";

import { useState, useTransition } from "react";
import { Mail, Copy, Check, Phone } from "lucide-react";
import { inviteHouseholdHead, setHeadPhone } from "./actions";

type Row = {
  id: string;
  hh_code: string;
  head_name: string;
  occupation: string | null;
  family_size: number | null;
  status: string | null;
  head_phone: string | null;
  linkedHead?: { full_name: string | null; email: string | null } | null;
};

export default function HouseholdsTable({ rows }: { rows: Row[] }) {
  const [openCode, setOpenCode] = useState<string | null>(null);

  return (
    <ul className="space-y-3">
      {rows.map((r) => (
        <li
          key={r.id}
          className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-stone-900 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
              {r.hh_code}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-stone-900">{r.head_name}</p>
              <p className="text-xs text-stone-600">
                {r.occupation ?? "—"} · {r.family_size ?? "?"} members · {r.status ?? "—"}
              </p>
            </div>
            <PhoneCell hhCode={r.hh_code} initial={r.head_phone} />
            {r.linkedHead ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800">
                Linked · {r.linkedHead.full_name ?? "—"}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setOpenCode(openCode === r.hh_code ? null : r.hh_code)}
                className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-stone-800"
              >
                <Mail className="h-3.5 w-3.5" /> Invite head
              </button>
            )}
          </div>
          {openCode === r.hh_code && (
            <InviteForm hhCode={r.hh_code} defaultName={r.head_name} onClose={() => setOpenCode(null)} />
          )}
        </li>
      ))}
    </ul>
  );
}

function InviteForm({
  hhCode,
  defaultName,
  onClose,
}: {
  hhCode: string;
  defaultName: string;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState(defaultName);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<
    | { kind: "ok"; tempPassword: string; email: string }
    | { kind: "err"; message: string }
    | null
  >(null);
  const [copied, setCopied] = useState(false);

  const submit = () => {
    setResult(null);
    startTransition(async () => {
      const r = await inviteHouseholdHead({ hhCode, email, fullName });
      if (r.ok) setResult({ kind: "ok", tempPassword: r.tempPassword, email });
      else setResult({ kind: "err", message: r.message });
    });
  };

  if (result?.kind === "ok") {
    return (
      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-sm font-semibold text-emerald-900">
          Account created for {hhCode}.
        </p>
        <p className="mt-1 text-xs text-emerald-800">
          Share these credentials with the household head. They should change the password after
          signing in.
        </p>
        <div className="mt-3 space-y-2 text-xs">
          <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
            <span>Email:&nbsp;<strong>{result.email}</strong></span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
            <span>Temp password:&nbsp;<strong className="font-mono">{result.tempPassword}</strong></span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(result.tempPassword);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="inline-flex items-center gap-1 rounded-md bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase text-white"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 text-xs font-semibold uppercase tracking-wider text-emerald-800 underline"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl bg-stone-50 p-4 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-stone-600">
          Full name
        </label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
        />
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-stone-600">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="head@example.com"
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:border-stone-900 focus:outline-none"
        />
      </div>
      {result?.kind === "err" && (
        <p className="text-sm text-red-600 sm:col-span-2">{result.message}</p>
      )}
      <div className="flex gap-2 sm:col-span-2">
        <button
          type="button"
          onClick={submit}
          disabled={pending}
          className="flex-1 rounded-xl bg-stone-900 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-stone-800 disabled:opacity-60"
        >
          {pending ? "Creating…" : "Create account"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function PhoneCell({ hhCode, initial }: { hhCode: string; initial: string | null }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initial ?? "");
  const [saved, setSaved] = useState(initial);
  const [err, setErr] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const save = () => {
    setErr(null);
    startTransition(async () => {
      const res = await setHeadPhone({ hhCode, phone: value });
      if (!res.ok) {
        setErr(res.message);
        return;
      }
      setSaved(value || null);
      setEditing(false);
    });
  };

  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-700 hover:bg-stone-100"
        title="Click to set the head's phone number"
      >
        <Phone className="h-3 w-3" />
        {saved || <span className="text-stone-400">Add phone</span>}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="tel"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        placeholder="+91 98765 43210"
        className="w-44 rounded-lg border border-stone-300 bg-white px-2 py-1 text-xs focus:border-stone-900 focus:outline-none"
      />
      <button
        type="button"
        onClick={save}
        disabled={pending}
        className="rounded-md bg-stone-900 px-2 py-1 text-[10px] font-bold uppercase text-white disabled:opacity-60"
      >
        {pending ? "…" : "Save"}
      </button>
      <button
        type="button"
        onClick={() => {
          setValue(saved ?? "");
          setEditing(false);
          setErr(null);
        }}
        className="rounded-md border border-stone-300 px-2 py-1 text-[10px] font-bold uppercase text-stone-700"
      >
        ✕
      </button>
      {err && <span className="text-[10px] text-red-600">{err}</span>}
    </div>
  );
}
