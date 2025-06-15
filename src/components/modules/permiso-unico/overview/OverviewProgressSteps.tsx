
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2,
  FileText, 
  Calendar, 
  CreditCard, 
  CheckCircle
} from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface OverviewProgressStepsProps {
  application: PermisoUnicoApplication | null;
}

export const OverviewProgressSteps = ({ application }: OverviewProgressStepsProps) => {
  const getStatusProgress = () => {
    if (!application) return { progress: 0, step: 'draft', stepNumber: 0 };

    const statusSteps = {
      'draft': { progress: 10, stepNumber: 1 },
      'submitted': { progress: 25, stepNumber: 2 },
      'under_review': { progress: 40, stepNumber: 3 },
      'pending_documents': { progress: 35, stepNumber: 3 },
      'inspection_scheduled': { progress: 60, stepNumber: 4 },
      'inspection_completed': { progress: 75, stepNumber: 5 },
      'pending_payment': { progress: 85, stepNumber: 6 },
      'approved': { progress: 100, stepNumber: 7 },
      'rejected': { progress: 0, stepNumber: 0 },
      'expired': { progress: 0, stepNumber: 0 }
    };

    const statusInfo = statusSteps[application.status];
    return {
      progress: statusInfo.progress,
      step: application.status,
      stepNumber: statusInfo.stepNumber
    };
  };

  const statusProgress = getStatusProgress();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pasos del Proceso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Información del Negocio', icon: Building2, status: statusProgress.stepNumber >= 1 },
            { step: 2, title: 'Envío de Solicitud', icon: FileText, status: statusProgress.stepNumber >= 2 },
            { step: 3, title: 'Revisión de Documentos', icon: FileText, status: statusProgress.stepNumber >= 3 },
            { step: 4, title: 'Programar Inspección', icon: Calendar, status: statusProgress.stepNumber >= 4 },
            { step: 5, title: 'Completar Inspección', icon: CheckCircle, status: statusProgress.stepNumber >= 5 },
            { step: 6, title: 'Procesar Pago', icon: CreditCard, status: statusProgress.stepNumber >= 6 },
            { step: 7, title: 'Permiso Aprobado', icon: CheckCircle, status: statusProgress.stepNumber >= 7 }
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item.status ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {item.status ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <item.icon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${item.status ? 'text-green-700' : 'text-gray-600'}`}>
                  {item.title}
                </p>
              </div>
              {statusProgress.stepNumber === item.step && (
                <Badge variant="default" className="text-xs">Actual</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
