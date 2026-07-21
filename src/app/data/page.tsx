import type { Metadata } from "next";
import { EyeOff, MapPin } from "lucide-react";
import census from "@/data/village-public.json";
import lgd from "@/data/lgd-identity.json";
import { rates } from "@/data/village-civic-brief";
import DataBoard from "./DataBoard";

export const metadata: Metadata = {
  title: "Village Scorecard · Sunaray Gaon",
  description:
    "Simple public scorecard for Sunaray Gaon, Lamahatta — water, roads, charts, citizen rights, RTI. No personal names. Built so colours show the truth.",
};

export default function DataPage() {
  const { meta } = census;
  const h = lgd.hierarchy;

  return (
    <div className="min-h-screen bg-[#f4efe4]">
      <header className="relative overflow-hidden bg-stone-950 pb-14 pt-28 text-stone-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 15% 0%, rgba(212,175,55,0.35), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300">
              Public scorecard · {meta.survey_year} · {meta.ward}
            </p>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-300">
              <EyeOff className="h-3 w-3" />
              No personal names
            </span>
          </div>
          <h1 className="max-w-3xl font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-amber-300">Village data board</span>
            <span className="mt-2 block font-sans text-xl font-light tracking-wide text-stone-300 sm:text-2xl">
              Big buttons · red means problem · no list of people
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg">
            Check water, road, phone, your rights, and panchayat papers.{" "}
            <strong className="text-stone-200">
              {rates.households} homes · {rates.population} people
            </strong>{" "}
            as numbers only. Names stay private. Use the tabs below — start with{" "}
            <strong className="text-amber-200">See village</strong>.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-stone-500">
            <MapPin className="h-4 w-4 text-amber-400" />
            {meta.region}
          </p>
          <p className="mt-4 max-w-2xl font-mono text-[11px] leading-relaxed text-stone-500">
            LGD · {h.state.name} ({h.state.code}) · {h.district.name} ({h.district.code}) ·{" "}
            {h.block.name} ({h.block.code}) · GP {h.gram_panchayat.name}{" "}
            <span className="text-amber-300/90">{h.gram_panchayat.code}</span>
          </p>
        </div>
      </header>

      <main className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <DataBoard />
      </main>
    </div>
  );
}
