"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import Link from "next/link";
import { useLanguage, Language } from "@/context/LanguageContext";

interface Challenge {
    title: string;
    description: string;
    status: "critical" | "ongoing" | "improving";
}

const localTranslations: Record<Language, {
    label: string;
    title: string;
    subtitle: string;
    statusCritical: string;
    statusOngoing: string;
    statusImproving: string;
    challenges: Challenge[];
    quote: string;
    realImages: string;
    notStock: string;
    placeholder: string;
    cta: string;
}> = {
    EN: {
        label: "Ground Reality",
        title: "What Still Needs Work",
        subtitle: "We do not hide our problems.",
        statusCritical: "Critical",
        statusOngoing: "Ongoing",
        statusImproving: "Improving",
        challenges: [
            {
                title: "Internet and Mobile Connectivity",
                description: "Unstable signal affects communication, work, and access to information.",
                status: "critical"
            },
            {
                title: "Road Access",
                description: "The main access road is incomplete. 1 mile of \"bad road\" needs reconstruction.",
                status: "critical"
            },
            {
                title: "Walking Paths",
                description: "Multiple village paths are unsafe and need rebuilding.",
                status: "ongoing"
            },
            {
                title: "Community Hub",
                description: "There is no shared public space inside the village — no mall, no community center.",
                status: "ongoing"
            }
        ],
        quote: "These are not complaints. They are constraints we design around.",
        realImages: "Real images are shown here",
        notStock: " — not stock photos.",
        placeholder: "[Village photos would be placed here]",
        cta: "Read About Access & Policy →"
    },
    NE: {
        label: "जमीनी वास्तविकता",
        title: "अझै के काम आवश्यक छ",
        subtitle: "हामी हाम्रा समस्याहरू लुकाउँदैनौं।",
        statusCritical: "गम्भीर",
        statusOngoing: "जारी छ",
        statusImproving: "सुधार हुँदैछ",
        challenges: [
            {
                title: "इन्टरनेट र मोबाइल जडान",
                description: "अस्थिर सिग्नलले सञ्चार, काम र सूचनाको पहुँचमा असर पार्छ।",
                status: "critical"
            },
            {
                title: "सडक पहुँच",
                description: "मुख्य पहुँच सडक अपूर्ण छ। १ माइल \"खराब सडक\" पुनर्निर्माण गर्नुपर्नेछ।",
                status: "critical"
            },
            {
                title: "हिड्ने बाटो",
                description: "गाउँका धेरै बाटाहरू असुरक्षित छन् र पुनर्निर्माण गर्नुपर्नेछ।",
                status: "ongoing"
            },
            {
                title: "सामुदायिक हब",
                description: "गाउँभित्र कुनै साझा सार्वजनिक ठाउँ छैन — न त मल, न त सामुदायिक केन्द्र।",
                status: "ongoing"
            }
        ],
        quote: "यी गुनासोहरू होइनन्। यी व्यवधानहरू हुन् जसलाई ध्यानमा राखेर हामी डिजाइन गर्छौं।",
        realImages: "यहाँ वास्तविक छविहरू देखाइएको छ",
        notStock: " — स्टक फोटो होइन।",
        placeholder: "[गाउँका फोटोहरू यहाँ राखिनेछ]",
        cta: "पहुँच र नीति बारे पढ्नुहोस् →"
    },
    HI: {
        label: "जमीनी हकीकत",
        title: "अभी क्या काम बाकी है",
        subtitle: "हम अपनी समस्याओं को छुपाते नहीं हैं।",
        statusCritical: "गंभीर",
        statusOngoing: "जारी है",
        statusImproving: "सुधार हो रहा है",
        challenges: [
            {
                title: "इंटरनेट और मोबाइल कनेक्टिविटी",
                description: "अस्थिर सिग्नल संचार, काम और जानकारी तक पहुँच को प्रभावित करता है।",
                status: "critical"
            },
            {
                title: "सड़क पहुँच",
                description: "मुख्य पहुंच मार्ग अधूरा है। 1 मील \"खराब सड़क\" के पुनर्निर्माण की आवश्यकता है।",
                status: "critical"
            },
            {
                title: "पैदल पथ",
                description: "गाँव के कई रास्ते असुरक्षित हैं और उन्हें फिर से बनाने की आवश्यकता है।",
                status: "ongoing"
            },
            {
                title: "सामुदायिक हब",
                description: "गाँव के अंदर कोई साझा सार्वजनिक स्थान नहीं है — कोई मॉल नहीं, कोई सामुदायिक केंद्र नहीं।",
                status: "ongoing"
            }
        ],
        quote: "ये शिकायतें नहीं हैं। ये वे बाधाएं हैं जिनके इर्द-गिर्द हम डिजाइन करते हैं।",
        realImages: "यहाँ वास्तविक चित्र दिखाए गए हैं",
        notStock: " — स्टॉक तस्वीरें नहीं।",
        placeholder: "[गाँव की तस्वीरें यहाँ रखी जाएँगी]",
        cta: "पहुँच और नीति के बारे में पढ़ें →"
    },
    BN: {
        label: "ভিত্তি বাস্তব",
        title: "এখনো কি কাজ বাকি আছে",
        subtitle: "আমরা আমাদের সমস্যাগুলি লুকিয়ে রাখি না।",
        statusCritical: "গুরুত্বপূর্ণ",
        statusOngoing: "চলমান",
        statusImproving: "উন্নতি ঘটছে",
        challenges: [
            {
                title: "ইন্টারনেট এবং মোবাইল সংযোগ",
                description: "অস্থির সিগন্যাল যোগাযোগ, কাজ এবং তথ্য অ্যাক্সেসকে প্রভাবিত করে।",
                status: "critical"
            },
            {
                title: "রাস্তা অ্যাক্সেস",
                description: "প্রধান প্রবেশ পথটি অসম্পূর্ণ। ১ মাইল \"খারাপ রাস্তা\" পুনর্নির্মাণ করা প্রয়োজন।",
                status: "critical"
            },
            {
                title: "হাঁটার পথ",
                description: "গ্রামের একাধিক পথ অনিরাপদ এবং পুনর্নির্মাণ প্রয়োজন।",
                status: "ongoing"
            },
            {
                title: "কমিউনিটি হাব",
                description: "গ্রামের ভেতরে কোনো যৌথ পাবলিক স্পেস নেই — কোনো মল নেই, কোনো কমিউনিটি সেন্টার নেই।",
                status: "ongoing"
            }
        ],
        quote: "এগুলি কোনও অভিযোগ নয়। এগুলি সীমাবদ্ধতা যার চারপাশে আমরা ডিজাইন করি।",
        realImages: "এখানে বাস্তব চিত্র দেখানো হয়েছে",
        notStock: " — স্টক ফটো নয়।",
        placeholder: "[গ্রামের ছবি এখানে রাখা হবে]",
        cta: "অ্যাক্সেস এবং পলিসি সম্পর্কে পড়ুন →"
    }
};

