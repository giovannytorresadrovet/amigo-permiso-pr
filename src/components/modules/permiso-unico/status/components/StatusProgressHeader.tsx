
import { Progress } from '@/components/ui/progress';

interface StatusProgressHeaderProps {
  overallProgress: number;
  estimatedCompletion: Date | null;
}

export const StatusProgressHeader = ({ overallProgress, estimatedCompletion }: StatusProgressHeaderProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Progreso General</span>
        <span className="text-sm text-gray-600">{overallProgress}%</span>
      </div>
      <Progress value={overallProgress} className="h-3" />
      {estimatedCompletion && (
        <div className="text-sm text-gray-600">
          Fecha estimada de finalización: {estimatedCompletion.toLocaleDateString()}
        </div>
      )}
    </div>
  );
};
