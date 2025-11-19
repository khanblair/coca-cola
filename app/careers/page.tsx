"use client";
import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CareersPage() {
  const jobs = useQuery(api.jobs.list);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover exciting career opportunities and be part of a team that refreshes the world.
          </p>
        </motion.div>

        {/* Job Listings */}
        <div className="max-w-4xl mx-auto space-y-6">
          {jobs?.map((job, idx) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <motion.div
                className="p-6 cursor-pointer"
                onClick={() => setExpandedId(expandedId === job._id ? null : job._id)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <motion.h3
                      className="text-2xl font-bold mb-2 text-gray-900 dark:text-white"
                      animate={{
                        boxShadow: expandedId === job._id
                          ? "0 0 20px rgba(230, 36, 43, 0.3)"
                          : "0 0 0px rgba(230, 36, 43, 0)",
                      }}
                    >
                      {job.title}
                    </motion.h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <span>🏢</span> {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📍</span> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📅</span> {new Date(job.datePosted).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === job._id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-[#E6242B]"
                  >
                    ▼
                  </motion.div>
                </div>
              </motion.div>

              {/* Expanded Description */}
              <AnimatePresence>
                {expandedId === job._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                        Job Description
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-wrap">
                        {job.description}
                      </p>
                      <Link href="/sign-in">
                        <Button variant="primary">Apply Now</Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {!jobs?.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-500 dark:text-gray-400"
            >
              <div className="text-6xl mb-4">💼</div>
              <p className="text-xl">No open positions at the moment.</p>
              <p className="mt-2">Check back soon for new opportunities!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
