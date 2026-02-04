'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { Brain, ArrowLeft, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react"

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
        <div className="min-h-screen bg-gradient-to-b from-fuchsia-50 via-white to-pink-50">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-fuchsia-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/hub" className="p-2 hover:bg-fuchsia-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-fuchsia-600" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-serif text-earth">{t("personality.title")}</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {!showResult ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-serif text-earth mb-3">{t("personality.subtitle")}</h2>
                            <p className="text-muted">
                                Rate yourself from 1 (Disagree Strongly) to 7 (Agree Strongly). <br />
                                Be honest. God—and the neighbors—are watching.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {questions.map((q, i) => (
                                <div key={q.id} className="bg-white p-6 rounded-2xl border border-fuchsia-100 shadow-sm">
                                    <div className="mb-4">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="text-fuchsia-500 font-bold text-lg">{i + 1}.</span>
                                            <h3 className="font-medium text-lg text-earth">{q.text}</h3>
                                        </div>
                                        <p className="text-sm text-gray-500 ml-6">{q.sub}</p>
                                    </div>

                                    <div className="flex justify-between items-center gap-2 mt-4 px-2">
                                        <span className="text-xs text-muted w-16 text-right hidden sm:block">Disagree</span>
                                        <div className="flex-1 flex justify-between gap-1">
                                            {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                                                <button
                                                    key={val}
                                                    onClick={() => handleRate(q.id, val)}
                                                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${answers[q.id] === val
                                                            ? 'bg-fuchsia-500 text-white scale-110 shadow-lg ring-2 ring-fuchsia-200'
                                                            : 'bg-fuchsia-50 text-fuchsia-900 hover:bg-fuchsia-100'
                                                        }`}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted w-16 hidden sm:block">Agree</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-muted sm:hidden mt-2 px-1">
                                        <span>Disagree</span>
                                        <span>Agree</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 text-center">
                            <button
                                onClick={calculateResults}
                                disabled={Object.keys(answers).length < 10}
                                className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-full font-medium text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                            >
                                {t("personality.submit")}
                            </button>
                            {Object.keys(answers).length < 10 && (
                                <p className="text-xs text-red-500 mt-2">Please answer all questions!</p>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-serif text-earth mb-2">The Truth Revealed 🔮</h2>
                            <p className="text-muted">Here is your Sunaray Gown personality profile.</p>
                        </div>

                        <div className="grid gap-6">
                            {Object.entries(scores).map(([trait, score], i) => (
                                <motion.div
                                    key={trait}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-fuchsia-100 shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="capitalize font-serif text-xl text-fuchsia-700">
                                            {trait.replace(/([A-Z])/g, ' $1').trim()}
                                        </h3>
                                        <div className="px-3 py-1 bg-fuchsia-50 text-fuchsia-700 rounded-full text-sm font-bold">
                                            {score.toFixed(1)} / 7
                                        </div>
                                    </div>

                                    {/* Bar */}
                                    <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-fuchsia-400 to-pink-500 rounded-full"
                                            style={{ width: `${(score / 7) * 100}%` }}
                                        />
                                    </div>

                                    <p className="text-earth/80 italic font-medium leading-relaxed">
                                        "{getSavageDescription(trait, score)}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 text-center flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setShowResult(false)
                                    setAnswers({})
                                    window.scrollTo(0, 0)
                                }}
                                className="flex items-center gap-2 px-6 py-3 border border-fuchsia-200 text-fuchsia-700 rounded-full hover:bg-fuchsia-50 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                {t("personality.retake")}
                            </button>
                            <Link
                                href="/hub"
                                className="flex items-center gap-2 px-6 py-3 bg-fuchsia-600 text-white rounded-full hover:bg-fuchsia-700 transition-colors"
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
