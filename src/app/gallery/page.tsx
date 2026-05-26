"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { useLanguage, Language } from "@/context/LanguageContext";

type MediaItem = {
  src: string;
  type: "image" | "video";
  captionKey: string;
  defaultCaption: string;
  poster?: string;
  wide?: boolean;
};

const localTranslations: Record<Language, Record<string, string>> = {
  EN: {
    "caption.panorama": "Village panorama",
    "caption.kanchenjunga": "Kanchenjunga from the ridge",
    "caption.dusk": "The village at dusk",
    "caption.cloudy": "The village under cloud",
    "caption.rooftops": "Rooftops along the hillside",
    "caption.ridgeroad": "The ridge road",
    "caption.pathpath": "Sunlight encroaching on the village path",
    "caption.pine": "Sunlight through the pine forest",
    "caption.himal": "The Himal",
    "caption.panomiddle": "Panorama — the middle of the Gaon",
    "caption.middle": "The middle of Sunaray Gaon",
    "caption.yard": "A village yard",
    "caption.signboard": "The village signboard",
    "caption.front": "New construction at the front",
    "caption.conspath": "Construction along the path",
    "caption.homestay": "The homestay project",
    "caption.homestay1": "The homestay project — building up",
    "caption.homestay2": "The homestay project — taking shape",
    "caption.homestay3": "The homestay project — coming together",
    "caption.day1": "A day in the village · September 2025",
    "caption.day2": "A day in the village · September 2025",
    "caption.day3": "A day in the village · April 2026",
    "caption.gown": "Sunaray Gaon",
    "caption.mountain": "The mountain, in motion",
    "caption.gownabove": "Sunaray Gaon, from above"
  },
  NE: {
    "caption.panorama": "गाउँको परिदृश्य",
    "caption.kanchenjunga": "डाँडाबाट कञ्चनजङ्घा",
    "caption.dusk": "गोधुली साँझमा गाउँ",
    "caption.cloudy": "बादलभित्र गाउँ",
    "caption.rooftops": "पहाडको काखमा छानाहरू",
    "caption.ridgeroad": "डाँडाको सडक",
    "caption.pathpath": "गाउँको गोरेटोमा घाम झुल्किँदै",
    "caption.pine": "सल्लाको जंगलबाट छिरेको घाम",
    "caption.himal": "हिमाल",
    "caption.panomiddle": "परिदृश्य — गाउँको मध्य भाग",
    "caption.middle": "सुनरे गाउँको मध्य भाग",
    "caption.yard": "गाउँको आँगन",
    "caption.signboard": "गाउँको सूचना पाटी",
    "caption.front": "अगाडि नयाँ निर्माण कार्य",
    "caption.conspath": "बाटोको छेउमा निर्माण कार्य",
    "caption.homestay": "होमस्टे परियोजना",
    "caption.homestay1": "होमस्टे परियोजना — निर्माण चरण",
    "caption.homestay2": "होमस्टे परियोजना — आकार लिँदै",
    "caption.homestay3": "होमस्टे परियोजना — पूर्णता तर्फ",
    "caption.day1": "गाउँमा एक दिन · सेप्टेम्बर २०२५",
    "caption.day2": "गाउँमा एक दिन · सेप्टेम्बर २०२५",
    "caption.day3": "गाउँमा एक दिन · अप्रिल २०२६",
    "caption.gown": "सुनरे गाउँ",
    "caption.mountain": "गतिशील हिमाल",
    "caption.gownabove": "माथिबाट सुनरे गाउँ"
  },
  HI: {
    "caption.panorama": "गाँव का परिदृश्य",
    "caption.kanchenjunga": "रिज से कंचनजंघा",
    "caption.dusk": "गोधूलि बेला में गाँव",
    "caption.cloudy": "बादलों के बीच गाँव",
    "caption.rooftops": "पहाड़ी पर घरों की छतें",
    "caption.ridgeroad": "रिज रोड",
    "caption.pathpath": "गाँव की पगडंडी पर धूप की किरणें",
    "caption.pine": "सफेद देवदार के जंगल से आती धूप",
    "caption.himal": "हिमाल",
    "caption.panomiddle": "परिदृश्य — गाँव का मध्य भाग",
    "caption.middle": "सुनरे गाउन का मध्य भाग",
    "caption.yard": "गाँव का आँगन",
    "caption.signboard": "गाँव का साइनबोर्ड",
    "caption.front": "सामने नया निर्माण कार्य",
    "caption.conspath": "पगडंडी के साथ निर्माण कार्य",
    "caption.homestay": "होमस्टे परियोजना",
    "caption.homestay1": "होमस्टे परियोजना — निर्माण चरण",
    "caption.homestay2": "होमस्टे परियोजना — आकार लेते हुए",
    "caption.homestay3": "होमस्टे परियोजना — पूर्णता की ओर",
    "caption.day1": "गाँव में एक दिन · सितंबर 2025",
    "caption.day2": "गाँव में एक दिन · सितंबर 2025",
    "caption.day3": "गाँव में एक दिन · अप्रैल 2026",
    "caption.gown": "सुनरे गाउन",
    "caption.mountain": "गतिशील पर्वत",
    "caption.gownabove": "ऊपर से सुनरे गाउन"
  },
  BN: {
    "caption.panorama": "গ্রামের প্যানোরামা",
    "caption.kanchenjunga": "রিজ থেকে কাঞ্চনজঙ্ঘা",
    "caption.dusk": "গোধূলি বেলায় গ্রাম",
    "caption.cloudy": "মেঘের আড়ালে গ্রাম",
    "caption.rooftops": "পাহাড়ের গায়ে ছাদ",
    "caption.ridgeroad": "রিজ রোড",
    "caption.pathpath": "গ্রামের পথে সূর্যের আলো",
    "caption.pine": "পাইন বনের মধ্য দিয়ে সূর্যের আলো",
    "caption.himal": "হিমাল",
    "caption.panomiddle": "প্যানোরামা — গ্রামের মধ্যভাগ",
    "caption.middle": "সুনরে গাউনের মধ্যভাগ",
    "caption.yard": "গ্রামের উঠোন",
    "caption.signboard": "গ্রামের সাইনবোর্ড",
    "caption.front": "সামনে নতুন নির্মাণ কাজ",
    "caption.conspath": "পথের পাশে নির্মাণ কাজ",
    "caption.homestay": "হোমস্টে প্রকল্প",
    "caption.homestay1": "হোমস্টে প্রকল্প — নির্মাণাধীন",
    "caption.homestay2": "হোমস্টে প্রকল্প — রূপ নিচ্ছে",
    "caption.homestay3": "হোমস্টে প্রকল্প — সমাপ্তির পথে",
    "caption.day1": "গ্রামে একটি দিন · সেপ্টেম্বর ২০২৫",
    "caption.day2": "গ্রামে একটি দিন · সেপ্টেম্বর ২০২৫",
    "caption.day3": "গ্রামে একটি দিন · এপ্রিল ২০২৬",
    "caption.gown": "সুনরে গাউন",
    "caption.mountain": "গতিশীল পর্বত",
    "caption.gownabove": "আকাশ থেকে সুনরে গাউন"
  }
};

