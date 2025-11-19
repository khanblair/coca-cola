"use client";
import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function SignInForm() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/admin");
            } else {
                console.log(result);
            }
        } catch (err: any) {
            // Check if the error is "You're already signed in."
            if (err.errors && err.errors[0]?.code === "session_exists") {
                router.push("/admin");
                return;
            }

            console.error("error", err.errors?.[0]?.longMessage || err.message);
            setError(err.errors?.[0]?.longMessage || "An error occurred");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
        >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Admin Access
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
                    <motion.input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6242B] transition-all"
                        whileFocus={{ scale: 1.02 }}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Password</label>
                    <motion.input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#E6242B] transition-all"
                        whileFocus={{ scale: 1.02 }}
                    />
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: [0, -10, 10, -10, 0] }}
                        className="text-red-500 text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <Button type="submit" className="w-full py-4 text-lg">
                    Sign In
                </Button>
            </form>
        </motion.div>
    );
}
