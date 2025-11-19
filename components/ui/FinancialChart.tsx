"use client";
import React from "react";
import { motion } from "framer-motion";

interface FinancialChartProps {
    data: number[];
    labels: string[];
    color?: string;
}

export default function FinancialChart({ data, labels, color = "#E6242B" }: FinancialChartProps) {
    const max = Math.max(...data);
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (val / max) * 80; // Leave some padding at top
        return `${x},${y}`;
    }).join(" ");

    return (
        <div className="w-full h-64 relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="20" x2="100" y2="20" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2" />
                <line x1="0" y1="60" x2="100" y2="60" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2" />
                <line x1="0" y1="100" x2="100" y2="100" stroke="#e5e7eb" strokeWidth="0.5" />

                {/* Chart Line */}
                <motion.polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    points={points}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Area under curve (optional, but looks nice) */}
                <motion.path
                    d={`M0,100 ${points.split(" ").map(p => `L${p}`).join(" ")} L100,100 Z`}
                    fill={color}
                    fillOpacity="0.1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
            </svg>

            {/* Labels */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
                {labels.map((label, i) => (
                    <span key={i}>{label}</span>
                ))}
            </div>
        </div>
    );
}
