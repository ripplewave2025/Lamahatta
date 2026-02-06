"use client";

import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";

interface Talent {
    id: number;
    name: string;
    title: string;
    specialty: string;
    image: string;
    rating: number;
}

const talents: Talent[] = [
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
];

export default function FeaturedTalents() {
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
                        <span className="text-white/80 text-sm uppercase tracking-wider">Village Excellence</span>
                    </div>
                    <h2 className="section-title text-white">
                        Featured <span className="gradient-text">Talents</span>
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto">
                        Celebrating the exceptional skills and artistry of our village members
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {talents.map((talent, index) => (
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
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={talent.image}
                                        alt={talent.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                        Have a special talent? Join our featured members!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary"
                    >
                        Nominate a Talent
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