const MEDIA: MediaItem[] = [
  { src: "/images/village-panorama.jpg", type: "image", captionKey: "caption.panorama", defaultCaption: "Village panorama", wide: true },
  { src: "/village/kanchenjunga.jpg", type: "image", captionKey: "caption.kanchenjunga", defaultCaption: "Kanchenjunga from the ridge" },
  { src: "/images/village-dusk.jpg", type: "image", captionKey: "caption.dusk", defaultCaption: "The village at dusk" },
  { src: "/images/village-cloudy.jpg", type: "image", captionKey: "caption.cloudy", defaultCaption: "The village under cloud" },
  { src: "/village/rooftops.jpg", type: "image", captionKey: "caption.rooftops", defaultCaption: "Rooftops along the hillside" },
  { src: "/village/ridge-road.jpg", type: "image", captionKey: "caption.ridgeroad", defaultCaption: "The ridge road" },
  { src: "/images/village-path_sunligh_enchroching.jpg", type: "image", captionKey: "caption.pathpath", defaultCaption: "Sunlight encroaching on the village path" },
  { src: "/images/sunlight-forest.jpg", type: "image", captionKey: "caption.pine", defaultCaption: "Sunlight through the pine forest" },
  { src: "/images/himal.png", type: "image", captionKey: "caption.himal", defaultCaption: "The Himal" },
  { src: "/images/pano_middle_goan.jpg", type: "image", captionKey: "caption.panomiddle", defaultCaption: "Panorama — the middle of the Gaon", wide: true },
  { src: "/images/middle_gown.png", type: "image", captionKey: "caption.middle", defaultCaption: "The middle of Sunaray Gaon" },
  { src: "/village/yard.jpg", type: "image", captionKey: "caption.yard", defaultCaption: "A village yard" },
  { src: "/village/signboard.jpg", type: "image", captionKey: "caption.signboard", defaultCaption: "The village signboard" },
  { src: "/village/construction-front.jpg", type: "image", captionKey: "caption.front", defaultCaption: "New construction at the front" },
  { src: "/village/construction-path.jpg", type: "image", captionKey: "caption.conspath", defaultCaption: "Construction along the path" },
  { src: "/images/homestayproject.jpg", type: "image", captionKey: "caption.homestay", defaultCaption: "The homestay project" },
  { src: "/images/homestayproject1.jpg", type: "image", captionKey: "caption.homestay1", defaultCaption: "The homestay project — building up" },
  { src: "/images/homestayproject2.jpg", type: "image", captionKey: "caption.homestay2", defaultCaption: "The homestay project — taking shape" },
  { src: "/images/homestayproject3.jpg", type: "image", captionKey: "caption.homestay3", defaultCaption: "The homestay project — coming together" },
  { src: "/images/IMG_20250902_171246.jpg", type: "image", captionKey: "caption.day1", defaultCaption: "A day in the village · September 2025" },
  { src: "/images/IMG_20250904_144508.jpg", type: "image", captionKey: "caption.day2", defaultCaption: "A day in the village · September 2025" },
  { src: "/images/IMG20260421175026.jpg", type: "image", captionKey: "caption.day3", defaultCaption: "A day in the village · April 2026" },
  { src: "/hero/sunaraygown.png", type: "image", captionKey: "caption.gown", defaultCaption: "Sunaray Gaon" },
  { src: "/images/mountain.mp4", type: "video", captionKey: "caption.mountain", defaultCaption: "The mountain, in motion" },
  { src: "/hero/sunaraygownamazing.mp4", type: "video", captionKey: "caption.gownabove", defaultCaption: "Sunaray Gaon, from above", poster: "/hero/sunaraygownamazing-poster.jpg", wide: true },
];

