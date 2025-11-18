"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import type { Id } from "@/convex/_generated/dataModel";

export default function LeadsAdminPage() {
  const allForms = useQuery(api.forms.list);
  const newForms = useQuery(api.forms.getNew);
  const markAsRead = useMutation(api.forms.markAsRead);
  const deleteForm = useMutation(api.forms.remove);

  const [filter, setFilter] = useState<"all" | "contact" | "newsletter" | "new">("all");

  const filteredForms = allForms?.filter((form) => {
    if (filter === "new") return form.isNew;
    if (filter === "all") return true;
    return form.type === filter;
  });

  const handleMarkAsRead = async (id: Id<"forms">) => {
    await markAsRead({ id });
  };

  const handleDelete = async (id: Id<"forms">) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      await deleteForm({ id });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact & Newsletter Leads</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {newForms?.length || 0} new leads
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "new", "contact", "newsletter"].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === filterType
                ? "bg-[#E6242B] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredForms?.map((form, idx) => (
                <motion.tr
                  key={form._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    form.isNew ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        form.type === "contact"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      }`}
                    >
                      {form.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {form.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {form.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {form.message || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {form.isNew ? (
                      <span className="px-3 py-1 bg-[#E6242B] text-white rounded-full text-xs font-semibold">
                        New
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                        Read
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      {form.isNew && (
                        <button
                          onClick={() => handleMarkAsRead(form._id)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(form._id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filteredForms?.length && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No leads found matching your filter.
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-[#E6242B] mb-2">{allForms?.length || 0}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Leads</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {allForms?.filter((f) => f.type === "contact").length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Contact Forms</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {allForms?.filter((f) => f.type === "newsletter").length || 0}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Newsletter Subscribers</div>
        </div>
      </div>
    </div>
  );
}
