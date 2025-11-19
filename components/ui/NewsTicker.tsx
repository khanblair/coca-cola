"use client";
import React from "react";
import { motion } from "framer-motion";

interface NewsTickerProps {
    headlines: string[];
}

export default function NewsTicker({ headlines }: NewsTickerProps) {
    // Duplicate headlines to ensure smooth infinite loop
    const duplicatedHeadlines = [...headlines, ...headlines, ...headlines];

    return (
        <div className="w-full overflow-hidden bg-[#E6242B] py-4">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: "-33.33%" }}
                transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {duplicatedHeadlines.map((headline, index) => (
                    <div key={index} className="flex items-center mx-8">
                        <span className="text-white font-bold text-xl uppercase tracking-wider">
                            {headline}
                        </span>
                        <div className="w-2 h-2 bg-white rounded-full ml-8" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
