// frontend/src/app/page.tsx

// Import 'currentUser' from Clerk for checking authentication status on the server.
// This function allows you to get information about the currently authenticated user.
import { currentUser } from '@clerk/nextjs/server';

// Import 'redirect' from Next.js for server-side redirection.
// This is used to send users to different routes based on their login status.
import { redirect } from 'next/navigation';

/**
 * HomePage Component
 * This is the entry point for the root URL of your application (e.g., http://localhost:3000/).
 * It checks the user's authentication status using Clerk and redirects them accordingly.
 *
 * This is a Server Component by default, which is efficient for handling redirects.
 */
export default async function HomePage() {
  // Fetch the current user's information from Clerk.
  // This will be null if no user is logged in.
  const user = await currentUser();

  // If there is no logged-in user, redirect them to the sign-in page.
  // Assuming you have /sign-in and /sign-up routes configured with Clerk.
  if (!user) {
    redirect('/sign-in');
  } else {
    // If a user is logged in, redirect them to the dashboard page.
    // This connects your root page to the existing dashboard structure.
    redirect('/dashboard');
  }

  // This fallback JSX will only be rendered for a very brief moment
  // if the redirects haven't fully taken effect, or in edge cases.
  // It provides a visual cue that a redirection is in progress.
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
