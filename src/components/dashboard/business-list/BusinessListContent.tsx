
import { BusinessGrid } from '../BusinessGrid';
import { BusinessListEmptyState } from '../BusinessListEmptyState';
import { BusinessCreationGuard } from '@/components/business/BusinessCreationGuard';
import { MockBusiness } from '@/data/mockBusinesses';

interface BusinessListContentProps {
  hasAccess: boolean;
  filteredBusinesses: MockBusiness[];
  hasFilters: boolean;
  onBusinessSelect: (businessId: string) => void;
  onNewBusiness: () => void;
}

export const BusinessListContent = ({
  hasAccess,
  filteredBusinesses,
  hasFilters,
  onBusinessSelect,
  onNewBusiness
}: BusinessListContentProps) => {
  if (!hasAccess) {
    return (
      <BusinessCreationGuard language="es">
        <div />
      </BusinessCreationGuard>
    );
  }

  if (hasFilters && filteredBusinesses.length > 0) {
    return (
      <>
        <div className="text-sm text-slate-600">
          Mostrando {filteredBusinesses.length} negocios
        </div>
        <BusinessGrid
          businesses={filteredBusinesses}
          onBusinessSelect={onBusinessSelect}
        />
      </>
    );
  }

  if (filteredBusinesses.length === 0) {
    return (
      <BusinessListEmptyState
        hasFilters={hasFilters}
        onNewBusiness={onNewBusiness}
      />
    );
  }

  return (
    <BusinessGrid
      businesses={filteredBusinesses}
      onBusinessSelect={onBusinessSelect}
    />
  );
};
