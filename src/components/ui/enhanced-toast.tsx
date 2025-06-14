
import * as React from "react"
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border border-slate-200 p-4 pr-8 shadow-professional-lg transition-all animate-fade-in-up",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-900",
        success: "bg-green-50 border-green-200 text-green-900",
        warning: "bg-amber-50 border-amber-200 text-amber-900", 
        error: "bg-red-50 border-red-200 text-red-900",
        info: "bg-blue-50 border-blue-200 text-blue-900"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const toastIcons = {
  default: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info
}

interface EnhancedToastProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  action?: React.ReactNode
  onClose?: () => void
  duration?: number
}

export const EnhancedToast = React.forwardRef<HTMLDivElement, EnhancedToastProps>(
  ({ className, variant = "default", title, description, action, onClose, duration = 5000, ...props }, ref) => {
    const Icon = toastIcons[variant || "default"]

    React.useEffect(() => {
      if (duration && onClose) {
        const timer = setTimeout(onClose, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, onClose])

    const getIconColor = () => {
      switch (variant) {
        case "success": return "text-green-600"
        case "warning": return "text-amber-600"
        case "error": return "text-red-600"
        case "info": return "text-blue-600"
        default: return "text-slate-600"
      }
    }

    return (
      <div
        className={cn(toastVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        <div className="flex space-x-3">
          <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", getIconColor())} />
          <div className="flex-1 space-y-1">
            {title && (
              <div className="text-sm font-semibold leading-none tracking-tight">
                {title}
              </div>
            )}
            {description && (
              <div className="text-sm opacity-90 leading-relaxed">
                {description}
              </div>
            )}
            {action && (
              <div className="pt-2">
                {action}
              </div>
            )}
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 text-slate-400 opacity-0 transition-opacity hover:text-slate-600 focus:opacity-100 group-hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
EnhancedToast.displayName = "EnhancedToast"

export { toastVariants }
