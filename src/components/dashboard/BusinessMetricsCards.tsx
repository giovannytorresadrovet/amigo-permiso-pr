
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, FileText, Shield } from 'lucide-react';

interface BusinessMetricsCardsProps {
  business: {
    permitCount: number;
    employees?: number;
    established?: string;
    operationalMetrics?: {
      complianceScore?: number;
      totalInvestment?: number;
    };
  };
}

const useBusinessMetrics = ({ business }: { business: BusinessMetricsCardsProps['business'] }) => {
  return {
    complianceScore: business.operationalMetrics?.complianceScore || Math.floor(Math.random() * 30) + 70,
    totalInvestment: business.operationalMetrics?.totalInvestment || Math.floor(Math.random() * 500000) + 50000,
    employeeCount: business.employees || Math.floor(Math.random() * 20) + 1,
    documentsCompleted: Math.floor(Math.random() * 8) + 12,
    totalDocuments: 20
  };
};

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = 'default',
  progress 
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  variant?: 'default' | 'success' | 'warning' | 'error';
  progress?: number;
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
      case 'warning':
        return 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200';
      case 'error':
        return 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200';
      default:
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200';
    }
  };

  return (
    <ModernCard className={`${getVariantStyles()}`}>
      <ModernCardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
        {progress !== undefined && (
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </ModernCardContent>
    </ModernCard>
  );
};

export const BusinessMetricsCards = ({ business }: BusinessMetricsCardsProps) => {
  const metrics = useBusinessMetrics({ business });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Puntuación de Cumplimiento"
        value={`${metrics.complianceScore}%`}
        subtitle="Muy bueno"
        icon={Shield}
        variant={metrics.complianceScore >= 90 ? 'success' : metrics.complianceScore >= 70 ? 'warning' : 'error'}
        progress={metrics.complianceScore}
      />
      
      <MetricCard
        title="Inversión Total"
        value={`$${(metrics.totalInvestment / 1000).toFixed(0)}K`}
        subtitle="Capital invertido"
        icon={TrendingUp}
        variant="success"
      />
      
      <MetricCard
        title="Empleados"
        value={metrics.employeeCount}
        subtitle="Personal activo"
        icon={Users}
        variant="default"
      />
      
      <MetricCard
        title="Documentos"
        value={`${metrics.documentsCompleted}/${metrics.totalDocuments}`}
        subtitle="Completados"
        icon={FileText}
        variant="warning"
        progress={(metrics.documentsCompleted / metrics.totalDocuments) * 100}
      />
    </div>
  );
};
