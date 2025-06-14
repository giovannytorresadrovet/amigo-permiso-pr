
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CheckCircle, Clock, XCircle, AlertTriangle, Loader2 } from "lucide-react"

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
  {
    variants: {
      status: {
        success: "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
        pending: "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100",
        error: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
        warning: "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100",
        loading: "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
        inactive: "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      status: "pending",
      size: "md"
    }
  }
)

const statusIcons = {
  success: CheckCircle,
  pending: Clock,
  error: XCircle,
  warning: AlertTriangle,
  loading: Loader2,
  inactive: XCircle
}

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  showIcon?: boolean
  pulse?: boolean
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status = "pending", size = "md", showIcon = true, pulse = false, children, ...props }, ref) => {
    const Icon = status ? statusIcons[status] : Clock

    return (
      <div
        className={cn(
          statusIndicatorVariants({ status, size, className }),
          pulse && "animate-pulse-gentle"
        )}
        ref={ref}
        {...props}
      >
        {showIcon && (
          <Icon 
            className={cn(
              "flex-shrink-0",
              size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4",
              status === "loading" && "animate-spin"
            )} 
          />
        )}
        {children}
      </div>
    )
  }
)
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator, statusIndicatorVariants }
