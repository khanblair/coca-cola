"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const storyPoints = [
    {
      year: "1886",
      title: "The Beginning",
      description: "A pharmacist in Atlanta creates a distinctive beverage.",
    },
    {
      year: "1950s",
      title: "Global Expansion",
      description: "Coca-Cola becomes a worldwide symbol of refreshment.",
    },
    {
      year: "1995",
      title: "Uganda Operations",
      description: "Establishing roots in the Pearl of Africa.",
    },
    {
      year: "2025",
      title: "Innovation Today",
      description: "Leading sustainability and community initiatives.",
    },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Fixed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900" />

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10 pointer-events-none">
        <div ref={textRef} className="text-[20rem] font-bold text-[#E6242B] whitespace-nowrap">
          HERITAGE
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          Our Journey Through Time
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {storyPoints.map((point, idx) => (
            <motion.div
              key={point.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-5xl font-bold text-[#E6242B] mb-4">{point.year}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {point.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{point.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
