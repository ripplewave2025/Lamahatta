"use client";

import { useLanguage, Language } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

// Regional languages
const regionalLangs: { code: Language; label: string; flag: string }[] = [
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "NE", label: "नेपाली", flag: "🇳🇵" },
    { code: "HI", label: "हिंदी", flag: "🇮🇳" },
    { code: "BN", label: "বাংলা", flag: "🇧🇩" },
];

// Himalayan languages
const himalayanLangs: { code: Language; label: string; flag: string }[] = [
    { code: "DZ", label: "Bhutanese", flag: "🇧🇹" },
    { code: "TB", label: "བོད་སྐད", flag: "🏔️" },
    { code: "SH", label: "Sherpa", flag: "🏔️" },
];

// International languages
const intlLangs: { code: Language; label: string; flag: string }[] = [
    { code: "ZH", label: "中文", flag: "🇨🇳" },
    { code: "TH", label: "ไทย", flag: "🇹🇭" },
    { code: "FR", label: "Français", flag: "🇫🇷" },
];

const allLangs = [...regionalLangs, ...himalayanLangs, ...intlLangs];

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = allLangs.find(l => l.code === language) || allLangs[0];

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-slate-700"
            >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                <span className="text-xs font-medium hidden sm:inline">{currentLang.flag} {currentLang.label}</span>
                <span className="text-xs font-medium sm:hidden">{currentLang.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full right-0 mt-2 w-64 sm:w-72 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
                        >
                            {/* Regional */}
                            <div className="p-3 border-b border-slate-100">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold px-2">Regional</span>
                                <div className="grid grid-cols-2 gap-1 mt-2">
                                    {regionalLangs.map((lang) => (
                                        <motion.button
                                            key={lang.code}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                                            className={`text-left px-3 py-2.5 text-sm rounded-lg transition-all ${language === lang.code
                                                    ? "bg-amber-500 text-white font-medium shadow-md"
                                                    : "hover:bg-slate-50 text-slate-700"
                                                }`}
                                        >
                                            {lang.flag} {lang.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Himalayan */}
                            <div className="p-3 border-b border-slate-100">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold px-2">Himalayan</span>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {himalayanLangs.map((lang) => (
                                        <motion.button
                                            key={lang.code}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                                            className={`px-3 py-2.5 text-sm rounded-lg transition-all ${language === lang.code
                                                    ? "bg-amber-500 text-white font-medium shadow-md"
                                                    : "hover:bg-slate-50 text-slate-700"
                                                }`}
                                        >
                                            {lang.flag} {lang.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* International */}
                            <div className="p-3">
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold px-2">International</span>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {intlLangs.map((lang) => (
                                        <motion.button
                                            key={lang.code}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                                            className={`px-3 py-2.5 text-sm rounded-lg transition-all ${language === lang.code
                                                    ? "bg-amber-500 text-white font-medium shadow-md"
                                                    : "hover:bg-slate-50 text-slate-700"
                                                }`}
                                        >
                                            {lang.flag} {lang.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageToggle;
