
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, FileText, Calendar, CreditCard, Award } from 'lucide-react';
import { StatusStep } from '../utils/statusUtils';

interface StatusStepItemProps {
  step: StatusStep;
  isLast: boolean;
}

export const StatusStepItem = ({ step, isLast }: StatusStepItemProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'current': return <Clock className="w-6 h-6 text-blue-600" />;
      case 'blocked': return <AlertCircle className="w-6 h-6 text-red-600" />;
      default: return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
      case 'current': return <Badge className="bg-blue-100 text-blue-800">En Progreso</Badge>;
      case 'blocked': return <Badge variant="destructive">Bloqueado</Badge>;
      default: return <Badge variant="secondary">Pendiente</Badge>;
    }
  };

  return (
    <div className="flex items-start gap-4">
      {/* Step Indicator */}
      <div className="flex flex-col items-center">
        {getStatusIcon(step.status)}
        {!isLast && (
          <div className={`w-px h-12 mt-2 ${
            step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
          }`} />
        )}
      </div>

      {/* Step Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-medium">{step.title}</h3>
          {getStatusBadge(step.status)}
        </div>
        <p className="text-sm text-gray-600 mb-2">{step.description}</p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>Estimado: {step.estimatedDays} día{step.estimatedDays !== 1 ? 's' : ''}</span>
          {step.actualCompletionDate && (
            <span>Completado: {step.actualCompletionDate.toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};
