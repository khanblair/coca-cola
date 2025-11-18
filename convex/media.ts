import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query: Get all media articles
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("media").order("desc").collect();
  },
});

// Query: Get featured article
export const getFeatured = query({
  args: {},
  handler: async (ctx) => {
    const featured = await ctx.db
      .query("media")
      .filter((q) => q.eq(q.field("isFeatured"), true))
      .first();
    return featured;
  },
});

// Query: Get media by category
export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("media")
      .filter((q) => q.eq(q.field("category"), args.category))
      .order("desc")
      .collect();
  },
});

// Mutation: Create media article
export const create = mutation({
  args: {
    title: v.string(),
    summary: v.string(),
    content: v.string(),
    category: v.string(),
    thumbnailUrl: v.string(),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const mediaId = await ctx.db.insert("media", {
      ...args,
      date: Date.now(),
      isFeatured: args.isFeatured ?? false,
    });
    return mediaId;
  },
});

// Mutation: Update media article
export const update = mutation({
  args: {
    id: v.id("media"),
    title: v.optional(v.string()),
    summary: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Mutation: Delete media article
export const remove = mutation({
  args: { id: v.id("media") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
