import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleDashed,
  EyeOff,
  FileText,
  Gavel,
  HelpCircle,
  MapPin,
  Scale,
  Shield,
  XCircle,
} from "lucide-react";
import census from "@/data/village-public.json";
import lgd from "@/data/lgd-identity.json";
import rti from "@/data/rti-filings.json";
import {
  analystMethod,
  communityEquity,
  headlineFindings,
  incomeStructureBars,
  panchayatDuties,
  panchayatExplainer,
  rates,
  schemes,
  type DutyStatus,
} from "@/data/village-civic-brief";
import { BarChart, DonutChart } from "./DataCharts";

export const metadata: Metadata = {
  title: "Village Scorecard · Sunaray Gaon",
  description:
    "Public rates and government delivery scorecard for Sunaray Gaon, Lamahatta — literacy, water, roads, schemes. No personal names.",
};

const GOLD = "#D4AF37";

export default function DataPage() {
  const { meta, occupation_distribution, age_distribution, privacy, demands_of_state } = census;
  const rti0 = rti.filings[0];
  const h = lgd.hierarchy;

  return (
    <div className="min-h-screen bg-[#f4efe4]">
      <header className="relative overflow-hidden bg-stone-950 pb-16 pt-28 text-stone-100">
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
            <span className="text-amber-300">Hold the system to rates</span>
            <span className="mt-2 block font-sans text-xl font-light tracking-wide text-stone-300 sm:text-2xl">
              Delivery, schemes, and gaps — not a list of villagers
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg">
            This page is for pressure on government delivery: water, roads, wages, pensions,
            literacy. It shows{" "}
            <strong className="text-stone-200">
              {rates.households} homes · {rates.population} people
            </strong>{" "}
            as aggregate math. Names stay with the Samaj and logged-in members — not on the public
            internet.
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

      <main className="relative z-10 mx-auto -mt-8 max-w-6xl space-y-12 px-4 pb-20 sm:px-6 lg:px-8">
        {/* Privacy strip */}
        <section className="flex flex-col gap-3 rounded-2xl border border-stone-300 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <p className="text-sm leading-relaxed text-stone-700">
              {privacy.policy}{" "}
              <Link href="/privacy" className="font-semibold text-amber-900 underline">
                Privacy Policy
              </Link>
              {" · "}
              <Link href="/terms" className="font-semibold text-amber-900 underline">
                Terms
              </Link>
            </p>
          </div>
          <Link
            href="/auth"
            className="shrink-0 rounded-full border border-stone-300 bg-stone-50 px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-stone-800 transition hover:bg-stone-100"
          >
            Members · private directory
          </Link>
        </section>

        {/* RTI flight clock */}
        {rti0 && (
          <section className="rounded-[1.5rem] border border-stone-300 bg-stone-950 p-6 text-stone-100 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <FileText className="h-5 w-5 text-amber-400" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                RTI telemetry
              </p>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-300">
                {rti0.status}
              </span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-white sm:text-3xl">
              {rti0.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-stone-400">{rti0.public_summary}</p>
            <p className="mt-3 text-xs text-stone-500">
              Application date {rti0.filed_on} · GP LGD {rti0.lgd_gp_code} · Clock starts on PIO
              receipt (not draft date alone)
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/rti"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-300"
              >
                Open RTI tracker · 9 questions
              </Link>
              <Link
                href="/governance/rti"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-200 transition hover:border-amber-400/50"
              >
                Full path /governance/rti
              </Link>
            </div>
          </section>
        )}

        {/* 1. Headline rates */}
        <section>
          <SectionHead
            eyebrow="01 · Rates that matter"
            title="What we can prove without naming anyone"
            sub="Percentages first — water, literacy, income structure proxies, care pressure. No invented salaries."
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {headlineFindings.map((f) => (
              <div
                key={f.label}
                className={`rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5 border-l-4 ${
                  f.tone === "bad"
                    ? "border-l-red-500"
                    : f.tone === "warn"
                      ? "border-l-amber-400"
                      : "border-l-emerald-500"
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">
                  {f.label}
                </p>
                <p className="mt-1 font-serif text-3xl font-light text-stone-900 sm:text-4xl">
                  {f.value}
                </p>
                <p className="mt-1.5 text-xs text-stone-500 sm:text-sm">{f.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SC community + income structure */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card
            title="Community equity (SC context)"
            subtitle={`${communityEquity.samaj} · cohort rates, not certificate dumps`}
          >
            <p className="text-sm leading-relaxed text-stone-600">
              {communityEquity.statement}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <RateTile
                label="SC-targeted cohort (homes)"
                value={`${communityEquity.scTargetedCohortShareOfHouseholds}%`}
                hint={`${communityEquity.cohortHouseholds} households in survey`}
              />
              <RateTile
                label="SC-targeted cohort (people)"
                value={`${communityEquity.scTargetedCohortShareOfPeople}%`}
                hint={`${communityEquity.cohortPeople} people counted`}
              />
            </div>
            <p className="mt-4 rounded-xl border border-amber-100 bg-amber-50/80 px-3 py-2 text-xs leading-relaxed text-stone-700">
              {communityEquity.deliveryHonesty}
            </p>
            <ul className="mt-3 space-y-1 text-xs text-stone-500">
              {communityEquity.whatAnalystPublishes.map((w) => (
                <li key={w}>· {w}</li>
              ))}
            </ul>
          </Card>
          <Card
            title="Income structure (proxy rates)"
            subtitle="Livelihood composition — not average ₹ income (we refuse to invent it)"
          >
            <BarChart data={incomeStructureBars} color={GOLD} />
            <div className="mt-5 grid grid-cols-2 gap-3">
              <RateTile
                label="External wage dep. (non-students)"
                value={`${rates.externalWageDependencyOfNonStudents}%`}
                hint="share whose job is outside the hills"
                danger
              />
              <RateTile
                label="Of market labour, outside"
                value={`${rates.remittanceLinkedShareOfMarketLabour}%`}
                hint="remittance-linked share of cash work"
                danger
              />
              <RateTile
                label="Unpaid care (non-students)"
                value={`${rates.unpaidCareShareOfNonStudents}%`}
                hint="home/care occupations"
              />
              <RateTile
                label="Formal public jobs (pop.)"
                value={`${rates.formalPublicShareOfPeople}%`}
                hint="govt / army / teaching"
              />
            </div>
          </Card>
        </section>

        {/* Method */}
        <section className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-4 flex items-center gap-2">
            <Scale className="h-5 w-5 text-amber-600" />
            <h2 className="font-serif text-2xl font-bold text-stone-900">{analystMethod.title}</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {analystMethod.points.map((p) => (
              <li
                key={p}
                className="rounded-xl bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-700"
              >
                {p}
              </li>
            ))}
          </ul>
        </section>

        {/* Literacy + age */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card
            title="Literacy rates"
            subtitle="Aggregate only — no names, no household codes"
          >
            <div className="mb-5 grid grid-cols-2 gap-3">
              <RateTile
                label="Not marked “No”"
                value={`${rates.someLiteracyRate}%`}
                hint={`${rates.population - rates.noLiteracyCount} of ${rates.population}`}
              />
              <RateTile
                label="No formal literacy"
                value={`${rates.noLiteracyRate}%`}
                hint={`${rates.noLiteracyCount} people`}
                danger
              />
            </div>
            <p className="text-sm leading-relaxed text-stone-600">
              About{" "}
              <strong className="text-stone-900">
                {rates.adultNoLiteracyShareOfNoLiteracy}%
              </strong>{" "}
              of those without formal literacy are age 40+ ({rates.adultNoLiteracy40plus} people).
              That is where scheme forms and bank KYC get stolen or stuck — unless the panchayat
              helps in person.
            </p>
          </Card>
          <Card title="Age structure" subtitle="Share of population by age band">
            <BarChart data={age_distribution} color={GOLD} />
            <p className="mt-4 text-sm text-stone-600">
              Youth 16–35 is{" "}
              <strong className="text-stone-900">{rates.youthShare}%</strong> of the village.
              Care pressure (children + elders ÷ ages 16–50) ≈{" "}
              <strong className="text-stone-900">{rates.carePressureIndex}</strong>.
            </p>
          </Card>
        </section>

        <section>
          <Card
            title="Work structure"
            subtitle="Where people earn or study — still aggregates only"
          >
            <DonutChart data={occupation_distribution} title="Work distribution" />
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <RateTile
                label="Working outside hills"
                value={`${rates.outStationShareOfPeople}%`}
                hint={`${rates.outStationWorkers} people`}
                danger
              />
              <RateTile
                label="Of ages 16–50 outside"
                value={`${rates.outStationShareOfWorkingAge}%`}
                hint="local wage pressure"
              />
              <RateTile
                label="Students & children"
                value={`${rates.studentsShare}%`}
                hint={`${rates.studentsCount} people`}
              />
              <RateTile
                label="Local work / farming"
                value={`${rates.localWorkShare}%`}
                hint={`${rates.localWorkers} people`}
              />
            </div>
          </Card>
        </section>

        {/* Panchayat */}
        <section className="rounded-[1.75rem] border border-stone-300 bg-white p-6 shadow-sm sm:p-9">
          <div className="mb-2 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-amber-600" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              02 · Local government
            </p>
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900">
            {panchayatExplainer.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-stone-600">
            {panchayatExplainer.lede}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {panchayatExplainer.bullets.map((b) => (
              <div key={b.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <h3 className="font-semibold text-stone-900">{b.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{b.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-stone-800">
            {panchayatExplainer.bottomLine}
          </p>
        </section>

        {/* Scorecard */}
        <section>
          <SectionHead
            eyebrow="03 · Delivery scorecard"
            title="Where basic public goods are failing"
            sub="Status for this ward with evidence. This is anti-corruption material: incomplete works, zero taps, invisible beneficiary lists."
          />
          <div className="space-y-3">
            {panchayatDuties.map((d) => (
              <article
                key={d.duty}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusPill status={d.status} />
                      <h3 className="text-lg font-bold text-stone-900">{d.duty}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600">{d.plain}</p>
                  </div>
                  <p className="shrink-0 rounded-full bg-stone-100 px-3 py-1 text-xs font-bold tabular-nums text-stone-800">
                    {d.rateLabel}
                  </p>
                </div>
                <dl className="mt-4 grid gap-3 border-t border-stone-100 pt-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Evidence
                    </dt>
                    <dd className="mt-1 text-stone-700">{d.evidence}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                      Who must answer
                    </dt>
                    <dd className="mt-1 text-stone-700">{d.whoShouldAct}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* Schemes */}
        <section>
          <SectionHead
            eyebrow="04 · Schemes"
            title="What should already be reaching this ward"
            sub="Hard fail when we have a village rate. “Unknown” when government has not published a list — that opacity is the problem."
          />
          <div className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-stone-100 text-[10px] uppercase tracking-wider text-stone-600">
                  <tr>
                    <th className="px-4 py-3 font-bold">Scheme</th>
                    <th className="px-4 py-3 font-bold">Who it is for here</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Rate / signal</th>
                    <th className="px-4 py-3 font-bold">Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map((s) => (
                    <tr key={s.scheme} className="border-t border-stone-100 align-top">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-stone-900">{s.scheme}</p>
                        <p className="mt-0.5 text-xs text-stone-500">{s.plain}</p>
                      </td>
                      <td className="px-4 py-3 text-stone-700">{s.whoItIsFor}</td>
                      <td className="px-4 py-3">
                        <SchemeStatus status={s.villageStatus} />
                      </td>
                      <td className="px-4 py-3 font-medium tabular-nums text-stone-800">
                        {s.rateOrSignal}
                      </td>
                      <td className="px-4 py-3 text-stone-600">{s.analystNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Demands of state — DOGE style */}
        <section>
          <SectionHead
            eyebrow="05 · What government must publish"
            title="Sunlight demands — end opacity"
            sub="Corruption thrives in missing lists. These are the public documents this ward is owed. No villager names required — only official delivery data."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {demands_of_state.map((d, i) => (
              <article
                key={d.title}
                className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-900">
                    {i + 1}
                  </span>
                  <Gavel className="h-4 w-4 text-stone-400" />
                </div>
                <h3 className="font-semibold text-stone-900">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{d.why}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-stone-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
            Until JJM, MGNREGA MIS, PM-KISAN, and AwaasSoft lists for this GP are public, every
            “unknown” rate is a red flag — not a pass.
          </p>
        </section>

        {/* Aggregate community shape — no names */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card title="Faith (household share)" subtitle="Aggregate counts only">
            <BarChart data={census.kpis.religion} color="#78716c" />
          </Card>
          <Card title="Samaj branch (household share)" subtitle="Aggregate counts only">
            <BarChart data={census.kpis.subcaste} color={GOLD} />
          </Card>
        </section>

        {/* CTA */}
        <section className="rounded-[1.5rem] border border-stone-300 bg-stone-950 p-6 text-stone-100 sm:p-8">
          <h2 className="font-serif text-2xl font-bold text-amber-300">
            People stay private. Delivery stays public.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-400">
            Residents can manage household records after login. Everyone else — officers, media,
            partners — gets the scorecard: taps, roads, scheme opacity, literacy rates. That is how
            you cut the middleman: demand lists, photos, and rates, not gossip about families.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/auth"
              className="rounded-full bg-amber-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-300"
            >
              Member login
            </Link>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 rounded-full border border-stone-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-200 transition hover:border-amber-400/50"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Ground challenges
            </Link>
            <Link
              href="/voices"
              className="rounded-full border border-stone-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-200 transition hover:border-amber-400/50"
            >
              Report an issue
            </Link>
          </div>
        </section>

        <p className="text-center text-xs text-stone-500">
          Sunaray Gaon · Lamahatta · Public rates from {meta.survey_year} survey aggregates ·
          Person-level data not published
        </p>
      </main>
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{eyebrow}</p>
      <h2 className="mt-1 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm text-stone-600">{sub}</p>
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 border-b border-stone-100 pb-4">
        <h3 className="font-serif text-xl text-stone-900 sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-stone-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function RateTile({
  label,
  value,
  hint,
  danger,
}: {
  label: string;
  value: string;
  hint: string;
  danger?: boolean;
}) {
  return (
    <div className={`rounded-xl px-3 py-3 ${danger ? "bg-red-50" : "bg-stone-50"}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">{label}</p>
      <p className={`mt-0.5 font-serif text-2xl ${danger ? "text-red-700" : "text-stone-900"}`}>
        {value}
      </p>
      <p className="text-xs text-stone-500">{hint}</p>
    </div>
  );
}

function StatusPill({ status }: { status: DutyStatus }) {
  const map = {
    failing: {
      label: "Failing",
      className: "bg-red-100 text-red-800",
      icon: <XCircle className="h-3.5 w-3.5" />,
    },
    partial: {
      label: "Partial",
      className: "bg-amber-100 text-amber-900",
      icon: <CircleDashed className="h-3.5 w-3.5" />,
    },
    ok: {
      label: "On track",
      className: "bg-emerald-100 text-emerald-800",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    },
    unknown: {
      label: "Unknown",
      className: "bg-stone-200 text-stone-700",
      icon: <HelpCircle className="h-3.5 w-3.5" />,
    },
  }[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${map.className}`}
    >
      {map.icon}
      {map.label}
    </span>
  );
}

function SchemeStatus({
  status,
}: {
  status: "not_reaching" | "partial" | "unknown" | "working";
}) {
  const map = {
    not_reaching: { label: "Not reaching", className: "bg-red-100 text-red-800" },
    partial: { label: "Partial", className: "bg-amber-100 text-amber-900" },
    unknown: { label: "Unknown rate", className: "bg-stone-200 text-stone-700" },
    working: { label: "Working", className: "bg-emerald-100 text-emerald-800" },
  }[status];
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${map.className}`}
    >
      {map.label}
    </span>
  );
}
