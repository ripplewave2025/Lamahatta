"use client";

import { useLanguage } from "@/context/LanguageContext";

const availableServices = [
    { id: 1, name: "Carpenter", count: 1, icon: "🪚" },
    { id: 4, name: "Cooks", count: 4, icon: "👨‍🍳" },
    { id: 5, name: "Digital Marketing", count: 5, icon: "📱" },
    { id: 6, name: "Website Managers", count: 6, icon: "💻" },
    { id: 7, name: "General Shop", count: 2, icon: "🏪" }, // Inferred count
    { id: 8, name: "Vegetable Shop", count: 1, icon: "🥦" },
    { id: 9, name: "Chicken Shop", count: 1, icon: "🍗" },
    { id: 10, name: "Housekeeping", count: 10, icon: "🧹" }, // Inferred
    { id: 11, name: "Waiters", count: 5, icon: "🍽️" },
    { id: 12, name: "Cabs", count: 8, icon: "🚖" },
    { id: 13, name: "Hotel Managers", count: 3, icon: "🏨" },
    { id: 14, name: "Receptionist", count: 2, icon: "📞" },
    { id: 15, name: "Tour Guide", count: 4, icon: "🗺️" },
];

const neededServices = [
    { id: 16, name: "Travel Agencies", icon: "✈️" },
    { id: 17, name: "Mobile Repair", icon: "🔧" },
    { id: 18, name: "Delivery Boys", icon: "📦" },
    { id: 19, name: "Groceries", icon: "🛒" },
    { id: 20, name: "Restaurants", icon: "🍜", urgent: true },
];

const ServiceDirectory = () => {
    const { t } = useLanguage();

    return (
        <section id="services" className="py-24 px-6 bg-[#fcfcfc] dark:bg-[#0f0f0f]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-sm uppercase tracking-[0.2em] text-accent font-semibold mb-4">{t("nav.services")}</h2>
                    <h3 className="section-title">Village Ecosystem</h3>
                    <p className="text-foreground/60 leading-relaxed font-light max-w-2xl">
                        A living directory of Seemana Gaon&apos;s human capital. We connect local demand with local supply.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Available Services */}
                    <div>
                        <h4 className="text-xl font-light mb-8 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Active Services
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {availableServices.map((service) => (
                                <div key={service.id} className="bg-white dark:bg-[#1a1a1a] p-4 border border-black/5 dark:border-white/5 hover:border-accent transition-colors group">
                                    <div className="text-2xl mb-2">{service.icon}</div>
                                    <div className="text-sm font-medium group-hover:text-accent transition-colors">{service.name}</div>
                                    <div className="text-xs text-foreground/40 mt-1">{service.count} Active</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Needs / Opportunities */}
                    <div>
                        <h4 className="text-xl font-light mb-8 flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                            Opportunities (Gap)
                        </h4>
                        <div className="bg-orange-50/50 dark:bg-orange-950/20 p-8 border border-orange-100 dark:border-orange-900/30">
                            <p className="text-sm mb-6 text-foreground/70">
                                These sectors have high local demand but zero supply.
                                <strong className="text-orange-600 dark:text-orange-400"> Ideal for investment.</strong>
                            </p>
                            <div className="space-y-4">
                                {neededServices.map((service) => (
                                    <div key={service.id} className={`flex items-center justify-between p-4 bg-white dark:bg-[#1a1a1a] shadow-sm ${service.urgent ? 'border-l-4 border-orange-500' : ''}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{service.icon}</span>
                                            <span className="font-medium">{service.name}</span>
                                        </div>
                                        {service.urgent && (
                                            <span className="text-[10px] uppercase font-bold bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-2 py-1 rounded">
                                                High Priority
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceDirectory;
