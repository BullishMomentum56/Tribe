import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-50",
        secondary:
          "border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
        destructive:
          "border border-transparent bg-red-500 text-white hover:bg-red-600 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800",
        outline: "border border-slate-200 text-slate-950 dark:border-slate-800 dark:text-slate-50",
        purple:
          "border border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
