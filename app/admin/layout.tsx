import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton, SignOutButton } from "@clerk/nextjs";

export const metadata = {
  title: "Admin Dashboard - Coca-Cola",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/jobs", label: "Job Postings" },
    { href: "/admin/media", label: "Media Center" },
    { href: "/admin/leads", label: "Leads" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="text-xl font-bold text-[#E6242B]">
              Admin Panel
            </Link>
            <nav className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#E6242B] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#E6242B]"
            >
              View Site
            </Link>
            <UserButton afterSignOutUrl="/" />
            <div className="hidden md:block">
              <SignOutButton>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
