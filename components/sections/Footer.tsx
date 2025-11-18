"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: "About Us", href: "/company" },
      { label: "Our Brands", href: "/brands" },
      { label: "Careers", href: "/careers" },
      { label: "Investors", href: "/investors" },
    ],
    Resources: [
      { label: "Media Center", href: "/media" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
    Connect: [
      { label: "Facebook", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-[#E6242B] mb-4"
            >
              Coca-Cola
            </motion.h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Refreshing Uganda, one moment at a time. Discover the taste that brings people together.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#E6242B] dark:hover:text-[#E6242B] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400"
        >
          <div className="flex items-center justify-between">
            <p className="text-center w-full md:text-left">© {currentYear} Coca-Cola Uganda. All rights reserved.</p>
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
