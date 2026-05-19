"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import AccountPill from "@/components/layout/AccountPill";

const navLinks = [
  { href: "/", key: "nav.home", defaultLabel: "Home" },
  { href: "/why", key: "nav.why", defaultLabel: "Story" },
  { href: "/voices", key: "nav.voices", defaultLabel: "Voices" },
  { href: "/economy", key: "nav.economy", defaultLabel: "Opportunity" },
  { href: "/services", key: "nav.services", defaultLabel: "Services" },
  { href: "/village", key: "nav.village", defaultLabel: "Talent" },
  { href: "/gallery", key: "nav.gallery", defaultLabel: "Gallery" },
  { href: "/hub", key: "nav.hub", defaultLabel: "Hub" },
];

export default function RecordNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHomeHeroMode = pathname === "/" && !scrolled;
  const navSurface = isHomeHeroMode
    ? "bg-transparent border-transparent"
    : "bg-white/88 border-stone-200/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl";
  const textColor = isHomeHeroMode ? "text-white" : "text-stone-900";
  const linkColor = isHomeHeroMode
    ? "text-white/78 hover:text-white"
    : "text-stone-600 hover:text-stone-950";

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${navSurface}`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
          <Link
            href="/"
            aria-label="Sunaray Gaon — home"
            className="group relative inline-flex items-baseline gap-2"
          >
            <span
              className="font-serif text-xl tracking-wide brand-gold-text transition-transform duration-300 group-hover:scale-[1.04] sm:text-[1.4rem]"
              style={{
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Sunaray
            </span>
            <span
              className={`font-serif text-[0.78rem] uppercase tracking-[0.32em] transition-colors duration-300 group-hover:text-amber-300 ${
                isHomeHeroMode ? "text-white/80" : "text-stone-600"
              }`}
            >
              Gaon
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${active ? textColor : linkColor}`}
                >
                  {t(link.key)}
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-amber-300 transition-transform duration-300 ease-out ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageToggle />
            <AccountPill variant={isHomeHeroMode ? "dark" : "light"} />
            <Link
              href="/partners"
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                isHomeHeroMode
                  ? "border-white/20 bg-white/10 text-white hover:bg-white/16"
                  : "border-stone-200 bg-stone-950 text-white hover:bg-stone-800"
              }`}
            >
              {t("nav.partners") || "Enquire"}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle menu"
              className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                isHomeHeroMode
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-stone-200 bg-white text-stone-900"
              }`}
            >
              Menu
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-4 top-20 z-50 rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] lg:hidden"
            >
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>

              <div className="mt-4 space-y-3 border-t border-stone-200 pt-4">
                <div onClick={() => setMobileOpen(false)}>
                  <AccountPill variant="light" />
                </div>
                <Link
                  href="/partners"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl bg-stone-950 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white"
                >
                  {t("nav.partners") || "Start an enquiry"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
