// Clerk/Convex auth configuration
// This file configures Clerk as the auth provider for Convex

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
};
