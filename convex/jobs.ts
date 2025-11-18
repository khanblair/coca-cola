import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query: Get all active jobs
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("jobs")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();
  },
});

// Query: Get all jobs (Admin only)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("jobs").order("desc").collect();
  },
});

// Query: Get single job by ID
export const getById = query({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation: Create new job
export const create = mutation({
  args: {
    title: v.string(),
    department: v.string(),
    location: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const jobId = await ctx.db.insert("jobs", {
      ...args,
      datePosted: Date.now(),
      isActive: true,
    });
    return jobId;
  },
});

// Mutation: Update job
export const update = mutation({
  args: {
    id: v.id("jobs"),
    title: v.optional(v.string()),
    department: v.optional(v.string()),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Mutation: Delete job
export const remove = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Mutation: Toggle job active status
export const toggleActive = mutation({
  args: { id: v.id("jobs") },
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.id);
    if (!job) throw new Error("Job not found");
    await ctx.db.patch(args.id, { isActive: !job.isActive });
    return args.id;
  },
});
