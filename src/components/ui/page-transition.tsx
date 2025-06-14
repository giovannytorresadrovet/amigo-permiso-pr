
import * as React from "react"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export const PageTransition = ({ children, className, delay = 0 }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export const StaggeredPageTransition = ({ children, className }: { children: React.ReactNode[], className?: string }) => {
  return (
    <div className={cn("space-y-6", className)}>
      {React.Children.map(children, (child, index) => (
        <PageTransition delay={index * 100}>
          {child}
        </PageTransition>
      ))}
    </div>
  )
}
