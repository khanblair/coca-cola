"use client";
import React from "react";
import MediaCenter from "@/components/sections/MediaCenter";
import { motion } from "framer-motion";

export default function MediaPage() {
  return (
    <div className="min-h-screen pt-20 bg-black">
      {/* Media Center Component (Includes Header & Ticker) */}
      <MediaCenter />

      {/* Latest Press Releases Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">Latest News</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                date: "Nov 15, 2024",
                category: "Sustainability",
                title: "Coca-Cola Uganda Partners with KCCA for Clean City Initiative",
                image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop"
              },
              {
                date: "Oct 28, 2024",
                category: "Innovation",
                title: "Introducing the New Recyclable Bottles",
                image: "https://images.unsplash.com/photo-1605548230624-8d2d639e7021?q=80&w=2070&auto=format&fit=crop"
              },
              {
                date: "Oct 10, 2024",
                category: "Community",
                title: "500 Youth Graduate from Kuza Generation Program",
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop"
              }
            ].map((news, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span>{news.date}</span>
                  <span className="text-[#E6242B] font-medium">{news.category}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#E6242B] transition-colors">
                  {news.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
