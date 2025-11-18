"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function SignUpClient() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white dark:bg-gray-800 shadow-2xl rounded-2xl",
              headerTitle: "text-3xl font-bold text-gray-900 dark:text-white",
              headerSubtitle: "text-gray-600 dark:text-gray-400",
              formButtonPrimary: "bg-[#E6242B] hover:bg-[#c41e24] text-white",
              footerActionLink: "text-[#E6242B] hover:text-[#c41e24]",
              formFieldInput: "bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700",
              dividerLine: "bg-gray-300 dark:bg-gray-700",
              dividerText: "text-gray-500 dark:text-gray-400",
              socialButtonsBlockButton: "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900",
            },
          }}
          redirectUrl="/admin"
          afterSignUpUrl="/admin"
          routing="path"
          path="/auth/sign-up"
        />
      </motion.div>
    </div>
  );
}
