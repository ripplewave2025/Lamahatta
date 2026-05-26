"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/shared/PageHeader";
import PullQuote from "@/components/shared/PullQuote";
import { useLanguage, Language } from "@/context/LanguageContext";

const localTranslations: Record<Language, {
  label: string;
  title: string;
  subtitle: string;
  imageAlt: string;
  banner_desc: string;
  personalHeader: string;
  personalP1: string;
  personalP2: string;
  clusterHeader: string;
  clusterDesc: string;
  geographyHeader: string;
  geographyDesc: string;
  grantsHeader: string;
  grantsDesc: string;
  quote: string;
  btn_voices: string;
  btn_investor: string;
}> = {
  EN: {
    label: "Our Story",
    title: "Sunaray Gaon: Pushing Past the Corridor",
    subtitle: "Between 6th Mile and Takdah, 22 households are writing a new future—refusing to stay hidden, refusing to wait quietly.",
    imageAlt: "The ridge road in Seemana Gaon",
    banner_desc: "The 1-mile 'bad road' (our moat) and the lack of tap water or internet will not define us. We are documenting the movement, the tourism potential, and the builders working daily on the ground.",
    personalHeader: "A Community Bound by Dreams and Hills",
    personalP1: "In Seemana Gaon, our story is written in the mist that rolls over the pine ridges and the shared warmth of our fireplaces. For years, we lived quietly in the embrace of these hills, tending to our terraced fields and raising our children with the values of kindness, hard work, and mutual respect. Every home here is built on the foundation of community—where a neighbor's joy is celebrated by all, and every challenge is faced together.",
    personalP2: "Now, as the world opens up, we are inviting you to share in this warmth. By building our homestays, upgrading our roads, and creating new opportunities, we aren't just developing a destination; we are extending our family. Every traveler who enters Seemana Gaon is welcomed not as a stranger, but as a long-awaited friend who helps us weave the next beautiful chapter of our village history.",
    clusterHeader: "22 Houses, 93 Lives",
    clusterDesc: "We are a close-knit cluster representing the diverse threads of the hills: Chettri, Tamang, Bhutia, Pradhan, Gurung, Sherpa, Yolmo, and Rai. We gather at 8th Mile, Seemana, Takdah, Kambal, and the Sunaray Gaon ground.",
    geographyHeader: "In the Middle of the Hills",
    geographyDesc: "We sit at the geographical center between 6th Mile (with its main roads, banks, and garages), 9th Mile Eco Park, 11th Mile, and Glenburn. We are building the bridge so Seemana Gaon is no longer isolated.",
    grantsHeader: "No Grants, Just Grit",
    grantsDesc: "No government grants have been given yet for our roads or cell connectivity. We are not waiting. We are working to sustain ourselves, attract investors, and build our own future. We remember who stood with us when we were small.",
    quote: "The true beauty of Seemana Gaon lies not just in the majestic view of Kanchenjunga, but in the open hearts of the people who call these hills their home. We welcome you to sit at our tables, share our stories, and walk our paths.",
    btn_voices: "Open community voices",
    btn_investor: "Start partnership enquiry"
  },
  NE: {
    label: "हाम्रो कथा",
    title: "सुनरे गाउँ: गोरेटोबाट मूल ढोकासम्म",
    subtitle: "६ माईल र ताकदाह बीचमा, २२ घरधुरीले नयाँ भविष्य लेख्दैछन् — चुपचाप बस्न र ओझेलमा पर्न अस्वीकार गर्दै।",
    imageAlt: "सुनरे गाउँको सडक",
    banner_desc: "१ माइलको 'खराब सडक' (हाम्रो खाडल) र पानी वा इन्टरनेटको अभावले हामीलाई परिभाषित गर्ने छैन। हामी जमिनमा भइरहेको काम, पर्यटनको सम्भावना र दैनिक खटिएका निर्माणकर्ताहरूलाई अभिलेखीकरण गर्दैछौं।",
    personalHeader: "सपना र पहाडले जोडिएको एउटा सुन्दर समुदाय",
    personalP1: "सुनरे गाउँमा हाम्रो कथा सल्लाको डाँडामा गुड्ने कुहिरो र हाम्रा चुल्होको साझा न्यानोपनमा लेखिएको छ। वर्षौंदेखि हामी यी पहाडहरूको काखमा शान्तसँग बाँच्यौं, हाम्रा कान्लाका खेतहरू खन्दै र हाम्रा बच्चाहरूलाई दया, कडा परिश्रम र आपसी सम्मानको मूल्यमान्यता सिकाउँदै हुर्कायौं। यहाँको प्रत्येक घर समुदायको जगमा निर्माण भएको छ — जहाँ छिमेकीको खुसीमा सबैले उत्सव मनाउँछन् र हरेक चुनौतीको सामना सँगै मिलेर गरिन्छ।",
    personalP2: "अहिले संसार खुल्दै जाँदा हामी तपाईंलाई पनि यो न्यानोपन साझा गर्न आमन्त्रित गरिरहेका छौं। हाम्रा होमस्टेहरू निर्माण गरेर, हाम्रा सडकहरू सुधार गरेर र नयाँ अवसरहरू सिर्जना गरेर हामी केवल एउटा पर्यटकीय गन्तव्य मात्र विकास गरिरहेका छैनौं; हामी आफ्नो परिवारलाई फराकिलो बनाउँदैछौं। सुनरे गाउँमा प्रवेश गर्ने प्रत्येक यात्रुलाई अपरिचितको रूपमा होइन, बरु लामो समयदेखि पर्खिरहेको साथीको रूपमा स्वागत गरिन्छ जसले हाम्रो गाउँको इतिहासको अर्को सुन्दर अध्याय लेख्न मद्दत गर्दछ।",
    clusterHeader: "२२ घर, ९३ जीवनहरू",
    clusterDesc: "हामी पहाडका विभिन्न समुदायहरूको प्रतिनिधित्व गर्ने एउटा बलियो समूह हौं: क्षेत्री, तामाङ, भोटिया, प्रधान, गुरुङ, शेर्पा, योल्मो र राई। हामी ८ माईल, सिमाना, ताकदाह, कम्बल र सुनरे गाउँको खेलमैदानमा भेला हुन्छौं।",
    geographyHeader: "पहाडको मध्य भागमा",
    geographyDesc: "हामी ६ माईल (जहाँ मुख्य सडक, बैंक र ग्यारेजहरू छन्), ९ माईल इको पार्क, ११ माईल र ग्लेनबर्नको बीचमा अवस्थित छौं। हामी पुल निर्माण गर्दैछौं ताकि सुनरे गाउँ अब अलग नहोस्।",
    grantsHeader: "अनुदान होइन, हाम्रो साहस",
    grantsDesc: "हाम्रो सडक वा मोबाइल नेटवर्कको लागि अहिलेसम्म कुनै सरकारी अनुदान दिइएको छैन। हामी पर्खिरहेका छैनौं। हामी आत्मनिर्भर हुन, लगानीकर्ता आकर्षित गर्न र आफ्नै भविष्य निर्माण गर्न काम गरिरहेका छौं। हामी सानो हुँदा हामीसँग उभिनेहरूलाई कहिल्यै बिर्सने छैनौं।",
    quote: "सुनरे गाउँको वास्तविक सौन्दर्य कञ्चनजङ्घाको भव्य दृश्यमा मात्र होइन, बरु यी पहाडहरूलाई आफ्नो घर भन्ने मानिसहरूको खुला हृदयमा छ। हामी तपाईंलाई हाम्रो टेबुलमा बस्न, हाम्रा कथाहरू साझा गर्न र हाम्रा गोरेटोहरूमा हिड्न हार्दिक स्वागत गर्दछौं।",
    btn_voices: "सामुदायिक आवाज खोल्नुहोस्",
    btn_investor: "साझेदारी सोधपुछ सुरु गर्नुहोस्"
  },
  HI: {
    label: "हमारी कहानी",
    title: "सुनरे गाउन: गलियारे से मुख्य मेज तक",
    subtitle: "6वें माइल और ताकदाह के बीच, 22 परिवार एक नया भविष्य लिख रहे हैं — चुपचाप बैठने और ओझल रहने से इनकार करते हुए।",
    imageAlt: "सुनरे गाउन की सड़क",
    banner_desc: "1 मील की 'खराब सड़क' (हमारी खाई) और पानी या इंटरनेट की कमी हमें परिभाषित नहीं करेगी। हम जमीन पर हो रहे काम, पर्यटन की संभावना और दैनिक काम कर रहे निर्माताओं का दस्तावेजीकरण कर रहे हैं।",
    personalHeader: "पहाड़ियों और सपनों से बंधा एक सुंदर समुदाय",
    personalP1: "सुनरे गाउन में हमारी कहानी देवदार की पहाड़ियों पर छाने वाले कोहरे और हमारी अंगीठियों की साझी गर्माहट में लिखी गई है। सालों से हम इन पहाड़ियों की गोद में शांति से रहे हैं, अपने सीढ़ीदार खेतों में काम करते हुए और अपने बच्चों को दया, कड़ी मेहनत और आपसी सम्मान के मूल्यों के साथ बड़ा करते हुए। यहाँ का हर घर समुदाय की नींव पर बना है — जहाँ पड़ोसी की खुशी में सब शरीक होते हैं और हर चुनौती का सामना मिलकर किया जाता है।",
    personalP2: "अब जैसे-जैसे दुनिया करीब आ रही है, हम आपको भी इस आत्मीयता का हिस्सा बनने के लिए आमंत्रित कर रहे हैं। अपने होमस्टे बनाकर, अपनी सड़कों को सुधारकर और नए अवसर पैदा करके, हम केवल एक पर्यटन स्थल का विकास नहीं कर रहे हैं; हम अपने परिवार का विस्तार कर रहे हैं। सुनरे गाउन में आने वाले हर यात्री का स्वागत एक अजनबी की तरह नहीं, बल्कि एक पुराने दोस्त की तरह किया जाता है जो हमारे गाँव के इतिहास का एक नया सुंदर अध्याय लिखने में हमारी मदद करता है।",
    clusterHeader: "22 घर, 93 जीवन",
    clusterDesc: "हम पहाड़ों के विभिन्न समुदायों का प्रतिनिधित्व करने वाले एक मजबूत समूह हैं: छेत्री, तामांग, भूटिया, प्रधान, गुरुंग, शेरपा, योल्मो और राय। हम 8वें माइल, सिमाना, ताकदाह, कम्बल और सुनरे गाउन के मैदान में इकट्ठा होते हैं।",
    geographyHeader: "पहाड़ियों के मध्य में",
    geographyDesc: "हम 6वें माइल (मुख्य सड़क, बैंक और गैरेज के साथ), 9वें माइल इको पार्क, 11वें माइल और ग्लेनबर्न के बीच भौगोलिक केंद्र में स्थित हैं। हम पुल का निर्माण कर रहे हैं ताकि सुनरे गाउन अब अलग-थलग न रहे।",
    grantsHeader: "अनुदान नहीं, हमारा साहस",
    grantsDesc: "हमारी सड़कों या मोबाइल कनेक्टिविटी के लिए अभी तक कोई सरकारी अनुदान नहीं दिया गया है। हम इंतजार नहीं कर रहे हैं। हम आत्मनिर्भर होने, निवेशकों को आकर्षित करने और अपना भविष्य बनाने के लिए काम कर रहे हैं। हम उन्हें याद रखते हैं जो हमारे छोटे होने पर हमारे साथ खड़े थे।",
    quote: "सुनरे गाउन की असली खूबसूरती सिर्फ कंचनजंगा के भव्य दृश्यों में नहीं है, बल्कि उन लोगों के खुले दिलों में है जो इन पहाड़ियों को अपना घर कहते हैं। हम आपका स्वागत करते हैं कि आप हमारी मेज़ पर बैठें, हमारी कहानियाँ साझा करें और हमारे रास्तों पर चलें।",
    btn_voices: "सामुदायिक आवाज़ें खोलें",
    btn_investor: "साझेदारी पूछताछ शुरू करें"
  },
  BN: {
    label: "আমাদের গল্প",
    title: "সুনরে গাউন: বারান্দা পেরিয়ে মূল টেবিলে",
    subtitle: "৬ মাইল এবং তাকদাহের মাঝে, ২২টি পরিবার এক নতুন ভবিষ্যত লিখছে — নীরবে অপেক্ষা করতে বা লুকিয়ে থাকতে অস্বীকার করে।",
    imageAlt: "সুনরে গাউনের রাস্তা",
    banner_desc: "১ মাইলের 'খারাপ রাস্তা' (আমাদের পরিখা) এবং জল বা ইন্টারনেটের অভাব আমাদের সংজ্ঞায়িত করবে না। আমরা মাটিতে চলমান কাজ, পর্যটনের সম্ভাবনা এবং দৈনিক কাজ করা নির্মাতাদের নথিভুক্ত করছি।",
    personalHeader: "পাহাড় ও স্বপ্নে বাঁধা এক সুন্দর সম্প্রদায়",
    personalP1: "সুনরে গাউনে আমাদের গল্প লেখা আছে পাইন বনের চূড়ায় ভেসে বেড়ানো কুয়াশা আর আমাদের ঘরের চুল্লির যৌথ ওমে। বছরের পর বছর ধরে আমরা এই পাহাড়ের কোলে শান্তিতে বসবাস করে আসছি, আমাদের ধাপ চাষের জমিতে কাজ করে এবং আমাদের সন্তানদের দয়া, কঠোর পরিশ্রম ও পারস্পরিক শ্রদ্ধার শিক্ষায় বড় করে তুলছি। এখানকার প্রতিটি ঘর গড়ে উঠেছে একতার ভিত্তিতে — যেখানে প্রতিবেশীর আনন্দে সবাই মেতে ওঠে এবং প্রতিটি বিপদে সবাই এক হয়ে দাঁড়ায়।",
    personalP2: "এখন পৃথিবী যেভাবে কাছে আসছে, আমরা আপনাদেরও এই আন্তরিকতার ভাগ নিতে আমন্ত্রণ জানাচ্ছি। আমাদের হোমস্টে তৈরি করে, আমাদের রাস্তাঘাট উন্নত করে এবং নতুন সুযোগ সৃষ্টি করে আমরা কেবল একটি পর্যটন কেন্দ্র গড়ে তুলছি না; আমরা আমাদের পরিবারকে আরও বড় করে তুলছি। সুনরে গাউনে আসা প্রতিটি পর্যটকককে একজন অপরিচিত হিসেবে নয়, বরং একজন দীর্ঘদিনের বন্ধুর মতো স্বাগত জানানো হয়, যিনি আমাদের গ্রামের ইতিহাসের পরবর্তী সুন্দর অধ্যায়টি লিখতে আমাদের সাহায্য করেন।",
    clusterHeader: "২২টি ঘর, ৯৩টি জীবন",
    clusterDesc: "আমরা পাহাড়ের বিভিন্ন সম্প্রদায়ের প্রতিনিধিত্বকারী একটি ঐক্যবদ্ধ গোষ্ঠী: ছেত্রী, তমাং, ভুটিয়া, প্রধান, গুরুং, শেরপা, ইয়োলমো এবং রাই। আমরা ৮ম মাইল, সীমানা, তাকদাহ, কম্বল এবং সুনরে গাউনের মাঠে একত্রিত হই।",
    geographyHeader: "পাহাড়ের মধ্যস্থলে",
    geographyDesc: "আমরা ৬ষ্ঠ মাইল (যেখানে মূল রাস্তা, ব্যাংক এবং গ্যারেজ আছে), ৯ম মাইল ইকো পার্ক, ১১তম মাইল এবং গ্লেনবার্নের ভৌগলিক কেন্দ্রে অবস্থিত। আমরা সংযোগ সেতু তৈরি করছি যাতে সুনরে গাউন আর বিচ্ছিন্ন না থাকে।",
    grantsHeader: "অনুদান নয়, আমাদের জেদ",
    grantsDesc: "আমাদের রাস্তা বা মোবাইল নেটওয়ার্কের জন্য এখনো কোনো সরকারী অনুদান পাওয়া যায়নি। আমরা অপেক্ষা করছি না। আমরা স্বাবলম্বী হতে, বিনিয়োগকারীদের আকৃষ্ট করতে এবং নিজেদের ভবিষ্যত গড়তে কাজ করছি। আমরা ছোট থাকতে যারা পাশে ছিল তাদের কখনো ভুলবো না।",
    quote: "সুনরে গাউনের আসল সৌন্দর্য কেবল কাঞ্চনজঙ্ঘার অপরূপ দৃশ্যে নয়, বরং এই পাহাড়ের মানুষদের উদার মনের মধ্যে রয়েছে। আমরা আপনাদের আমন্ত্রণ জানাই আমাদের টেবিলে বসতে, আমাদের গল্প ভাগ করে নিতে এবং আমাদের পাহাড়ি পথে হাঁটতে।",
    btn_voices: "কমিউনিটি কণ্ঠস্বর খুলুন",
    btn_investor: "অংশীদারিত্ব অনুসন্ধান শুরু করুন"
  }
};

