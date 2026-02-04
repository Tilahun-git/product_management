import * as React from "react"
import { cn } from "@/lib/utils" // your existing utils.ts

// Main Card wrapper
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-background shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

// CardContent wrapper
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
))
CardContent.displayName = "CardContent"

// CardFooter wrapper
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
