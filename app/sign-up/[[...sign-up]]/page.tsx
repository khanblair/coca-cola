import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Using Clerk's component for Sign Up to save time, as custom Sign In is the main requirement for Admin */}
            <SignUp />
        </div>
    );
}
