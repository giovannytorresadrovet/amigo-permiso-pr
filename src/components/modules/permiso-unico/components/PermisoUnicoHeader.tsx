
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface PermisoUnicoHeaderProps {
  application: PermisoUnicoApplication | null;
}

export const PermisoUnicoHeader = ({ application }: PermisoUnicoHeaderProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
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

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <CardTitle className="text-2xl">Permiso Único de Operación</CardTitle>
              <CardDescription>
                Sistema integral para permisos comerciales en Puerto Rico
              </CardDescription>
            </div>
          </div>
          {application?.status && getStatusBadge(application.status)}
        </div>
      </CardHeader>
    </Card>
  );
};
