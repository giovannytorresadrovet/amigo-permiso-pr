
import * as React from "react"
import { cn } from "@/lib/utils"
import { ModernCard, ModernCardContent, ModernCardHeader } from "./modern-card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: {
    value: number
    label: string
    trend: "up" | "down" | "neutral"
  }
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  variant?: "default" | "success" | "warning" | "danger"
  loading?: boolean
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, change, icon: Icon, variant = "default", loading = false, ...props }, ref) => {
    const getTrendIcon = () => {
      if (!change) return null
      
      switch (change.trend) {
        case "up":
          return <TrendingUp className="w-4 h-4 text-green-600" />
        case "down":
          return <TrendingDown className="w-4 h-4 text-red-600" />
        default:
          return <Minus className="w-4 h-4 text-slate-400" />
      }
    }

    const getTrendColor = () => {
      if (!change) return "text-slate-500"
      
      switch (change.trend) {
        case "up":
          return "text-green-600"
        case "down":
          return "text-red-600"
        default:
          return "text-slate-500"
      }
    }

    const getVariantStyles = () => {
      switch (variant) {
        case "success":
          return "border-green-200 bg-green-50/50"
        case "warning":
          return "border-amber-200 bg-amber-50/50"
        case "danger":
          return "border-red-200 bg-red-50/50"
        default:
          return ""
      }
    }

    return (
      <ModernCard
        ref={ref}
        className={cn(
          "hover:shadow-professional-lg transition-all duration-200",
          getVariantStyles(),
          className
        )}
        {...props}
      >
        <ModernCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-slate-600">{title}</h3>
          {Icon && (
            <div className={cn(
              "p-2 rounded-lg",
              variant === "success" ? "bg-green-100 text-green-600" :
              variant === "warning" ? "bg-amber-100 text-amber-600" :
              variant === "danger" ? "bg-red-100 text-red-600" :
              "bg-blue-100 text-blue-600"
            )}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </ModernCardHeader>
        <ModernCardContent>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-slate-900">
              {loading ? (
                <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
              ) : (
                value
              )}
            </div>
            {change && !loading && (
              <div className={cn("flex items-center text-xs", getTrendColor())}>
                {getTrendIcon()}
                <span className="ml-1">{change.value > 0 ? '+' : ''}{change.value}% {change.label}</span>
              </div>
            )}
          </div>
        </ModernCardContent>
      </ModernCard>
    )
  }
)
MetricCard.displayName = "MetricCard"

export { MetricCard }
