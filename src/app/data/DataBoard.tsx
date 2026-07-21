"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleDashed,
  Droplets,
  ExternalLink,
  FileText,
  Gavel,
  HelpCircle,
  Home,
  Lock,
  Phone,
  Route,
  Scale,
  Shield,
  Sun,
  Wrench,
  XCircle,
} from "lucide-react";
import census from "@/data/village-public.json";
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
import {
  auditBoardMeta,
  citizenRights,
  priorityClaims,
  publicSources,
  sourcesById,
  sourcesForIds,
  works,
} from "@/data/metrics-registry";
import { BarChart, DonutChart } from "./DataCharts";

const GOLD = "#D4AF37";

type TabId = "simple" | "charts" | "rights" | "check" | "papers";

const TABS: {
  id: TabId;
  label: string;
  short: string;
  hint: string;
  icon: typeof Home;
}[] = [
  {
    id: "simple",
    label: "See village",
    short: "Home",
    hint: "Big picture — red means problem",
    icon: Home,
  },
  {
    id: "charts",
    label: "Pictures",
    short: "Charts",
    hint: "Numbers as charts — no names",
    icon: BarChart3,
  },
  {
    id: "rights",
    label: "Your rights",
    short: "Rights",
    hint: "What you can ask the panchayat",
    icon: Scale,
  },
  {
    id: "check",
    label: "Check work",
    short: "Work",
    hint: "Water, road, schemes — is it done?",
    icon: Wrench,
  },
  {
    id: "papers",
    label: "Papers / RTI",
    short: "Papers",
    hint: "RTI status · login for full track",
    icon: FileText,
  },
];

function tabFromHash(): TabId {
  if (typeof window === "undefined") return "simple";
  const h = window.location.hash.replace("#", "");
  if (TABS.some((t) => t.id === h)) return h as TabId;
  return "simple";
}

