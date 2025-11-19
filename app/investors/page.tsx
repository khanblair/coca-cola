"use client";
import React from "react";
import InvestorsSection from "@/components/sections/InvestorsSection";
import { motion } from "framer-motion";

export default function InvestorsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl font-bold mb-4"
              >
                Investor Relations
              </motion.h1>
              <p className="text-xl text-gray-400 max-w-xl">
                Transparent financial reporting and strategic insights for our shareholders.
              </p>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <div className="text-sm text-gray-400 mb-1">Stock Price (CCBU)</div>
              <div className="text-4xl font-bold text-[#E6242B]">UGX 245.00</div>
              <div className="text-green-500 text-sm font-medium">▲ +1.2% Today</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Investors Content */}
      <InvestorsSection />
    </div>
  );
}
