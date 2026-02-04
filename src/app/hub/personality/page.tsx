'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Brain, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react"

// Ten-Item Personality Inventory (TIPI)
const questions = [
    { id: 1, text: "Extraverted, enthusiastic", sub: "बहिर्मुखी, उत्साही" },
    { id: 2, text: "Critical, quarrelsome", sub: "आलोचनात्मक, झगडालु" },
    { id: 3, text: "Dependable, self-disciplined", sub: "भरपर्दो, आत्म-अनुशासित" },
    { id: 4, text: "Anxious, easily upset", sub: "चिन्तित, सजिलै अशान्त हुने" },
    { id: 5, text: "Open to new experiences, complex", sub: "नयाँ अनुभवहरूप्रति खुला, जटिल" },
    { id: 6, text: "Reserved, quiet", sub: "आरक्षित, शान्त" },
    { id: 7, text: "Sympathetic, warm", sub: "सहानुभूतिशील, न्यानो" },
    { id: 8, text: "Disorganized, careless", sub: "अव्यवस्थित, लापरवाह" },
    { id: 9, text: "Calm, emotionally stable", sub: "शान्त, भावनात्मक रूपले स्थिर" },
    { id: 10, text: "Conventional, uncreative", sub: "परम्परागत, असृजनशील" }
]

