"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
// Framer Motion's intrinsic element typing can conflict with native button props (onDrag types).
// Create a loosely-typed MotionButton to avoid TypeScript incompatibilities when spreading native props.
const MotionButton: any = motion.button;
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

export default function Button({
  children,
  className = "",
  variant = "primary",
  onClick,
  ...props
}: Props) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.(e);
  };

  const variants: Record<string, string> = {
    primary:
      "bg-[#E6242B] text-white hover:shadow-[0_0_20px_rgba(230,36,43,0.6)] dark:shadow-[0_0_25px_rgba(230,36,43,0.8)]",
    ghost:
      "bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
    outline:
      "bg-transparent border-2 border-[#E6242B] text-[#E6242B] hover:bg-[#E6242B] hover:text-white",
  };

  return (
    <MotionButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative overflow-hidden px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-out",
        variants[variant],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          aria-hidden
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            width: 0,
            height: 0,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 400, height: 400, opacity: 0, transform: "translate(-50%, -50%)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </MotionButton>
  );
}
