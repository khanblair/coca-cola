"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
    {
        id: 1,
        title: "Taste the Feeling",
        subtitle: "Experience the refreshing taste of Coca-Cola Original.",
        image: "/images/coca-cola-commercial.gif",
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
        color: "#008B47",
        textColor: "text-white",
    },
];

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [progress, setProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftButtonRef = useRef<HTMLButtonElement>(null);
    const rightButtonRef = useRef<HTMLButtonElement>(null);

    // 3D Tilt Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

    // Magnetic button effects
    const leftButtonX = useMotionValue(0);
    const leftButtonY = useMotionValue(0);
    const rightButtonX = useMotionValue(0);
    const rightButtonY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const leftX = useSpring(leftButtonX, springConfig);
    const leftY = useSpring(leftButtonY, springConfig);
    const rightX = useSpring(rightButtonX, springConfig);
    const rightY = useSpring(rightButtonY, springConfig);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    nextSlide();
                    return 0;
                }
                return prev + 2;
            });
        }, 100);
        return () => clearInterval(timer);
    }, [currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setProgress(0);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setProgress(0);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);

        // Magnetic effect for buttons
        if (leftButtonRef.current) {
            const leftRect = leftButtonRef.current.getBoundingClientRect();
            const leftCenterX = leftRect.left + leftRect.width / 2;
            const leftCenterY = leftRect.top + leftRect.height / 2;
            const leftDistX = e.clientX - leftCenterX;
            const leftDistY = e.clientY - leftCenterY;
            const leftDist = Math.sqrt(leftDistX ** 2 + leftDistY ** 2);
            if (leftDist < 80) {
                const strength = (80 - leftDist) / 80;
                leftButtonX.set(leftDistX * strength * 0.4);
                leftButtonY.set(leftDistY * strength * 0.4);
            } else {
                leftButtonX.set(0);
                leftButtonY.set(0);
            }
        }

        if (rightButtonRef.current) {
            const rightRect = rightButtonRef.current.getBoundingClientRect();
            const rightCenterX = rightRect.left + rightRect.width / 2;
            const rightCenterY = rightRect.top + rightRect.height / 2;
            const rightDistX = e.clientX - rightCenterX;
            const rightDistY = e.clientY - rightCenterY;
            const rightDist = Math.sqrt(rightDistX ** 2 + rightDistY ** 2);
            if (rightDist < 80) {
                const strength = (80 - rightDist) / 80;
                rightButtonX.set(rightDistX * strength * 0.4);
                rightButtonY.set(rightDistY * strength * 0.4);
            } else {
                rightButtonX.set(0);
                rightButtonY.set(0);
            }
        }
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        leftButtonX.set(0);
        leftButtonY.set(0);
        rightButtonX.set(0);
        rightButtonY.set(0);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
            filter: "blur(10px)",
        }),
    };

    return (
        <motion.div
            ref={containerRef}
            className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl border border-white/10 backdrop-blur-sm bg-black/20"
            style={{
                perspective: 1000,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
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
                        opacity: { duration: 0.3 },
                        scale: { duration: 0.4 },
                        filter: { duration: 0.3 },
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
                            {slides[currentIndex].title.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="inline-block mr-3"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className={`text-lg md:text-2xl font-medium mb-8 ${slides[currentIndex].textColor} opacity-90`}
                        >
                            {slides[currentIndex].subtitle}
                        </motion.p>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                className="rounded-full text-lg px-8 py-6 bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-white/20"
                            >
                                Discover More
                            </Button>
                        </motion.div>
                    </div>

                    {/* Decorative Background Element for Slide */}
                    <motion.div
                        className="absolute inset-0 -z-10"
                        style={{ backgroundColor: slides[currentIndex].color }}
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
                <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-white"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                            setProgress(0);
                        }}
                        className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80 w-3"
                            }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>

            <motion.button
                ref={leftButtonRef}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/10"
                onClick={prevSlide}
                style={{ x: leftX, y: leftY }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronLeft className="w-8 h-8" />
            </motion.button>
            <motion.button
                ref={rightButtonRef}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10 hover:border-white/30 hover:shadow-lg hover:shadow-white/10"
                onClick={nextSlide}
                style={{ x: rightX, y: rightY }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronRight className="w-8 h-8" />
            </motion.button>
        </motion.div>
    );
}
