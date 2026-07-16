"use client";

import { useTransition } from "react";
import { markEnquiryRead } from "./actions";

export default function MarkReadButton({ id }: { id: string }) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(async () => { await markEnquiryRead(id); })}
      className="rounded-full border border-stone-300 bg-stone-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-800 transition hover:bg-stone-100 disabled:opacity-50"
    >
      {pending ? "…" : "Mark read"}
    </button>
  );
}
