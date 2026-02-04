"use client";

import { motion } from "framer-motion";
import { WifiOff, Construction, Building2, AlertCircle } from "lucide-react";

interface Problem {
    id: number;
    title: string;
    description: string;
    severity: "critical" | "high" | "medium";
    progress: number;
    icon: React.ReactNode;
}

const problems: Problem[] = [
    {
        id: 1,
        title: "Internet Connectivity",
        description: "Poor cellphone and internet connectivity affecting daily life",
        severity: "critical",
        progress: 20,
        icon: <WifiOff className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Road Infrastructure",
        description: "1 Mile \"Bad Road\" needs reconstruction for better access",
        severity: "critical",
        progress: 10,
        icon: <Construction className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Village Attraction",
        description: "Need for a central attraction point (mall/community center)",
        severity: "high",
        progress: 5,
        icon: <Building2 className="w-6 h-6" />
    },
    {
        id: 4,
        title: "Walking Paths",
        description: "Multiple village paths need rebuilding and maintenance",
        severity: "medium",
        progress: 30,
        icon: <Construction className="w-6 h-6" />
    }
];

const getSeverityColor = (severity: string) => {
    switch (severity) {
        case "critical":
            return "text-red-400 bg-red-500/20 border-red-500/50";
        case "high":
            return "text-orange-400 bg-orange-500/20 border-orange-500/50";
        case "medium":
            return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50";
        default:
            return "text-accent bg-accent/20 border-accent/50";
    }
};

export default function ProblemTracker() {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <AlertCircle className="w-4 h-4 text-accent" />
                        <span className="text-white/80 text-sm uppercase tracking-wider">Infrastructure Needs</span>
                    </div>
                    <h2 className="section-title text-white">
                        Village <span className="gradient-text">Challenges</span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Tracking progress on critical village infrastructure improvements
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {problems.map((problem, index) => (
                        <motion.div
                            key={problem.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card group"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`p-3 rounded-full ${getSeverityColor(problem.severity)}`}>
                                    {problem.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-light text-white">
                                            {problem.title}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider border ${getSeverityColor(problem.severity)}`}>
                                            {problem.severity}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        {problem.description}
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-white/50 mb-2">
                                    <span>Progress</span>
                                    <span>{problem.progress}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full ${problem.severity === "critical"
                                                ? "bg-red-500"
                                                : problem.severity === "high"
                                                    ? "bg-orange-500"
                                                    : "bg-yellow-500"
                                            }`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${problem.progress}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-white/60 mb-6">
                        Want to contribute to village development?
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary"
                    >
                        Contact Village Committee
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
