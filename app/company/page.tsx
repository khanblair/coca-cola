"use client";
import React from "react";
import CompanyHistory from "@/components/sections/CompanyHistory";
import TypewriterText from "@/components/ui/RevealText";
import { motion } from "framer-motion";

export default function CompanyPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero / Mission Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12"
          >
            <span className="text-[#E6242B] font-bold tracking-widest uppercase text-sm">Our Purpose</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-gray-900 dark:text-white">
              Refresh the World. <br /> Make a Difference.
            </h1>
          </motion.div>

          <div className="max-w-4xl mx-auto text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
            <TypewriterText
              text="We are Coca-Cola Beverages Uganda. We craft the brands you love, refresh body and spirit, and create a better shared future for our communities."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* History Section Component */}
      <CompanyHistory />

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 dark:text-white">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Leadership", desc: "The courage to shape a better future." },
              { title: "Collaboration", desc: "Leverage collective genius." },
              { title: "Integrity", desc: "Be real." },
              { title: "Accountability", desc: "If it is to be, it's up to me." },
              { title: "Passion", desc: "Committed in heart and mind." },
              { title: "Diversity", desc: "As inclusive as our brands." },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border-l-4 border-[#E6242B]"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
