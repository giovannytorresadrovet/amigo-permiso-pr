
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { PermisoUnicoBusinessLogic } from '@/services/modules/permisoUnicoBusinessLogic';

interface OverviewStatusCardProps {
  application: PermisoUnicoApplication | null;
}

export const OverviewStatusCard = ({ application }: OverviewStatusCardProps) => {
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

  const calculateTimelineEstimate = () => {
    if (!application) return 'N/A';
    
    const requirements = PermisoUnicoBusinessLogic.getRequirementsByBusinessType(
      application.businessInfo.businessType
    );
    
    const baseProcessingTime = requirements.estimatedProcessingTime;
    const submittedDate = application.submittedAt || new Date();
    const estimatedCompletion = new Date(submittedDate);
    estimatedCompletion.setDate(estimatedCompletion.getDate() + baseProcessingTime);
    
    return estimatedCompletion.toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    const config = {
      draft: { label: 'Borrador', variant: 'secondary' as const },
      submitted: { label: 'Enviado', variant: 'default' as const },
      under_review: { label: 'En Revisión', variant: 'default' as const },
      pending_documents: { label: 'Documentos Pendientes', variant: 'destructive' as const },
      inspection_scheduled: { label: 'Inspección Programada', variant: 'default' as const },
      inspection_completed: { label: 'Inspección Completada', variant: 'default' as const },
      pending_payment: { label: 'Pago Pendiente', variant: 'destructive' as const },
      approved: { label: 'Aprobado', variant: 'default' as const },
      rejected: { label: 'Rechazado', variant: 'destructive' as const },
      expired: { label: 'Expirado', variant: 'secondary' as const }
    };

    const statusInfo = config[status as keyof typeof config] || config.draft;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const statusProgress = getStatusProgress();

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Estado de su Solicitud</CardTitle>
            <CardDescription>
              {application ? `Solicitud #${application.applicationNumber || application.id.slice(0, 8)}` : 'Nueva Solicitud'}
            </CardDescription>
          </div>
          {application && getStatusBadge(application.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso General</span>
              <span className="text-sm text-gray-600">{statusProgress.progress}% completado</span>
            </div>
            <Progress value={statusProgress.progress} className="h-3" />
          </div>

          {application && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Fecha de Envío:</span>
                <p className="font-medium">
                  {application.submittedAt?.toLocaleDateString() || 'No enviado'}
                </p>
              </div>
              <div>
                <span className="text-gray-600">Última Actualización:</span>
                <p className="font-medium">{application.lastUpdated.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Fecha Estimada de Finalización:</span>
                <p className="font-medium">{calculateTimelineEstimate()}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
