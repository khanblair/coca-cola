"use client";
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

// Bubble component for liquid effect
const Bubble = ({ delay }: { delay: number }) => {
    const randomX = Math.random() * 100;
    const randomSize = 20 + Math.random() * 40;
    const randomDuration = 3 + Math.random() * 2;

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                left: `${randomX}%`,
                bottom: -20,
                width: randomSize,
                height: randomSize,
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(255,255,255,0.05))",
            }}
            animate={{
                y: [-20, -300],
                opacity: [0, 0.6, 0],
                scale: [1, 1.2, 0.8],
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: delay,
                ease: "easeOut",
            }}
        />
    );
};

export default function ProductCard({ name, color, image, nutrition }: ProductCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D rotation effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsFlipped(false);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative w-64 h-96 cursor-pointer group"
            style={{
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsFlipped(true)}
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <motion.div
                className="w-full h-full relative"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Face */}
                <motion.div
                    className="absolute inset-0 backface-hidden rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 border-2 overflow-hidden"
                    style={{
                        borderColor: color,
                        backfaceVisibility: "hidden",
                    }}
                >
                    {/* Liquid Bubble Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Bubble key={i} delay={i * 0.6} />
                        ))}
                    </div>

                    {/* Glow Effect */}
                    <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, ${color}40, transparent 70%)`,
                            filter: "blur(20px)",
                        }}
                    />

                    <motion.div
                        className="w-32 h-32 rounded-full mb-6 flex items-center justify-center relative z-10"
                        style={{ backgroundColor: `${color}20` }}
                        animate={{
                            boxShadow: [
                                `0 0 20px ${color}40`,
                                `0 0 40px ${color}60`,
                                `0 0 20px ${color}40`,
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {/* Product Image */}
                        <motion.div
                            className="relative w-20 h-32"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image
                                src={image || "/images/Coca-Cola-logo.png"}
                                alt={name}
                                fill
                                className="object-contain drop-shadow-xl"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.h3
                        className="text-2xl font-bold text-center mb-2 relative z-10"
                        style={{ color }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {name}
                    </motion.h3>
                    <motion.p
                        className="text-gray-500 text-sm text-center relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Hover to see facts
                    </motion.p>

                    {/* Ripple Effects */}
                    {ripples.map((ripple) => (
                        <motion.div
                            key={ripple.id}
                            className="absolute rounded-full border-2 pointer-events-none"
                            style={{
                                left: ripple.x,
                                top: ripple.y,
                                borderColor: color,
                            }}
                            initial={{ width: 0, height: 0, opacity: 0.6 }}
                            animate={{ width: 100, height: 100, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                        />
                    ))}
                </motion.div>

                {/* Back Face */}
                <motion.div
                    className="absolute inset-0 backface-hidden rounded-2xl shadow-xl flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 border-2"
                    style={{
                        borderColor: color,
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                    }}
                >
                    <motion.h3
                        className="text-xl font-bold mb-6"
                        style={{ color }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: isFlipped ? 1 : 0, scale: isFlipped ? 1 : 0.8 }}
                        transition={{ delay: 0.2 }}
                    >
                        Nutritional Facts
                    </motion.h3>

                    <div className="w-full space-y-4">
                        <motion.div
                            className="flex justify-between items-center border-b pb-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: isFlipped ? 0 : -20, opacity: isFlipped ? 1 : 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="text-gray-600 dark:text-gray-400">Calories</span>
                            <motion.span
                                className="font-bold text-xl"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                {nutrition.calories}
                            </motion.span>
                        </motion.div>
                        <motion.div
                            className="flex justify-between items-center border-b pb-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: isFlipped ? 0 : -20, opacity: isFlipped ? 1 : 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span className="text-gray-600 dark:text-gray-400">Sugar</span>
                            <motion.span
                                className="font-bold text-xl"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                {nutrition.sugar}g
                            </motion.span>
                        </motion.div>
                    </div>

                    <motion.div
                        className="mt-8 text-center text-xs text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isFlipped ? 1 : 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        *Percent Daily Values are based on a 2,000 calorie diet.
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
