import { clerkMiddleware } from "@clerk/nextjs/server";

// Apply middleware only to admin routes (and any API routes you want protected).
// This keeps the auth pages (/auth/*) accessible so Clerk's client components can mount.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/:path*"
  ],
};
