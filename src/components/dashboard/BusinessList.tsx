
import { useState } from 'react';
import { BusinessListHeader } from './BusinessListHeader';
import { BusinessGrid } from './BusinessGrid';
import { BusinessListEmptyState } from './BusinessListEmptyState';
import { NewBusinessModal } from '@/components/modals/NewBusinessModal';
import { useBusinessFilter } from '@/hooks/useBusinessFilter';
import { mockBusinesses } from '@/data/mockBusinesses';

interface BusinessListProps {
  onBusinessSelect: (businessId: string) => void;
}

export const BusinessList = ({ onBusinessSelect }: BusinessListProps) => {
  const [isNewBusinessModalOpen, setIsNewBusinessModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { filteredBusinesses, stats } = useBusinessFilter(
    mockBusinesses,
    searchQuery,
    statusFilter
  );

  const hasFilters = Boolean(searchQuery || statusFilter !== 'all');

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
        onNewBusiness={() => setIsNewBusinessModalOpen(true)}
      />

      {hasFilters && (
        <div className="text-sm text-slate-600">
          Mostrando {filteredBusinesses.length} de {mockBusinesses.length} negocios
        </div>
      )}

      {filteredBusinesses.length === 0 ? (
        <BusinessListEmptyState
          hasFilters={hasFilters}
          onNewBusiness={() => setIsNewBusinessModalOpen(true)}
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
