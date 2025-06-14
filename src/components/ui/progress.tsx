
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    variant?: "default" | "success" | "warning" | "danger"
  }
>(({ className, value, variant = "default", ...props }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-green-50 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-green-600"
      case "warning":
        return "bg-amber-50 [&>div]:bg-gradient-to-r [&>div]:from-amber-500 [&>div]:to-amber-600"
      case "danger":
        return "bg-red-50 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600"
      default:
        return "bg-blue-50 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-blue-600"
    }
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full border border-slate-200/60",
        getVariantStyles(),
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 transition-all duration-500 ease-out shadow-sm"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
