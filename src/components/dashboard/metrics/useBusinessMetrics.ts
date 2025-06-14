
interface UseBusinessMetricsProps {
  business: {
    permitCount: number;
    employees?: number;
    established?: string;
  };
}

export const useBusinessMetrics = ({ business }: UseBusinessMetricsProps) => {
  // Mock data for enhanced metrics - same as original
  const metrics = {
    complianceScore: 92,
    totalInvestment: 45000,
    monthlyRevenue: 8500,
    nextRenewal: '2024-08-15',
    documentsCompleted: 8,
    totalDocuments: 10
  };

  const employeeCount = business.employees || 12;

  return {
    complianceScore: metrics.complianceScore,
    totalInvestment: metrics.totalInvestment,
    employeeCount,
    documentsCompleted: metrics.documentsCompleted,
    totalDocuments: metrics.totalDocuments
  };
};
