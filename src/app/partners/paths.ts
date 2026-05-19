// Single source of truth for the five partner paths.
// Edit copy here; the routes pick it up automatically.

import type { ComponentType } from "react";
import { Building2, Landmark, Sprout, Heart, HandHeart, Mountain } from "lucide-react";

export type PartnerSlug =
  | "government"
  | "corporate"
  | "business"
  | "goodwill"
  | "ngo"
  | "neighbour";

export type PartnerPath = {
  slug: PartnerSlug;
  icon: ComponentType<any>;
  eyebrow: string;
  title: string;
  shortTitle: string;
  tagline: string;
  intro: string;
  need: string[];
  give: string[];
  next: string[];
  ctaPrimary: string;
  ctaSecondary?: string;
};

export const PARTNER_PATHS: PartnerPath[] = [
  {
    slug: "government",
    icon: Landmark,
    eyebrow: "Public partners",
    shortTitle: "Government",
    title: "I'm from Government",
    tagline:
      "Convergence, not new sanctions. Make existing schemes land cleanly in one village.",
    intro:
      "Sunaray Gaon is a single, geo-fenced site where every rupee can be tracked. We've already mapped which schemes our 22 households are eligible for — we just need a partner who can pull the levers.",
    need: [
      "Block-level convergence under PM Kisan, PMAY-G, Jal Jeevan, SVAMITVA",
      "A nominated officer for fortnightly site reviews",
      "Permission to publish geo-tagged progress photos for transparency",
    ],
    give: [
      "A live MIS dashboard scoped to your block — no spreadsheets",
      "Geo-tagged before/after photos for every line item",
      "Zero pilferage by design — funds released against verified milestones",
    ],
    next: [
      "Village profile + scheme-eligibility PDF in 48 hours",
      "Joint site visit and a block meeting in the same week",
      "MoU drafted, signed, and a public start-date set",
    ],
    ctaPrimary: "Request the village profile",
    ctaSecondary: "Book a site visit",
  },
  {
    slug: "corporate",
    icon: Building2,
    eyebrow: "Corporate · CSR",
    shortTitle: "Corporate / CSR",
    title: "I'm from Corporate / CSR",
    tagline:
      "Name the asset. Fund the line item. Get Schedule VII compliance and proof.",
    intro:
      "We don't ask for unrestricted CSR. We publish a costed line-item menu — solar microgrid, water filtration, road kilometres, classroom — and you fund what fits your charter.",
    need: [
      "A named line item from our public menu (not a lump sum)",
      "Quarterly review cadence with your CSR team",
      "Permission to credit you on the asset and on /dashboard",
    ],
    give: [
      "Schedule VII compliant invoicing and 80G certificates",
      "Quarterly impact reports with photos, GPS, and beneficiary names",
      "Naming rights on the asset for the partnership term",
    ],
    next: [
      "30-minute scoping call to match your charter to a line item",
      "Statement of work + budget within a week",
      "First tranche, asset begins, public launch date set",
    ],
    ctaPrimary: "See the line-item menu",
    ctaSecondary: "Book a scoping call",
  },
  {
    slug: "business",
    icon: Sprout,
    eyebrow: "Business",
    shortTitle: "Start a Business",
    title: "I want to start a Business here",
    tagline:
      "22 households, real workforce, no middleman. Eco-tourism, processing, crafts at scale.",
    intro:
      "Lamahatta is a working village with a working economy — what's missing is anchor businesses that hire locally. If your model fits, the Samaj Head can move quickly on land lease, permits, and workforce.",
    need: [
      "Businesses that hire from the village, not displace it",
      "A short feasibility note: capex, jobs created, revenue model",
      "Willingness to do one site visit before we proceed",
    ],
    give: [
      "Direct line to the Samaj Head — no broker layer",
      "22 ready households as workforce, customers, and word-of-mouth",
      "Help with land lease, permits, and onboarding from the panchayat",
    ],
    next: [
      "Site visit scheduled within two weeks",
      "Feasibility reviewed by the Samaj Head and elders",
      "Lease + workforce agreement signed, business begins",
    ],
    ctaPrimary: "Pitch your business",
    ctaSecondary: "Plan a site visit",
  },
  {
    slug: "goodwill",
    icon: Heart,
    eyebrow: "Goodwill",
    shortTitle: "Goodwill",
    title: "I just want to support",
    tagline:
      "₹500 or ₹50,000. One-time or monthly. Zero paperwork. Full transparency.",
    intro:
      "If you grew up in the hills, married into them, or just believe a village should be allowed to thrive on its own land — this is for you. Every contribution lands on the village dashboard within 24 hours.",
    need: [
      "Any amount you can spare, one-time or monthly",
      "A name (or 'Anonymous') to credit on the wall of supporters",
      "Your contact so the Samaj Head can call to say thank you",
    ],
    give: [
      "Your name on the public wall of supporters (or anonymous)",
      "A personal thank-you call from the Samaj Head",
      "Receipt and a real link to the line item you helped fund",
    ],
    next: [
      "Pay via UPI or bank transfer (details on confirmation)",
      "Receipt emailed within 24 hours",
      "See your contribution land on /dashboard the same week",
    ],
    ctaPrimary: "Send a contribution",
    ctaSecondary: "See where it goes",
  },
  {
    slug: "ngo",
    icon: HandHeart,
    eyebrow: "NGO · Philanthropy",
    shortTitle: "NGO / Philanthropy",
    title: "I'm from an NGO or philanthropic service",
    tagline:
      "A real village to deliver in. Documented outcomes. Joint reporting.",
    intro:
      "Bring what you already do well — training, healthcare camps, digital literacy, oldcare protocols. We bring a single, accountable village with a Samaj Head who answers the phone.",
    need: [
      "A skill you already deliver elsewhere — don't reinvent for us",
      "A 90-day pilot scope with measurable outcomes",
      "Permission to publish results, good or bad",
    ],
    give: [
      "A single, accountable village — one phone number, one decision-maker",
      "Documented baseline and a clean before/after dataset",
      "Joint publication rights on the outcomes",
    ],
    next: [
      "Alignment call to match your programme to a real village need",
      "90-day pilot with weekly check-ins",
      "Public outcomes, then renew, expand, or exit honestly",
    ],
    ctaPrimary: "Propose a pilot",
    ctaSecondary: "Talk to the Samaj Head",
  },
  {
    slug: "neighbour",
    icon: Mountain,
    eyebrow: "Nearby villages",
    shortTitle: "Neighbouring Village",
    title: "I'm from a nearby village",
    tagline:
      "Swap services, share corridors, scale what works. One hill, one economy.",
    intro:
      "We're not trying to do this alone. If your village has homestays, crafts, food, transport, or guides — let's stitch our calendars and corridors together so guests stay longer and rupees stay local.",
    need: [
      "A short list of what your village offers (homestays, food, guides, crafts)",
      "A point of contact — pradhan, samiti head, or a trusted villager",
      "Openness to a joint visitor route and a shared rate card",
    ],
    give: [
      "Cross-referrals on our website and to every guest we host",
      "Joint marketing under a single Lamahatta-region banner",
      "Shared booking calendar, no double-booking, no undercutting",
    ],
    next: [
      "Coffee at Sunaray Gaon — bring two or three villagers",
      "We map both villages on one corridor sheet",
      "Soft launch a joint package within 30 days",
    ],
    ctaPrimary: "Connect our villages",
    ctaSecondary: "Visit Sunaray Gaon",
  },
];

export function getPartnerPath(slug: string): PartnerPath | undefined {
  return PARTNER_PATHS.find((p) => p.slug === slug);
}
