"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

type Member = {
  name: string | null;
  age: string | null;
  occupation: string | null;
  literacy: string | null;
};

type Household = {
  house_no: number;
  hh_code: string;
  head_name: string | null;
  member_count: number;
  religion: string | null;
  subcaste: string | null;
  members: Member[];
};

export default function HouseholdDirectory({
  households,
}: {
  households: Household[];
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(households[0]?.hh_code ?? null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return households;
    return households.filter((h) => {
      const blob = [
        h.hh_code,
        h.head_name,
        h.religion,
        h.subcaste,
        ...h.members.flatMap((m) => [m.name, m.occupation, m.literacy, m.age]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(needle);
    });
  }, [households, q]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, occupation, household code…"
          className="w-full rounded-2xl border border-stone-200 bg-white py-3 pl-10 pr-4 text-sm text-stone-900 shadow-sm outline-none ring-amber-300/40 placeholder:text-stone-400 focus:ring-2"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((h) => {
          const isOpen = open === h.hh_code;
          return (
            <div
              key={h.hh_code}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : h.hh_code)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-amber-50/40 sm:px-5"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-700">
                      {h.hh_code}
                    </span>
                    <span className="font-semibold text-stone-900">
                      {h.head_name ?? "—"}
                    </span>
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                      {h.member_count} people
                    </span>
                    {h.religion && (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                        {h.religion}
                      </span>
                    )}
                    {h.subcaste && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        {h.subcaste}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-stone-400 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-stone-100">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead className="bg-stone-50 text-[10px] uppercase tracking-wider text-stone-500">
                        <tr>
                          <th className="px-4 py-2.5 font-bold">Name</th>
                          <th className="px-4 py-2.5 font-bold">Age</th>
                          <th className="px-4 py-2.5 font-bold">Occupation</th>
                          <th className="px-4 py-2.5 font-bold">Literacy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {h.members.map((m, i) => (
                          <tr
                            key={`${h.hh_code}-${i}`}
                            className="border-t border-stone-100 align-top"
                          >
                            <td className="px-4 py-2.5 font-medium text-stone-900">
                              {displayAgeFix(m.name)}
                            </td>
                            <td className="px-4 py-2.5 text-stone-600">
                              {displayAgeFix(m.age)}
                            </td>
                            <td className="px-4 py-2.5 text-stone-700">
                              {m.occupation ?? "—"}
                            </td>
                            <td className="px-4 py-2.5 text-stone-600">
                              {m.literacy ?? "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-10 text-center text-sm text-stone-500">
            No households match “{q}”.
          </p>
        )}
      </div>
    </div>
  );
}

/** Clean survey display values (incl. one corrupted age cell in source sheet). */
function displayAgeFix(value: string | null) {
  if (!value) return "—";
  if (value.includes("2026-") || value.includes("2026/")) return "5–10";
  return value;
}
