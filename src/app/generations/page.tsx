"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import Link from "next/link";
import { useLanguage, Language } from "@/context/LanguageContext";

interface TimelineEra {
    period: string;
    title: string;
    description: string[];
}

const localTranslations: Record<Language, {
    label: string;
    title: string;
    subtitle: string;
    shiftMessage: string;
    eras: TimelineEra[];
    quoteTitle: string;
    quoteBody: string;
    ctaPrimary: string;
    ctaSecondary: string;
}> = {
    EN: {
        label: "A Generation of Change",
        title: "From Land to Skill",
        subtitle: "This village did not change suddenly. It changed slowly.",
        shiftMessage: "Something shifted. People from this village now work as:",
        eras: [
            {
                period: "Before 2000",
                title: "Subsistence",
                description: [
                    "farming",
                    "cutting grass for cattle",
                    "raising pigs, hens, goats",
                    "daily wage labor on others' land",
                    "Education was limited. Mobility was limited.",
                    "Identity was often fixed by birth."
                ]
            },
            {
                period: "2000–2010",
                title: "Survival",
                description: [
                    "Seasonal migration increased",
                    "Children often worked alongside parents",
                    "Survival mattered more than aspiration"
                ]
            },
            {
                period: "2010–2020",
                title: "Exposure",
                description: [
                    "Mobile phones arrived",
                    "Internet exposure began",
                    "Tourism appeared nearby",
                    "Some service jobs became possible"
                ]
            },
            {
                period: "2020–Now",
                title: "Normalization",
                description: [
                    "nurses",
                    "police personnel",
                    "teachers",
                    "hotel professionals",
                    "chefs",
                    "product managers",
                    "software and AI engineers"
                ]
            }
        ],
        quoteTitle: "This is not \"success\".",
        quoteBody: "This is normalization — delayed, but real.",
        ctaPrimary: "What We Actually Do",
        ctaSecondary: "How We Remember"
    },
    NE: {
        label: "परिवर्तनको पुस्ता",
        title: "भूमिदेखि सीपसम्म",
        subtitle: "यो गाउँ अचानक परिवर्तन भएको होइन। यो बिस्तारै परिवर्तन भयो।",
        shiftMessage: "केही परिवर्तन भयो। यस गाउँका मानिसहरू अब यस रूपमा काम गर्छन्:",
        eras: [
            {
                period: "सन् २००० अघि",
                title: "निर्वाह",
                description: [
                    "खेतीपाती",
                    "गाईवस्तुका लागि घाँस काट्ने",
                    "सुँगुर, कुखुरा, बाख्रा पाल्ने",
                    "अरूको जग्गामा दैनिक ज्यालादारी",
                    "शिक्षा सीमित थियो। आवतजावत सीमित थियो।",
                    "पहिचान प्रायः जन्मले नै निश्चित हुन्थ्यो।"
                ]
            },
            {
                period: "२०००–२०१०",
                title: "अस्तित्व रक्षा",
                description: [
                    "मौसमी बसाइँसराइ बढ्यो",
                    "बालबालिकाहरू प्रायः आमाबाबुसँगै काम गर्थे",
                    "आकांक्षा भन्दा बाँच्नु बढी महत्त्वपूर्ण थियो"
                ]
            },
            {
                period: "२०१०–२०२०",
                title: "पहिचान",
                description: [
                    "मोबाइल फोन भित्रिए",
                    "इन्टरनेटको पहुँच सुरु भयो",
                    "नजिकै पर्यटन देखा पर्न थाल्यो",
                    "केही सेवामूलक कामहरू सम्भव भए"
                ]
            },
            {
                period: "२०२०–अहिले",
                title: "सामान्यीकरण",
                description: [
                    "नर्सहरू",
                    "प्रहरी कर्मचारी",
                    "शिक्षकहरू",
                    "होटल व्यवसायी",
                    "शेफहरू",
                    "उत्पादन प्रबन्धकहरू",
                    "सफ्टवेयर र एआई इन्जिनियरहरू"
                ]
            }
        ],
        quoteTitle: "यो \"सफलता\" होइन।",
        quoteBody: "यो सामान्यीकरण हो — ढिलो भयो, तर वास्तविक हो।",
        ctaPrimary: "हामी वास्तवमा के गर्छौं",
        ctaSecondary: "हामी कसरी सम्झन्छौं"
    },
    HI: {
        label: "परिवर्तन की एक पीढ़ी",
        title: "जमीन से कौशल तक",
        subtitle: "यह गाँव अचानक नहीं बदला। यह धीरे-धीरे बदला।",
        shiftMessage: "कुछ बदला। इस गाँव के लोग अब इस रूप में काम करते हैं:",
        eras: [
            {
                period: "2000 से पहले",
                title: "गुज़ारा",
                description: [
                    "खेती",
                    "मवेशियों के लिए घास काटना",
                    "सुअर, मुर्गियां, बकरियां पालना",
                    "दूसरों की जमीन पर दैनिक मजदूरी",
                    "शिक्षा सीमित थी। आवाजाही सीमित थी।",
                    "पहचान अक्सर जन्म से तय होती थी।"
                ]
            },
            {
                period: "2000–2010",
                title: "अस्तित्व",
                description: [
                    "मौसमी पलायन बढ़ा",
                    "बच्चे अक्सर माता-पिता के साथ काम करते थे",
                    "आकांक्षा से ज्यादा जीवित रहना मायने रखता था"
                ]
            },
            {
                period: "2010–2020",
                title: "एक्सपोजर",
                description: [
                    "मोबाइल फोन आए",
                    "इंटरनेट का प्रदर्शन शुरू हुआ",
                    "आसपास पर्यटन शुरू हुआ",
                    "कुछ सेवा कार्य संभव हुए"
                ]
            },
            {
                period: "2020–अब",
                title: "सामान्यीकरण",
                description: [
                    "नर्सें",
                    "पुलिस कर्मी",
                    "शिक्षक",
                    "होटल पेशेवर",
                    "शेफ",
                    "उत्पाद प्रबंधक (प्रोडक्ट मैनेजर)",
                    "सॉफ्टवेयर और एआई इंजीनियर"
                ]
            }
        ],
        quoteTitle: "यह \"सफलता\" नहीं है।",
        quoteBody: "यह सामान्यीकरण है — विलंबित, लेकिन वास्तविक।",
        ctaPrimary: "हम वास्तव में क्या करते हैं",
        ctaSecondary: "हम कैसे याद रखते हैं"
    },
    BN: {
        label: "পরিবর্তনের একটি প্রজন্ম",
        title: "জমি থেকে দক্ষতা",
        subtitle: "এই গ্রামটি হঠাৎ পরিবর্তিত হয়নি। এটি ধীরে ধীরে পরিবর্তিত হয়েছে।",
        shiftMessage: "কিছু পরিবর্তন এসেছে। এই গ্রামের মানুষ এখন নিম্নলিখিত পেশায় কাজ করে:",
        eras: [
            {
                period: "২০০০ এর আগে",
                title: "জীবনধারণ",
                description: [
                    "চাষাবাদ",
                    "গবাদি পশুর জন্য ঘাস কাটা",
                    "শূকর, মুরগি, ছাগল পালন",
                    "অন্যের জমিতে দিনমজুরি",
                    "শিক্ষা সীমিত ছিল। যাতায়াত সীমিত ছিল।",
                    "পরিচয় প্রায়শই জন্ম দ্বারা নির্ধারিত হত।"
                ]
            },
            {
                period: "২০০০–২০১০",
                title: "টিকে থাকা",
                description: [
                    "ঋতুভিত্তিক পরিযান বৃদ্ধি পেয়েছে",
                    "শিশুরা প্রায়শই বাবা-মায়ের সাথে কাজ করত",
                    "আকাঙ্ক্ষার চেয়ে বেঁচে থাকা বেশি গুরুত্বপূর্ণ ছিল"
                ]
            },
            {
                period: "২০১০–২০২০",
                title: "উন্মোচন",
                description: [
                    "মোবাইল ফোনের আগমন",
                    "ইন্টারনেট উন্মোচন শুরু হয়েছে",
                    "কাছাকাছি পর্যটন দেখা দিয়েছে",
                    "কিছু সেবা সংক্রান্ত চাকরি সম্ভব হয়েছে"
                ]
            },
            {
                period: "২০২০–এখন",
                title: "স্বাভাবিকীকরণ",
                description: [
                    "নার্স",
                    "পুলিশ কর্মী",
                    "শিক্ষক",
                    "হোটেল পেশাদার",
                    "শেফ",
                    "প্রোডাক্ট ম্যানেজার",
                    "সফটওয়্যার এবং এআই ইঞ্জিনিয়ার"
                ]
            }
        ],
        quoteTitle: "এটি \"সাফল্য\" নয়।",
        quoteBody: "এটি স্বাভাবিকীকরণ — বিলম্বিত, কিন্তু বাস্তব।",
        ctaPrimary: "আমরা আসলে কী করি",
        ctaSecondary: "আমরা কীভাবে মনে রাখি"
    }
};

