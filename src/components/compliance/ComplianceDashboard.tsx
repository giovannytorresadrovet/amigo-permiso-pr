
import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { ComplianceManager, type ComplianceStatus } from '@/lib/compliance/complianceManager';
import { ComplianceOverviewCards } from './ComplianceOverviewCards';
import { ComplianceTabsContent } from './ComplianceTabsContent';
import { ComplianceLoadingState } from './ComplianceLoadingState';
import { ComplianceErrorState } from './ComplianceErrorState';

interface ComplianceDashboardProps {
  language: 'es' | 'en';
}

export const ComplianceDashboard = ({ language }: ComplianceDashboardProps) => {
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComplianceData = async () => {
      try {
        const manager = ComplianceManager.getInstance();
        const status = await manager.getComplianceStatus();
        setComplianceStatus(status);
      } catch (error) {
        console.error('Error loading compliance data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComplianceData();
  }, []);

  if (loading) {
    return <ComplianceLoadingState language={language} />;
  }

  if (!complianceStatus) {
    return <ComplianceErrorState language={language} />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <Shield className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">
          {language === 'es' ? 'Panel de Cumplimiento' : 'Compliance Dashboard'}
        </h1>
      </div>

      <ComplianceOverviewCards 
        complianceStatus={complianceStatus}
        language={language}
      />

      <ComplianceTabsContent 
        complianceStatus={complianceStatus}
        language={language}
      />
    </div>
  );
};
