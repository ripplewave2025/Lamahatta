"use client";

import { useLanguage, Language } from "@/context/LanguageContext";
import { motion } from "framer-motion";

// Four core languages shown as an always-visible segmented toggle — users tap
// straight to their language instead of opening a dropdown. The active segment
// breathes a soft gold glow so it's obvious what's selected and what's tappable.
const coreLangs: { code: Language; short: string; label: string }[] = [
    { code: "EN", short: "EN", label: "English" },
    { code: "NE", short: "नेप", label: "नेपाली" },
    { code: "HI", short: "हिं", label: "हिंदी" },
    { code: "BN", short: "বাং", label: "বাংলা" },
];

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-0.5 rounded-full bg-stone-900 p-1 shadow-sm">
            {coreLangs.map((lang) => {
                const active = language === lang.code;
                return (
                    <motion.button
                        key={lang.code}
                        type="button"
                        onClick={() => setLanguage(lang.code)}
                        aria-label={`Switch language to ${lang.label}`}
                        aria-pressed={active}
                        whileTap={{ scale: 0.94 }}
                        animate={
                            active
                                ? {
                                      boxShadow: [
                                          "0 0 0px rgba(251,191,36,0)",
                                          "0 0 12px rgba(251,191,36,0.75)",
                                          "0 0 0px rgba(251,191,36,0)",
                                      ],
                                  }
                                : { boxShadow: "0 0 0px rgba(251,191,36,0)" }
                        }
                        transition={
                            active
                                ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                                : { duration: 0.2 }
                        }
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            active
                                ? "border border-amber-400 bg-amber-400/10 text-amber-300"
                                : "border border-transparent text-stone-400 hover:text-stone-200"
                        }`}
                    >
                        {lang.short}
                    </motion.button>
                );
            })}
        </div>
    );
};

export default LanguageToggle;
