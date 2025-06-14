
import { ModernCard, ModernCardContent, ModernCardHeader } from '@/components/ui/modern-card';
import { Calendar } from 'lucide-react';
import { BusinessCardHeader } from './BusinessCardHeader';
import { BusinessCardMetrics } from './BusinessCardMetrics';
import { BusinessCardContactInfo } from './BusinessCardContactInfo';
import { BusinessCardCompliance } from './BusinessCardCompliance';
import { BusinessCardActions } from './BusinessCardActions';
import { getStatusConfig } from './utils/businessCardHelpers';

interface Business {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  description: string;
  address: string;
  municipality: string;
  zipCode: string;
  phone: string;
  email: string;
  status: string;
  permitCount: number;
  lastUpdate: string;
  socialProvider: string;
  revenue?: number;
  employeeCount?: number;
  nextRenewal?: string;
  complianceScore?: number;
}

interface EnhancedBusinessCardProps {
  business: Business;
  onBusinessSelect: (businessId: string) => void;
}

export const EnhancedBusinessCard = ({ business, onBusinessSelect }: EnhancedBusinessCardProps) => {
  const statusConfig = getStatusConfig(business.status);
  const complianceScore = business.complianceScore || Math.floor(Math.random() * 40) + 60;

  return (
    <ModernCard 
      variant="default" 
      interactive 
      className="group overflow-hidden animate-fade-in-up"
    >
      <ModernCardHeader className="pb-4">
        <BusinessCardHeader 
          business={business} 
          statusConfig={statusConfig}
        />
      </ModernCardHeader>
      
      <ModernCardContent className="space-y-6">
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{business.description}</p>
        
        <BusinessCardMetrics 
          complianceScore={complianceScore}
          permitCount={business.permitCount}
        />

        <BusinessCardCompliance complianceScore={complianceScore} />
        
        <BusinessCardContactInfo business={business} />

        <BusinessCardActions
          businessId={business.id}
          businessStatus={business.status}
          onBusinessSelect={onBusinessSelect}
        />

        {/* Last Update */}
        <div className="text-xs text-slate-400 flex items-center pt-2 border-t border-slate-50">
          <Calendar className="w-3 h-3 mr-1" />
          Actualizado: {business.lastUpdate}
        </div>
      </ModernCardContent>
    </ModernCard>
  );
};
