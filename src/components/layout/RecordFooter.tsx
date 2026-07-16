"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage, Language } from "@/context/LanguageContext";

const localTranslations: Record<Language, {
  title: string;
  desc: string;
  platform: string;
  action: string;
  entryPoints: string;
  entryDesc: string;
  contactButton: string;
  footerTagline: string;
  platformLinks: { href: string; label: string }[];
  actionLinks: { href: string; label: string }[];
}> = {
  EN: {
    title: "A village platform for work, visibility, and useful growth.",
    desc: "This should become the public face of the village and the internal tool for surfacing needs, talent, services, and practical opportunities.",
    platform: "Platform",
    action: "Action",
    entryPoints: "Best next entry points",
    entryDesc: "Villagers should head to the hub and voices page. Outsiders should start with opportunity and enquiries. Trainers and employers should use the economy and talent sections.",
    contactButton: "Contact the village",
    footerTagline: "Built as a living record, a village OS, and an opportunity front door.",
    platformLinks: [
      { href: "/", label: "Home" },
      { href: "/why", label: "Story" },
      { href: "/voices", label: "Voices" },
      { href: "/hub", label: "Hub" },
    ],
    actionLinks: [
      { href: "/economy", label: "Opportunity map" },
      { href: "/partners", label: "Investor enquiry" },
      { href: "/data", label: "Village data" },
      { href: "/updates", label: "Updates" },
    ]
  },
  NE: {
    title: "काम, पहिचान र उपयोगी वृद्धिको लागि गाउँको मञ्च।",
    desc: "यो गाउँको सार्वजनिक अनुहार र आवश्यकता, प्रतिभा, सेवा र व्यावहारिक अवसरहरू उजागर गर्ने आन्तरिक उपकरण बन्नुपर्दछ।",
    platform: "मञ्च",
    action: "कार्य",
    entryPoints: "उत्कृष्ट प्रवेश बिन्दुहरू",
    entryDesc: "गाउँलेहरू हब र आवाज पृष्ठमा जानुपर्छ। बाहिरका मानिसहरू अवसर र सोधपुछबाट सुरु गर्नुपर्छ। प्रशिक्षक र रोजगारदाताहरूले अर्थतन्त्र र प्रतिभा खण्डहरू प्रयोग गर्नुपर्छ।",
    contactButton: "गाउँसँग सम्पर्क गर्नुहोस्",
    footerTagline: "एक जीवित अभिलेख, एक गाउँको ओएस, र अवसरको मूल ढोकाको रूपमा निर्मित।",
    platformLinks: [
      { href: "/", label: "गृहपृष्ठ" },
      { href: "/why", label: "कथा" },
      { href: "/voices", label: "आवाजहरू" },
      { href: "/hub", label: "हब" },
    ],
    actionLinks: [
      { href: "/economy", label: "अवसर नक्सा" },
      { href: "/partners", label: "लगानीकर्ता सोधपुछ" },
      { href: "/data", label: "गाउँको डाटा" },
      { href: "/updates", label: "अपडेटहरू" },
    ]
  },
  HI: {
    title: "काम, दृश्यता और उपयोगी विकास के लिए एक गाँव का मंच।",
    desc: "यह गाँव का सार्वजनिक चेहरा और आवश्यकताओं, प्रतिभा, सेवाओं और व्यावहारिक अवसरों को उजागर करने वाला आंतरिक उपकरण बनना चाहिए।",
    platform: "मंच",
    action: "कार्यवाही",
    entryPoints: "सर्वश्रेष्ठ अगले प्रवेश बिंदु",
    entryDesc: "ग्रामीणों को हब और आवाज़ें पेज पर जाना चाहिए। बाहरी लोगों को अवसर और पूछताछ से शुरुआत करनी चाहिए। प्रशिक्षकों और नियोक्ताओं को अर्थव्यवस्था और प्रतिभा अनुभागों का उपयोग करना चाहिए।",
    contactButton: "गाँव से संपर्क करें",
    footerTagline: "एक जीवित रिकॉर्ड, एक गाँव के ओएस, और अवसर के मुख्य द्वार के रूप में निर्मित।",
    platformLinks: [
      { href: "/", label: "होम" },
      { href: "/why", label: "यह क्यों मौजूद है" },
      { href: "/voices", label: "आवाज़ें" },
      { href: "/hub", label: "हब" },
    ],
    actionLinks: [
      { href: "/economy", label: "अवसर मानचित्र" },
      { href: "/partners", label: "निवेशक पूछताछ" },
      { href: "/data", label: "गाँव का डेटा" },
      { href: "/updates", label: "अपडेट" },
    ]
  },
  BN: {
    title: "কাজ, দৃশ্যমানতা এবং দরকারী বৃদ্ধির জন্য একটি গ্রামের প্ল্যাটফর্ম।",
    desc: "এটি গ্রামের সর্বজনীন মুখ এবং চাহিদা, প্রতিভা, পরিষেবা এবং বাস্তব সুযোগগুলি তুলে ধরার জন্য অভ্যন্তরীণ হাতিয়ার হওয়া উচিত।",
    platform: "প্ল্যাটফর্ম",
    action: "পদক্ষেপ",
    entryPoints: "সেরা পরবর্তী প্রবেশ বিন্দু",
    entryDesc: "গ্রামবাসীদের হাব এবং কণ্ঠস্বর পৃষ্ঠায় যাওয়া উচিত। বহিরাগতদের সুযোগ এবং অনুসন্ধান দিয়ে শুরু করা উচিত। প্রশিক্ষক এবং নিয়োগকারীদের অর্থনীতি এবং প্রতিভা বিভাগগুলি ব্যবহার করা উচিত।",
    contactButton: "গ্রামের সাথে যোগাযোগ করুন",
    footerTagline: "একটি জীবন্ত রেকর্ড, একটি গ্রামের ওএস এবং সুযোগের সদর দরজা হিসাবে নির্মিত।",
    platformLinks: [
      { href: "/", label: "হোম" },
      { href: "/why", label: "এটি কেন বিদ্যমান" },
      { href: "/voices", label: "কণ্ঠস্বর" },
      { href: "/hub", label: "হাব" },
    ],
    actionLinks: [
      { href: "/economy", label: "সুযোগের মানচিত্র" },
      { href: "/partners", label: "বিনিয়োগকারী অনুসন্ধান" },
      { href: "/data", label: "গ্রামের ডেটা" },
      { href: "/updates", label: "আপডেট" },
    ]
  }
};

