"use client";

import { useLanguage, Language } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

// The 4 core languages requested by the user
const coreLangs: { code: Language; label: string; flag: string }[] = [
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "NE", label: "नेपाली", flag: "🇳🇵" },
    { code: "HI", label: "हिंदी", flag: "🇮🇳" },
    { code: "BN", label: "বাংলা", flag: "🇧🇩" },
];

const LanguageToggle = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = coreLangs.find(l => l.code === language) || coreLangs[0];

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border border-slate-200 transition-all text-slate-700 shadow-sm"
            >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
                <span className="text-xs font-semibold hidden sm:inline">{currentLang.flag} {currentLang.label}</span>
                <span className="text-xs font-semibold sm:hidden">{currentLang.flag}</span>
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
                            className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 p-1.5"
                        >
                            <div className="flex flex-col gap-1">
                                {coreLangs.map((lang) => (
                                    <motion.button
                                        key={lang.code}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => { 
                                            setLanguage(lang.code); 
                                            setIsOpen(false); 
                                        }}
                                        className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all ${
                                            language === lang.code
                                                ? "bg-amber-500 text-white font-medium shadow-sm"
                                                : "hover:bg-slate-50 text-slate-700"
                                        }`}
                                    >
                                        <span className="text-base">{lang.flag}</span>
                                        <span>{lang.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageToggle;
