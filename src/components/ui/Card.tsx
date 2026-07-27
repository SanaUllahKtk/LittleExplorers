import * as React from "react"
import { cn } from "@/src/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-3xl border-2 border-slate-100 bg-white text-slate-950 shadow-sm transition-all",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }
