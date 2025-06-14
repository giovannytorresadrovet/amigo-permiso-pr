
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { MetricCard } from '@/components/ui/metric-card';

const stats = [
  {
    title: 'Permisos Totales',
    value: '12',
    change: {
      value: 16.7,
      label: 'este mes',
      trend: 'up' as const
    },
    icon: FileText,
    variant: 'default' as const,
  },
  {
    title: 'En Progreso',
    value: '5',
    change: {
      value: -10,
      label: 'vs mes anterior',
      trend: 'down' as const
    },
    icon: Clock,
    variant: 'warning' as const,
  },
  {
    title: 'Aprobados',
    value: '7',
    change: {
      value: 14.3,
      label: 'esta semana',
      trend: 'up' as const
    },
    icon: CheckCircle,
    variant: 'success' as const,
  },
  {
    title: 'Requieren Acción',
    value: '2',
    change: {
      value: 0,
      label: 'sin cambios',
      trend: 'neutral' as const
    },
    icon: AlertTriangle,
    variant: 'danger' as const,
  },
];

export const OverviewStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <MetricCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          variant={stat.variant}
          className="animate-fade-in-up"
        />
      ))}
    </div>
  );
};
