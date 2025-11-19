"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Button from "@/components/ui/Button";

export default function ContactSection() {
    const submitContact = useMutation(api.forms.submitContact);
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await submitContact(formState);
            setIsSuccess(true);
            setFormState({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen bg-gray-900 text-white py-20 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h2>
                        <p className="text-xl text-gray-400 mb-12">
                            Have a question or want to partner with us? We'd love to hear from you.
                        </p>

                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-500/10 border border-green-500/20 p-8 rounded-3xl text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                    >
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </motion.div>
                                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-gray-300">We'll get back to you shortly.</p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="mt-6 text-green-400 hover:text-green-300 underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-400">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6242B] transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-400">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6242B] transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-400">Message</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6242B] transition-all"
                                            placeholder="How can we help?"
                                        />
                                    </div>
                                    <Button type="submit" disabled={isSubmitting} className="w-full py-4 text-lg">
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Globe Side */}
                    <div className="h-[500px] w-full relative hidden lg:flex items-center justify-center">
                        <div className="relative w-[400px] h-[400px]">
                            <img
                                src="/images/earth-rotating.gif"
                                alt="Rotating Earth"
                                className="w-full h-full object-contain opacity-80"
                            />
                            {/* Optional Glow Effect */}
                            <div className="absolute inset-0 bg-[#E6242B] opacity-10 blur-3xl rounded-full -z-10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
