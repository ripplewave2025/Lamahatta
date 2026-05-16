'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

type Props = {
    src?: string
    alt?: string
    titleKey?: string
    descKey?: string
    objectPosition?: string
    className?: string
    priority?: boolean
}

export default function PanoramaBanner({
    src = "/images/village-panorama.jpg",
    alt = "Sunaray Gaon panoramic view",
    titleKey = "hero.panorama.title",
    descKey = "hero.panorama.desc",
    objectPosition = "center",
    className = "mt-24",
    priority = false,
}: Props) {
    const { t } = useLanguage()
    return (
        <section
            className={`relative w-full h-[30vh] min-h-[250px] max-h-[350px] overflow-hidden bg-stone-900 ${className}`}
        >
            <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    style={{ objectPosition }}
                    sizes="100vw"
                    priority={priority}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
            </motion.div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4"
                >
                    {t(titleKey)}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-lg md:text-xl text-stone-200 max-w-2xl"
                >
                    {t(descKey)}
                </motion.p>
            </div>
        </section>
    )
}
