"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "magnify">("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      try {
        // Check if target is an Element (which has the closest method)
        if (!e.target || !(e.target instanceof Element)) {
          return;
        }

        // Now TypeScript knows e.target is an Element and has the closest method
        if (e.target.closest('a') || e.target.closest('button')) {
          setCursorVariant("hover");
          return;
        }

        if (e.target.closest('.cursor-magnify')) {
          setCursorVariant("magnify");
          return;
        }
      } catch (error) {
        console.error("Error in handleMouseEnter:", error);
      }
    };


    const handleMouseLeave = () => {
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(230, 36, 43, 0.3)",
      border: "2px solid rgba(230, 36, 43, 0.8)",
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(230, 36, 43, 0.1)",
      border: "2px solid rgba(230, 36, 43, 1)",
    },
    magnify: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(230, 36, 43, 0.05)",
      border: "3px solid rgba(230, 36, 43, 1)",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:block rounded-full mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}
