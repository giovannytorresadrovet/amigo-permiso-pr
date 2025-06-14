
import { useState } from 'react';
import { BusinessListHeader } from '../BusinessListHeader';
import { BusinessGrid } from '../BusinessGrid';
import { BusinessListEmptyState } from '../BusinessListEmptyState';
import { NewBusinessModal } from '@/components/modals/NewBusinessModal';
import { BusinessCreationGuard } from '@/components/business/BusinessCreationGuard';
import { BusinessListContent } from './BusinessListContent';
import { useBusinessListLogic } from './useBusinessListLogic';

interface BusinessListContainerProps {
  onBusinessSelect: (businessId: string) => void;
}

export const BusinessListContainer = ({ onBusinessSelect }: BusinessListContainerProps) => {
  const [isNewBusinessModalOpen, setIsNewBusinessModalOpen] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredBusinesses,
    stats,
    hasFilters,
    businessCreationAccess,
    handleNewBusiness
  } = useBusinessListLogic();

  const handleNewBusinessClick = () => {
    if (businessCreationAccess.hasAccess) {
      setIsNewBusinessModalOpen(true);
    } else {
      handleNewBusiness();
    }
  };

  return (
    <div className="space-y-6">
      <BusinessListHeader
        totalBusinesses={stats.total}
        activeBusinesses={stats.active}
        pendingBusinesses={stats.pending}
        expiringBusinesses={stats.expiring}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onNewBusiness={handleNewBusinessClick}
        showVerificationWarning={!businessCreationAccess.hasAccess}
      />

      <BusinessListContent
        hasAccess={businessCreationAccess.hasAccess}
        filteredBusinesses={filteredBusinesses}
        hasFilters={hasFilters}
        onBusinessSelect={onBusinessSelect}
        onNewBusiness={handleNewBusinessClick}
      />

      <NewBusinessModal
        open={isNewBusinessModalOpen}
        onOpenChange={setIsNewBusinessModalOpen}
        onSuccess={() => {
          console.log('Business created successfully');
        }}
      />
    </div>
  );
};
