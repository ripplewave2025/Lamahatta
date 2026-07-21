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

const occ = census.occupation_distribution as Record<string, number>;
const homeCare = occ["Home & care work"] ?? 0;
const formalPublic = occ["Govt, army & teaching"] ?? 0;
const otherOcc = occ["Other"] ?? 0;
/** People not counted as students/children — economic + care base */
const nonStudentPop = Math.max(1, pop - students);
/** Rough “in labour market” = outside + local + formal + other (excludes unpaid home & students) */
const marketLabour = outside + localWork + formalPublic + otherOcc;

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

  /**
   * Income-structure proxies (no rupee survey yet).
   * Great analyst rule: publish composition rates, not invented salaries.
   */
  homeCareCount: homeCare,
  homeCareShareOfPeople: rate(homeCare, pop, 1),
  homeCareShareOfNonStudents: rate(homeCare, nonStudentPop, 1),
  formalPublicCount: formalPublic,
  formalPublicShareOfPeople: rate(formalPublic, pop, 1),
  formalPublicShareOfMarketLabour: rate(formalPublic, marketLabour || 1, 1),
  marketLabourCount: marketLabour,
  marketLabourShareOfPeople: rate(marketLabour, pop, 1),
  /** Of people in market labour, share earning outside the hills (remittance-linked) */
  remittanceLinkedShareOfMarketLabour: rate(outside, marketLabour || 1, 1),
  /** Of non-students, share whose occupation is outside (proxy dependency on external wages) */
  externalWageDependencyOfNonStudents: rate(outside, nonStudentPop, 1),
  /** Of non-students, share in unpaid home/care (not cash income in survey) */
  unpaidCareShareOfNonStudents: rate(homeCare, nonStudentPop, 1),
  /** Local production / labour share of market labour */
  localShareOfMarketLabour: rate(localWork, marketLabour || 1, 1),
};

/**
 * Community equity frame — operator-stated Bishwakarma Samaj context.
 * Does not claim individual caste certificates are on file in this dataset.
 */
export const communityEquity = {
  samaj: census.meta.samaj,
  categoryLabel: "Scheduled Caste (SC) community context",
  statement:
    "This settlement organises as Bishwakarma Samaj. Operators state the community is Scheduled Caste (SC) for scheme targeting and equity analysis. This page does not publish individual caste certificates.",
  cohortHouseholds: hh,
  cohortPeople: pop,
  /** If community-wide SC context holds, eligible cohort for SC-targeted schemes ≈ whole village */
  scTargetedCohortShareOfHouseholds: 100,
  scTargetedCohortShareOfPeople: 100,
  deliveryHonesty:
    "Eligibility is not delivery. Until GP/Block publish SC scholarship, hostel, skill, and housing beneficiary lists for this GP, enrollment rate = unknown — not 0 and not 100.",
  whatAnalystPublishes: [
    "Cohort size (homes/people under Samaj survey)",
    "Livelihood composition rates (cash vs unpaid vs remittance)",
    "Infrastructure failure rates that hit SC rural pockets hardest (water, road, signal)",
    "Scheme opacity count for SC + universal rural schemes",
  ],
  whatAnalystRefuses: [
    "Invented average household income in ₹ without a wage survey",
    "Claiming every certificate is verified in this dataset",
    "Publishing names next to SC labels",
  ],
};

/** Occupation shares as income-structure stack (population %) */
export const incomeStructureBars: Record<string, number> = {
  "Students & children (not yet earning)": students,
  "Unpaid home & care work": homeCare,
  "Wages outside the hills (remittance-linked)": outside,
  "Local work & farming (local cash/kind)": localWork,
  "Govt / army / teaching (formal public)": formalPublic,
  Other: otherOcc,
};

export type DutyStatus = "failing" | "partial" | "ok" | "unknown";

