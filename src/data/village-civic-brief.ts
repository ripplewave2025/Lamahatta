/**
 * Civic analysis layer for Sunaray Gaon public Data page.
 * Rates are derived from village-census.json (2026 household survey).
 * Panchayat duties + scheme notes combine survey math with ground facts
 * already documented on this site (challenges, dashboard, why page).
 */
import census from "@/data/village-public.json";

const pop = census.kpis.population;
const hh = census.kpis.households;
const illit = census.kpis.illiteracy_marked_no;
const adultIllit40 = census.kpis.adult_illiteracy_40plus;
const outside = census.kpis.out_station_workers;
const students = census.kpis.students_children;
const elderHh = census.kpis.elderly_signal_households;
const taps = census.kpis.functional_taps;
const localWork = census.kpis.local_workers;

function rate(n: number, d: number, digits = 0): number {
  if (!d) return 0;
  const r = (n / d) * 100;
  const f = 10 ** digits;
  return Math.round(r * f) / f;
}

const children = census.age_distribution["Children (0–15)"] ?? 0;
const youth = census.age_distribution["Youth (16–35)"] ?? 0;
const middle = census.age_distribution["Middle age (36–50)"] ?? 0;
const elders = census.age_distribution["Elders (50+)"] ?? 0;
const ageUnknown = census.age_distribution["Age not recorded"] ?? 0;

/** Working-age proxy: 16–50 from survey bands */
const workingAgeBand = youth + middle;
/** Broad dependent pool: children + 50+ (proxy, not official dependency ratio) */
const dependentBand = children + elders;

export const rates = {
  population: pop,
  households: hh,
  avgHouseholdSize: Math.round((pop / hh) * 10) / 10,

  /** Share with Literacy Status = "No" in survey */
  noLiteracyCount: illit,
  noLiteracyRate: rate(illit, pop, 1),
  /** Inverse: anyone not marked "No" (includes school kids & partial schooling notes) */
  someLiteracyRate: rate(pop - illit, pop, 1),
  adultNoLiteracy40plus: adultIllit40,
  adultNoLiteracyShareOfNoLiteracy: rate(adultIllit40, illit, 0),

  outStationWorkers: outside,
  outStationShareOfPeople: rate(outside, pop, 1),
  outStationShareOfWorkingAge: rate(outside, workingAgeBand || 1, 1),

  studentsCount: students,
  studentsShare: rate(students, pop, 1),

  localWorkers: localWork,
  localWorkShare: rate(localWork, pop, 1),

  elderlyHouseholds: elderHh,
  elderlyHouseholdShare: rate(elderHh, hh, 0),

  functionalTaps: taps,
  functionalTapRate: rate(taps, hh, 0),

  childrenShare: rate(children, pop, 1),
  youthShare: rate(youth, pop, 1),
  middleShare: rate(middle, pop, 1),
  eldersShare: rate(elders, pop, 1),
  ageUnknown,
  workingAgeBand,
  dependentBand,
  /** Rough pressure index: dependents / working-age band */
  carePressureIndex: workingAgeBand
    ? Math.round((dependentBand / workingAgeBand) * 100) / 100
    : 0,
};

export type DutyStatus = "failing" | "partial" | "ok" | "unknown";

export type PanchayatDuty = {
  duty: string;
  plain: string;
  status: DutyStatus;
  rateLabel: string;
  evidence: string;
  whoShouldAct: string;
};

/**
 * 11th Schedule / Gram Panchayat style basics, in plain English,
 * scored only where we have village evidence.
 */
