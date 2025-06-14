
import { useState } from 'react';
import { useBusinessFilter } from '@/hooks/useBusinessFilter';
import { mockBusinesses } from '@/data/mockBusinesses';
import { useUserManagement } from '@/contexts/UserManagement';

export const useBusinessListLogic = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { businessCreationAccess } = useUserManagement();

  const actualBusinesses = businessCreationAccess.hasAccess ? mockBusinesses : [];
  
  const { filteredBusinesses, stats } = useBusinessFilter(
    actualBusinesses,
    searchQuery,
    statusFilter
  );

  const hasFilters = Boolean(searchQuery || statusFilter !== 'all');

  const handleNewBusiness = () => {
    // Logic for handling new business creation when no access
    console.log('New business creation attempted without access');
  };

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredBusinesses,
    stats,
    hasFilters,
    businessCreationAccess,
    handleNewBusiness
  };
};
