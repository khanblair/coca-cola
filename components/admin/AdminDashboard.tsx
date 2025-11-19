"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Protect, UserButton } from "@clerk/nextjs";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"jobs" | "media" | "leads">("jobs");
    const jobs = useQuery(api.jobs.listAll);
    const forms = useQuery(api.forms.list);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[#E6242B]">Admin Panel</h1>
                    <UserButton />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                    {["jobs", "media", "leads"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${activeTab === tab
                                    ? "bg-[#E6242B] text-white"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === "jobs" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Job Postings</h2>
                                <Button>Add New Job</Button>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="p-4">Title</th>
                                            <th className="p-4">Department</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs?.map((job) => (
                                            <tr key={job._id} className="border-t border-gray-100 dark:border-gray-700">
                                                <td className="p-4 font-medium">{job.title}</td>
                                                <td className="p-4 text-gray-500">{job.department}</td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${job.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                        {job.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <button className="text-blue-600 hover:underline mr-4">Edit</button>
                                                    <button className="text-red-600 hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "leads" && (
                        <div>
                            <h2 className="text-xl font-bold mb-6">Form Submissions</h2>
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="p-4">Type</th>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Message</th>
                                            <th className="p-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {forms?.map((form) => (
                                            <tr key={form._id} className="border-t border-gray-100 dark:border-gray-700">
                                                <td className="p-4 capitalize">{form.type}</td>
                                                <td className="p-4">{form.name || "-"}</td>
                                                <td className="p-4">{form.email}</td>
                                                <td className="p-4 truncate max-w-xs">{form.message || "-"}</td>
                                                <td className="p-4">
                                                    {form.isNew && (
                                                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">New</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "media" && (
                        <div className="text-center py-20 text-gray-500">
                            Media management coming soon...
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
