"use client";
import React from "react";
import FeaturedArticle from "@/components/ui/FeaturedArticle";
import NewsTicker from "@/components/ui/NewsTicker";

export default function MediaCenter() {
    const headlines = [
        "Coca-Cola Uganda Launches New Sustainability Initiative",
        "Q3 Financial Results Exceed Expectations",
        "New Youth Empowerment Program Announced",
        "Celebrating 25 Years of Dasani Water",
        "Community Water Project Reaches 10,000 Households",
    ];

    return (
        <section className="py-20 bg-black text-white min-h-screen flex flex-col justify-center overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">
                    Media Center
                </h2>

                <FeaturedArticle
                    title="Refreshing the World, One Community at a Time"
                    category="Sustainability"
                    image="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2070&auto=format&fit=crop" // Placeholder
                    summary="Discover how our latest water replenishment projects are transforming lives across the Central Region."
                />
            </div>

            <div className="mt-12">
                <NewsTicker headlines={headlines} />
            </div>
        </section>
    );
}
