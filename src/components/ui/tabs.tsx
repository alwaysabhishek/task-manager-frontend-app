// frontend/src/components/ui/tabs.tsx
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs" // Radix UI Tabs primitive

import { cn } from "@/lib/utils" // Our utility function for merging classes

// Tabs component definition, wraps Radix UI Tabs.Root
const Tabs = TabsPrimitive.Root

// TabsList component definition, wraps Radix UI Tabs.List
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", // Default list styles
      className // Allow custom classes
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

// TabsTrigger component definition, wraps Radix UI Tabs.Trigger
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", // Default trigger styles
      className // Allow custom classes
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// TabsContent component definition, wraps Radix UI Tabs.Content
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", // Default content styles
      className // Allow custom classes
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Export all tabs-related components
export { Tabs, TabsList, TabsTrigger, TabsContent }