export default function WhyPage() {
  const { language } = useLanguage();
  const t = localTranslations[language] || localTranslations.EN;

  return (
    <div className="min-h-screen bg-[#101717] text-stone-100">
      <PageHeader
        label={t.label}
        title={t.title}
        subtitle={t.subtitle}
        dark
      />

      <section className="section">
        <div className="page-narrow">
          {/* Main Ridge Road Picture from Gallery */}
          <div className="relative mb-14 overflow-hidden rounded-[2rem] border border-white/10">
            <div className="relative aspect-[1.77] w-full">
              <Image
                src="/village/ridge-road.jpg"
                alt={t.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="max-w-xl text-sm leading-7 text-stone-200/80">
                  {t.banner_desc}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose mb-12"
          >
            <h2 className="text-2xl font-serif text-amber-300 mb-6">{t.personalHeader}</h2>
            <p className="mb-6 leading-relaxed" style={{ color: "rgba(231,229,228,0.85)" }}>
              {t.personalP1}
            </p>
            <p className="leading-relaxed" style={{ color: "rgba(231,229,228,0.85)" }}>
              {t.personalP2}
            </p>
          </motion.div>

          <PullQuote dark>
            {t.quote}
          </PullQuote>

          {/* Quick Info Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-amber-300">
                Community
              </p>
              <h3 className="mt-3 font-serif text-xl text-white mb-2">{t.clusterHeader}</h3>
              <p className="text-xs leading-relaxed text-stone-300/70">{t.clusterDesc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-amber-300">
                Geography
              </p>
              <h3 className="mt-3 font-serif text-xl text-white mb-2">{t.geographyHeader}</h3>
              <p className="text-xs leading-relaxed text-stone-300/70">{t.geographyDesc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-amber-300">
                Grants
              </p>
              <h3 className="mt-3 font-serif text-xl text-white mb-2">{t.grantsHeader}</h3>
              <p className="text-xs leading-relaxed text-stone-300/70">{t.grantsDesc}</p>
            </motion.div>
          </div>

          <div className="mt-16 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/voices"
              className="btn-primary justify-center bg-amber-500 text-stone-950 hover:bg-amber-400"
            >
              {t.btn_voices}
            </Link>
            <Link
              href="/partners"
              className="btn-secondary justify-center border-white/15 bg-transparent text-white hover:bg-white/8"
            >
              {t.btn_investor}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
