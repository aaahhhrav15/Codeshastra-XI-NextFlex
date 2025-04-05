import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that can be accessed without signing in
  publicRoutes: ["/", "/sign-in", "/landing"],
  // Ignored routes for API and static assets
  ignoredRoutes: ["/api/(.*)", "/_next/(.*)"],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Protects all routes except static files and assets
    "/",
    "/(api|trpc)(.*)", // Optionally protect API and TRPC routes
  ],
};
