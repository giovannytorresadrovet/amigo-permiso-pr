import { useState } from 'react';
import { BusinessListHeader } from './BusinessListHeader';
import { BusinessGrid } from './BusinessGrid';
import { BusinessListEmptyState } from './BusinessListEmptyState';
import { NewBusinessModal } from '@/components/modals/NewBusinessModal';
import { BusinessCreationGuard } from '@/components/business/BusinessCreationGuard';
import { useBusinessFilter } from '@/hooks/useBusinessFilter';
import { mockBusinesses } from '@/data/mockBusinesses';
import { useUserManagement } from '@/contexts/UserManagement';

interface BusinessListProps {
  onBusinessSelect: (businessId: string) => void;
}

export const BusinessList = ({ onBusinessSelect }: BusinessListProps) => {
  const [isNewBusinessModalOpen, setIsNewBusinessModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { user, businessCreationAccess } = useUserManagement();

  // Only show businesses if user is verified
  const actualBusinesses = businessCreationAccess.hasAccess ? mockBusinesses : [];
  
  const { filteredBusinesses, stats } = useBusinessFilter(
    actualBusinesses,
    searchQuery,
    statusFilter
  );

  const hasFilters = Boolean(searchQuery || statusFilter !== 'all');

  const handleNewBusiness = () => {
    if (businessCreationAccess.hasAccess) {
      setIsNewBusinessModalOpen(true);
    }
    // If no access, the BusinessCreationGuard will handle showing verification prompt
  };

  // Show verification guard if user doesn't have access
  if (!businessCreationAccess.hasAccess) {
    return (
      <div className="space-y-6">
        <BusinessListHeader
          totalBusinesses={0}
          activeBusinesses={0}
          pendingBusinesses={0}
          expiringBusinesses={0}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onNewBusiness={handleNewBusiness}
          showVerificationWarning={true}
        />
        
        <BusinessCreationGuard language="es">
          <div />
        </BusinessCreationGuard>
      </div>
    );
  }

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
        onNewBusiness={handleNewBusiness}
        showVerificationWarning={false}
      />

      {hasFilters && (
        <div className="text-sm text-slate-600">
          Mostrando {filteredBusinesses.length} de {actualBusinesses.length} negocios
        </div>
      )}

      {filteredBusinesses.length === 0 ? (
        <BusinessListEmptyState
          hasFilters={hasFilters}
          onNewBusiness={handleNewBusiness}
        />
      ) : (
        <BusinessGrid
          businesses={filteredBusinesses}
          onBusinessSelect={onBusinessSelect}
        />
      )}

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
