// frontend/src/components/ui/input.tsx
import * as React from "react"

import { cn } from "@/lib/utils" // Our utility function for merging classes

// Input component definition
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", // Default input styles
          className // Allow custom classes
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input" // Set display name for React DevTools

export { Input } // Export Input component
