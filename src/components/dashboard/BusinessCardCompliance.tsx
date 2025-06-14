
import { Progress } from '@/components/ui/progress';
import { getComplianceVariant } from './utils/businessCardHelpers';

interface BusinessCardComplianceProps {
  complianceScore: number;
}

export const BusinessCardCompliance = ({ complianceScore }: BusinessCardComplianceProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-600 font-medium">Puntuación de Cumplimiento</span>
        <span className="font-semibold text-slate-900">{complianceScore}%</span>
      </div>
      <Progress 
        value={complianceScore} 
        variant={getComplianceVariant(complianceScore)}
        className="h-2" 
      />
    </div>
  );
};
