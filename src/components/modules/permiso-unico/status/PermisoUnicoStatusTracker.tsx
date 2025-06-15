
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { StatusProgressHeader } from './components/StatusProgressHeader';
import { StatusStepsList } from './components/StatusStepsList';
import { getStatusSteps, getOverallProgress, getEstimatedCompletion } from './utils/statusUtils';

interface PermisoUnicoStatusTrackerProps {
  application: PermisoUnicoApplication | null;
  language: 'es' | 'en';
}

export const PermisoUnicoStatusTracker = ({ application, language }: PermisoUnicoStatusTrackerProps) => {
  const steps = getStatusSteps(application);
  const overallProgress = getOverallProgress(steps);
  const estimatedCompletion = getEstimatedCompletion(application, steps);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seguimiento Detallado</CardTitle>
        <CardDescription>
          Progreso completo de su solicitud de Permiso Único
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <StatusProgressHeader 
          overallProgress={overallProgress}
          estimatedCompletion={estimatedCompletion}
        />

        {/* Detailed Steps */}
        <StatusStepsList steps={steps} />
      </CardContent>
    </Card>
  );
};