export const panchayatDuties: PanchayatDuty[] = [
  {
    duty: "Drinking water",
    plain:
      "Every home should get clean water at the door (Jal Jeevan Mission: Functional Household Tap Connection).",
    status: "failing",
    rateLabel: `${rates.functionalTapRate}% homes with working taps (${taps}/${hh})`,
    evidence:
      "Tank for the ward built ~1 year ago; source still not connected. Zero live FHTCs in survey ground record.",
    whoShouldAct: "Gram Panchayat + PHED / Jal Jeevan implementing agency",
  },
  {
    duty: "Roads & paths",
    plain:
      "Pucca access roads and safe walking paths so children, elders, and goods can move year-round.",
    status: "failing",
    rateLabel: "Main access still incomplete (~1 mile bad road)",
    evidence:
      "Site challenges record: main access road incomplete; multiple village walking paths unsafe. PMGSY-style pucca request is a live Gram Sabha item, not a finished road.",
    whoShouldAct: "Gram Panchayat + PWD / PMGSY rural roads",
  },
  {
    duty: "Livelihoods & MGNREGA work",
    plain:
      "Register job cards, open local public works, pay wages on time so people are not forced to leave only for survival.",
    status: "partial",
    rateLabel: `${rates.outStationShareOfPeople}% of people work outside the hills (${outside}/${pop})`,
    evidence:
      "Survey occupations show heavy out-station work (Bangalore, Sikkim, Bihar, Manipur). Local MGNREGA / public-work status is not yet published household-by-household on this platform.",
    whoShouldAct: "Gram Panchayat (job cards, works) + Block office",
  },
  {
    duty: "Education support",
    plain:
      "Keep children in school and help adults who never got literacy access forms, pensions, and schemes.",
    status: "partial",
    rateLabel: `${rates.studentsShare}% in education · ${rates.noLiteracyRate}% marked no formal literacy`,
    evidence: `${students} students/children; ${illit} people Literacy=No (${adultIllit40} of them age 40+). Schools exist nearby; adult literacy + form help is the gap.`,
    whoShouldAct: "Panchayat + school SMC + ICDS / adult education partners",
  },
  {
    duty: "Elder & social care",
    plain:
      "Know who is old, alone, or bedridden; connect pensions, health, and neighbour support.",
    status: "partial",
    rateLabel: `${rates.elderlyHouseholdShare}% of homes have age 60+ signal (${elderHh}/${hh})`,
    evidence:
      "High out-migration + multi-home elder flags (widow / bedridden / alone). No public rota or pension-delivery dashboard yet.",
    whoShouldAct: "Gram Panchayat + Samaj + health sub-centre",
  },
  {
    duty: "Connectivity (internet / mobile)",
    plain:
      "Stable signal so schemes, banks, school, and remittances work without climbing for bars.",
    status: "failing",
    rateLabel: "Unstable signal (community-reported critical)",
    evidence:
      "Challenges page: internet/mobile marked critical. Why page: no grants yet for cell connectivity.",
    whoShouldAct: "Panchayat (demand) + DoT / tower operators / state digital mission",
  },
  {
    duty: "Public information & Gram Sabha",
    plain:
      "Publish budgets, works, beneficiary lists, and meeting minutes so 22 houses can check the state.",
    status: "failing",
    rateLabel: "No public works / fund board on this OS yet",
    evidence:
      "Village OS plan requires eGramSwaraj-style transparency; current site has census + story, not audited fund releases.",
    whoShouldAct: "Gram Panchayat (mandatory disclosure) + Block",
  },
  {
    duty: "Housing & land records (support role)",
    plain:
      "Help eligible families with PMAY-G, SVAMITVA, and residential proof — not only paper talk.",
    status: "unknown",
    rateLabel: "Enrollment rate not verified in 2026 survey sheet",
    evidence:
      "Person roll has no PMAY / land-title columns. Dashboard flags these schemes as ‘coming soon’ trackers.",
    whoShouldAct: "Panchayat + BDO + revenue line",
  },
];

export type SchemeRow = {
  scheme: string;
  plain: string;
  whoItIsFor: string;
  /** Honest delivery status for THIS village, not national averages */
  villageStatus: "not_reaching" | "partial" | "unknown" | "working";
  rateOrSignal: string;
  analystNote: string;
};