export type PanchayatDuty = {
  duty: string;
  plain: string;
  status: DutyStatus;
  rateLabel: string;
  evidence: string;
  whoShouldAct: string;
  /** RTI question numbers on rti-lgp-2026-001 that map to this duty */
  rtiPointIds?: number[];
  /** Keys into audit-sources.json */
  sourceIds?: string[];
  /** Citizen right to know (statutory / disclosure) for this duty */
  citizenRight?: string;
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
    rtiPointIds: [6],
    sourceIds: ["survey-2026", "jjm-ejal", "rti-act"],
    citizenRight: "Right to FHTC / drinking-water scheme lists for this habitation.",
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
    rtiPointIds: [1, 2, 9],
    sourceIds: ["pmgsy-omms", "egramswaraj", "rti-act"],
    citizenRight: "Right to ward-wise road works, expenditure, and held-up status.",
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
    rtiPointIds: [1],
    sourceIds: ["nrega-mis", "egramswaraj", "rti-act"],
    citizenRight: "Right to job-card coverage and person-days (no Aadhaar on public board).",
  },
  {
    duty: "Education support",
    plain:
      "Keep children in school and help adults who never got literacy access forms, pensions, and schemes.",
    status: "partial",
    rateLabel: `${rates.studentsShare}% in education · ${rates.noLiteracyRate}% marked no formal literacy`,
    evidence: `${students} students/children; ${illit} people Literacy=No (${adultIllit40} of them age 40+). Schools exist nearby; adult literacy + form help is the gap.`,
    whoShouldAct: "Panchayat + school SMC + ICDS / adult education partners",
    rtiPointIds: [3],
    sourceIds: ["rti-act", "survey-2026"],
    citizenRight: "Right to know education-support and scholarship lists published for this GP.",
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
    rtiPointIds: [1],
    sourceIds: ["rti-act", "survey-2026"],
    citizenRight: "Right to public pension / widow beneficiary lists on the Gram Sabha board.",
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
    rtiPointIds: [],
    sourceIds: ["dot", "bbnl-bharatnet", "pm-wani"],
    citizenRight: "Right to know public connectivity programmes planned for this GP/block.",
  },
  {
    duty: "Public information & Gram Sabha",
    plain:
      "Publish budgets, works, beneficiary lists, and meeting minutes so 22 houses can check the state.",
    status: "failing",
    rateLabel: "No public works / fund board on this OS yet",
    evidence:
      "Village OS plan requires eGramSwaraj-style transparency; current site has census + story, not audited fund releases. Citizens have a statutory right to this information (RTI Act 2005).",
    whoShouldAct: "Gram Panchayat (mandatory disclosure) + Block",
    rtiPointIds: [1, 3, 7, 8, 9],
    sourceIds: ["egramswaraj", "meri-panchayat", "rti-act"],
    citizenRight:
      "Core citizen right: know what the panchayat does — works, minutes, assets, abandoned/held-up items.",
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
    rtiPointIds: [1],
    sourceIds: ["rti-act", "data-gov-in"],
    citizenRight: "Right to PMAY-G / housing beneficiary status lists for this GP.",
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
  rtiPointIds?: number[];
  sourceIds?: string[];
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
    rtiPointIds: [6],
    sourceIds: ["jjm-ejal", "survey-2026", "rti-act"],
  },
  {
    scheme: "PMGSY / rural roads",
    plain: "All-weather road connectivity for habitations.",
    whoItIsFor: "Whole ward / access corridor",
    villageStatus: "not_reaching",
    rateOrSignal: "~1 mile bad road still defining access",
    analystNote:
      "Road is both economy and health: out-migration already high; bad road raises cost of staying.",
    rtiPointIds: [1, 9],
    sourceIds: ["pmgsy-omms", "egramswaraj", "rti-act"],
  },
  {
    scheme: "MGNREGA",
    plain: "100 days local wage work for rural adults.",
    whoItIsFor: "Working-age adults who want local wages",
    villageStatus: "unknown",
    rateOrSignal: `${outside} people already earning outside · local works list not public`,
    analystNote:
      "An analyst would demand: job-card coverage %, person-days this FY, wage delay days. Until published, treat local safety-net as opaque.",
    rtiPointIds: [1],
    sourceIds: ["nrega-mis", "rti-act"],
  },
  {
    scheme: "PM-KISAN",
    plain: "₹6,000/year income support to eligible farmer families.",
    whoItIsFor: "Farming households with land records in order",
    villageStatus: "unknown",
    rateOrSignal: `${localWork} people in local labour/farming occupations (proxy, not land title count)`,
    analystNote:
      "Survey has occupation, not landholding. Next data step: list farmer HH vs e-KYC / instalment status.",
    rtiPointIds: [1],
    sourceIds: ["data-gov-in", "rti-act"],
  },
  {
    scheme: "PMAY-G (rural housing)",
    plain: "Support for pucca house for eligible rural poor.",
    whoItIsFor: "Houses without pucca dwelling / priority SECC lists",
    villageStatus: "unknown",
    rateOrSignal: "Not in 2026 person sheet",
    analystNote:
      "Do not invent a housing rate. Expert move: photograph stock + match AwaasSoft list at Gram Sabha.",
    rtiPointIds: [1],
    sourceIds: ["data-gov-in", "rti-act"],
  },
  {
    scheme: "NSAP / old-age & widow pension",
    plain: "Monthly pension for eligible elders and widows.",
    whoItIsFor: `Elders in ~${elderHh} homes with 60+ signal; widows flagged in care list`,
    villageStatus: "partial",
    rateOrSignal: `${rates.elderlyHouseholdShare}% homes touch elder care risk`,
    analystNote:
      "Migration leaves elders behind. Analyst scorecard: % of 60+ with active pension + bank passbook check this quarter.",
    rtiPointIds: [1],
    sourceIds: ["rti-act", "survey-2026"],
  },
  {
    scheme: "ICDS / mid-day meal / school chain",
    plain: "Nutrition and school support for children.",
    whoItIsFor: `${children} children (0–15) in survey bands`,
    villageStatus: "partial",
    rateOrSignal: `${rates.childrenShare}% of population are children · ${students} in education pipeline`,
    analystNote:
      "Child share is material. Failure mode is path safety + attendance on bad-road days, not only classroom supply.",
    rtiPointIds: [3],
    sourceIds: ["survey-2026", "rti-act"],
  },
  {
    scheme: "Digital India / BharatNet / mobile coverage",
    plain: "Usable connectivity for services and remittances.",
    whoItIsFor: "All residents + migrant families sending money home",
    villageStatus: "not_reaching",
    rateOrSignal: "Connectivity listed as critical community challenge",
    analystNote:
      "With 1 in 5 people working outside, dead signal is a tax on remittances, scheme OTPs, and tele-medicine.",
    rtiPointIds: [],
    sourceIds: ["bbnl-bharatnet", "dot", "pm-wani"],
  },
  {
    scheme: "SC scholarships / hostels / skill (post-matric & state)",
    plain: "Education and skill support targeted to Scheduled Caste students.",
    whoItIsFor: `Community cohort ~${pop} people / ${hh} homes (Samaj SC context)`,
    villageStatus: "unknown",
    rateOrSignal: "Enrollment % not in 2026 occupation sheet",
    analystNote:
      "Analyst move: publish how many students in the pipeline vs how many on scholarship lists — not slogans. Demand Block education cell list for this GP.",
    rtiPointIds: [1],
    sourceIds: ["rti-act", "data-gov-in"],
  },
  {
    scheme: "Stand-Up India / SC enterprise credit (eligible cohort)",
    plain: "Credit pathways for SC entrepreneurs where criteria fit.",
    whoItIsFor: "Local entrepreneurs / return migrants with bankable plans",
    villageStatus: "unknown",
    rateOrSignal: "No public loan-sanction list for this GP",
    analystNote:
      "High out-station chef/driver skills are human capital. Without local credit + road + water, talent exits. Opacity of credit delivery is the scorecard.",
    rtiPointIds: [],
    sourceIds: ["rti-act", "data-gov-in"],
  },
];

