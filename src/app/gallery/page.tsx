"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { useLanguage } from "@/context/LanguageContext";

type MediaItem = {
  src: string;
  type: "image" | "video";
  caption: string;
  poster?: string;
  // Wide items span two columns — used for panoramas and the aerial film.
  wide?: boolean;
};

// Curated from public/images, public/village and public/hero. Captions are
// drawn from the filenames, cleaned up into something readable.
const MEDIA: MediaItem[] = [
  { src: "/images/village-panorama.jpg", type: "image", caption: "Village panorama", wide: true },
  { src: "/village/kanchenjunga.jpg", type: "image", caption: "Kanchenjunga from the ridge" },
  { src: "/images/village-dusk.jpg", type: "image", caption: "The village at dusk" },
  { src: "/images/village-cloudy.jpg", type: "image", caption: "The village under cloud" },
  { src: "/village/rooftops.jpg", type: "image", caption: "Rooftops along the hillside" },
  { src: "/village/ridge-road.jpg", type: "image", caption: "The ridge road" },
  {
    src: "/images/village-path_sunligh_enchroching.jpg",
    type: "image",
    caption: "Sunlight encroaching on the village path",
  },
  { src: "/images/sunlight-forest.jpg", type: "image", caption: "Sunlight through the pine forest" },
  { src: "/images/himal.png", type: "image", caption: "The Himal" },
  {
    src: "/images/pano_middle_goan.jpg",
    type: "image",
    caption: "Panorama — the middle of the Gaon",
    wide: true,
  },
  { src: "/images/middle_gown.png", type: "image", caption: "The middle of Sunaray Gaon" },
  { src: "/village/yard.jpg", type: "image", caption: "A village yard" },
  { src: "/village/signboard.jpg", type: "image", caption: "The village signboard" },
  { src: "/village/construction-front.jpg", type: "image", caption: "New construction at the front" },
  { src: "/village/construction-path.jpg", type: "image", caption: "Construction along the path" },
  { src: "/images/homestayproject.jpg", type: "image", caption: "The homestay project" },
  { src: "/images/homestayproject1.jpg", type: "image", caption: "The homestay project — building up" },
  { src: "/images/homestayproject2.jpg", type: "image", caption: "The homestay project — taking shape" },
  { src: "/images/homestayproject3.jpg", type: "image", caption: "The homestay project — coming together" },
  { src: "/images/IMG_20250902_171246.jpg", type: "image", caption: "A day in the village · September 2025" },
  { src: "/images/IMG_20250904_144508.jpg", type: "image", caption: "A day in the village · September 2025" },
  { src: "/images/IMG20260421175026.jpg", type: "image", caption: "A day in the village · April 2026" },
  { src: "/hero/sunaraygown.png", type: "image", caption: "Sunaray Gaon" },
  { src: "/images/mountain.mp4", type: "video", caption: "The mountain, in motion" },
  {
    src: "/hero/sunaraygownamazing.mp4",
    type: "video",
    caption: "Sunaray Gaon, from above",
    poster: "/hero/sunaraygownamazing-poster.jpg",
    wide: true,
  },
];

export default function GalleryPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

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
        label={t("gallery.label") || "Gallery"}
        title={t("gallery.title") || "Sunaray Gaon, frame by frame"}
        subtitle={
          t("gallery.subtitle") ||
          "Photos and films from the village — the ridge, the rooftops, the building underway, and the mountains that hold it all."
        }
      />

      <section className="section pt-0">
        <div className="page-container">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {MEDIA.map((item, i) => (
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
                    alt={item.caption}
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
                  {item.caption}
                </span>
              </motion.button>
            ))}
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
                    alt={MEDIA[active].caption}
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
                {MEDIA[active].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
