
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface DocumentStatusBadgeProps {
  status: string;
}

export const DocumentStatusBadge = ({ status }: DocumentStatusBadgeProps) => {
  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: 'Pendiente', variant: 'secondary' as const, icon: Clock },
      uploaded: { label: 'Subido', variant: 'default' as const, icon: CheckCircle },
      under_review: { label: 'En Revisión', variant: 'default' as const, icon: Clock },
      approved: { label: 'Aprobado', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Rechazado', variant: 'destructive' as const, icon: AlertCircle },
      requires_update: { label: 'Requiere Actualización', variant: 'destructive' as const, icon: AlertCircle }
    };

    const statusInfo = config[status as keyof typeof config] || config.pending;
    const Icon = statusInfo.icon;
    
    return (
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  return getStatusBadge(status);
};
