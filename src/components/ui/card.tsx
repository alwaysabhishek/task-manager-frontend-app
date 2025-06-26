// frontend/src/components/ui/card.tsx
import * as React from "react"

import { cn } from "@/lib/utils" // Our utility function for merging classes

// Card component definition
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm", // Default card styles
      className // Allow custom classes to be passed in
    )}
    {...props}
  />
))
Card.displayName = "Card" // Set display name for React DevTools

// CardHeader component definition
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Default header styles
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// CardTitle component definition
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", // Default title styles
      className // Allow custom classes to be passed in
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

// CardDescription component definition
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Default description styles
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

// CardContent component definition
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> // Default content styles
))
CardContent.displayName = "CardContent"

// CardFooter component definition
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)} // Default footer styles
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Export all card-related components
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
