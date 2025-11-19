"use client";
import React from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function RevealText({ text, className = "", delay = 0 }: RevealTextProps) {
    // Split text into words for smoother animation
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay,
            },
        },
    };

    const word = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1] as const,
            },
        },
    };

    return (
        <motion.span
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {words.map((w, index) => (
                <motion.span key={index} variants={word} className="inline-block mr-[0.25em]">
                    {w}
                </motion.span>
            ))}
        </motion.span>
    );
}
