"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
    {
        id: 1,
        title: "Taste the Feeling",
        subtitle: "Experience the refreshing taste of Coca-Cola Original.",
        image: "/images/coca-cola-commercial.gif", // Using the gif as a placeholder for slide images too if needed, or just colors/text
        color: "#E6242B",
        textColor: "text-white",
    },
    {
        id: 2,
        title: "Zero Sugar, Zero Calories",
        subtitle: "The same great taste you love, with zero sugar.",
        image: "/images/coca-cola-commercial.gif",
        color: "#000000",
        textColor: "text-white",
    },
    {
        id: 3,
        title: "Eco-Friendly Future",
        subtitle: "Committed to a world without waste.",
        image: "/images/coca-cola-commercial.gif",
        color: "#008B47", // Sprite green-ish
        textColor: "text-white",
    },
];

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    };

    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl border border-white/10 backdrop-blur-sm bg-black/20">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                        scale: { duration: 0.4 },
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-16"
                >
                    {/* Glassmorphism Card for Content */}
                    <div className="relative z-10 max-w-4xl mx-auto bg-black/30 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/10 shadow-xl">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter ${slides[currentIndex].textColor}`}
                        >
                            {slides[currentIndex].title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className={`text-lg md:text-2xl font-medium mb-8 ${slides[currentIndex].textColor} opacity-90`}
                        >
                            {slides[currentIndex].subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button
                                size="lg"
                                className="rounded-full text-lg px-8 py-6 bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                            >
                                Discover More
                            </Button>
                        </motion.div>
                    </div>

                    {/* Decorative Background Element for Slide */}
                    <div
                        className="absolute inset-0 -z-10 opacity-40"
                        style={{ backgroundColor: slides[currentIndex].color }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>

            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10"
                onClick={prevSlide}
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10"
                onClick={nextSlide}
            >
                <ChevronRight className="w-8 h-8" />
            </button>
        </div>
    );
}
