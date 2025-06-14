
import { BusinessListTitle } from './business-list/BusinessListTitle';
import { BusinessListVerificationAlert } from './business-list/BusinessListVerificationAlert';
import { BusinessListStats } from './business-list/BusinessListStats';
import { BusinessListSearch } from './business-list/BusinessListSearch';
import { BusinessListFilters } from './business-list/BusinessListFilters';

interface BusinessListHeaderProps {
  totalBusinesses: number;
  activeBusinesses: number;
  pendingBusinesses: number;
  expiringBusinesses: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (filter: string) => void;
  onNewBusiness: () => void;
  showVerificationWarning?: boolean;
}

export const BusinessListHeader = ({
  totalBusinesses,
  activeBusinesses,
  pendingBusinesses,
  expiringBusinesses,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onNewBusiness,
  showVerificationWarning = false
}: BusinessListHeaderProps) => {
  return (
    <div className="space-y-6">
      <BusinessListTitle 
        onNewBusiness={onNewBusiness}
        showVerificationWarning={showVerificationWarning}
      />

      {/* Verification Warning */}
      {showVerificationWarning && <BusinessListVerificationAlert />}

      {/* Stats Cards - only show if not in verification warning mode */}
      {!showVerificationWarning && (
        <BusinessListStats
          totalBusinesses={totalBusinesses}
          activeBusinesses={activeBusinesses}
          pendingBusinesses={pendingBusinesses}
          expiringBusinesses={expiringBusinesses}
        />
      )}

      {/* Search and Filters - only show if not in verification warning mode */}
      {!showVerificationWarning && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <BusinessListSearch
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
            />
          </div>

          <BusinessListFilters
            statusFilter={statusFilter}
            onStatusFilterChange={onStatusFilterChange}
          />
        </div>
      )}
    </div>
  );
};
