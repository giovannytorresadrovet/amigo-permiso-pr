
import { Progress } from '@/components/ui/progress';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { REQUIRED_DOCUMENTS } from './DocumentRequirements';

interface DocumentProgressBarProps {
  application: PermisoUnicoApplication | null;
}

export const DocumentProgressBar = ({ application }: DocumentProgressBarProps) => {
  const calculateProgress = () => {
    const requiredDocs = REQUIRED_DOCUMENTS.filter(d => d.required);
    const uploadedRequiredDocs = requiredDocs.filter(doc => 
      application?.documents.some(appDoc => appDoc.type === doc.type && appDoc.status !== 'rejected')
    );
    return Math.round((uploadedRequiredDocs.length / requiredDocs.length) * 100);
  };

  const progress = calculateProgress();

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
