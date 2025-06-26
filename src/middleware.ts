// frontend/src/middleware.ts

// CORRECTED IMPORT PATH: Import clerkMiddleware from '@clerk/nextjs/server'.
// This is the correct path for server-side middleware functions.
import { clerkMiddleware } from '@clerk/nextjs/server';

// Export the default middleware function.
// This configuration automatically handles route protection:
// Any route NOT listed in 'publicRoutes' will require authentication.
export default clerkMiddleware({
  // Define public routes that do not require authentication.
  // Adjust these patterns based on your application's public pages.
  // All other routes will be protected by default.
  publicRoutes: [
    '/', // Your main landing page
    '/sign-in(.*)', // Clerk's sign-in page and any sub-paths (e.g., /sign-in/sso-callback)
    '/sign-up(.*)', // Clerk's sign-up page and any sub-paths
    '/api/webhook(.*)', // If you have any public API webhooks
    // Add any other routes here that should be accessible without login, e.g., '/about', '/contact'
  ],
  // Optionally, you can also define ignoredRoutes for paths that should
  // completely bypass Clerk's middleware.
  // ignoredRoutes: ['/((?!_next|api|trpc)(.*))'],
});

// Configure the matcher for the middleware.
// This tells Next.js which paths the middleware should apply to.
export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',   
    '/(api|trpc)(.*)',
  ],
};
