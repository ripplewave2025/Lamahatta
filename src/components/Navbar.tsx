"use client";

import { useState } from "react";
import Link from "next/link";
import LanguageToggle from "./LanguageToggle";
import MobileMenu from "./MobileMenu";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "About Sunaray", href: "#about" },
    { label: "The Collection", href: "#collection" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Appointment", href: "#visit" },
    { label: "Events", href: "#events" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter uppercase whitespace-nowrap">
            Sunaray<span className="text-accent">Gown</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA & Language */}
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageToggle />

            {/* Hidden on small mobile */}
            <Link href="/village" className="hidden md:block text-sm font-medium hover:text-accent transition-colors">
              Village
            </Link>
            <Link href="/auth" className="hidden sm:flex btn-primary !px-6 !py-2.5 text-[10px]">
              Join Village
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
};

export default Navbar;
