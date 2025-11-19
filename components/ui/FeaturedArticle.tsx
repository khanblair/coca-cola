"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface FeaturedArticleProps {
    title: string;
    category: string;
    image: string; // URL or color
    summary: string;
}

export default function FeaturedArticle({ title, category, image, summary }: FeaturedArticleProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-4xl mx-auto h-[500px] rounded-3xl bg-gray-900 overflow-hidden cursor-pointer group perspective-1000"
        >
            {/* Background Layer (Image) */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-out group-hover:scale-110"
                style={{
                    backgroundImage: `url(${image})`,
                    transform: "translateZ(-50px)"
                }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content Layer (Floating) */}
            <div
                className="absolute bottom-0 left-0 p-12 w-full"
                style={{ transform: "translateZ(50px)" }}
            >
                <motion.span
                    className="inline-block px-4 py-1 rounded-full bg-[#E6242B] text-white text-sm font-bold mb-4"
                    style={{ transform: "translateZ(30px)" }}
                >
                    {category}
                </motion.span>

                <h3
                    className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {title}
                </h3>

                <p
                    className="text-gray-300 text-lg max-w-2xl"
                    style={{ transform: "translateZ(10px)" }}
                >
                    {summary}
                </p>
            </div>
        </motion.div>
    );
}
