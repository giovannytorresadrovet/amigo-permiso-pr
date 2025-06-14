
import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"

interface InteractiveButtonProps extends ButtonProps {
  loading?: boolean
  success?: boolean
  successMessage?: string
  loadingText?: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  ripple?: boolean
}

export const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ 
    className, 
    children, 
    loading = false, 
    success = false,
    successMessage = "Success!",
    loadingText,
    icon: Icon,
    ripple = true,
    disabled,
    onClick,
    ...props 
  }, ref) => {
    const [isClicked, setIsClicked] = React.useState(false)
    const [showSuccess, setShowSuccess] = React.useState(false)

    React.useEffect(() => {
      if (success) {
        setShowSuccess(true)
        const timer = setTimeout(() => {
          setShowSuccess(false)
        }, 2000)
        return () => clearTimeout(timer)
      }
    }, [success])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        setIsClicked(true)
        setTimeout(() => setIsClicked(false), 200)
      }
      onClick?.(e)
    }

    const isDisabled = disabled || loading

    return (
      <Button
        ref={ref}
        className={cn(
          "relative overflow-hidden transition-all duration-200",
          isClicked && "scale-95",
          showSuccess && "bg-green-600 hover:bg-green-600",
          className
        )}
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        <div className={cn(
          "flex items-center space-x-2 transition-all duration-200",
          (loading || showSuccess) && "opacity-0"
        )}>
          {Icon && <Icon className="w-4 h-4" />}
          <span>{children}</span>
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {loadingText && <span className="text-sm">{loadingText}</span>}
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">{successMessage}</span>
          </div>
        )}

        {ripple && isClicked && (
          <div className="absolute inset-0 bg-white/20 rounded-md animate-ping" />
        )}
      </Button>
    )
  }
)
InteractiveButton.displayName = "InteractiveButton"
