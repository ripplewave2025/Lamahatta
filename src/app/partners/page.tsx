"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MapPin, Sparkles, Landmark, Building2, Sprout, Heart, HandHeart, Mountain } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { PARTNER_PATHS } from "./paths";

const localTranslations: Record<Language, {
  heroLabel: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  statHouseholds: string;
  statCorridors: string;
  statCharity: string;
  pathPickerLabel: string;
  pathPickerTitle: string;
  enterPath: string;
  trustTitle1: string;
  trustBody1: string;
  trustTitle2: string;
  trustBody2: string;
  trustTitle3: string;
  trustBody3: string;
  trustBottomLabel: string;
  trustBottomTitle: string;
  trustBottomButton: string;
  paths: Record<string, { eyebrow: string; title: string; tagline: string }>;
}> = {
  EN: {
    heroLabel: "Partner with Sunaray Gaon",
    heroTitle1: "Help us build India's first",
    heroTitle2: "self-sustaining village.",
    heroSubtitle: "Lamahatta has 22 households, real skills, and a Samaj Head who answers the phone. Choose the door that fits you — we'll do the rest.",
    statHouseholds: "Households",
    statCorridors: "Tourism corridors",
    statCharity: "Dependence on charity",
    pathPickerLabel: "How would you like to support us?",
    pathPickerTitle: "Pick a door. Step in.",
    enterPath: "Enter this path",
    trustTitle1: "Every rupee on a public dashboard",
    trustBody1: "Geo-tagged photos, named beneficiaries, line-item ledger. Open before, during, and after.",
    trustTitle2: "One village. One phone number.",
    trustBody2: "The Samaj Head is the single point of contact. No NGO middleman, no project office in another city.",
    trustTitle3: "Schedule VII compliant",
    trustBody3: "80G receipts, CSR-ready reporting, and an audit trail you can hand to your board.",
    trustBottomLabel: "Still not sure?",
    trustBottomTitle: "See where every contribution lands.",
    trustBottomButton: "Open the village dashboard",
    paths: {
      government: {
        eyebrow: "Public partners",
        title: "I'm from Government",
        tagline: "Convergence, not new sanctions. Make existing schemes land cleanly in one village."
      },
      corporate: {
        eyebrow: "Corporate · CSR",
        title: "I'm from Corporate / CSR",
        tagline: "Name the asset. Fund the line item. Get Schedule VII compliance and proof."
      },
      business: {
        eyebrow: "Business",
        title: "I want to start a Business here",
        tagline: "22 households, real workforce, no middleman. Eco-tourism, processing, crafts at scale."
      },
      goodwill: {
        eyebrow: "Goodwill",
        title: "I just want to support",
        tagline: "₹500 or ₹50,000. One-time or monthly. Zero paperwork. Full transparency."
      },
      ngo: {
        eyebrow: "NGO · Philanthropy",
        title: "I'm from an NGO",
        tagline: "A real village to deliver in. Documented outcomes. Joint reporting."
      },
      neighbour: {
        eyebrow: "Nearby villages",
        title: "I'm from a nearby village",
        tagline: "Swap services, share corridors, scale what works. One hill, one economy."
      }
    }
  },
  NE: {
    heroLabel: "सुनरे गाउँसँग साझेदारी गर्नुहोस्",
    heroTitle1: "हामीलाई भारतको पहिलो निर्माण गर्न मद्दत गर्नुहोस्",
    heroTitle2: "आत्मनिर्भर गाउँ।",
    heroSubtitle: "लामाहट्टामा २२ घरधुरी, वास्तविक सीपहरू र एक समाज प्रमुख हुनुहुन्छ जसले फोन उठाउनुहुन्छ। तपाईंलाई उपयुक्त हुने विकल्प रोज्नुहोस् — बाँकी हामी गर्नेछौं।",
    statHouseholds: "घरधुरी",
    statCorridors: "पर्यटन कोरिडोरहरू",
    statCharity: "दानमा निर्भरता",
    pathPickerLabel: "तपाईं हामीलाई कसरी सहयोग गर्न चाहनुहुन्छ?",
    pathPickerTitle: "ढोका छान्नुहोस्। भित्र आउनुहोस्।",
    enterPath: "यस मार्गमा प्रवेश गर्नुहोस्",
    trustTitle1: "सार्वजनिक ड्यासबोर्डमा प्रत्येक रुपैयाँ",
    trustBody1: "जियो-ट्याग गरिएका फोटोहरू, नाम तोकिएका लाभार्थीहरू, लाइन-आइटम लेजर। काम हुनु अघि, कामको समयमा, र काम पछि पनि खुल्ला।",
    trustTitle2: "एउटा गाउँ। एउटा फोन नम्बर।",
    trustBody2: "समाज प्रमुख नै सम्पर्कको एकमात्र माध्यम हुनुहुन्छ। कुनै गैरसरकारी संस्थाको बिचौलिया छैन, अर्को सहरमा कुनै परियोजना कार्यालय छैन।",
    trustTitle3: "अनुसूची VII अनुरूप",
    trustBody3: "80G रसिदहरू, CSR-तयार रिपोर्टिङ, र अडिट रिपोर्ट जुन तपाईं आफ्नो बोर्डलाई हस्तान्तरण गर्न सक्नुहुन्छ।",
    trustBottomLabel: "अझै पक्का हुनुहुन्न?",
    trustBottomTitle: "हेर्नुहोस् प्रत्येक योगदान कहाँ पुग्छ।",
    trustBottomButton: "गाउँको ड्यासबोर्ड खोल्नुहोस्",
    paths: {
      government: {
        eyebrow: "सार्वजनिक साझेदारहरू",
        title: "म सरकारी क्षेत्रबाट हुँ",
        tagline: "सहमति, नयाँ स्वीकृति होइन। विद्यमान योजनाहरूलाई एउटै गाउँमा सफासँग लागू गर्नुहोस्।"
      },
      corporate: {
        eyebrow: "कर्पोरेट · CSR",
        title: "म कर्पोरेट / CSR बाट हुँ",
        tagline: "सम्पत्ति तोक्नुहोस्। बजेट कोष उपलब्ध गराउनुहोस्। अनुसूची VII अनुपालन र प्रमाण प्राप्त गर्नुहोस्।"
      },
      business: {
        eyebrow: "व्यवसाय",
        title: "म यहाँ व्यवसाय सुरु गर्न चाहन्छु",
        tagline: "२२ घरधुरी, वास्तविक कार्यबल, कुनै बिचौलिया छैन। पर्यावरण-पर्यटन, प्रशोधन, हस्तकला व्यापक रूपमा।"
      },
      goodwill: {
        eyebrow: "सद्भाव",
        title: "म मात्र सहयोग गर्न चाहन्छु",
        tagline: "₹५०० वा ₹५०,०००। एक पटक वा मासिक। शून्य कागजी प्रक्रिया। पूर्ण पारदर्शी।"
      },
      ngo: {
        eyebrow: "गैरसरकारी संस्था · परोपकार",
        title: "म गैरसरकारी संस्थाबाट हुँ",
        tagline: "काम गर्नका लागि एउटा वास्तविक गाउँ। प्रमाणित परिणामहरू। संयुक्त रिपोर्टिङ।"
      },
      neighbour: {
        eyebrow: "छिमेकी गाउँहरू",
        title: "म छिमेकी गाउँबाट हुँ",
        tagline: "सेवाहरू साटासाट गर्नुहोस्, कोरिडोरहरू साझा गर्नुहोस्, काम गर्ने कुरा विस्तार गर्नुहोस्। एउटै पहाड, एउटै अर्थतन्त्र।"
      }
    }
  },
  HI: {
    heroLabel: "सुनरे गाउन के साथ साझेदारी करें",
    heroTitle1: "भारत का पहला बनाने में हमारी मदद करें",
    heroTitle2: "आत्मनिर्भर गाँव।",
    heroSubtitle: "लामाहट्टा में 22 परिवार, वास्तविक कौशल और एक समाज प्रमुख हैं जो फोन उठाते हैं। वह दरवाज़ा चुनें जो आपके अनुकूल हो — बाकी हम करेंगे।",
    statHouseholds: "घर",
    statCorridors: "पर्यटन गलियारे",
    statCharity: "दान पर निर्भरता",
    pathPickerLabel: "आप हमारा समर्थन कैसे करना चाहेंगे?",
    pathPickerTitle: "एक दरवाज़ा चुनें। भीतर आएं।",
    enterPath: "इस मार्ग में प्रवेश करें",
    trustTitle1: "सार्वजनिक डैशबोर्ड पर हर एक रुपया",
    trustBody1: "जियो-टैग की गई तस्वीरें, नामांकित लाभार्थी, लाइन-आइटम लेज़र। काम से पहले, काम के दौरान और काम के बाद भी खुला।",
    trustTitle2: "एक गाँव। एक फोन नंबर।",
    trustBody2: "समाज प्रमुख ही संपर्क का एकमात्र माध्यम हैं। कोई गैर सरकारी संस्था का बिचौलिया नहीं, किसी दूसरे शहर में कोई परियोजना कार्यालय नहीं।",
    trustTitle3: "अनुसूची VII अनुपालन",
    trustBody3: "80G रसीदें, CSR-तैयार रिपोर्टिंग, और ऑडिट रिपोर्ट जिसे आप अपने बोर्ड को सौंप सकते हैं।",
    trustBottomLabel: "अभी भी पक्का नहीं है?",
    trustBottomTitle: "देखें कि हर एक योगदान कहाँ जाता है।",
    trustBottomButton: "गाँव का डैशबोर्ड खोलें",
    paths: {
      government: {
        eyebrow: "सार्वजनिक भागीदार",
        title: "मैं सरकारी क्षेत्र से हूँ",
        tagline: "अभिसरण, नई मंजूरी नहीं। मौजूदा योजनाओं को एक गाँव में साफ-सुथरे तरीके से लागू करें।"
      },
      corporate: {
        eyebrow: "कॉरपोरेट · CSR",
        title: "मैं कॉर्पोरेट / CSR से हूँ",
        tagline: "संपत्ति का नाम बताएं। बजट फंड करें। अनुसूची VII अनुपालन और सबूत प्राप्त करें।"
      },
      business: {
        eyebrow: "व्यवसाय",
        title: "मैं यहाँ व्यवसाय शुरू करना चाहता हूँ",
        tagline: "22 परिवार, वास्तविक कार्यबल, कोई बिचौलिया नहीं। पर्यावरण-पर्यटन, प्रसंस्करण, बड़े पैमाने पर हस्तशिल्प।"
      },
      goodwill: {
        eyebrow: "सद्भावना",
        title: "मैं बस समर्थन करना चाहता हूँ",
        tagline: "₹500 या ₹50,000। एक बार या मासिक। कोई कागजी कार्रवाई नहीं। पूर्ण पारदर्शिता।"
      },
      ngo: {
        eyebrow: "एनजीओ · परोपकार",
        title: "मैं एक एनजीओ से हूँ",
        tagline: "काम करने के लिए एक वास्तविक गाँव। प्रलेखित परिणाम। संयुक्त रिपोर्टिंग।"
      },
      neighbour: {
        eyebrow: "पड़ोसी गाँव",
        title: "मैं पड़ोसी गाँव से हूँ",
        tagline: "सेवाओं का आदान-प्रदान करें, गलियारे साझा करें, काम करने वाली चीज़ों को बढ़ाएं। एक पहाड़ी, एक अर्थव्यवस्था।"
      }
    }
  },
  BN: {
    heroLabel: "সুনরে গাউনের সাথে অংশীদার হন",
    heroTitle1: "ভারতের প্রথম স্বনির্ভর গ্রামটি",
    heroTitle2: "গড়ে তুলতে আমাদের সাহায্য করুন।",
    heroSubtitle: "লামাহাট্টায় ২২টি পরিবার, প্রকৃত দক্ষতা এবং একজন সমাজ প্রধান আছেন যিনি ফোন ধরেন। আপনার উপযোগী দরজাটি বেছে নিন — বাকিটা আমরা করব।",
    statHouseholds: "পরিবার",
    statCorridors: "পর্যটন করিডোর",
    statCharity: "দানের ওপর নির্ভরতা",
    pathPickerLabel: "আপনি আমাদের কীভাবে সমর্থন করতে চান?",
    pathPickerTitle: "একটি দরজা বেছে নিন। ভেতরে আসুন।",
    enterPath: "এই পথে প্রবেশ করুন",
    trustTitle1: "পাবলিক ড্যাশবোর্ডে প্রতিটি টাকা",
    trustBody1: "জিও-ট্যাগ করা ছবি, নামধারী সুবিধাভোগী, লাইন-আইটেম লেজার। কাজ শুরু হওয়ার আগে, চলাকালীন এবং পরে সব সময় উন্মুক্ত।",
    trustTitle2: "একটি গ্রাম. একটি ফোন নম্বর।",
    trustBody2: "সমাজ প্রধানই যোগাযোগের একমাত্র মাধ্যম। কোনো এনজিও বা দালাল নেই, অন্য কোনো শহরে কোনো প্রকল্প কার্যালয় নেই।",
    trustTitle3: "তফসিল VII অনুবর্তী",
    trustBody3: "80G রসিদ, CSR-প্রস্তুত রিপোর্টিং এবং একটি অডিট ট্রেইল যা আপনি আপনার বোর্ডে জমা দিতে পারেন।",
    trustBottomLabel: "এখনো নিশ্চিত নন?",
    trustBottomTitle: "দেখুন প্রতিটি অবদান কোথায় জমা হয়।",
    trustBottomButton: "গ্রামের ড্যাশবোর্ডটি খুলুন",
    paths: {
      government: {
        eyebrow: "জনসাধারণ অংশীদার",
        title: "আমি সরকারী ক্ষেত্র থেকে",
        tagline: "বিদ্যমান প্রকল্পগুলি একটি গ্রামে সুষ্ঠুভাবে বাস্তবায়িত করুন।"
      },
      corporate: {
        eyebrow: "কর্পোরেট · CSR",
        title: "আমি কর্পোরেট / CSR থেকে",
        tagline: "সম্পদের নাম বলুন। বাজেট প্রদান করুন। তফসিল VII অনুপালন এবং প্রমাণ পান।"
      },
      business: {
        eyebrow: "ব্যবসা",
        title: "আমি এখানে একটি ব্যবসা শুরু করতে চাই",
        tagline: "২২টি পরিবার, প্রকৃত কর্মীদল, কোনো দালাল নেই। ইকো-ট্যুরিজম, প্রসেসিং, হস্তশিল্প বড় স্কেলে।"
      },
      goodwill: {
        eyebrow: "সদিচ্ছা",
        title: "আমি শুধু সমর্থন করতে চাই",
        tagline: "₹৫০০ বা ₹৫০,০০০। এককালীন বা মাসিক। শূন্য কাগজপত্র। পূর্ণ স্বচ্ছতা।"
      },
      ngo: {
        eyebrow: "এনজিও · সমাজসেবা",
        title: "আমি একটি এনজিও থেকে",
        tagline: "কাজ করার জন্য একটি বাস্তব গ্রাম। প্রমাণিত ফলাফল। যৌথ প্রতিবেদন।"
      },
      neighbour: {
        eyebrow: "পার্শ্ববর্তী গ্রামগুলি",
        title: "আমি পার্শ্ববর্তী একটি গ্রাম থেকে",
        tagline: "পরিষেবা বিনিময় করুন, করিডোর ভাগ করুন, সফল কাজগুলি বৃদ্ধি করুন। এক পাহাড়, এক অর্থনীতি।"
      }
    }
  }
};

