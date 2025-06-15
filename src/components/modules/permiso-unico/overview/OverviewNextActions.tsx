
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { PermisoUnicoBusinessLogic } from '@/services/modules/permisoUnicoBusinessLogic';

interface OverviewNextActionsProps {
  application: PermisoUnicoApplication | null;
}

export const OverviewNextActions = ({ application }: OverviewNextActionsProps) => {
  const getNextActions = () => {
    if (!application) {
      return [
        'Complete la información básica del negocio',
        'Proporcione detalles de ubicación y operación',
        'Envíe la solicitud para revisión'
      ];
    }

    return PermisoUnicoBusinessLogic.getNextSteps(application);
  };

  const nextActions = getNextActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Próximos Pasos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {nextActions.map((action, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm">{action}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
