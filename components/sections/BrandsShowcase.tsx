"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import MotionWrapper from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/button";

const brands = [
    {
        id: "coke",
        name: "Coca-Cola",
        color: "#E6242B",
        category: "Sparkling",
        image: "/images/coke.png",
        nutrition: { calories: 140, sugar: 39 },
    },
    {
        id: "fanta",
        name: "Fanta",
        color: "#F7941E",
        category: "Sparkling",
        image: "/images/fanta.png", // Placeholder
        nutrition: { calories: 160, sugar: 44 },
    },
    {
        id: "sprite",
        name: "Sprite",
        color: "#008B47",
        category: "Sparkling",
        image: "/images/sprite.png", // Placeholder
        nutrition: { calories: 140, sugar: 38 },
    },
    {
        id: "minute-maid",
        name: "Minute Maid",
        color: "#000000",
        category: "Juice",
        image: "/images/minute-maid.png", // Placeholder
        nutrition: { calories: 110, sugar: 24 },
    },
    {
        id: "rwenzori",
        name: "Rwenzori",
        color: "#00AEEF",
        category: "Water",
        image: "/images/rwenzori.png", // Placeholder
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
                <MotionWrapper direction="up">
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-foreground">
                        Our Brands
                    </h2>
                </MotionWrapper>

                {/* Infinite Scroll Marquee */}
                <div className="relative flex overflow-x-hidden mb-16 group">
                    <div className="animate-marquee whitespace-nowrap flex gap-8">
                        {[...brands, ...brands, ...brands].map((brand, index) => (
                            <span
                                key={index}
                                className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-700 opacity-30 uppercase"
                            >
                                {brand.name}
                            </span>
                        ))}
                    </div>
                    <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8">
                        {[...brands, ...brands, ...brands].map((brand, index) => (
                            <span
                                key={index}
                                className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-700 opacity-30 uppercase"
                            >
                                {brand.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center gap-4 mb-16 flex-wrap">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            variant={activeCategory === cat ? "default" : "outline"}
                            className={`rounded-full text-lg px-6 py-2 transition-all duration-300 ${activeCategory === cat ? "scale-110" : ""}`}
                        >
                            {cat}
                        </Button>
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
                                    image={brand.image}
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
