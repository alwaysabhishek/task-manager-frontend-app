    // frontend/src/app/sign-up/[[...sign-up]]/page.tsx
    // This file sets up the sign-up page using Clerk's pre-built UI component.

    "use client"; // This component needs to run on the client-side.

    // Import the SignUp component from Clerk.
    import { SignUp } from "@clerk/nextjs";

    /**
     * SignUpPage Component
     * This component renders Clerk's customizable sign-up user interface.
     * When a user navigates to /sign-up, this page will be displayed.
     */
    export default function SignUpPage() {
      return (
        <div className="flex items-center justify-center py-8">
          {/*
            The <SignUp /> component handles the entire sign-up flow.
            Similar to SignIn, 'routing="path"' and 'path="/sign-up"' are used.
          */}
          <SignUp routing="path" path="/sign-up" />
        </div>
      );
    }
    