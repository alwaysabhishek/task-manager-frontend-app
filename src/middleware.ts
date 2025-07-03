// frontend/src/middleware.ts

    import { clerkMiddleware } from '@clerk/nextjs/server';

    // @ts-ignore
    export default clerkMiddleware({
      publicRoutes: [
        '/',
        '/sign-in(.*)',
        '/sign-up(.*)',
        '/api/webhook(.*)',
      ],
      // ignoredRoutes: ['/((?!_next|api|trpc)(.*))'],
    });

    export const config = {
      matcher: [
        '/((?!.+\\.[\\w]+$|_next).*)',
        '/(api|trpc)(.*)',
      ],
    };