
import { BusinessOwnerCard } from '../BusinessOwnerCard';
import { BusinessUpcomingActionsCard } from '../BusinessUpcomingActionsCard';
import { BusinessQuickActionsCard } from '../BusinessQuickActionsCard';
import { Business } from '@/types/business';

interface BusinessDetailsSidebarProps {
  business: Business;
  upcomingActions: Array<{
    action: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
  }>;
}

export const BusinessDetailsSidebar = ({ business, upcomingActions }: BusinessDetailsSidebarProps) => {
  return (
    <div className="space-y-6">
      <BusinessOwnerCard owner={business.owner} taxId={business.taxId} />
      <BusinessUpcomingActionsCard actions={upcomingActions} />
      <BusinessQuickActionsCard />
    </div>
  );
};
