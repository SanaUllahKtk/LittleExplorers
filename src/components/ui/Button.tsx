import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'danger';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          {
            'bg-indigo-500 text-white hover:bg-indigo-600 shadow-sm border-b-4 border-indigo-700': variant === 'default',
            'bg-slate-100 text-slate-900 hover:bg-slate-200': variant === 'secondary',
            'border-2 border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900': variant === 'outline',
            'hover:bg-slate-100 text-slate-900': variant === 'ghost',
            'bg-rose-500 text-white hover:bg-rose-600 shadow-sm border-b-4 border-rose-700': variant === 'danger',
            'h-12 px-6 py-2 text-base': size === 'default',
            'h-9 px-4 text-sm rounded-xl': size === 'sm',
            'h-14 px-8 text-lg rounded-3xl': size === 'lg',
            'h-12 w-12': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
