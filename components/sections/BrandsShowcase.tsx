"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";

const brands = [
    {
        id: "coke",
        name: "Coca-Cola",
        color: "#E6242B",
        category: "Sparkling",
        nutrition: { calories: 140, sugar: 39 },
    },
    {
        id: "fanta",
        name: "Fanta",
        color: "#F7941E",
        category: "Sparkling",
        nutrition: { calories: 160, sugar: 44 },
    },
    {
        id: "sprite",
        name: "Sprite",
        color: "#008B47",
        category: "Sparkling",
        nutrition: { calories: 140, sugar: 38 },
    },
    {
        id: "minute-maid",
        name: "Minute Maid",
        color: "#000000",
        category: "Juice",
        nutrition: { calories: 110, sugar: 24 },
    },
    {
        id: "rwenzori",
        name: "Rwenzori",
        color: "#00AEEF",
        category: "Water",
        nutrition: { calories: 0, sugar: 0 },
    },
];

const categories = ["All", "Sparkling", "Juice", "Water"];

export default function BrandsShowcase() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

    const filteredBrands = activeCategory === "All"
        ? brands
        : brands.filter(b => b.category === activeCategory);

    const activeColor = hoveredBrand
        ? brands.find(b => b.id === hoveredBrand)?.color
        : "#ffffff"; // Default background

    return (
        <motion.section
            className="py-20 min-h-screen transition-colors duration-700 ease-in-out relative overflow-hidden"
            animate={{ backgroundColor: hoveredBrand ? `${activeColor}10` : "#ffffff" }}
        >
            {/* Dynamic Background Splash */}
            <motion.div
                className="absolute inset-0 -z-10 opacity-30 blur-3xl transition-all duration-1000"
                animate={{
                    background: hoveredBrand
                        ? `radial-gradient(circle at 50% 50%, ${activeColor}40 0%, transparent 70%)`
                        : "radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)"
                }}
            />

            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                    Our Brands
                </h2>

                {/* Category Filter */}
                <div className="flex justify-center gap-4 mb-16 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${activeCategory === cat
                                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 scale-110"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Brands Grid */}
                <motion.div
                    layout
                    className="flex flex-wrap justify-center gap-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredBrands.map((brand) => (
                            <motion.div
                                key={brand.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                onMouseEnter={() => setHoveredBrand(brand.id)}
                                onMouseLeave={() => setHoveredBrand(null)}
                            >
                                <ProductCard
                                    name={brand.name}
                                    color={brand.color}
                                    nutrition={brand.nutrition}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.section>
    );
}
