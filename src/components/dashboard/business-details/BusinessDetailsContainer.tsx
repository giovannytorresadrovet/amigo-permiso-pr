
import { BusinessDetailsHeader } from '../BusinessDetailsHeader';
import { BusinessMetricsCards } from '../BusinessMetricsCards';
import { BusinessDetailsMainContent } from './BusinessDetailsMainContent';
import { BusinessDetailsSidebar } from './BusinessDetailsSidebar';
import { Button } from '@/components/ui/button';
import { useBusinessDetailsData } from './useBusinessDetailsData';

interface BusinessDetailsContainerProps {
  businessId: string;
  onBack: () => void;
}

export const BusinessDetailsContainer = ({ businessId, onBack }: BusinessDetailsContainerProps) => {
  const { business, upcomingActions } = useBusinessDetailsData(businessId);

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
    <div className="space-y-6">
      <BusinessDetailsHeader business={business} onBack={onBack} />
      
      <BusinessMetricsCards business={business} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BusinessDetailsMainContent business={business} />
        <BusinessDetailsSidebar 
          business={business} 
          upcomingActions={upcomingActions} 
        />
      </div>
    </div>
  );
};
