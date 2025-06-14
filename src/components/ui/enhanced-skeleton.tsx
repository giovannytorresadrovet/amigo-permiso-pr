
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-slate-200/60",
  {
    variants: {
      variant: {
        default: "bg-slate-200/60",
        card: "bg-slate-100 border border-slate-200/50",
        text: "bg-slate-200/80 rounded-sm",
        circle: "rounded-full bg-slate-200/60",
        button: "bg-slate-200/60 rounded-lg"
      },
      size: {
        sm: "h-4",
        md: "h-6", 
        lg: "h-8",
        xl: "h-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

interface EnhancedSkeletonProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  lines?: number
  showAvatar?: boolean
}

const EnhancedSkeleton = React.forwardRef<HTMLDivElement, EnhancedSkeletonProps>(
  ({ className, variant, size, lines = 1, showAvatar = false, ...props }, ref) => {
    if (variant === "card") {
      return (
        <div 
          className={cn(skeletonVariants({ variant, className }), "p-6 space-y-4")}
          ref={ref}
          {...props}
        >
          <div className="flex items-center space-x-4">
            {showAvatar && (
              <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse" />
            )}
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-1/3 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "h-3 bg-slate-200 rounded animate-pulse",
                  i === lines - 1 ? "w-2/3" : "w-full"
                )}
              />
            ))}
          </div>
        </div>
      )
    }

    return (
      <div 
        className={cn(skeletonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
EnhancedSkeleton.displayName = "EnhancedSkeleton"

export { EnhancedSkeleton, skeletonVariants }
