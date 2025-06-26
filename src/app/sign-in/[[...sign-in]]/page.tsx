    // frontend/src/app/sign-in/[[...sign-in]]/page.tsx
    // This file sets up the sign-in page using Clerk's pre-built UI component.

    "use client"; // This component needs to run on the client-side.

    // Import the SignIn component from Clerk.
    import { SignIn } from "@clerk/nextjs";

    /**
     * SignInPage Component
     * This component renders Clerk's customizable sign-in user interface.
     * When a user navigates to /sign-in, this page will be displayed.
     */
    export default function SignInPage() {
      return (
        <div className="flex items-center justify-center py-8">
          {/*
            The <SignIn /> component handles the entire sign-in flow.
            You can customize its appearance and behavior using props if needed.
            The 'routing="path"' ensures it uses path-based routing.
            The 'path="/sign-in"' explicitly tells Clerk the base path for this component.
          */}
          <SignIn routing="path" path="/sign-in" />
        </div>
      );
    }
    