export default function GalleryPage() {
  const { language, t: globalT } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  const localT = localTranslations[language] || localTranslations.EN;
  const getCaption = (item: MediaItem) => {
    return localT[item.captionKey] || item.defaultCaption;
  };

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i === null ? i : (i + dir + MEDIA.length) % MEDIA.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <div className="min-h-screen bg-[#f8f5ef] text-stone-900">
      <PageHeader
        label={globalT("gallery.label") || "Gallery"}
        title={globalT("gallery.title") || "Sunaray Gaon, frame by frame"}
        subtitle={
          globalT("gallery.subtitle") ||
          "Photos and films from the village — the ridge, the rooftops, the building underway, and the mountains that hold it all."
        }
      />

      <section className="section pt-0">
        <div className="page-container">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {MEDIA.map((item, i) => {
              const currentCaption = getCaption(item);
              return (
                <motion.button
                  key={item.src}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.05, ease: "easeOut" }}
                  className={`group relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 ${
                    item.wide ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  {item.type === "image" ? (
                    <Image
                      src={item.src}
                      alt={currentCaption}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <video
                        src={item.src}
                        poster={item.poster}
                        muted
                        playsInline
                        preload="metadata"
                        aria-hidden
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
                        <Play className="h-5 w-5 translate-x-px fill-white text-white" />
                      </span>
                    </>
                  )}

                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-3 pt-8 text-left text-[11px] font-medium leading-snug text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
                    {currentCaption}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-5xl flex-col items-center gap-4"
            >
              <div className="relative flex max-h-[80vh] w-full items-center justify-center">
                {MEDIA[active].type === "image" ? (
                  <Image
                    src={MEDIA[active].src}
                    alt={getCaption(MEDIA[active])}
                    width={1600}
                    height={1067}
                    className="max-h-[80vh] w-auto rounded-xl object-contain"
                  />
                ) : (
                  <video
                    src={MEDIA[active].src}
                    poster={MEDIA[active].poster}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[80vh] w-auto rounded-xl"
                  />
                )}
              </div>
              <p className="text-center text-sm font-medium text-white/85">
                {getCaption(MEDIA[active])}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
