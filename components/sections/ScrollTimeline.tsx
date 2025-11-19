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
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background text
      gsap.to(textRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Background color shift
      gsap.to(bgRef.current, {
        backgroundColor: "#1a1a1a",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const narrativeSteps = [
    {
      title: "1886",
      text: "It started with a secret formula in Atlanta.",
      align: "left",
    },
    {
      title: "Global Icon",
      text: "From a local soda fountain to the most recognized brand in the world.",
      align: "right",
    },
    {
      title: "In Uganda",
      text: "Refreshing the Pearl of Africa for decades, building communities and sharing happiness.",
      align: "left",
    },
    {
      title: "The Future",
      text: "Sustainable, innovative, and always refreshing. The story continues with you.",
      align: "center",
    },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] py-20 overflow-hidden">
      {/* Parallax Background Layer */}
      <div ref={bgRef} className="absolute inset-0 bg-[#E6242B] transition-colors duration-700">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />

        {/* Giant Text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div
            ref={textRef}
            className="text-[15vw] md:text-[20vw] font-black text-white opacity-10 whitespace-nowrap select-none"
            style={{ transform: "translateY(-100px)" }}
          >
            LEGACY
          </div>
        </div>
      </div>

      {/* Scrolling Narrative Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col gap-[40vh]">
          {narrativeSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex ${step.align === "left" ? "justify-start" :
                  step.align === "right" ? "justify-end" : "justify-center"
                }`}
            >
              <div className={`max-w-xl p-8 md:p-12 rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-2xl
                ${step.align === "center" ? "text-center" : "text-left"}`}
              >
                <h3 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                  {step.title}
                </h3>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/90">
                  {step.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
