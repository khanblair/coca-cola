import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // --- PUBLIC DATA TABLES ---

  // Stores all contact form submissions and newsletter sign-ups.
  forms: defineTable({
    type: v.union(v.literal("contact"), v.literal("newsletter")),
    email: v.string(),
    name: v.optional(v.string()), // For contact form
    message: v.optional(v.string()), // For contact form
    isNew: v.boolean(), // To track if Admin has viewed the lead
  }).searchIndex("by_email", {
    searchField: "email",
  }),

  // Stores all news articles and press releases for the Media Center.
  media: defineTable({
    title: v.string(),
    summary: v.string(),
    content: v.string(),
    category: v.string(), // e.g., "Innovation", "Campaigns"
    thumbnailUrl: v.string(), // Link to the 3D image embed or thumbnail
    date: v.number(), // Unix timestamp for timeline sorting
    isFeatured: v.boolean(),
  }),

  // Stores all product brands/categories for the Brands Screen.
  brands: defineTable({
    name: v.string(), // e.g., "Coca-Cola Classic", "Fanta"
    color: v.string(), // Hex code for the "Color Splash Scroll" effect
    description: v.string(),
    nutritionalFacts: v.object({
      calories: v.number(),
      sugar: v.number(),
      // Add other relevant nutritional data
    }),
    product3dModelUrl: v.string(), // URL for the 3D model used in the flip card
  }),

  // --- ADMIN DATA TABLES ---

  // Stores job postings for the Careers section.
  jobs: defineTable({
    title: v.string(),
    department: v.string(),
    location: v.string(), // e.g., "Kampala, Uganda"
    description: v.string(), // Detailed job description
    datePosted: v.number(),
    isActive: v.boolean(), // Can be toggled on/off by Admin
  }).searchIndex("by_title_and_department", {
    searchField: "title",
    filterFields: ["department"],
  }),

  // Stores historical milestones for the Our Company screen.
  history: defineTable({
    year: v.number(),
    milestone: v.string(),
    description: v.string(),
  }),

  // Simple table for financial metrics displayed on the Investors screen (Admin editable).
  financials: defineTable({
    metricName: v.string(), // e.literal("Revenue"), v.literal("Net Income")
    value: v.number(), // The final number that uses the count-up animation
    unit: v.string(), // e.g., "USD Billion"
    year: v.number(),
  }),
});