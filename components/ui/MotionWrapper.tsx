"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

const MotionWrapper: React.FC<MotionWrapperProps> = ({
    children,
    className,
    delay = 0,
    direction = "up",
    ...props
}) => {
    const getInitial = () => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: 20 };
            case "down":
                return { opacity: 0, y: -20 };
            case "left":
                return { opacity: 0, x: 20 };
            case "right":
                return { opacity: 0, x: -20 };
            case "none":
                return { opacity: 0 };
            default:
                return { opacity: 0, y: 20 };
        }
    };

    const getAnimate = () => {
        switch (direction) {
            case "up":
            case "down":
                return { opacity: 1, y: 0 };
            case "left":
            case "right":
                return { opacity: 1, x: 0 };
            case "none":
                return { opacity: 1 };
            default:
                return { opacity: 1, y: 0 };
        }
    };

    return (
        <motion.div
            initial={getInitial()}
            whileInView={getAnimate()}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default MotionWrapper;
