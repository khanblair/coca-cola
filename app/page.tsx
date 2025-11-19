import React from "react";
import HeroSection from "@/components/sections/HeroSection";
import ScrollTimeline from "@/components/sections/ScrollTimeline";
import CompanyHistory from "@/components/sections/CompanyHistory";
import BrandsShowcase from "@/components/sections/BrandsShowcase";
import CareersSection from "@/components/sections/CareersSection";
import MediaCenter from "@/components/sections/MediaCenter";
import InvestorsSection from "@/components/sections/InvestorsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <ScrollTimeline />
      <CompanyHistory />
      <BrandsShowcase />
      <CareersSection />
      <MediaCenter />
      <InvestorsSection />
      <ContactSection />
    </div>
  );
}
