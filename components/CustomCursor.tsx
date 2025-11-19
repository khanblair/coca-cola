"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "text">("default");
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
        setCursorVariant("hover");
        return;
      }

      if (target.closest('p') || target.closest('h1') || target.closest('h2') || target.closest('h3') || target.closest('span')) {
        setCursorVariant("text");
        return;
      }

      setCursorVariant("default");
    };

    const handleMouseLeave = () => {
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", moveCursor);
    // Use mouseover instead of mouseenter to bubble up from children
    document.addEventListener("mouseover", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 20,
      height: 20,
      x: -10,
      y: -10,
      backgroundColor: "rgba(230, 36, 43, 0.2)",
      border: "2px solid rgba(230, 36, 43, 0.8)",
    },
    hover: {
      width: 60,
      height: 60,
      x: -30,
      y: -30,
      backgroundColor: "rgba(230, 36, 43, 0.1)",
      border: "1px solid rgba(230, 36, 43, 0.5)",
    },
    text: {
      width: 4,
      height: 4,
      x: -2,
      y: -2,
      backgroundColor: "rgba(230, 36, 43, 1)",
      border: "none",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block rounded-full backdrop-blur-[1px]"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
}