export default function RecordFooter() {
  const { language } = useLanguage();
  const t = localTranslations[language] || localTranslations.EN;

  return (
    <footer className="bg-[#0f1716] text-stone-100">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-sm"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-amber-300">
              Sunaray Gaon
            </p>
            <h3 className="mt-4 font-serif text-3xl text-white">
              {t.title}
            </h3>
            <p className="mt-5 text-sm leading-7 text-stone-300/72">
              {t.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
              {t.platform}
            </h4>
            <nav className="mt-5 space-y-3">
              {t.platformLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-stone-300/78 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
              {t.action}
            </h4>
            <nav className="mt-5 space-y-3">
              {t.actionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-stone-300/78 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
          >
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
              {t.entryPoints}
            </h4>
            <p className="mt-4 text-sm leading-7 text-stone-300/72">
              {t.entryDesc}
            </p>
            <Link
              href="/partners"
              className="mt-5 inline-flex items-center rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-950 transition hover:bg-amber-400"
            >
              {t.contactButton}
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-stone-400 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>Sunaray Gaon, Lamahatta, Darjeeling</p>
            <p className="mt-1 text-stone-500">
              Made with ❤️ by{" "}
              <Link
                href="https://portfolio-next-fawn-five.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-amber-300 transition underline underline-offset-4 decoration-stone-600 hover:decoration-amber-300"
              >
                Upesh
              </Link>
            </p>
            <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-stone-500">
              <Link href="/privacy" className="hover:text-amber-300">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-amber-300">
                Terms
              </Link>
              <Link href="/data" className="hover:text-amber-300">
                Data
              </Link>
              <Link href="/rti" className="hover:text-amber-300">
                RTI
              </Link>
            </nav>
          </div>
          <p>{t.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
