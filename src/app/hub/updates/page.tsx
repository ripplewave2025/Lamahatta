'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Megaphone, ArrowLeft, Calendar, AlertCircle, CheckCircle2, Clock } from "lucide-react"

const announcements = [
    {
        id: 1,
        title: "Water Supply Maintenance",
        type: "notice",
        date: "Feb 5, 2026",
        content: "Water supply will be interrupted from 10 AM - 2 PM for pipeline maintenance.",
        priority: "high"
    },
    {
        id: 2,
        title: "New Solar Panel Scheme",
        type: "scheme",
        date: "Feb 3, 2026",
        content: "Government subsidy available for solar panel installation. Apply by Feb 28.",
        priority: "normal"
    },
    {
        id: 3,
        title: "Community Meeting",
        type: "meeting",
        date: "Feb 8, 2026",
        content: "Monthly village meeting at 4 PM. Topics: Road repair, festival planning.",
        priority: "normal"
    }
]

export default function UpdatesPage() {
    const { t } = useLanguage()

    const getPriorityStyles = (priority: string) => {
        return priority === "high"
            ? "border-red-200 bg-red-50"
            : "border-emerald-100 bg-white"
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-green-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-emerald-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-emerald-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                            <Megaphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-earth">{t("hub.updates")}</h1>
                            <p className="text-xs text-muted">Village announcements</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-2xl mx-auto px-4 py-6">
                {/* Quick Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {["All", "Notices", "Schemes", "Meetings"].map((filter) => (
                        <button
                            key={filter}
                            className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm hover:bg-emerald-50 transition-colors whitespace-nowrap"
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Announcements */}
                <div className="space-y-4">
                    {announcements.map((item, index) => (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-2xl border p-5 ${getPriorityStyles(item.priority)}`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-lg ${item.priority === "high" ? "bg-red-100" : "bg-emerald-100"}`}>
                                    {item.priority === "high" ? (
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                    ) : item.type === "meeting" ? (
                                        <Calendar className="w-5 h-5 text-emerald-600" />
                                    ) : (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "notice" ? "bg-blue-100 text-blue-700" :
                                                item.type === "scheme" ? "bg-purple-100 text-purple-700" :
                                                    "bg-amber-100 text-amber-700"
                                            }`}>
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-muted flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {item.date}
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-lg text-earth mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted leading-relaxed">{item.content}</p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Subscribe Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-emerald-500 rounded-2xl p-6 text-white text-center"
                >
                    <Megaphone className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="text-lg font-serif mb-2">Never Miss an Update</h3>
                    <p className="text-white/80 text-sm mb-4">
                        Get village announcements delivered to your WhatsApp
                    </p>
                    <button className="px-5 py-2.5 bg-white text-emerald-600 rounded-full text-sm font-medium hover:bg-emerald-50 transition-colors">
                        Subscribe via WhatsApp
                    </button>
                </motion.div>
            </main>
        </div>
    )
}
