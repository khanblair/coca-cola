"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Id } from "@/convex/_generated/dataModel";

export default function JobsAdminPage() {
  const jobs = useQuery(api.jobs.listAll);
  const createJob = useMutation(api.jobs.create);
  const updateJob = useMutation(api.jobs.update);
  const deleteJob = useMutation(api.jobs.remove);
  const toggleActive = useMutation(api.jobs.toggleActive);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<Id<"jobs"> | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateJob({ id: editingId, ...formData });
        setEditingId(null);
      } else {
        await createJob(formData);
      }
      setFormData({ title: "", department: "", location: "", description: "" });
      setIsCreating(false);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleEdit = (job: any) => {
    setEditingId(job._id);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      description: job.description,
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: Id<"jobs">) => {
    if (confirm("Are you sure you want to delete this job?")) {
      await deleteJob({ id });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Postings</h1>
        <Button onClick={() => setIsCreating(!isCreating)} variant="default">
          {isCreating ? "Cancel" : "+ New Job"}
        </Button>
      </div>

      {/* Create/Edit Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {editingId ? "Edit Job" : "Create New Job"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#E6242B] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#E6242B] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#E6242B] outline-none"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#E6242B] outline-none"
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="default">
                  {editingId ? "Update Job" : "Create Job"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setFormData({ title: "", department: "", location: "", description: "" });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs?.map((job, idx) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${job.isActive
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                  >
                    {job.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>📍 {job.location}</span>
                  <span>🏢 {job.department}</span>
                  <span>📅 {new Date(job.datePosted).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                  {job.description}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => toggleActive({ id: job._id })}
                  className="px-3 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  {job.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleEdit(job)}
                  className="px-3 py-2 text-sm rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-3 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {!jobs?.length && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No jobs posted yet. Create your first job posting!
          </div>
        )}
      </div>
    </div>
  );
}
