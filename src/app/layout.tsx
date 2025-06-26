// frontend/src/app/layout.tsx
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Inter } from 'next/font/google';
// If you intend to use Clerk's recommended Geist fonts, uncomment these lines.
// Otherwise, your existing 'Inter' font is fine.
// import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// If you uncommented Geist fonts, you would define them like this:
// const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
// const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

// Optional: Add metadata for your application.
// export const metadata = {
//   title: 'Task Manager App', // Replace with your app's title
//   description: 'A comprehensive task management application.', // Replace with your app's description
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/*
          Apply your chosen font class here.
          If using 'Inter' only: className={inter.className}
          If using 'Geist' as per Clerk example: className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        */}
        <body className={inter.className}>
          {/* This is the header provided by Clerk, which includes the
            SignInButton, SignUpButton, and UserButton.
            It's set up with Tailwind CSS classes for basic styling.
          */}
          <header className="flex justify-end items-center p-4 gap-4 h-16 border-b bg-white shadow-sm">
            <SignedOut>
              {/* Button to sign in, visible when no user is signed in */}
              <SignInButton />
              {/* Button to sign up, visible when no user is signed in */}
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              {/* User profile button, visible when a user is signed in */}
              <UserButton />
            </SignedIn>
          </header>

          {/* The 'children' prop is essential! It renders the content of
            the current page (e.g., your src/app/page.tsx or src/app/dashboard/page.tsx).
          */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}












































/*   

ORIGINAL CODE PROVIDED BY CLAUDE


// frontend/src/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}*/