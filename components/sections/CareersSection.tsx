"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import JobCard from "@/components/ui/JobCard";
import { motion } from "framer-motion";

export default function CareersSection() {
    const jobs = useQuery(api.jobs.list);

    // Fallback data if no jobs in DB yet
    const fallbackJobs = [
        {
            _id: "1",
            title: "Senior Brand Manager",
            department: "Marketing",
            location: "Kampala, Uganda",
            description: "Lead our brand strategy and drive growth in the region. We are looking for a creative visionary with 5+ years of experience in FMCG.",
        },
        {
            _id: "2",
            title: "Logistics Coordinator",
            department: "Supply Chain",
            location: "Namanve, Uganda",
            description: "Ensure smooth operations in our distribution network. Experience with SAP and large-scale logistics is required.",
        },
        {
            _id: "3",
            title: "Full Stack Developer",
            department: "Technology",
            location: "Remote / Kampala",
            description: "Join our digital transformation team. Proficiency in Next.js, React, and Node.js is essential.",
        },
    ];

    const displayJobs = jobs && jobs.length > 0 ? jobs : fallbackJobs;

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                        Join Our Team
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Be part of a global family that's making a difference in Uganda.
                        We offer competitive benefits and a vibrant work culture.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {displayJobs ? (
                        displayJobs.map((job) => (
                            <JobCard key={job._id} job={job as any} />
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <div className="animate-spin w-8 h-8 border-4 border-[#E6242B] border-t-transparent rounded-full mx-auto mb-4" />
                            <p>Loading opportunities...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
