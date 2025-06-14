
import { EnhancedBusinessCard } from './EnhancedBusinessCard';
import { MockBusiness } from '@/data/mockBusinesses';

interface BusinessGridProps {
  businesses: MockBusiness[];
  onBusinessSelect: (businessId: string) => void;
}

export const BusinessGrid = ({ businesses, onBusinessSelect }: BusinessGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <EnhancedBusinessCard
          key={business.id}
          business={business}
          onBusinessSelect={onBusinessSelect}
        />
      ))}
    </div>
  );
};
