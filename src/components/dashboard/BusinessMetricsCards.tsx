
import { ComplianceScoreCard } from './metrics/ComplianceScoreCard';
import { TotalInvestmentCard } from './metrics/TotalInvestmentCard';
import { EmployeesCard } from './metrics/EmployeesCard';
import { DocumentsCard } from './metrics/DocumentsCard';
import { useBusinessMetrics } from './metrics/useBusinessMetrics';

interface BusinessMetricsCardsProps {
  business: {
    permitCount: number;
    employees?: number;
    established?: string;
  };
}

export const BusinessMetricsCards = ({ business }: BusinessMetricsCardsProps) => {
  const metrics = useBusinessMetrics({ business });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <ComplianceScoreCard score={metrics.complianceScore} />
      <TotalInvestmentCard amount={metrics.totalInvestment} />
      <EmployeesCard count={metrics.employeeCount} />
      <DocumentsCard 
        completed={metrics.documentsCompleted} 
        total={metrics.totalDocuments} 
      />
    </div>
  );
};
