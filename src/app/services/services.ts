// Single source of truth for the services Sunaray Gaon offers.
// Edit copy here; the index + detail routes pick it up automatically.

import type { ComponentType } from "react";
import {
  ChefHat,
  Laptop,
  Home,
  Hammer,
  Building2,
  FileText,
  BookOpen,
  Sparkles,
} from "lucide-react";

export type ServiceSlug =
  | "catering"
  | "digital"
  | "homestay"
  | "carpentry"
  | "build-here"
  | "govt-liaison"
  | "instructional-design"
  | "ai-assistant";

export type ServiceCategory =
  | "Hospitality"
  | "Trades"
  | "Digital & AI"
  | "Build with us"
  | "Government";

export type Service = {
  slug: ServiceSlug;
  icon: ComponentType<any>;
  category: ServiceCategory;
  title: string;
  short: string; // 1-line teaser for the card
  tagline: string; // 1-2 line hero tagline on detail page
  intro: string; // longer intro paragraph
  offers: string[]; // "What we offer"
  pricing: { label: string; value: string }[]; // simple rate card
  next: string[]; // "How it works"
  ctaPrimary: string;
};

export const SERVICES: Service[] = [
  {
    slug: "catering",
    icon: ChefHat,
    category: "Hospitality",
    title: "Catering Services",
    short: "Hill kitchens for weddings, retreats, film shoots, and corporate offsites.",
    tagline:
      "Hill kitchens for weddings, retreats, shoots and offsites — cooked by villagers who actually cook this food every day.",
    intro:
      "We don't run a banquet hall. We run twenty-two kitchens that have been feeding their families for generations. Dal-bhat, momos, gundruk, sel roti, thukpa, slow-cooked mutton — served clean, on time, at scale.",
    offers: [
      "Full-event catering — breakfast, lunch, evening, dinner",
      "Vegetarian, non-vegetarian, and mixed menus from a real Lamahatta kitchen",
      "On-site cooking with our team, or pre-cooked transport for nearby events",
      "Crockery, serving staff, and clean-up handled end to end",
    ],
    pricing: [
      { label: "Per plate (vegetarian)", value: "₹250 – ₹450" },
      { label: "Per plate (non-vegetarian)", value: "₹400 – ₹700" },
      { label: "Minimum order", value: "30 plates" },
      { label: "Travel beyond 25 km", value: "At cost" },
    ],
    next: [
      "Tell us the date, guest count, and dietary mix",
      "We send a menu + final quote within 48 hours",
      "Advance booking confirms the dates, balance after the event",
    ],
    ctaPrimary: "Request a catering quote",
  },
  {
    slug: "digital",
    icon: Laptop,
    category: "Digital & AI",
    title: "Digital Services",
    short: "Websites, social media and content for small businesses, NGOs and homestays.",
    tagline:
      "Websites, social channels and short-form content for small businesses that don't have time to manage their own.",
    intro:
      "We built this very website — the dashboard, the partners flow, the multilingual stack. The same hands can build yours: a single, working, fast site with content that gets updated, not abandoned.",
    offers: [
      "Single-page sites or full multi-section sites (Next.js, Supabase)",
      "Social channels — content calendar, captions, posting, replies",
      "Short videos and photo edits for Reels / YouTube Shorts",
      "Translations (English ⇄ Nepali / Hindi / Bengali)",
    ],
    pricing: [
      { label: "Single-page site", value: "₹15,000 – ₹35,000" },
      { label: "Multi-page site", value: "₹40,000 – ₹1,20,000" },
      { label: "Social retainer (monthly)", value: "₹8,000 – ₹25,000" },
      { label: "Per video / reel edit", value: "₹500 – ₹2,000" },
    ],
    next: [
      "30-minute call to scope your goals",
      "Written quote + timeline within 3 working days",
      "50% advance, half on first draft, balance on go-live",
    ],
    ctaPrimary: "Request a digital quote",
  },
  {
    slug: "homestay",
    icon: Home,
    category: "Hospitality",
    title: "Homestay Services",
    short: "Stay with a Lamahatta family — clean rooms, real food, real conversation.",
    tagline:
      "Stay with a Lamahatta family. Clean rooms, real meals, and conversation worth the trip.",
    intro:
      "Tea-garden views, dawn over Kanchenjunga, a wood stove in the kitchen, and a host who knows the village like nobody else. Our homestays are licensed, comfortable, and run by the families themselves.",
    offers: [
      "Single rooms, family rooms, and a few villas across host families",
      "All meals included — vegetarian and non-vegetarian by request",
      "Walks to viewpoints, tea-garden trails, and Lamahatta Eco Park",
      "Pick-up from Siliguri / NJP / Bagdogra arranged on request",
    ],
    pricing: [
      { label: "Per person, per night (with meals)", value: "₹1,200 – ₹2,800" },
      { label: "Children under 8", value: "Half rate" },
      { label: "Pick-up (NJP / Bagdogra)", value: "₹2,500 – ₹3,500" },
      { label: "Off-season discount", value: "Up to 25%" },
    ],
    next: [
      "Tell us the dates, group size, and preferences",
      "We match you with the right host family and quote",
      "Pay advance to confirm, balance on check-out",
    ],
    ctaPrimary: "Check homestay availability",
  },
  {
    slug: "carpentry",
    icon: Hammer,
    category: "Trades",
    title: "Carpentry Service",
    short: "Furniture, doors, frames, and repairs — pine, sal, and reclaimed wood.",
    tagline:
      "Furniture, doors, frames and repairs — built locally in pine, sal, or reclaimed timber.",
    intro:
      "Three working carpenters in the village, two of them third-generation. From a single bookshelf to fitting out a homestay, the work is honest, square, and meant to last twenty years.",
    offers: [
      "Custom furniture — beds, tables, cabinets, kitchen units",
      "Doors, window frames, partitions",
      "Repairs and refinishing for existing furniture",
      "Site work for homestays and small construction",
    ],
    pricing: [
      { label: "Daily labour (per carpenter)", value: "₹900 – ₹1,400" },
      { label: "Material", value: "At cost + 10%" },
      { label: "Custom piece (typical)", value: "₹4,000 – ₹40,000" },
    ],
    next: [
      "Share a photo, sketch, or just describe what you need",
      "We send a quote with materials and timeline within a week",
      "50% advance for materials, balance on delivery",
    ],
    ctaPrimary: "Request a carpentry quote",
  },
  {
    slug: "build-here",
    icon: Building2,
    category: "Build with us",
    title: "Build a Business in Sunaray Gaon",
    short: "Homestays, eco-tourism, processing, retail — land lease and local workforce through the Samaj.",
    tagline:
      "Open a homestay, an eco-tourism venture, a small processing unit or a retail outlet — with the Samaj as your local partner.",
    intro:
      "If your idea fits the village and creates local jobs, we can move quickly. The Samaj Head handles land lease, panchayat permissions, and workforce introductions. No broker layer, no middleman fees.",
    offers: [
      "Land lease pathway through the Samaj (1–30 year terms)",
      "Permits and panchayat-level clearances handled with you",
      "Workforce introductions from the 22 households",
      "Marketing on the Sunaray Gaon website and corridor network",
    ],
    pricing: [
      { label: "Initial scoping", value: "Free" },
      { label: "Lease — depends on plot & duration", value: "Quoted case-by-case" },
      { label: "Samaj coordination fee", value: "One-time, transparent" },
    ],
    next: [
      "Send a one-page business note (idea, capex, jobs, revenue)",
      "Site visit and meeting with the Samaj Head + elders",
      "Lease agreement signed, business begins within 60–90 days",
    ],
    ctaPrimary: "Pitch a business",
  },
  {
    slug: "govt-liaison",
    icon: FileText,
    category: "Government",
    title: "Government Data & Documents",
    short: "Filings, RTI requests, scheme applications — drafted, submitted and followed up.",
    tagline:
      "Filings, RTI applications, scheme paperwork and follow-ups — drafted, submitted, and chased on your behalf.",
    intro:
      "Government work is paperwork plus persistence. We do both. From a single document request to a multi-scheme application bundle, we know which counter, which officer, and which file moves where.",
    offers: [
      "RTI applications — drafted, filed, followed up",
      "Scheme applications — PM Kisan, PMAY-G, Garib Kalyan, SVAMITVA, etc.",
      "Document copies — land records, certificates, lineage papers",
      "Liaison and follow-up at block and panchayat offices",
    ],
    pricing: [
      { label: "Per RTI / application", value: "₹500 – ₹2,000" },
      { label: "Scheme bundle (3+ schemes)", value: "₹3,000 – ₹8,000" },
      { label: "Travel and government fees", value: "At cost" },
    ],
    next: [
      "Tell us what you need — paste a brief or send a photo",
      "We confirm scope, fees, and timeline in writing",
      "Pay advance, we file, you get scanned receipts and updates",
    ],
    ctaPrimary: "Request government help",
  },
  {
    slug: "instructional-design",
    icon: BookOpen,
    category: "Digital & AI",
    title: "Instructional Design",
    short: "Course design, study material and teaching plans — for schools, NGOs and online courses.",
    tagline:
      "Course outlines, lesson plans and study material — built for the classroom, not the brochure.",
    intro:
      "Two trained teachers and a designer working together. We build syllabi, lesson plans, worksheets, slide decks and short videos — at the level your students actually read at, in the languages they actually speak.",
    offers: [
      "Course outlines and syllabi (school, vocational, online)",
      "Lesson plans with worksheets and assessment rubrics",
      "Slide decks, short videos and printable handouts",
      "Multilingual delivery — English, Nepali, Hindi, Bengali",
    ],
    pricing: [
      { label: "Single lesson plan", value: "₹800 – ₹2,500" },
      { label: "Module (5–10 lessons)", value: "₹8,000 – ₹25,000" },
      { label: "Full course (40+ hours)", value: "₹60,000 – ₹2,00,000" },
    ],
    next: [
      "Send the brief — subject, age group, language, deadline",
      "We send a sample lesson + final quote within a week",
      "50% advance, balance on final delivery",
    ],
    ctaPrimary: "Request a course design quote",
  },
  {
    slug: "ai-assistant",
    icon: Sparkles,
    category: "Digital & AI",
    title: "AI Assistants for Teachers",
    short: "A personal AI assistant for every teacher — lesson plans, grading, parent comms.",
    tagline:
      "A personal AI assistant for every teacher — set up, fine-tuned to your school, and trained on what your kids actually study.",
    intro:
      "Teachers spend 40% of their week on paperwork. We deploy custom AI assistants — fine-tuned to your school's syllabus, language and tone — that draft lesson plans, mark short-answer papers, and write parent-teacher notes in seconds.",
    offers: [
      "One AI assistant per teacher, fine-tuned to your syllabus",
      "Lesson plans, worksheets, rubrics drafted on demand",
      "Grading aid for short-answer and descriptive answers",
      "Parent-teacher comms drafted in your school's tone",
      "Training session for the whole staff, included",
    ],
    pricing: [
      { label: "Setup (one-time, per school)", value: "₹25,000 – ₹60,000" },
      { label: "Per teacher / month", value: "₹500 – ₹1,200" },
      { label: "Annual contracts", value: "2 months free" },
    ],
    next: [
      "30-minute demo with the principal / head teacher",
      "Pilot deployment with 3–5 teachers for 30 days",
      "Roll out school-wide if it earns its keep",
    ],
    ctaPrimary: "Book a school demo",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
