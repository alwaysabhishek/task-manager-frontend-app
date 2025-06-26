// frontend/src/components/ui/checkbox.tsx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox" // Radix UI Checkbox primitive
import { Check } from "lucide-react" // Checkmark icon

import { cn } from "@/lib/utils" // Our utility function for merging classes

// Checkbox component definition, wraps Radix UI Checkbox.Root
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", // Default checkbox styles
      className // Allow custom classes
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")} // Indicator for the checkmark
    >
      <Check className="h-4 w-4" /> {/* Checkmark icon */}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox } // Export Checkbox component
