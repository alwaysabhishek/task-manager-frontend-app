// frontend/src/components/ui/progress.tsx
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress" // Radix UI Progress primitive

import { cn } from "@/lib/utils" // Our utility function for merging classes

// Progress component definition, wraps Radix UI Progress.Root
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary", // Default progress bar styles
      className // Allow custom classes
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all" // Progress indicator bar style
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Moves the indicator based on value
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress } // Export Progress component
