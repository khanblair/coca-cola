import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query: Get all form submissions
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("forms").order("desc").collect();
  },
});

// Query: Get new (unread) submissions
export const getNew = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("forms")
      .filter((q) => q.eq(q.field("isNew"), true))
      .order("desc")
      .collect();
  },
});

// Query: Get by type
export const getByType = query({
  args: { type: v.union(v.literal("contact"), v.literal("newsletter")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("forms")
      .filter((q) => q.eq(q.field("type"), args.type))
      .order("desc")
      .collect();
  },
});

// Mutation: Submit contact form
export const submitContact = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const formId = await ctx.db.insert("forms", {
      type: "contact",
      email: args.email,
      name: args.name,
      message: args.message,
      isNew: true,
    });
    return formId;
  },
});

// Mutation: Subscribe to newsletter
export const subscribeNewsletter = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("forms")
      .withSearchIndex("by_email", (q) => q.search("email", args.email))
      .filter((q) => q.eq(q.field("type"), "newsletter"))
      .first();

    if (existing) {
      throw new Error("Email already subscribed");
    }

    const formId = await ctx.db.insert("forms", {
      type: "newsletter",
      email: args.email,
      isNew: true,
    });
    return formId;
  },
});

// Mutation: Mark as read
export const markAsRead = mutation({
  args: { id: v.id("forms") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isNew: false });
    return args.id;
  },
});

// Mutation: Delete form submission
export const remove = mutation({
  args: { id: v.id("forms") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
