"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Globe } from "lucide-react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navItems: { label: string; href: string }[];
}

const MobileMenu = ({ isOpen, onClose, navItems }: MobileMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Menu Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white dark:bg-[#0a0a0a] z-[70] shadow-2xl p-8 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <span className="text-xl font-bold tracking-tighter uppercase">
                                Sunaray<span className="text-accent">Gown</span>
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <nav className="flex-1 flex flex-col gap-6">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={onClose}
                                        className="text-2xl font-light tracking-tight hover:text-accent transition-colors block"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + navItems.length * 0.05 }}
                                className="h-px bg-foreground/10 my-4"
                            />

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + navItems.length * 0.05 }}
                            >
                                <Link
                                    href="/hub"
                                    onClick={onClose}
                                    className="text-2xl font-light tracking-tight hover:text-accent transition-colors block"
                                >
                                    Village Hub
                                </Link>
                                <Link
                                    href="/hub/personality"
                                    onClick={onClose}
                                    className="text-lg font-light tracking-tight text-accent mt-2 block"
                                >
                                    → Take Personality Test
                                </Link>
                            </motion.div>
                        </nav>

                        <div className="mt-auto space-y-4">
                            <Link
                                href="/auth"
                                onClick={onClose}
                                className="w-full btn-primary !h-14 flex items-center justify-center text-sm"
                            >
                                JOIN VILLAGE
                            </Link>
                            <p className="text-xs text-center text-foreground/40 font-medium tracking-widest uppercase">
                                Lamahatta Digital OS
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
