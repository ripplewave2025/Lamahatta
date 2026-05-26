"use client";

import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";
import Image from "next/image";
import { useLanguage, Language } from "@/context/LanguageContext";

interface Talent {
    id: number;
    name: string;
    title: string;
    specialty: string;
    image: string;
    rating: number;
}

const localTranslations: Record<Language, {
    excellence: string;
    title1: string;
    title2: string;
    subtitle: string;
    talents: Talent[];
    footerTitle: string;
    footerCTA: string;
}> = {
    EN: {
        excellence: "Village Excellence",
        title1: "Featured",
        title2: "Talents",
        subtitle: "Celebrating the exceptional skills and artistry of our village members",
        talents: [
            {
                id: 1,
                name: "Best Chef",
                title: "Culinary Master",
                specialty: "Traditional Himalayan Cuisine",
                image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400",
                rating: 5
            },
            {
                id: 2,
                name: "Best Videographer",
                title: "Visual Storyteller",
                specialty: "Documentary & Events",
                image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400",
                rating: 5
            },
            {
                id: 3,
                name: "Best Dancer",
                title: "Cultural Performer",
                specialty: "Traditional Dance",
                image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
                rating: 5
            },
            {
                id: 4,
                name: "Best Singer",
                title: "Vocal Artist",
                specialty: "Folk & Modern Music",
                image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
                rating: 5
            }
        ],
        footerTitle: "Have a special talent? Join our featured members!",
        footerCTA: "Nominate a Talent"
    },
    NE: {
        excellence: "गाउँको उत्कृष्टता",
        title1: "विशेष",
        title2: "प्रतिभाहरू",
        subtitle: "हाम्रा गाउँका सदस्यहरूको असाधारण सीप र कलाको उत्सव मनाउँदै",
        talents: [
            {
                id: 1,
                name: "सर्वश्रेष्ठ शेफ",
                title: "पाक कला विशेषज्ञ",
                specialty: "पारम्परिक हिमाली व्यञ्जन",
                image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400",
                rating: 5
            },
            {
                id: 2,
                name: "सर्वश्रेष्ठ भिडियोग्राफर",
                title: "दृश्य कथाकार",
                specialty: "वृत्तचित्र र कार्यक्रमहरू",
                image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400",
                rating: 5
            },
            {
                id: 3,
                name: "सर्वश्रेष्ठ नर्तक",
                title: "सांस्कृतिक कलाकार",
                specialty: "पारम्परिक नृत्य",
                image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
                rating: 5
            },
            {
                id: 4,
                name: "सर्वश्रेष्ठ गायक",
                title: "कण्ठ कलाकार",
                specialty: "लोक र आधुनिक संगीत",
                image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
                rating: 5
            }
        ],
        footerTitle: "विशेष प्रतिभा छ? हाम्रा विशेष सदस्यहरूमा सामेल हुनुहोस्!",
        footerCTA: "प्रतिभा मनोनयन गर्नुहोस्"
    },
    HI: {
        excellence: "गाँव की उत्कृष्टता",
        title1: "विशेष",
        title2: "प्रतिभाएँ",
        subtitle: "हमारे गाँव के सदस्यों के असाधारण कौशल और कलात्मकता का जश्न मनाना",
        talents: [
            {
                id: 1,
                name: "सर्वश्रेष्ठ शेफ",
                title: "पाक कला विशेषज्ञ",
                specialty: "पारंपरिक हिमालयी व्यंजन",
                image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400",
                rating: 5
            },
            {
                id: 2,
                name: "सर्वश्रेष्ठ वीडियोग्राफर",
                title: "दृश्य कहानीकार",
                specialty: "वृत्तचित्र और कार्यक्रम",
                image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400",
                rating: 5
            },
            {
                id: 3,
                name: "सर्वश्रेष्ठ नर्तक",
                title: "सांस्कृतिक कलाकार",
                specialty: "पारंपरिक नृत्य",
                image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
                rating: 5
            },
            {
                id: 4,
                name: "सर्वश्रेष्ठ गायक",
                title: "गायक कलाकार",
                specialty: "लोक और आधुनिक संगीत",
                image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
                rating: 5
            }
        ],
        footerTitle: "कोई विशेष प्रतिभा है? हमारे विशेष सदस्यों में शामिल हों!",
        footerCTA: "एक प्रतिभा नामांकित करें"
    },
    BN: {
        excellence: "গ্রামের শ্রেষ্ঠত্ব",
        title1: "ফিচার্ড",
        title2: "প্রতিভা",
        subtitle: "আমাদের গ্রামের সদস্যদের অনন্য দক্ষতা এবং শৈল্পিকতা উদযাপন করা",
        talents: [
            {
                id: 1,
                name: "সেরা শেফ",
                title: "রন্ধনশিল্পের মাস্টার",
                specialty: "ঐতিহ্যবাহী হিমালয় রন্ধনশৈলী",
                image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400",
                rating: 5
            },
            {
                id: 2,
                name: "সেরা ভিডিওগ্রাফার",
                title: "ভিজ্যুয়াল গল্পকার",
                specialty: "প্রামাণ্যচিত্র এবং ঘটনা",
                image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400",
                rating: 5
            },
            {
                id: 3,
                name: "সেরা নৃত্যশিল্পী",
                title: "সাংস্কৃতিক অভিনয়শিল্পী",
                specialty: "ঐতিহ্যবাহী নৃত্য",
                image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
                rating: 5
            },
            {
                id: 4,
                name: "সেরা গায়ক",
                title: "কণ্ঠশিল্পী",
                specialty: "লোক ও আধুনিক গান",
                image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
                rating: 5
            }
        ],
        footerTitle: "বিশেষ কোনো প্রতিভা আছে? আমাদের ফিচার্ড সদস্যদের সাথে যোগ দিন!",
        footerCTA: "একটি প্রতিভা মনোনীত করুন"
    }
};

export default function FeaturedTalents() {
    const { language } = useLanguage();
    const t = localTranslations[language] || localTranslations.EN;

    return (
        <section className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="text-white/80 text-sm uppercase tracking-wider">{t.excellence}</span>
                    </div>
                    <h2 className="section-title text-white">
                        {t.title1} <span className="gradient-text">{t.title2}</span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {t.talents.map((talent, index) => (
                        <motion.div
                            key={talent.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="glass-card p-0 overflow-hidden hover-glow">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                                    <Image
                                        src={talent.image}
                                        alt={talent.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 250px"
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Award Badge */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="p-3 rounded-full bg-accent/90 backdrop-blur-sm animate-pulse-glow">
                                            <Award className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-light text-white mb-1">
                                        {talent.name}
                                    </h3>
                                    <p className="text-accent text-sm mb-2">
                                        {talent.title}
                                    </p>
                                    <p className="text-white/60 text-sm mb-4">
                                        {talent.specialty}
                                    </p>

                                    {/* Rating */}
                                    <div className="flex gap-1">
                                        {[...Array(talent.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-accent text-accent"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/60 mb-6 text-lg">
                        {t.footerTitle}
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary"
                    >
                        {t.footerCTA}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
