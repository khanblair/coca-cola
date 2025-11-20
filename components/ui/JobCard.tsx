"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, SignInButton } from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import { Building2, MapPin, ChevronDown } from "lucide-react";

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
                className="p-6 md:p-8 cursor-pointer flex justify-between items-center group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                        </span>
                    </div>
                </div>

                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                    <ChevronDown className="w-6 h-6 text-muted-foreground" />
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
