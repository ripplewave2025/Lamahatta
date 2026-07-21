/**
 * Typed public metrics for the living GP audit.
 * Every claim carries source + as_of. No invented portal numbers.
 */
import auditSources from "@/data/audit-sources.json";
import infrastructureAudit from "@/data/infrastructure-audit.json";
import govWorks from "@/data/gov-works.json";

export type Domain =
  | "water"
  | "connectivity"
  | "roads"
  | "solar"
  | "amenities"
  | "funds"
  | "identity";

export type Confidence = "hard" | "soft" | "unknown";

export type ClaimSourceKind = "survey" | "rti" | "portal" | "ground_photo" | "operator";

export type AuditSource = (typeof auditSources.sources)[number];

export type InfrastructureClaim = (typeof infrastructureAudit.claims)[number];

export type GovWork = (typeof govWorks.works)[number];

export const sourcesById: Record<string, AuditSource> = Object.fromEntries(
  auditSources.sources.map((s) => [s.id, s]),
);

export const publicSources: AuditSource[] = auditSources.sources.filter((s) => s.public);

/** Priority-ordered infrastructure claims (water → … → amenities + citizen RTI). */
export const priorityClaims: InfrastructureClaim[] = [...infrastructureAudit.claims].sort(
  (a, b) => a.priority - b.priority,
);

export const works: GovWork[] = govWorks.works;

export function sourcesForIds(ids: string[]): AuditSource[] {
  return ids.map((id) => sourcesById[id]).filter(Boolean);
}

/** Citizen right framing — statutory + operational, data-only. */
export const citizenRights = {
  title: "Citizen’s right to know what the panchayat does",
  lede:
    "Under the Right to Information Act, 2005, every citizen can seek — and the Gram Panchayat must often proactively publish — records of works, schemes, minutes, assets, and expenditure. This board is that right in rates: public delivery, private people.",
  pillars: [
    {
      title: "Proactive disclosure (§4 spirit)",
      text: "Budgets, works, beneficiary lists, and Gram Sabha minutes should be public without forcing every house to file RTI.",
    },
    {
      title: "Application right (§6)",
      text: "When lists are missing, citizens can demand FHTC rolls, abandoned works, asset registers, and held-up eGram items from the PIO.",
    },
    {
      title: "What we publish here",
      text: "Aggregate rates, LGD identity, RTI meta, infrastructure claims with source + date, and official portal links — never villager names.",
    },
    {
      title: "What opacity means",
      text: "Unknown enrollment or missing Work IDs are findings. They are not proof that schemes “worked.”",
    },
  ],
  panchayatMustAnswer: [
    "What works were sanctioned and spent in this ward?",
    "What is the FHTC / drinking-water status for Sunaray (Simana) Gaon?",
    "Which works are abandoned, zero-expenditure, or held-up on eGramSwaraj?",
    "Where is the asset register (including solar/street assets)?",
    "Where are Gram Sabha minutes and resolutions?",
  ],
  rtiHref: "/rti",
  sourceId: "rti-act",
} as const;

export const auditBoardMeta = {
  title: infrastructureAudit.meta.title,
  lgd: infrastructureAudit.meta.lgd_gp_code,
  priorityOrder: infrastructureAudit.meta.priority_order,
  rule: infrastructureAudit.meta.rule,
  asOf: infrastructureAudit.meta.as_of_board,
  sourcesRule: auditSources.meta.rule,
} as const;