export default function PersonalityPage() {
    const { t } = useLanguage()
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [showResult, setShowResult] = useState(false)
    const [scores, setScores] = useState<Record<string, number>>({})

    const handleRate = (id: number, value: number) => {
        setAnswers(prev => ({ ...prev, [id]: value }))
    }

    const calculateResults = () => {
        // Reverse items: 2, 4, 6, 8, 10
        const getScore = (id: number) => {
            const val = answers[id] || 4 // Default middle
            return [2, 4, 6, 8, 10].includes(id) ? (8 - val) : val
        }

        const traits = {
            extraversion: (getScore(1) + getScore(6)) / 2,
            agreeableness: (getScore(2) + getScore(7)) / 2,
            conscientiousness: (getScore(3) + getScore(8)) / 2,
            emotionalStability: (getScore(4) + getScore(9)) / 2,
            openness: (getScore(5) + getScore(10)) / 2
        }

        setScores(traits)
        setShowResult(true)
        window.scrollTo(0, 0)
    }

    const getSavageDescription = (trait: string, score: number) => {
        if (trait === 'extraversion') {
            return score > 4.5
                ? "Timro Extraversion high cha — gau ko sabai sathiharu sanga ramailo garne type! You probably crash every bio without an invite."
                : "Timro Extraversion low cha. You prefer talking to the cows than the neighbors. Peace lover, huh?"
        }
        if (trait === 'agreeableness') {
            return score > 4.5
                ? "So nice! You'd probably apologize to a lamppost if you bumped into it. Ama loves you."
                : "Ali katu chau! You argue just for fun at the tea shop. Careful, getting labeled 'jhagadalu' acts fast here."
        }
        if (trait === 'conscientiousness') {
            return score > 4.5
                ? "Wow, very reliable. You're the one organizing the village meeting while everyone else is late."
                : "Bholi badau! Procrastination is your middle name. 'Kei chaina, bholi garula' is your motto."
        }
        if (trait === 'emotionalStability') {
            return score > 4.5
                ? "Solid as a rock. Even an earthquake implies 'just a shake' to you."
                : "Drama queen/king! Chito risaune, chito runey. Take a deep breath of clean Lamahatta air."
        }
        if (trait === 'openness') {
            return score > 4.5
                ? "Creative soul. You probably want to start a fusion homestay with avocado toast."
                : "Traditionalist. You like your tea sweet and your timeline straight. 'Purano is gold' type."
        }
        return ""
    }

    return (
        <div className="min-h-screen relative font-sans">
            {/* Background System */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 block md:hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/mobile-bg.jpg')" }} />
                <div className="absolute inset-0 hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('/images/desktop-bg.jpg')" }} />
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md" /> {/* Lighter overlay for readability */}
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-fuchsia-100 relative">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-fuchsia-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-fuchsia-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center shadow-md">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-gray-900">{t("personality.title")}</h1>
                            <p className="text-xs text-fuchsia-600 font-medium">Bilingual Mode: Eng / Nep</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8 relative z-10">
                {!showResult ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-3">{t("personality.subtitle")}</h2>
                            <p className="text-gray-600">
                                Rate yourself from 1 (Disagree) to 7 (Agree). <br />
                                <span className="text-fuchsia-600 font-medium">Be honest!</span>
                            </p>
                        </div>

                        <div className="space-y-6">
                            {questions.map((q, i) => (
                                <motion.div
                                    key={q.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white/80 p-6 rounded-2xl border border-white shadow-sm ring-1 ring-black/5"
                                >
                                    <div className="mb-6 border-b border-gray-100 pb-4">
                                        <div className="flex items-start gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center font-bold">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <h3 className="text-xl font-medium text-gray-900">{q.text}</h3>
                                                <p className="text-lg text-fuchsia-700 font-serif mt-1">{q.sub}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center gap-2">
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider w-16 text-right hidden sm:block">Disagree</span>
                                        <div className="flex-1 flex justify-between gap-1 sm:gap-2">
                                            {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                                                <button
                                                    key={val}
                                                    onClick={() => handleRate(q.id, val)}
                                                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${answers[q.id] === val
                                                            ? 'bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white scale-110 shadow-lg ring-2 ring-fuchsia-200'
                                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                                        }`}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider w-16 hidden sm:block">Agree</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-gray-400 sm:hidden mt-3 px-1 font-medium tracking-wide uppercase">
                                        <span>Disagree</span>
                                        <span>Agree</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 text-center pb-20">
                            <button
                                onClick={calculateResults}
                                disabled={Object.keys(answers).length < 10}
                                className="px-10 py-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 ring-4 ring-white"
                            >
                                {t("personality.submit")}
                            </button>
                            {Object.keys(answers).length < 10 && (
                                <p className="text-sm text-red-500 mt-4 bg-red-50 inline-block px-4 py-1 rounded-full">
                                    Please answer all 10 questions!
                                </p>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6 pb-20"
                    >
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-3xl mx-auto flex items-center justify-center shadow-lg mb-6 rotate-3">
                                <Brain className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3">Your Results</h2>
                            <p className="text-gray-500">Based on the Big Five (TIPI) Model</p>
                        </div>

                        <div className="grid gap-6">
                            {Object.entries(scores).map(([trait, score], i) => (
                                <motion.div
                                    key={trait}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="capitalize font-serif text-xl border-b-2 border-fuchsia-100 pb-1">
                                            {trait.replace(/([A-Z])/g, ' $1').trim()}
                                        </h3>
                                        <div className="px-4 py-1 bg-gray-900 text-white rounded-full text-sm font-bold">
                                            {score.toFixed(1)} / 7
                                        </div>
                                    </div>

                                    {/* Bar */}
                                    <div className="w-full h-3 bg-gray-100 rounded-full mb-6 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full"
                                            style={{ width: `${(score / 7) * 100}%` }}
                                        />
                                    </div>

                                    <div className="bg-fuchsia-50 p-4 rounded-xl border border-fuchsia-100">
                                        <p className="text-gray-800 italic font-medium leading-relaxed">
                                            "{getSavageDescription(trait, score)}"
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-10 text-center flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setShowResult(false)
                                    setAnswers({})
                                    window.scrollTo(0, 0)
                                }}
                                className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <RefreshCw className="w-4 h-4" />
                                {t("personality.retake")}
                            </button>
                            <Link
                                href="/hub"
                                className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-colors shadow-lg"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Done
                            </Link>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    )
}