export const schemes: SchemeRow[] = [
  {
    scheme: "Jal Jeevan Mission (FHTC)",
    plain: "Tap water in every rural home.",
    whoItIsFor: "All 22 households",
    villageStatus: "not_reaching",
    rateOrSignal: `0% functional taps (${taps}/${hh})`,
    analystNote:
      "Hard failure with physical proof (tank without source). This is the cleanest KPI a panchayat can be scored on.",
  },
  {
    scheme: "PMGSY / rural roads",
    plain: "All-weather road connectivity for habitations.",
    whoItIsFor: "Whole ward / access corridor",
    villageStatus: "not_reaching",
    rateOrSignal: "~1 mile bad road still defining access",
    analystNote:
      "Road is both economy and health: out-migration already high; bad road raises cost of staying.",
  },
  {
    scheme: "MGNREGA",
    plain: "100 days local wage work for rural adults.",
    whoItIsFor: "Working-age adults who want local wages",
    villageStatus: "unknown",
    rateOrSignal: `${outside} people already earning outside · local works list not public`,
    analystNote:
      "An analyst would demand: job-card coverage %, person-days this FY, wage delay days. Until published, treat local safety-net as opaque.",
  },
  {
    scheme: "PM-KISAN",
    plain: "₹6,000/year income support to eligible farmer families.",
    whoItIsFor: "Farming households with land records in order",
    villageStatus: "unknown",
    rateOrSignal: `${localWork} people in local labour/farming occupations (proxy, not land title count)`,
    analystNote:
      "Survey has occupation, not landholding. Next data step: list farmer HH vs e-KYC / instalment status.",
  },
  {
    scheme: "PMAY-G (rural housing)",
    plain: "Support for pucca house for eligible rural poor.",
    whoItIsFor: "Houses without pucca dwelling / priority SECC lists",
    villageStatus: "unknown",
    rateOrSignal: "Not in 2026 person sheet",
    analystNote:
      "Do not invent a housing rate. Expert move: photograph stock + match AwaasSoft list at Gram Sabha.",
  },
  {
    scheme: "NSAP / old-age & widow pension",
    plain: "Monthly pension for eligible elders and widows.",
    whoItIsFor: `Elders in ~${elderHh} homes with 60+ signal; widows flagged in care list`,
    villageStatus: "partial",
    rateOrSignal: `${rates.elderlyHouseholdShare}% homes touch elder care risk`,
    analystNote:
      "Migration leaves elders behind. Analyst scorecard: % of 60+ with active pension + bank passbook check this quarter.",
  },
  {
    scheme: "ICDS / mid-day meal / school chain",
    plain: "Nutrition and school support for children.",
    whoItIsFor: `${children} children (0–15) in survey bands`,
    villageStatus: "partial",
    rateOrSignal: `${rates.childrenShare}% of population are children · ${students} in education pipeline`,
    analystNote:
      "Child share is material. Failure mode is path safety + attendance on bad-road days, not only classroom supply.",
  },
  {
    scheme: "Digital India / BharatNet / mobile coverage",
    plain: "Usable connectivity for services and remittances.",
    whoItIsFor: "All residents + migrant families sending money home",
    villageStatus: "not_reaching",
    rateOrSignal: "Connectivity listed as critical community challenge",
    analystNote:
      "With 1 in 5 people working outside, dead signal is a tax on remittances, scheme OTPs, and tele-medicine.",
  },
];

export const panchayatExplainer = {
  title: "What a Gram Panchayat is for",
  lede:
    "A Gram Panchayat is the nearest government. In plain words: it is supposed to turn national schemes into water, roads, work, schools support, and public lists you can check — not only meetings and photos.",
  bullets: [
    {
      title: "Basic services",
      text: "Drinking water, sanitation, local paths/roads, streetlights, and common land upkeep.",
    },
    {
      title: "Scheme last-mile",
      text: "Help people get on the correct list (job card, pension, housing, farmer support) and fix errors at the counter.",
    },
    {
      title: "Gram Sabha voice",
      text: "Open meetings where the village prioritises works, sees budgets, and can object when a work is marked complete but is not.",
    },
    {
      title: "Records & proof",
      text: "Keep beneficiary lists, wage sheets, and water-connection status public so 22 houses can audit without a middleman.",
    },
  ],
  bottomLine:
    "If taps are 0%, the road is unfinished, and scheme enrollment is invisible, that is not ‘village culture’ — it is delivery failure at the local state.",
};

export const analystMethod = {
  title: "How to read these numbers",
  points: [
    "Rates beat raw counts. “39 people without literacy” becomes clearer as ~38% of the village.",
    "Separate hard failures (0% taps) from unknown rates (PM-KISAN enrollment not in survey). Unknown is not success.",
    "Migration is a pressure gauge: high outside work + elder homes = care and pension risk.",
    "Panchayat scorecards should use public administrative data next (eGramSwaraj, JJM dashboard, MGNREGA MIS) — this page starts with what the village already measured.",
  ],
};

export const headlineFindings = [
  {
    label: "Water delivery",
    value: `${rates.functionalTapRate}%`,
    detail: `working household taps (${taps} of ${hh})`,
    tone: "bad" as const,
  },
  {
    label: "No formal literacy",
    value: `${rates.noLiteracyRate}%`,
    detail: `${illit} of ${pop} people in survey`,
    tone: "warn" as const,
  },
  {
    label: "Working outside hills",
    value: `${rates.outStationShareOfPeople}%`,
    detail: `${outside} people · ${rates.outStationShareOfWorkingAge}% of ages 16–50`,
    tone: "warn" as const,
  },
  {
    label: "Homes with elders 60+",
    value: `${rates.elderlyHouseholdShare}%`,
    detail: `${elderHh} of ${hh} households`,
    tone: "warn" as const,
  },
  {
    label: "In school / training",
    value: `${rates.studentsShare}%`,
    detail: `${students} of ${pop} people`,
    tone: "ok" as const,
  },
  {
    label: "Avg. household size",
    value: String(rates.avgHouseholdSize),
    detail: `${pop} people ÷ ${hh} homes`,
    tone: "ok" as const,
  },
];