export default function DataBoard() {
  const [tab, setTab] = useState<TabId>("simple");
  const baseId = useId();
  const { meta, occupation_distribution, age_distribution, privacy, demands_of_state } = census;
  const rti0 = rti.filings[0];

  useEffect(() => {
    setTab(tabFromHash());
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function go(id: TabId) {
    setTab(id);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* How to use — plain words for low literacy */}
      <section
        className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 sm:p-5"
        aria-label="How to use this page"
      >
        <p className="text-base font-bold text-stone-900 sm:text-lg">
          How to read this page (simple)
        </p>
        <ul className="mt-3 grid gap-2 text-sm text-stone-800 sm:grid-cols-2 sm:text-base">
          <li className="flex items-start gap-2 rounded-xl bg-white/80 px-3 py-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              !
            </span>
            <span>
              <strong className="text-red-800">Red</strong> = not working / big problem
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl bg-white/80 px-3 py-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-stone-900">
              ~
            </span>
            <span>
              <strong className="text-amber-900">Yellow</strong> = half done / we do not know yet
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl bg-white/80 px-3 py-2">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
              ✓
            </span>
            <span>
              <strong className="text-emerald-800">Green</strong> = working
            </span>
          </li>
          <li className="flex items-start gap-2 rounded-xl bg-white/80 px-3 py-2">
            <EyeShield />
            <span>
              <strong>No names</strong> of people — only village numbers
            </span>
          </li>
        </ul>
        <p className="mt-3 text-sm text-stone-600">
          Tap a big button below. Start with <strong>See village</strong>. Ask a neighbour to read if
          needed — the colours still show the truth.
        </p>
      </section>

      {/* Tab navbar — large touch targets */}
      <nav
        className="sticky top-16 z-30 -mx-1 rounded-2xl border border-stone-300 bg-white/95 p-2 shadow-md backdrop-blur sm:top-20"
        aria-label="Village data sections"
      >
        <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-stone-500">
          Choose a section
        </p>
        <div
          role="tablist"
          aria-label="Data board tabs"
          className="grid grid-cols-5 gap-1.5 sm:gap-2"
        >
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${t.id}`}
                aria-selected={active}
                aria-controls={`${baseId}-panel-${t.id}`}
                onClick={() => go(t.id)}
                className={`flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-center transition sm:min-h-[4.75rem] sm:px-2 ${
                  active
                    ? "bg-stone-950 text-amber-300 shadow-inner"
                    : "bg-stone-50 text-stone-700 hover:bg-amber-50"
                }`}
              >
                <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${active ? "text-amber-300" : "text-amber-700"}`} />
                <span className="text-[10px] font-bold leading-tight sm:text-xs">{t.short}</span>
                <span className="hidden text-[10px] leading-tight opacity-80 sm:block">{t.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 px-2 text-xs text-stone-500" aria-live="polite">
          {TABS.find((t) => t.id === tab)?.hint}
        </p>
      </nav>

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
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-stone-300 bg-stone-50 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-stone-800 transition hover:bg-stone-100"
        >
          <Lock className="h-3.5 w-3.5" />
          Login · private directory
        </Link>
      </section>

      {/* Panels */}
      <div
        role="tabpanel"
        id={`${baseId}-panel-${tab}`}
        aria-labelledby={`${baseId}-tab-${tab}`}
        className="space-y-8 pb-24 sm:pb-8"
      >
        {tab === "simple" && (
          <SimpleTab
            onOpenRights={() => go("rights")}
            onOpenPapers={() => go("papers")}
            onOpenCheck={() => go("check")}
            onOpenCharts={() => go("charts")}
          />
        )}
        {tab === "charts" && (
          <ChartsTab
            occupation={occupation_distribution}
            age={age_distribution}
            religion={census.kpis.religion}
            subcaste={census.kpis.subcaste}
          />
        )}
        {tab === "rights" && <RightsTab />}
        {tab === "check" && (
          <CheckTab demands={demands_of_state} onOpenPapers={() => go("papers")} />
        )}
        {tab === "papers" && <PapersTab rti0={rti0} surveyYear={meta.survey_year} />}
      </div>

      <p className="text-center text-xs text-stone-500">
        Sunaray Gaon · Lamahatta GP {auditBoardMeta.lgd} · Survey {meta.survey_year} · Audit{" "}
        {auditBoardMeta.asOf} · No person names · Citizen RTI rights included
      </p>
    </div>
  );
}

function EyeShield() {
  return (
    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-800 text-white">
      <Shield className="h-3.5 w-3.5" />
    </span>
  );
}

/* ───────── SIMPLE (default — illiterate-friendly) ───────── */

function SimpleTab({
  onOpenRights,
  onOpenPapers,
  onOpenCheck,
  onOpenCharts,
}: {
  onOpenRights: () => void;
  onOpenPapers: () => void;
  onOpenCheck: () => void;
  onOpenCharts: () => void;
}) {
  const bigCards = [
    {
      title: "Water at home",
      plain: "Tap water that works",
      value: `${rates.functionalTapRate}%`,
      detail: `${rates.functionalTaps} of ${rates.households} homes have a working tap`,
      tone: "bad" as const,
      icon: Droplets,
      onMore: onOpenCheck,
    },
    {
      title: "Phone / internet",
      plain: "Can you use the phone?",
      value: "Bad",
      detail: "Signal is weak. Hard for bank OTP and remittance.",
      tone: "bad" as const,
      icon: Phone,
      onMore: onOpenCheck,
    },
    {
      title: "Road",
      plain: "Can you walk / drive in?",
      value: "Not done",
      detail: "About 1 mile of bad road still blocks easy access.",
      tone: "bad" as const,
      icon: Route,
      onMore: onOpenCheck,
    },
    {
      title: "Solar / lights",
      plain: "Public solar assets",
      value: "?",
      detail: "Not counted yet. Unknown is not “OK”.",
      tone: "warn" as const,
      icon: Sun,
      onMore: onOpenCheck,
    },
  ];

  return (
    <div className="space-y-8">
      <SectionHead
        eyebrow="Big picture"
        title="Is the village getting what it needs?"
        sub="Four large cards. Red = problem. Tap a card for more detail."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {bigCards.map((c) => {
          const Icon = c.icon;
          const ring =
            c.tone === "bad"
              ? "border-red-400 bg-red-50"
              : c.tone === "warn"
                ? "border-amber-400 bg-amber-50"
                : "border-emerald-400 bg-emerald-50";
          const valueColor =
            c.tone === "bad"
              ? "text-red-700"
              : c.tone === "warn"
                ? "text-amber-900"
                : "text-emerald-800";
          return (
            <button
              key={c.title}
              type="button"
              onClick={c.onMore}
              className={`rounded-[1.5rem] border-2 p-5 text-left shadow-sm transition hover:shadow-md sm:p-6 ${ring}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Icon className={`h-8 w-8 ${valueColor}`} />
                  </span>
                  <div>
                    <p className="text-lg font-bold text-stone-900 sm:text-xl">{c.title}</p>
                    <p className="text-sm text-stone-600">{c.plain}</p>
                  </div>
                </div>
                <StatusBlob tone={c.tone} />
              </div>
              <p className={`mt-4 font-serif text-4xl font-light sm:text-5xl ${valueColor}`}>
                {c.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-700 sm:text-base">{c.detail}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-stone-500">
                Tap for full check →
              </p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <QuickJump
          title="Your rights"
          text="You can ask the panchayat for lists and works."
          onClick={onOpenRights}
          icon={Scale}
        />
        <QuickJump
          title="Pictures / charts"
          text="See who works outside, age, literacy."
          onClick={onOpenCharts}
          icon={BarChart3}
        />
        <QuickJump
          title="Papers & login"
          text="RTI status. Login to open full tracker."
          onClick={onOpenPapers}
          icon={FileText}
        />
      </div>

      <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Village size (no names)
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <RateTile label="Homes" value={String(rates.households)} hint="households" />
          <RateTile label="People" value={String(rates.population)} hint="counted" />
          <RateTile
            label="Work outside"
            value={`${rates.outStationShareOfPeople}%`}
            hint={`${rates.outStationWorkers} people`}
            danger
          />
          <RateTile
            label="No formal literacy"
            value={`${rates.noLiteracyRate}%`}
            hint={`${rates.noLiteracyCount} people`}
            danger
          />
        </div>
      </div>
    </div>
  );
}

function StatusBlob({ tone }: { tone: "bad" | "warn" | "ok" }) {
  if (tone === "bad")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        <XCircle className="h-3.5 w-3.5" /> Problem
      </span>
    );
  if (tone === "warn")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-900">
        <HelpCircle className="h-3.5 w-3.5" /> Unknown
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
      <CheckCircle2 className="h-3.5 w-3.5" /> OK
    </span>
  );
}

function QuickJump({
  title,
  text,
  onClick,
  icon: Icon,
}: {
  title: string;
  text: string;
  onClick: () => void;
  icon: typeof Home;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 text-left shadow-sm transition hover:border-amber-400 hover:bg-amber-50"
    >
      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
      <span>
        <span className="block font-bold text-stone-900">{title}</span>
        <span className="mt-1 block text-sm text-stone-600">{text}</span>
      </span>
    </button>
  );
}

/* ───────── CHARTS ───────── */

function ChartsTab({
  occupation,
  age,
  religion,
  subcaste,
}: {
  occupation: Record<string, number>;
  age: Record<string, number>;
  religion: Record<string, number>;
  subcaste: Record<string, number>;
}) {
  return (
    <div className="space-y-8">
      <SectionHead
        eyebrow="Pictures of numbers"
        title="Charts — still no names"
        sub="Coloured bars and circles. Ask someone to read the labels if needed."
      />

      <section>
        <SectionHead
          eyebrow="Key rates"
          title="What we can prove"
          sub="Percentages first. No invented salaries."
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card
          title="How people earn / care"
          subtitle="Income structure — not average ₹ income"
        >
          <BarChart data={incomeStructureBars} color={GOLD} />
          <div className="mt-5 grid grid-cols-2 gap-3">
            <RateTile
              label="External wage (non-students)"
              value={`${rates.externalWageDependencyOfNonStudents}%`}
              hint="job outside the hills"
              danger
            />
            <RateTile
              label="Of cash work, outside"
              value={`${rates.remittanceLinkedShareOfMarketLabour}%`}
              hint="remittance-linked"
              danger
            />
            <RateTile
              label="Unpaid care"
              value={`${rates.unpaidCareShareOfNonStudents}%`}
              hint="home / care work"
            />
            <RateTile
              label="Govt / army / teach"
              value={`${rates.formalPublicShareOfPeople}%`}
              hint="formal public jobs"
            />
          </div>
        </Card>
        <Card title="Community (SC context)" subtitle={`${communityEquity.samaj} · no certificates`}>
          <p className="text-sm leading-relaxed text-stone-600">{communityEquity.statement}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <RateTile
              label="Cohort homes"
              value={`${communityEquity.scTargetedCohortShareOfHouseholds}%`}
              hint={`${communityEquity.cohortHouseholds} households`}
            />
            <RateTile
              label="Cohort people"
              value={`${communityEquity.scTargetedCohortShareOfPeople}%`}
              hint={`${communityEquity.cohortPeople} people`}
            />
          </div>
          <p className="mt-4 rounded-xl border border-amber-100 bg-amber-50/80 px-3 py-2 text-xs leading-relaxed text-stone-700">
            {communityEquity.deliveryHonesty}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Literacy" subtitle="Aggregate only">
          <div className="mb-5 grid grid-cols-2 gap-3">
            <RateTile
              label="Some literacy"
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
            About <strong>{rates.adultNoLiteracyShareOfNoLiteracy}%</strong> of those without formal
            literacy are age 40+ ({rates.adultNoLiteracy40plus} people). Forms and bank KYC get stuck
            unless the panchayat helps in person.
          </p>
        </Card>
        <Card title="Age structure" subtitle="Share of people by age">
          <BarChart data={age} color={GOLD} />
          <p className="mt-4 text-sm text-stone-600">
            Youth 16–35 is <strong>{rates.youthShare}%</strong>. Care pressure ≈{" "}
            <strong>{rates.carePressureIndex}</strong>.
          </p>
        </Card>
      </div>

      <Card title="Work structure" subtitle="Where people earn or study">
        <DonutChart data={occupation} title="Work distribution" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <RateTile
            label="Outside hills"
            value={`${rates.outStationShareOfPeople}%`}
            hint={`${rates.outStationWorkers} people`}
            danger
          />
          <RateTile
            label="Of ages 16–50 outside"
            value={`${rates.outStationShareOfWorkingAge}%`}
            hint="wage pressure"
          />
          <RateTile
            label="Students & children"
            value={`${rates.studentsShare}%`}
            hint={`${rates.studentsCount} people`}
          />
          <RateTile
            label="Local work / farm"
            value={`${rates.localWorkShare}%`}
            hint={`${rates.localWorkers} people`}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card title="Faith (homes)" subtitle="Counts only">
          <BarChart data={religion} color="#78716c" />
        </Card>
        <Card title="Samaj branch (homes)" subtitle="Counts only">
          <BarChart data={subcaste} color={GOLD} />
        </Card>
      </div>

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
    </div>
  );
}

/* ───────── RIGHTS ───────── */

function RightsTab() {
  return (
    <div className="space-y-8">
      <SectionHead
        eyebrow="Citizen information"
        title={citizenRights.title}
        sub="Simple words: you have a right to know what the panchayat does with works, water, and money."
      />

      <section className="rounded-[1.5rem] border-2 border-amber-300 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-base leading-relaxed text-stone-700 sm:text-lg">{citizenRights.lede}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {citizenRights.pillars.map((p, i) => (
            <div
              key={p.title}
              className="flex gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-900">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-stone-900">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-stone-200 bg-stone-950 p-6 text-stone-100 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
          Ask the panchayat these questions
        </p>
        <p className="mt-2 text-sm text-stone-400">
          You can say them out loud. Someone can write the RTI for you.
        </p>
        <ol className="mt-5 space-y-3">
          {citizenRights.panchayatMustAnswer.map((q, i) => (
            <li
              key={q}
              className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-stone-950">
                {i + 1}
              </span>
              <span className="text-base leading-relaxed text-stone-100 sm:text-lg">{q}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={citizenRights.rtiHref}
            className="inline-flex items-center rounded-full bg-amber-400 px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-300"
          >
            Open RTI tracker
          </Link>
          {sourcesById[citizenRights.sourceId]?.url && (
            <a
              href={sourcesById[citizenRights.sourceId].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-200 transition hover:border-amber-400/50"
            >
              RTI Act website
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-200 transition hover:border-amber-400/50"
          >
            <Lock className="h-3.5 w-3.5" />
            Login for member tools
          </Link>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-stone-300 bg-white p-6 shadow-sm sm:p-9">
        <div className="mb-2 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-amber-600" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
            What is a panchayat for?
          </p>
        </div>
        <h2 className="font-serif text-3xl font-bold text-stone-900">{panchayatExplainer.title}</h2>
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

      <section>
        <SectionHead
          eyebrow="Official websites"
          title="Where the papers live"
          sub={auditBoardMeta.sourcesRule}
        />
        <div className="flex flex-wrap gap-2">
          {publicSources.map((s) => {
            const external = s.url.startsWith("http");
            const className =
              "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-stone-700 shadow-sm transition hover:border-amber-400 hover:bg-amber-50";
            return external ? (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${s.system} · ${s.scope_key}`}
                className={className}
              >
                <span className="font-semibold">{s.name}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 text-stone-400" />
              </a>
            ) : (
              <Link key={s.id} href={s.url} title={s.notes} className={className}>
                <span className="font-semibold">{s.name}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ───────── CHECK WORK ───────── */

function CheckTab({
  demands,
  onOpenPapers,
}: {
  demands: { title: string; why: string }[];
  onOpenPapers: () => void;
}) {
  return (
    <div className="space-y-8">
      <SectionHead
        eyebrow="Check government work"
        title="Water → phone → road → solar → other"
        sub="Red cards = failing. Yellow = unknown. Full tables for those who want detail."
      />

      {/* Card view first — easier than tables */}
      <div className="space-y-3">
        {priorityClaims.map((c) => {
          const tone =
            c.confidence === "unknown"
              ? "warn"
              : c.domain === "water" || c.domain === "connectivity" || c.domain === "roads"
                ? c.value === null ||
                  String(c.value).includes("0") ||
                  String(c.value).includes("not") ||
                  String(c.value).includes("critical") ||
                  String(c.value).includes("incomplete") ||
                  String(c.value).includes("Bad") ||
                  String(c.value).includes("drafted")
                  ? "bad"
                  : "warn"
                : "warn";
          return (
            <article
              key={c.id}
              className={`rounded-2xl border-2 bg-white p-5 shadow-sm sm:p-6 ${
                tone === "bad"
                  ? "border-red-300"
                  : tone === "warn"
                    ? "border-amber-300"
                    : "border-emerald-300"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                    Priority {c.priority} · {c.domain}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-stone-900 sm:text-xl">{c.label}</h3>
                </div>
                <StatusBlob tone={tone === "bad" ? "bad" : "warn"} />
              </div>
              <p className="mt-3 font-mono text-xl font-bold text-amber-900 sm:text-2xl">
                {c.value === null ? "Not known yet" : String(c.value)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-700 sm:text-base">
                <strong>On the ground: </strong>
                {c.ground_reality}
              </p>
              <p className="mt-2 text-sm text-stone-600">
                <strong>Your right: </strong>
                {c.citizen_right}
              </p>
              <p className="mt-2 text-sm text-stone-500">
                <strong>Next: </strong>
                {c.next_step}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <ConfidencePill confidence={c.confidence} />
                {c.rti_points && c.rti_points.length > 0 && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    RTI Q{c.rti_points.join(", Q")}
                  </span>
                )}
                <SourceChips ids={c.source_ids} />
              </div>
            </article>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onOpenPapers}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-stone-300 bg-stone-950 px-5 py-4 text-left text-stone-100 transition hover:border-amber-400"
      >
        <span>
          <span className="block text-sm font-bold text-amber-300">Need the paper trail?</span>
          <span className="mt-1 block text-sm text-stone-400">
            Open Papers / RTI — login for full tracking
          </span>
        </span>
        <FileText className="h-6 w-6 shrink-0 text-amber-300" />
      </button>

      {works.length > 0 && (
        <section>
          <SectionHead
            eyebrow="Works list"
            title="Sanctioned vs ground"
            sub="No villager names. Portal IDs filled when known."
          />
          <div className="space-y-3 sm:hidden">
            {works.map((w) => (
              <article key={w.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                <h3 className="font-bold text-stone-900">{w.name}</h3>
                <p className="mt-1 text-sm text-stone-600">{w.location_note}</p>
                <p className="mt-2 text-sm">
                  Ground:{" "}
                  <strong className="capitalize">{w.status_ground.replaceAll("_", " ")}</strong>
                </p>
                <p className="text-sm text-stone-500">
                  Portal: {w.status_portal.replaceAll("_", " ")} · ID:{" "}
                  {w.work_id_portal ?? w.asset_id_portal ?? "pending"}
                </p>
              </article>
            ))}
          </div>
          <div className="hidden overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm sm:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-stone-100 text-[10px] uppercase tracking-wider text-stone-600">
                  <tr>
                    <th className="px-4 py-3 font-bold">Work / asset</th>
                    <th className="px-4 py-3 font-bold">Portal ID</th>
                    <th className="px-4 py-3 font-bold">Portal</th>
                    <th className="px-4 py-3 font-bold">Ground</th>
                    <th className="px-4 py-3 font-bold">As of</th>
                  </tr>
                </thead>
                <tbody>
                  {works.map((w) => (
                    <tr key={w.id} className="border-t border-stone-100 align-top">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-stone-900">{w.name}</p>
                        <p className="mt-0.5 text-xs text-stone-500">{w.location_note}</p>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        {w.work_id_portal ?? w.asset_id_portal ?? "— pending"}
                      </td>
                      <td className="px-4 py-3 capitalize">
                        {w.status_portal.replaceAll("_", " ")}
                      </td>
                      <td className="px-4 py-3 capitalize font-medium">
                        {w.status_ground.replaceAll("_", " ")}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{w.as_of}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section>
        <SectionHead
          eyebrow="Delivery scorecard"
          title="What the panchayat should deliver"
          sub="Each row: status colour + who must answer + your right."
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
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 sm:text-base">
                    {d.plain}
                  </p>
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
                {d.citizenRight && (
                  <div className="sm:col-span-2">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Citizen right
                    </dt>
                    <dd className="mt-1 text-stone-700">{d.citizenRight}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {d.rtiPointIds && d.rtiPointIds.length > 0 && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    RTI Q{d.rtiPointIds.join(", Q")}
                  </span>
                )}
                {d.sourceIds && d.sourceIds.length > 0 && <SourceChips ids={d.sourceIds} />}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Schemes"
          title="What should already reach this ward"
          sub="Unknown = government has not published a list. That is a red flag."
        />
        <div className="space-y-3 lg:hidden">
          {schemes.map((s) => (
            <article key={s.scheme} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <SchemeStatus status={s.villageStatus} />
                <h3 className="font-bold text-stone-900">{s.scheme}</h3>
              </div>
              <p className="mt-1 text-sm text-stone-500">{s.plain}</p>
              <p className="mt-2 text-sm font-medium text-stone-800">{s.rateOrSignal}</p>
              <p className="mt-1 text-sm text-stone-600">{s.analystNote}</p>
            </article>
          ))}
        </div>
        <div className="hidden overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-stone-100 text-[10px] uppercase tracking-wider text-stone-600">
                <tr>
                  <th className="px-4 py-3 font-bold">Scheme</th>
                  <th className="px-4 py-3 font-bold">Who</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                  <th className="px-4 py-3 font-bold">Rate</th>
                  <th className="px-4 py-3 font-bold">Why</th>
                  <th className="px-4 py-3 font-bold">Sources</th>
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
                    <td className="px-4 py-3 font-medium">{s.rateOrSignal}</td>
                    <td className="px-4 py-3 text-stone-600">{s.analystNote}</td>
                    <td className="px-4 py-3">
                      {s.sourceIds && s.sourceIds.length > 0 && <SourceChips ids={s.sourceIds} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <SectionHead
          eyebrow="Government must publish"
          title="Sunlight demands"
          sub="These papers — not gossip about families."
        />
        <div className="grid gap-3 sm:grid-cols-2">
          {demands.map((d, i) => (
            <article
              key={d.title}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-900">
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
          Until official lists are public, every “unknown” is a red flag — not a pass.
        </p>
      </section>
    </div>
  );
}

/* ───────── PAPERS / RTI + LOGIN ───────── */

function PapersTab({
  rti0,
  surveyYear,
}: {
  rti0:
    | {
        title: string;
        status: string;
        public_summary: string;
        filed_on: string;
        lgd_gp_code: string;
        receipt_status: string;
        points: { n: number; title: string }[];
      }
    | undefined;
  surveyYear: number;
}) {
  return (
    <div className="space-y-8">
      <SectionHead
        eyebrow="Papers & RTI"
        title="Track the questions — full detail after login"
        sub="Public: status and question titles. Private tools: member login. No person names on this page."
      />

      {/* Login gate callout */}
      <section className="rounded-[1.5rem] border-2 border-amber-400 bg-gradient-to-br from-stone-950 to-stone-900 p-6 text-stone-100 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-stone-950">
            <Lock className="h-8 w-8" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-2xl font-bold text-amber-300 sm:text-3xl">
              Login to follow RTI tracking
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Anyone can read the public summary below.{" "}
              <strong className="text-white">Members and admins</strong> login to manage household
              records, see private directory tools, and work the full RTI path with the Samaj.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/auth"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-300"
              >
                <Lock className="h-4 w-4" />
                Login now
              </Link>
              <Link
                href="/rti"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-100 transition hover:border-amber-400/60"
              >
                Public RTI page
              </Link>
              <Link
                href="/governance/rti"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-wider text-stone-100 transition hover:border-amber-400/60"
              >
                Full governance path
              </Link>
            </div>
          </div>
        </div>
      </section>

      {rti0 && (
        <section className="rounded-[1.5rem] border border-stone-300 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <FileText className="h-5 w-5 text-amber-600" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
              Public RTI summary
            </p>
            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-700">
              {rti0.status}
            </span>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
              receipt: {rti0.receipt_status}
            </span>
          </div>
          <h2 className="mt-3 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
            {rti0.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            {rti0.public_summary}
          </p>
          <p className="mt-3 text-xs text-stone-500">
            Application date {rti0.filed_on} · GP LGD {rti0.lgd_gp_code} · Clock starts only when PIO
            receives the paper (not draft alone)
          </p>

          <div className="mt-6">
            <p className="text-sm font-bold text-stone-900">9 questions we asked (titles only)</p>
            <ol className="mt-3 space-y-2">
              {rti0.points.map((p) => (
                <li
                  key={p.n}
                  className="flex gap-3 rounded-xl border border-stone-200 bg-stone-50 px-3 py-3 text-sm text-stone-700"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-amber-300">
                    {p.n}
                  </span>
                  <span className="leading-relaxed">{p.title}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className="rounded-[1.5rem] border border-stone-300 bg-stone-950 p-6 text-stone-100 sm:p-8">
        <h2 className="font-serif text-2xl font-bold text-amber-300">
          People stay private. Delivery stays public.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-400">
          After login, residents manage household records. Everyone else sees taps, roads, scheme
          opacity, and literacy rates — not gossip about families. Survey year {surveyYear}.
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
    </div>
  );
}

/* ───────── shared UI ───────── */

function SourceChips({ ids }: { ids: string[] }) {
  const list = sourcesForIds(ids);
  if (!list.length) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {list.map((s) => {
        const external = s.url.startsWith("http");
        const className =
          "inline-flex items-center gap-0.5 rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-medium text-stone-600 hover:border-amber-400 hover:text-amber-900";
        return external ? (
          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            title={s.scope_key}
            className={className}
          >
            {s.name}
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        ) : (
          <Link key={s.id} href={s.url} title={s.notes} className={className}>
            {s.name}
          </Link>
        );
      })}
    </div>
  );
}

function ConfidencePill({ confidence }: { confidence: string }) {
  const map: Record<string, string> = {
    hard: "bg-emerald-100 text-emerald-800",
    soft: "bg-amber-100 text-amber-900",
    unknown: "bg-stone-200 text-stone-700",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${map[confidence] ?? map.unknown}`}
    >
      {confidence}
    </span>
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
      <p className="mt-1 max-w-2xl text-sm text-stone-600 sm:text-base">{sub}</p>
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
      label: "Problem",
      className: "bg-red-100 text-red-800",
      icon: <XCircle className="h-3.5 w-3.5" />,
    },
    partial: {
      label: "Half done",
      className: "bg-amber-100 text-amber-900",
      icon: <CircleDashed className="h-3.5 w-3.5" />,
    },
    ok: {
      label: "Working",
      className: "bg-emerald-100 text-emerald-800",
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    },
    unknown: {
      label: "Not known",
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
    unknown: { label: "Not known", className: "bg-stone-200 text-stone-700" },
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
