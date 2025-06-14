
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BusinessIdentityCrown } from './BusinessIdentityCrown';
import { BusinessDigitalProfileCard } from './BusinessDigitalProfileCard';
import { BusinessOperationalMetricsCard } from './BusinessOperationalMetricsCard';
import { BusinessCertificationsCard } from './BusinessCertificationsCard';
import { BusinessComplianceInsightsCard } from './BusinessComplianceInsightsCard';
import { BusinessActionConstellation } from './BusinessActionConstellation';
import { BusinessTrustFoundation } from './BusinessTrustFoundation';
import { BusinessDetailsMainContent } from './BusinessDetailsMainContent';
import { BusinessDetailsSidebar } from './BusinessDetailsSidebar';
import { useBusinessDetailsData } from './useBusinessDetailsData';

interface EnhancedBusinessDetailsContainerProps {
  businessId: string;
  onBack: () => void;
}

export const EnhancedBusinessDetailsContainer = ({ 
  businessId, 
  onBack 
}: EnhancedBusinessDetailsContainerProps) => {
  const { business, upcomingActions } = useBusinessDetailsData(businessId);
  const [activeTab, setActiveTab] = useState<'overview' | 'compliance' | 'operations'>('overview');

  if (!business) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-600">Business not found</p>
        <Button onClick={onBack} className="mt-4">
          Volver a Negocios
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Minimal Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-600 hover:text-slate-900">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Negocios
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Visión General' },
              { id: 'compliance', label: 'Cumplimiento' },
              { id: 'operations', label: 'Operaciones' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content - Digital Enterprise Identity Sanctuary */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Level 1: Identity Crown - The Throne of Business Identity */}
            <BusinessIdentityCrown business={business} />
            
            {/* Level 2: Command Center Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Digital Profile */}
              <div className="lg:col-span-2">
                <BusinessDigitalProfileCard business={business} />
              </div>
              
              {/* Right Column: Action Constellation */}
              <div>
                <BusinessActionConstellation business={business} />
              </div>
            </div>
            
            {/* Level 3: Analytics Foundation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BusinessOperationalMetricsCard business={business} />
              <BusinessTrustFoundation business={business} />
            </div>
            
            {/* Level 4: Additional Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <BusinessDetailsMainContent business={business} />
              </div>
              <div>
                <BusinessDetailsSidebar 
                  business={business} 
                  upcomingActions={upcomingActions} 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-8">
            {/* Compliance-focused layout */}
            <BusinessTrustFoundation business={business} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BusinessComplianceInsightsCard business={business} />
              <BusinessCertificationsCard business={business} />
            </div>
          </div>
        )}

        {activeTab === 'operations' && (
          <div className="space-y-8">
            {/* Operations-focused layout */}
            <BusinessOperationalMetricsCard business={business} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BusinessDetailsMainContent business={business} />
              <BusinessDetailsSidebar 
                business={business} 
                upcomingActions={upcomingActions} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