export default function GenerationsPage() {
    const { language } = useLanguage();
    const t = localTranslations[language] || localTranslations.EN;

    return (
        <div className="min-h-screen">
            <PageHeader
                label={t.label}
                title={t.title}
                subtitle={t.subtitle}
            />

            <section className="section">
                <div className="page-narrow">
                    {/* Timeline */}
                    <div className="timeline">
                        {t.eras.map((era, index) => (
                            <motion.div
                                key={era.period}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="timeline-item"
                            >
                                <span className="timeline-era">{era.period}</span>
                                <h3 className="text-2xl font-serif mb-4">{era.title}</h3>

                                {era.period.includes("Now") || era.period.includes("अहिले") || era.period.includes("अब") || era.period.includes("এখন") ? (
                                    <>
                                        <p className="text-muted mb-4">
                                            {t.shiftMessage}
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {era.description.map((item, i) => (
                                                <span
                                                    key={i}
                                                    className="text-sm px-3 py-2 bg-accent/10 border border-accent/20"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <ul className="space-y-1">
                                        {era.description.map((item, i) => (
                                            <li
                                                key={i}
                                                className="text-muted text-sm"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <PullQuote>
                        {t.quoteTitle}<br />
                        {t.quoteBody}
                    </PullQuote>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/economy" className="btn-primary">
                            {t.ctaPrimary}
                        </Link>
                        <Link href="/why" className="btn-secondary">
                            {t.ctaSecondary}
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
