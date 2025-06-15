
import { Progress } from '@/components/ui/progress';

interface DocumentProgressBarProps {
  uploaded: number;
  total: number;
  approved: number;
}

export const DocumentProgressBar = ({ uploaded, total, approved }: DocumentProgressBarProps) => {
  const progress = Math.round((uploaded / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Progreso de Documentos</span>
        <span className="text-sm text-gray-600">{progress}% completado</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
