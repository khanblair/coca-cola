"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSlider from "@/components/sections/HeroSlider";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Particle component
const Particle = ({ index }: { index: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 2;
  const randomDuration = 3 + Math.random() * 4;
  const randomSize = 2 + Math.random() * 4;

  return (
    <motion.div
      className="absolute rounded-full bg-white/20 backdrop-blur-sm"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: randomSize,
        height: randomSize,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "easeInOut",
      }}
    />
  );
};

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Attempt to play video on mount
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }

    // GSAP Parallax Effect
    if (sectionRef.current && videoRef.current) {
      gsap.to(videoRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Magnetic effect for scroll indicator
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollIndicatorRef.current) return;

    const rect = scrollIndicatorRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < 100) {
      const strength = (100 - distance) / 100;
      mouseX.set(distanceX * strength * 0.3);
      mouseY.set(distanceY * strength * 0.3);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Background Video with Parallax */}
      <div className="absolute inset-0 z-0 will-change-transform">
        <video
          ref={videoRef}
          src="/videos/coca-cola-intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-[120%] object-cover opacity-90"
        />
        {/* Dynamic Gradient Overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/40"
          animate={{
            opacity: [0.8, 0.9, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl"
        >
          <HeroSlider />
        </motion.div>

        {/* Magnetic Scroll Indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          style={{ x, y }}
        >
          <motion.span
            className="text-white/60 text-sm uppercase tracking-widest group-hover:text-white/90 transition-colors"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 group-hover:border-white/60 group-hover:shadow-lg group-hover:shadow-white/20 transition-all"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full group-hover:bg-red-500 transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
