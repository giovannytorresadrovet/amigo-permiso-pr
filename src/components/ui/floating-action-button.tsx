
import * as React from "react"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface FloatingAction {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  onClick: () => void
  variant?: "default" | "success" | "warning" | "danger"
}

interface FloatingActionButtonProps {
  actions: FloatingAction[]
  className?: string
}

export const FloatingActionButton = ({ actions, className }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const getActionButtonStyles = (variant: FloatingAction["variant"] = "default") => {
    switch (variant) {
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white"
      case "warning":
        return "bg-amber-600 hover:bg-amber-700 text-white"
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white"
      default:
        return "bg-blue-600 hover:bg-blue-700 text-white"
    }
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Action buttons */}
      <div className={cn(
        "absolute bottom-16 right-0 space-y-3 transition-all duration-300 ease-out",
        isOpen 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <div
              key={action.label}
              className={cn(
                "flex items-center space-x-3 transition-all duration-200 ease-out",
                isOpen 
                  ? "opacity-100 translate-x-0" 
                  : "opacity-0 translate-x-4"
              )}
              style={{ 
                transitionDelay: isOpen ? `${index * 50}ms` : `${(actions.length - index - 1) * 50}ms` 
              }}
            >
              <div className="bg-white px-3 py-2 rounded-lg shadow-professional text-sm font-medium text-slate-700 whitespace-nowrap">
                {action.label}
              </div>
              <Button
                size="sm"
                className={cn(
                  "w-12 h-12 rounded-full shadow-professional-lg hover:shadow-professional-xl transition-all duration-200",
                  getActionButtonStyles(action.variant)
                )}
                onClick={() => {
                  action.onClick()
                  setIsOpen(false)
                }}
              >
                <Icon className="w-5 h-5" />
              </Button>
            </div>
          )
        })}
      </div>

      {/* Main FAB */}
      <Button
        size="lg"
        className={cn(
          "w-14 h-14 rounded-full shadow-professional-lg hover:shadow-professional-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          isOpen && "rotate-45"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </Button>
    </div>
  )
}
