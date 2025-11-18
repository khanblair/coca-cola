import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import ScrollTimeline from "@/components/sections/ScrollTimeline";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ScrollTimeline />

      {/* Additional sections */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Refreshing Moments Await
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our commitment to quality, sustainability, and bringing people together
            through every sip.
          </p>
        </div>
      </section>
    </div>
  );
}
