import * as React from "react"
import { cn } from "@/src/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  colorClass?: string;
  className?: string;
}

export function ProgressBar({ value, max = 100, colorClass = "bg-indigo-500", className, ...props }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("h-4 w-full overflow-hidden rounded-full bg-slate-100", className)} {...props}>
      <div
        className={cn("h-full transition-all duration-500 ease-out", colorClass)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
