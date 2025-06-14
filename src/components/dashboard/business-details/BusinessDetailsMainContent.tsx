
import { BusinessOverviewCard } from '../BusinessOverviewCard';
import { BusinessPermitsCard } from '../BusinessPermitsCard';
import { Business } from '@/types/business';

interface BusinessDetailsMainContentProps {
  business: Business;
}

export const BusinessDetailsMainContent = ({ business }: BusinessDetailsMainContentProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <BusinessOverviewCard business={business} />
      <BusinessPermitsCard permits={business.permits} />
    </div>
  );
};
