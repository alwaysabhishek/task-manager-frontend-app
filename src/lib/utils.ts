// frontend/src/lib/utils.ts
import { type ClassValue, clsx } from "clsx" // clsx for conditional class merging
import { twMerge } from "tailwind-merge" // twMerge for safely merging Tailwind classes

/**
 * Combines multiple class names into a single string,
 * handling conditional classes and safely merging Tailwind CSS classes.
 * @param inputs - An array of class values (strings, arrays, objects, booleans, null, undefined).
 * @returns A single string of merged CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  // clsx handles conditional class application (e.g., { 'bg-red': true })
  // twMerge ensures that conflicting Tailwind classes are correctly overridden
  // (e.g., 'p-4' and 'p-2' results in 'p-2')
  return twMerge(clsx(inputs))
}
