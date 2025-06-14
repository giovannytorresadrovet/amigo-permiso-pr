
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Plus } from 'lucide-react';
import { BusinessStatusCard } from '@/components/dashboard/BusinessStatusCard';

interface Business {
  id: string;
  name: string;
  legalStatus: 'legal' | 'in_process' | 'illegal' | 'expiring_soon';
  permitType: string;
  expirationDate?: string;
  completionPercentage: number;
  daysUntilExpiration?: number;
  address: string;
  municipality: string;
  businessType: string;
  ownerName: string;
  phone: string;
  permitNumber?: string;
}

interface BusinessesSectionProps {
  businesses: Business[];
  language: 'es' | 'en';
  t: (key: string) => string;
  onNewBusiness: () => void;
  onViewDetails: (businessId: string) => void;
  onRenewPermit: (businessId: string) => void;
}

export const BusinessesSection = ({ 
  businesses, 
  language, 
  t, 
  onNewBusiness, 
  onViewDetails, 
  onRenewPermit 
}: BusinessesSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Building className="w-6 h-6 mr-2" />
          {t('myBusinesses')} ({businesses.length})
        </h2>
      </div>
      
      {businesses.length === 0 ? (
        <Card className="p-8 text-center">
          <CardContent>
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'es' ? 'No tienes negocios registrados' : 'No businesses registered'}
            </h3>
            <p className="text-gray-600 mb-4">
              {language === 'es' 
                ? 'Comienza registrando tu primer negocio para obtener tus permisos.'
                : 'Start by registering your first business to get your permits.'
              }
            </p>
            <Button onClick={onNewBusiness}>
              <Plus className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Registrar Primer Negocio' : 'Register First Business'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <BusinessStatusCard
              key={business.id}
              business={business}
              language={language}
              onViewDetails={onViewDetails}
              onRenewPermit={onRenewPermit}
            />
          ))}
        </div>
      )}
    </div>
  );
};
