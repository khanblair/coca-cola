"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, SignInButton } from "@clerk/nextjs";
import Button from "@/components/ui/Button";

interface JobCardProps {
    job: {
        _id: string;
        title: string;
        department: string;
        location: string;
        description: string;
    };
}

export default function JobCard({ job }: JobCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { isSignedIn } = useUser();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500 ${isOpen ? "shadow-[0_0_30px_rgba(230,36,43,0.15)]" : "shadow-md hover:shadow-lg"
                }`}
        >
            <div
                className="p-6 md:p-8 cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{job.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {job.location}
                        </span>
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 md:p-8 pt-0 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                                {job.description}
                            </p>

                            <div className="flex justify-end">
                                {isSignedIn ? (
                                    <Button onClick={() => alert("Application form would open here!")}>
                                        Apply Now
                                    </Button>
                                ) : (
                                    <SignInButton mode="modal">
                                        <Button variant="outline">Sign in to Apply</Button>
                                    </SignInButton>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