export default function PartnersIndexPage() {
  const { language } = useLanguage();
  const t = localTranslations[language] || localTranslations.EN;

  const HERO_STATS = [
    { value: "22", label: t.statHouseholds },
    { value: "9", label: t.statCorridors },
    { value: "0", label: t.statCharity },
  ];

  return (
    <div className="min-h-screen bg-[#f4efe4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#07100f] pb-28 pt-32 text-white sm:pb-32 sm:pt-36">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.10),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300"
          >
            {t.heroLabel}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl"
          >
            {t.heroTitle1}{" "}
            <span className="block bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(245,158,11,0.35)]">
              {t.heroTitle2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-base leading-7 text-stone-200/85 sm:text-lg"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label} className="bg-[#0c1614] p-5 sm:p-6">
                <div className="font-serif text-3xl text-amber-300 sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/65 sm:text-[11px]">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PATH PICKER */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700">
              {t.pathPickerLabel}
            </p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight text-stone-950 sm:text-4xl">
              {t.pathPickerTitle}
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PARTNER_PATHS.map((p, i) => {
            const Icon = p.icon;
            const featured = i === 1; // visually anchor "Corporate"
            const pathTrans = t.paths[p.slug] || { eyebrow: p.eyebrow, title: p.title, tagline: p.tagline };

            return (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={featured ? "lg:row-span-1" : ""}
              >
                <Link
                  href={`/partners/${p.slug}`}
                  className={`group relative block h-full overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 ${
                    featured
                      ? "border-stone-900 bg-stone-950 text-stone-50 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
                      : "border-stone-200 bg-white hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_30px_60px_rgba(212,175,55,0.18)]"
                  }`}
                >
                  <div
                    aria-hidden
                    className={`absolute inset-x-0 -top-12 h-32 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.35),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                      featured ? "opacity-50" : ""
                    }`}
                  />
                  <div className="relative flex h-full flex-col">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        featured
                          ? "border border-amber-300/40 bg-amber-300/10 text-amber-300"
                          : "bg-stone-950 text-amber-300"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <p
                      className={`mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] ${
                        featured ? "text-amber-300" : "text-amber-700"
                      }`}
                    >
                      {pathTrans.eyebrow}
                    </p>
                    <h3
                      className={`mt-3 font-serif text-2xl leading-tight ${
                        featured ? "text-stone-50" : "text-stone-950"
                      }`}
                    >
                      {pathTrans.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-6 ${
                        featured ? "text-stone-300" : "text-stone-700"
                      }`}
                    >
                      {pathTrans.tagline}
                    </p>
                    <div
                      className={`mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${
                        featured ? "text-amber-300" : "text-stone-950"
                      }`}
                    >
                      {t.enterPath}
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-3">
            <TrustItem
              icon={<ShieldCheck className="h-5 w-5" />}
              title={t.trustTitle1}
              body={t.trustBody1}
            />
            <TrustItem
              icon={<MapPin className="h-5 w-5" />}
              title={t.trustTitle2}
              body={t.trustBody2}
            />
            <TrustItem
              icon={<Sparkles className="h-5 w-5" />}
              title={t.trustTitle3}
              body={t.trustBody3}
            />
          </div>

          <div className="mt-14 flex flex-col items-start gap-5 rounded-[1.75rem] border border-stone-200 bg-[#f4efe4] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-700">
                {t.trustBottomLabel}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-stone-950 sm:text-3xl">
                {t.trustBottomTitle}
              </h3>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-amber-200 transition hover:bg-stone-800 sm:text-sm"
            >
              {t.trustBottomButton}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustItem({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
        {icon}
      </div>
      <h3 className="mt-4 font-serif text-xl text-stone-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
    </div>
  );
}
