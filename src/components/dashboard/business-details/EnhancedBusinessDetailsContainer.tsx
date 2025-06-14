
import { useState } from 'react';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ModernCard } from '@/components/ui/modern-card';
import { TrustBadge } from '@/components/ui/trust-badge';
import { BusinessDigitalProfileCard } from './BusinessDigitalProfileCard';
import { BusinessOperationalMetricsCard } from './BusinessOperationalMetricsCard';
import { BusinessCertificationsCard } from './BusinessCertificationsCard';
import { BusinessComplianceInsightsCard } from './BusinessComplianceInsightsCard';
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

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'verified';
      case 'Pending': return 'warning';
      case 'Inactive': return 'error';
      default: return 'pending';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Professional Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Negocios
              </Button>
              
              <div className="h-6 w-px bg-slate-300" />
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{business.name}</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-slate-600">{business.type}</span>
                    <span className="text-slate-400">•</span>
                    <TrustBadge variant={getStatusVariant(business.status)} size="sm">
                      {business.status}
                    </TrustBadge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <TrustBadge variant="verified" size="sm">
                Empresa Verificada
              </TrustBadge>
              <Button variant="outline" size="sm">
                Exportar Perfil
              </Button>
              <Button size="sm">
                Editar Información
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <BusinessDigitalProfileCard business={business} />
              <BusinessDetailsMainContent business={business} />
            </div>
            <div className="space-y-6">
              <BusinessOperationalMetricsCard business={business} />
              <BusinessDetailsSidebar 
                business={business} 
                upcomingActions={upcomingActions} 
              />
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BusinessComplianceInsightsCard business={business} />
            <BusinessCertificationsCard business={business} />
          </div>
        )}

        {activeTab === 'operations' && (
          <div className="space-y-8">
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
