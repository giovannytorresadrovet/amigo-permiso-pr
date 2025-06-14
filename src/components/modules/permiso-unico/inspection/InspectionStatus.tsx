
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, User, MapPin } from 'lucide-react';
import type { PermisoUnicoInspection as PermisoUnicoInspectionType } from '@/types/permisoUnico';

interface InspectionStatusProps {
  inspection: PermisoUnicoInspectionType;
  businessAddress: string;
  onReschedule?: () => void;
  onCancel?: () => void;
}

const getStatusBadge = (status: string) => {
  const config = {
    not_scheduled: { label: 'No Programada', variant: 'secondary' as const, icon: Clock },
    scheduled: { label: 'Programada', variant: 'default' as const, icon: CalendarIcon },
    in_progress: { label: 'En Progreso', variant: 'default' as const, icon: Clock },
    completed: { label: 'Completada', variant: 'default' as const, icon: CalendarIcon },
    rescheduled: { label: 'Reprogramada', variant: 'destructive' as const, icon: CalendarIcon },
    cancelled: { label: 'Cancelada', variant: 'destructive' as const, icon: Clock }
  };

  const statusInfo = config[status as keyof typeof config] || config.not_scheduled;
  const Icon = statusInfo.icon;
  
  return (
    <Badge variant={statusInfo.variant} className="flex items-center gap-1">
      <Icon className="w-3 h-3" />
      {statusInfo.label}
    </Badge>
  );
};

export const InspectionStatus = ({ inspection, businessAddress, onReschedule, onCancel }: InspectionStatusProps) => {
  return (
    <div className="space-y-4">
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Estado de la Inspección</h3>
            {getStatusBadge(inspection.status)}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Fecha:</strong> {inspection.scheduledDate?.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Hora:</strong> {inspection.scheduledDate?.toLocaleTimeString()}
              </span>
            </div>
            {inspection.inspectorName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm">
                  <strong>Inspector:</strong> {inspection.inspectorName}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                <strong>Ubicación:</strong> {businessAddress}
              </span>
            </div>
          </div>

          {inspection.status === 'scheduled' && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 font-medium mb-1">Próxima Inspección</p>
              <p className="text-xs text-blue-600">
                Asegúrese de estar presente en la fecha y hora programada. 
                El inspector revisará su establecimiento según la lista de verificación.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {inspection.status === 'scheduled' && (
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReschedule}>
            Reprogramar Inspección
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancelar Inspección
          </Button>
        </div>
      )}
    </div>
  );
};
