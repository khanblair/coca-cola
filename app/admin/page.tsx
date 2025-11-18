"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function AdminDashboard() {
  const jobs = useQuery(api.jobs.listAll);
  const media = useQuery(api.media.list);
  const forms = useQuery(api.forms.getNew);

  const stats = [
    {
      label: "Active Jobs",
      value: jobs?.filter((j) => j.isActive).length ?? 0,
      link: "/admin/jobs",
      color: "bg-blue-500",
    },
    {
      label: "Media Articles",
      value: media?.length ?? 0,
      link: "/admin/media",
      color: "bg-green-500",
    },
    {
      label: "New Leads",
      value: forms?.length ?? 0,
      link: "/admin/leads",
      color: "bg-[#E6242B]",
    },
    {
      label: "Total Jobs",
      value: jobs?.length ?? 0,
      link: "/admin/jobs",
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage job postings, media content, and customer leads from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={stat.link}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {stat.label}
                </h3>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/jobs">
            <Button variant="primary">Create New Job</Button>
          </Link>
          <Link href="/admin/media">
            <Button variant="outline">Add Media Article</Button>
          </Link>
          <Link href="/admin/leads">
            <Button variant="outline">View Leads</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
