
import { Badge } from '@/components/ui/badge';
import { TrustBadge } from '@/components/ui/trust-badge';
import { Shield } from 'lucide-react';

interface BusinessCardMetricsProps {
  complianceScore: number;
  permitCount: number;
}

export const BusinessCardMetrics = ({ complianceScore, permitCount }: BusinessCardMetricsProps) => {
  return (
    <>
      {/* Trust & Verification Section */}
      <div className="flex items-center justify-between">
        <TrustBadge variant="verified" size="sm">
          Verificado
        </TrustBadge>
        <Badge variant="premium" size="sm">
          <Shield className="w-3 h-3 mr-1" />
          Premium
        </Badge>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200/50">
          <p className="text-xs text-slate-500 font-medium">Cumplimiento</p>
          <p className="text-lg font-bold text-slate-700">{complianceScore}%</p>
        </div>
        <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200/50">
          <p className="text-xs text-slate-500 font-medium">Permisos</p>
          <p className="text-lg font-bold text-blue-700">{permitCount}</p>
        </div>
      </div>
    </>
  );
};