export const panchayatExplainer = {
  title: "What a Gram Panchayat is for",
  lede:
    "A Gram Panchayat is the nearest government. In plain words: it is supposed to turn national schemes into water, roads, work, schools support, and public lists you can check — not only meetings and photos. Citizens have a legal right to that information.",
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
      title: "Records & proof (citizen right)",
      text: "Keep beneficiary lists, wage sheets, works expenditure, asset registers, and water-connection status public so 22 houses can audit without a middleman — by right under the RTI Act, 2005, not as a favour.",
    },
  ],
  bottomLine:
    "If taps are 0%, the road is unfinished, and scheme enrollment is invisible, that is not ‘village culture’ — it is delivery failure at the local state. Citizens may demand the records.",
};

export const analystMethod = {
  title: "How to read these numbers",
  points: [
    "Rates beat raw counts. “39 people without literacy” becomes clearer as ~38% of the village.",
    "Separate hard failures (0% taps) from unknown rates (PM-KISAN enrollment not in survey). Unknown is not success.",
    "Migration is a pressure gauge: high outside work + elder homes = care and pension risk.",
    "Income: we publish livelihood composition %, not fake average salaries. Remittance share of market labour is the clean proxy until a wage survey exists.",
    "SC equity: community cohort size is known; certificate-level verification and scheme enrollment still need public lists from the Block/GP.",
    "Panchayat scorecards should use public administrative data next (eGramSwaraj, JJM dashboard, MGNREGA MIS) — this page starts with what the village already measured.",
    "Every claim should show source + date. Official portal links are entry points, not proof of delivery until a work/asset row is verified.",
    "Citizen right: you may demand what the panchayat does (works, minutes, assets, FHTC lists). Opacity is a red flag.",
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
    label: "External wage dependency",
    value: `${rates.externalWageDependencyOfNonStudents}%`,
    detail: `of non-students work outside · ${outside} people`,
    tone: "warn" as const,
  },
  {
    label: "Remittance share of market labour",
    value: `${rates.remittanceLinkedShareOfMarketLabour}%`,
    detail: `${outside} of ${marketLabour} in cash/market occupations`,
    tone: "warn" as const,
  },
  {
    label: "Unpaid care (non-students)",
    value: `${rates.unpaidCareShareOfNonStudents}%`,
    detail: `${homeCare} people in home/care occupations`,
    tone: "warn" as const,
  },
  {
    label: "Formal public jobs",
    value: `${rates.formalPublicShareOfPeople}%`,
    detail: `${formalPublic} in govt / army / teaching`,
    tone: "ok" as const,
  },
  {
    label: "In school / training",
    value: `${rates.studentsShare}%`,
    detail: `${students} of ${pop} people`,
    tone: "ok" as const,
  },
  {
    label: "Homes with elders 60+",
    value: `${rates.elderlyHouseholdShare}%`,
    detail: `${elderHh} of ${hh} households`,
    tone: "warn" as const,
  },
];
