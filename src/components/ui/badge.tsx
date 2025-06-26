// frontend/src/components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority" // For defining component variants

import { cn } from "@/lib/utils" // Our utility function for merging classes

// Defines the visual variants for the badge component
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground", // Default outline style
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Defines the props for the Badge component
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge component definition
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} /> // Apply variants and merge classes
  )
}

export { Badge, badgeVariants } // Export Badge component and its variants
