"use client";

import { useState } from "react";

const InteractiveTools = () => {
    const [vote, setVote] = useState<string | null>(null);

    return (
        <section className="py-24 px-6 bg-[#f5f5f5] dark:bg-[#121212]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Micro-Survey */}
                <div className="bg-white dark:bg-black p-8 border-l-4 border-accent shadow-sm">
                    <h3 className="section-title text-2xl mb-6">Village Pulse</h3>
                    <p className="mb-8 text-foreground/60">
                        What is the most urgent facility needed in Seemana Gaon right now?
                    </p>

                    <div className="space-y-4">
                        {["Waste Management System", "Public Toilet at 9th Mile", "Community Hall", "ATM Kiosk"].map((option) => (
                            <button
                                key={option}
                                onClick={() => setVote(option)}
                                className={`w-full text-left p-4 border transition-all duration-300 flex justify-between items-center ${vote === option
                                        ? "border-accent bg-accent/5"
                                        : "border-black/10 dark:border-white/10 hover:border-accent/50"
                                    }`}
                            >
                                <span className={vote === option ? "font-bold" : ""}>{option}</span>
                                {vote === option && <span className="text-accent">✓</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Digital Seva / Govt Portal */}
                <div className="bg-blue-50 dark:bg-blue-950/20 p-8 border border-blue-100 dark:border-blue-900/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-blue-500 text-white text-[10px] uppercase font-bold px-8 py-6 rotate-45 shadow-lg">
                        BETA
                    </div>

                    <h3 className="section-title text-2xl mb-6">Digital Seva Kendra</h3>
                    <p className="mb-8 text-foreground/70">
                        Access government grants, download forms, and check scheme eligibility directly from the village.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button className="p-4 bg-white dark:bg-[#1a1a1a] text-center hover:shadow-md transition-shadow">
                            <span className="block text-2xl mb-2">📜</span>
                            <span className="text-xs uppercase font-bold">Land Records</span>
                        </button>
                        <button className="p-4 bg-white dark:bg-[#1a1a1a] text-center hover:shadow-md transition-shadow">
                            <span className="block text-2xl mb-2">💊</span>
                            <span className="text-xs uppercase font-bold">Health Card</span>
                        </button>
                        <button className="p-4 bg-white dark:bg-[#1a1a1a] text-center hover:shadow-md transition-shadow">
                            <span className="block text-2xl mb-2">👵</span>
                            <span className="text-xs uppercase font-bold">Pension</span>
                        </button>
                        <button className="p-4 bg-white dark:bg-[#1a1a1a] text-center hover:shadow-md transition-shadow">
                            <span className="block text-2xl mb-2">🚜</span>
                            <span className="text-xs uppercase font-bold">Kisan Grant</span>
                        </button>
                    </div>

                    <button className="w-full py-4 bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors">
                        Login via Aadhaar (Simulation)
                    </button>
                </div>

            </div>
        </section>
    );
};

export default InteractiveTools;