export default function ChallengesPage() {
    const { language } = useLanguage();
    const t = localTranslations[language] || localTranslations.EN;

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "critical": return t.statusCritical;
            case "ongoing": return t.statusOngoing;
            case "improving": return t.statusImproving;
            default: return status;
        }
    };

    return (
        <div className="min-h-screen">
            <PageHeader
                label={t.label}
                title={t.title}
                subtitle={t.subtitle}
            />

            <section className="section">
                <div className="page-narrow">
                    <div className="space-y-6">
                        {t.challenges.map((challenge, index) => (
                            <motion.div
                                key={challenge.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="problem-card"
                            >
                                <span className={`problem-status status-${challenge.status}`}>
                                    {getStatusLabel(challenge.status)}
                                </span>
                                <h3 className="text-xl font-serif mb-2">
                                    {challenge.title}
                                </h3>
                                <p className="text-muted text-sm">
                                    {challenge.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <PullQuote>
                        {t.quote}
                    </PullQuote>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 p-6 bg-warmgray border border-border"
                    >
                        <p className="text-sm text-muted mb-4">
                            <strong className="text-text">{t.realImages}</strong>{t.notStock}
                        </p>
                        <p className="text-xs text-muted opacity-70">
                            {t.placeholder}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Link href="/policy" className="btn-secondary">
                            {t.cta}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
