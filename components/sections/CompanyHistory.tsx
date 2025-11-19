"use client";
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import RevealText from "@/components/ui/RevealText";

export default function CompanyHistory() {
    // Fetch history from Convex
    const convexData = useQuery(api.history.get);

    // Static fallback data
    const fallbackData = [
        { year: 1886, milestone: "The Beginning", description: "Dr. John Pemberton serves the first Coca-Cola." },
        { year: 1915, milestone: "Contour Bottle", description: "The iconic bottle shape is patented." },
        { year: 1928, milestone: "Olympics", description: "Coca-Cola begins its partnership with the Olympic Games." },
        { year: 1995, milestone: "Uganda Launch", description: "Official operations begin in Uganda." },
        { year: 2010, milestone: "50 Years in Africa", description: "Celebrating half a century of refreshment." },
        { year: 2025, milestone: "Sustainable Future", description: "Achieving 100% water replenishment." },
    ];

    // Use Convex data if available and has items, otherwise use fallback
    const historyData = (convexData && convexData.length > 0) ? convexData : fallbackData;

    return (
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#E6242B_1px,transparent_1px),linear-gradient(-45deg,#E6242B_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#E6242B]">
                        <RevealText text="Our History" />
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        A timeline of refreshment, innovation, and community impact.
                    </p>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Center Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#E6242B] via-[#E6242B]/50 to-transparent hidden md:block" />

                    {historyData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative mb-16 md:mb-24 flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } flex-col`}
                        >
                            {/* Content Card */}
                            <motion.div
                                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(230, 36, 43, 0.3)" }}
                                className={`w-full md:w-5/12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="text-5xl font-bold text-[#E6242B]">{item.year}</div>
                                    <div className="h-px flex-1 bg-gradient-to-r from-[#E6242B] to-transparent" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.milestone}</h3>
                                <p className="text-gray-300 leading-relaxed">{item.description}</p>
                            </motion.div>

                            {/* Center Dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                                className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#E6242B] rounded-full border-4 border-gray-900 hidden md:block z-10"
                            />

                            {/* Year Badge (Mobile) */}
                            <div className="md:hidden mt-4 px-4 py-2 bg-[#E6242B] rounded-full text-sm font-bold">
                                {item.year}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
