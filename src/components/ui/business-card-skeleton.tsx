
import { EnhancedSkeleton } from "./enhanced-skeleton"
import { ModernCard, ModernCardContent, ModernCardHeader } from "./modern-card"

export const BusinessCardSkeleton = () => {
  return (
    <ModernCard className="animate-fade-in-up">
      <ModernCardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <EnhancedSkeleton variant="circle" className="w-12 h-12" />
            <div className="space-y-2 flex-1">
              <EnhancedSkeleton variant="text" className="h-5 w-32" />
              <EnhancedSkeleton variant="text" className="h-3 w-24" />
            </div>
          </div>
          <EnhancedSkeleton variant="button" className="w-16 h-6" />
        </div>
      </ModernCardHeader>
      
      <ModernCardContent className="space-y-6">
        <EnhancedSkeleton variant="text" lines={2} className="h-3" />
        
        <div className="flex items-center justify-between">
          <EnhancedSkeleton variant="button" className="w-20 h-6" />
          <EnhancedSkeleton variant="button" className="w-16 h-6" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 border border-slate-200 rounded-lg">
            <EnhancedSkeleton variant="text" className="h-3 w-16 mx-auto mb-2" />
            <EnhancedSkeleton variant="text" className="h-6 w-12 mx-auto" />
          </div>
          <div className="text-center p-3 border border-slate-200 rounded-lg">
            <EnhancedSkeleton variant="text" className="h-3 w-12 mx-auto mb-2" />
            <EnhancedSkeleton variant="text" className="h-6 w-8 mx-auto" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <EnhancedSkeleton variant="text" className="h-3 w-24" />
            <EnhancedSkeleton variant="text" className="h-3 w-12" />
          </div>
          <EnhancedSkeleton variant="default" className="h-2 w-full" />
        </div>
        
        <div className="space-y-2">
          <EnhancedSkeleton variant="text" className="h-3 w-full" />
          <EnhancedSkeleton variant="text" className="h-3 w-3/4" />
        </div>

        <div className="flex space-x-2 pt-2 border-t border-slate-100">
          <EnhancedSkeleton variant="button" className="flex-1 h-9" />
          <EnhancedSkeleton variant="button" className="flex-1 h-9" />
        </div>

        <EnhancedSkeleton variant="text" className="h-3 w-32" />
      </ModernCardContent>
    </ModernCard>
  )
}
