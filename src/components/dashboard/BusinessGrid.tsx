
import { BusinessCard } from './BusinessCard';
import { BusinessCardSkeleton } from '@/components/ui/business-card-skeleton';
import { PageTransition } from '@/components/ui/page-transition';
import { MockBusiness } from '@/data/mockBusinesses';

interface BusinessGridProps {
  businesses: MockBusiness[];
  onBusinessSelect: (businessId: string) => void;
  loading?: boolean;
}

export const BusinessGrid = ({ businesses, onBusinessSelect, loading = false }: BusinessGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <BusinessCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {businesses.map((business, index) => (
        <PageTransition key={business.id} delay={index * 50}>
          <BusinessCard
            business={business}
            onBusinessSelect={onBusinessSelect}
          />
        </PageTransition>
      ))}
    </div>
  );
};
