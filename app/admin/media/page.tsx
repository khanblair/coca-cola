"use client";
import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import type { Id } from "@/convex/_generated/dataModel";

export default function MediaAdminPage() {
  const media = useQuery(api.media.list);
  const createMedia = useMutation(api.media.create);
  const updateMedia = useMutation(api.media.update);
  const deleteMedia = useMutation(api.media.remove);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<Id<"media"> | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    thumbnailUrl: "",
    isFeatured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMedia({ id: editingId, ...formData });
        setEditingId(null);
      } else {
        await createMedia(formData);
      }
      setFormData({
        title: "",
        summary: "",
        content: "",
        category: "",
        thumbnailUrl: "",
        isFeatured: false,
      });
      setIsCreating(false);
    } catch (error) {
      console.error("Error saving media:", error);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      summary: item.summary,
      content: item.content,
      category: item.category,
      thumbnailUrl: item.thumbnailUrl,
      isFeatured: item.isFeatured,
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: Id<"media">) => {
    if (confirm("Are you sure you want to delete this article?")) {
      await deleteMedia({ id });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Media Center</h1>
        <Button onClick={() => setIsCreating(!isCreating)} variant="primary">
          {isCreating ? "Cancel" : "+ New Article"}
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
                {editingId ? "Edit Article" : "Create New Article"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Title
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
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Innovation, Campaigns"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#E6242B] outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#E6242B] outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Summary
                  </label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#E6242B] outline-none"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#E6242B] outline-none"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#E6242B] border-gray-300 rounded focus:ring-[#E6242B]"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Feature this article
                  </label>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="submit" variant="primary">
                  {editingId ? "Update Article" : "Create Article"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                    setFormData({
                      title: "",
                      summary: "",
                      content: "",
                      category: "",
                      thumbnailUrl: "",
                      isFeatured: false,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {media?.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
          >
            {item.thumbnailUrl && (
              <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                {item.isFeatured && (
                  <div className="absolute top-3 right-3 bg-[#E6242B] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                  {item.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {item.summary}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {!media?.length && (
          <div className="col-span-2 text-center py-12 text-gray-500 dark:text-gray-400">
            No media articles yet. Create your first article!
          </div>
        )}
      </div>
    </div>
  );
}
