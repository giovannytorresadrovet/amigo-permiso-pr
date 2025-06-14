
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ShieldCheck, AlertTriangle, Shield, Info } from "lucide-react"

const trustBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-professional",
  {
    variants: {
      variant: {
        verified: "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100",
        warning: "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100",
        error: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100",
        info: "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100",
        pending: "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "verified",
      size: "md"
    }
  }
)

const iconMap = {
  verified: ShieldCheck,
  warning: AlertTriangle,
  error: AlertTriangle,
  info: Info,
  pending: Shield
}

export interface TrustBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof trustBadgeVariants> {
  showIcon?: boolean
}

const TrustBadge = React.forwardRef<HTMLDivElement, TrustBadgeProps>(
  ({ className, variant = "verified", size = "md", showIcon = true, children, ...props }, ref) => {
    const Icon = variant ? iconMap[variant] : ShieldCheck

    return (
      <div
        className={cn(trustBadgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {showIcon && <Icon className="w-3.5 h-3.5" />}
        {children}
      </div>
    )
  }
)
TrustBadge.displayName = "TrustBadge"

export { TrustBadge, trustBadgeVariants }
