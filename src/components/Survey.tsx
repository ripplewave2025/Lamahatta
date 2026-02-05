"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Send, CheckCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Question {
    id: number;
    question: string;
    type: "text" | "rating" | "choice";
    options?: string[];
}

const questions: Question[] = [
    {
        id: 1,
        question: "What services do you currently need in the village?",
        type: "text"
    },
    {
        id: 2,
        question: "How would you rate internet connectivity?",
        type: "rating"
    },
    {
        id: 3,
        question: "What would improve village life the most?",
        type: "choice",
        options: ["Better Roads", "More Services", "Improved Connectivity", "Community Center"]
    }
];

export default function Survey() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string | number>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sessionId, setSessionId] = useState("");

    // Generate unique session ID on mount
    useEffect(() => {
        setSessionId(`survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }, []);

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const supabase = createClient();

            // Format answers with question text for clarity
            const formattedAnswers = questions.reduce((acc, q) => {
                acc[q.question] = answers[q.id] || null;
                return acc;
            }, {} as Record<string, string | number | null>);

            const { error } = await supabase
                .from('survey_responses')
                .insert({
                    session_id: sessionId,
                    answers: formattedAnswers,
                    user_agent: typeof window !== 'undefined' ? navigator.userAgent : null,
                    language: typeof window !== 'undefined' ? navigator.language : 'en'
                });

            if (error) {
                console.error('Survey submission error:', error);
            }

            setIsSubmitted(true);
        } catch (err) {
            console.error('Survey error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAnswer = (value: string | number) => {
        setAnswers({ ...answers, [currentQuestion.id]: value });
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card max-w-md mx-auto text-center p-12"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                >
                    <CheckCircle className="w-20 h-20 text-accent mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl font-light text-white mb-4">Thank You!</h3>
                <p className="text-white/70">
                    Your feedback helps us improve village services and infrastructure.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>Question {currentStep + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full accent-gradient"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 mb-8"
                >
                    <h3 className="text-2xl font-light text-white mb-6">
                        {currentQuestion.question}
                    </h3>

                    {currentQuestion.type === "text" && (
                        <textarea
                            className="w-full bg-white/5 border border-white/20 rounded-lg p-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                            rows={4}
                            placeholder="Your answer..."
                            value={(answers[currentQuestion.id] as string) || ""}
                            onChange={(e) => handleAnswer(e.target.value)}
                        />
                    )}

                    {currentQuestion.type === "rating" && (
                        <div className="flex gap-3 justify-center">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <motion.button
                                    key={rating}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAnswer(rating)}
                                    className={`w-14 h-14 rounded-full border-2 transition-all ${answers[currentQuestion.id] === rating
                                        ? "border-accent bg-accent text-white"
                                        : "border-white/20 text-white/60 hover:border-accent/50"
                                        }`}
                                >
                                    {rating}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {currentQuestion.type === "choice" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.options?.map((option) => (
                                <motion.button
                                    key={option}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(option)}
                                    className={`p-4 rounded-lg border-2 transition-all text-left ${answers[currentQuestion.id] === option
                                        ? "border-accent bg-accent/20 text-white"
                                        : "border-white/20 text-white/80 hover:border-accent/50"
                                        }`}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="btn-secondary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </motion.button>

                {currentStep === questions.length - 1 ? (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn-primary flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        className="btn-primary flex items-center gap-2"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                )}
            </div>
        </div>
    );
}
