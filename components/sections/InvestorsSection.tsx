"use client";
import React from "react";
import FinancialChart from "@/components/ui/FinancialChart";
import { motion } from "framer-motion";

export default function InvestorsSection() {
    const documents = [
        { title: "2024 Annual Report", size: "4.2 MB" },
        { title: "Q3 2024 Earnings Presentation", size: "2.1 MB" },
        { title: "Sustainability Report 2023", size: "5.8 MB" },
        { title: "Corporate Governance Guidelines", size: "1.5 MB" },
    ];

    return (
        <section className="py-20 bg-white dark:bg-gray-950 min-h-screen">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900 dark:text-white">
                    Investor Relations
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Financial Performance */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                            Financial Performance
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl shadow-lg">
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold text-gray-500 mb-2">Revenue Growth (UGX Billions)</h4>
                                <FinancialChart
                                    data={[450, 480, 520, 590, 650]}
                                    labels={["2020", "2021", "2022", "2023", "2024"]}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8 mt-8">
                                <div>
                                    <div className="text-sm text-gray-500">Net Income</div>
                                    <div className="text-3xl font-bold text-[#E6242B]">
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ duration: 1 }}
                                        >
                                            128.5B
                                        </motion.span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">EPS</div>
                                    <div className="text-3xl font-bold text-[#E6242B]">245</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Documents & Resources */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                            Key Documents
                        </h3>
                        <div className="space-y-4">
                            {documents.map((doc, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-[#E6242B]">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">{doc.title}</div>
                                            <div className="text-sm text-gray-500">{doc.size} • PDF</div>
                                        </div>
                                    </div>

                                    <motion.div
                                        whileHover={{ y: [0, -5, 0] }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-[#E6242B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </motion.div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
