"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
    name: string;
    color: string;
    image?: string;
    nutrition: {
        calories: number;
        sugar: number;
    };
}

export default function ProductCard({ name, color, image, nutrition }: ProductCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-64 h-96 perspective-1000 cursor-pointer group"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="w-full h-full relative transform-style-3d transition-all duration-700"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 border-2"
                    style={{ borderColor: color }}
                >
                    <div
                        className="w-32 h-32 rounded-full mb-6 flex items-center justify-center"
                        style={{ backgroundColor: `${color}20` }}
                    >
                        {/* Product Image */}
                        <div className="relative w-20 h-32">
                            <Image
                                src={image || "/images/Coca-Cola-logo.png"}
                                alt={name}
                                fill
                                className="object-contain drop-shadow-xl"
                            />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2" style={{ color }}>{name}</h3>
                    <p className="text-gray-500 text-sm text-center">Hover to see facts</p>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 backface-hidden rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 border-2 rotate-y-180"
                    style={{
                        borderColor: color,
                        transform: "rotateY(180deg)"
                    }}
                >
                    <h3 className="text-xl font-bold mb-6" style={{ color }}>Nutritional Facts</h3>

                    <div className="w-full space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600 dark:text-gray-400">Calories</span>
                            <span className="font-bold text-xl">{nutrition.calories}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-gray-600 dark:text-gray-400">Sugar</span>
                            <span className="font-bold text-xl">{nutrition.sugar}g</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-xs text-gray-400">
                        *Percent Daily Values are based on a 2,000 calorie diet.
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
