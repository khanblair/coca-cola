"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { isMobile } from "@/lib/utils";
import Image from "next/image";

// Dynamic import for 3D components (disabled SSR for performance)
const WorldCanvas = dynamic(() => import("@/components/canvas/WorldCanvas"), {
  ssr: false,
});
const BottleModel = dynamic(() => import("@/components/canvas/BottleModel"), {
  ssr: false,
});

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [is3DEnabled, setIs3DEnabled] = useState(false);

  useEffect(() => {
    // Check if device supports 3D (desktop only)
    setIs3DEnabled(!isMobile());

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile()) return;
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-950" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Floating theme toggle (hidden on large screens, header already shows one) */}
        <div className="absolute top-6 right-6 z-30 lg:hidden">
          <ThemeSwitcher />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-gray-900 dark:text-white">Taste the</span>
              <br />
              <span className="text-[#E6242B] inline-block">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  Feeling
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Experience the refreshing moments that bring Uganda together. Discover our
              heritage, innovation, and commitment to quality.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button variant="primary" className="text-lg">
                Explore Our Brands
              </Button>
              <Button variant="outline" className="text-lg">
                Our Story
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Bottle or Fallback Image */}
          <motion.div
            className="relative h-[400px] lg:h-[600px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {is3DEnabled ? (
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-[#E6242B] border-t-transparent rounded-full"
                    />
                  </div>
                }
              >
                <WorldCanvas className="w-full h-full" cameraPosition={[0, 0, 8]}>
                  <BottleModel mouseX={mousePosition.x} mouseY={mousePosition.y} />
                </WorldCanvas>
              </Suspense>
            ) : (
              // Mobile fallback: Animated 2D image
              <motion.div
                className="w-full h-full flex items-center justify-center"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative w-48 h-96 bg-gradient-to-b from-[#E6242B] to-[#c01e25] rounded-[100px] shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-24 h-8 bg-gray-900 rounded-t-lg" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-24 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-[#E6242B] font-bold text-2xl">Coca-Cola</span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-[#E6242B] rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
