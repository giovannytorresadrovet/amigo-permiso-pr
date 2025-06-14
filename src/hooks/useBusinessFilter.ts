
import { useMemo } from 'react';
import { MockBusiness } from '@/data/mockBusinesses';

export const useBusinessFilter = (
  businesses: MockBusiness[],
  searchQuery: string,
  statusFilter: string
) => {
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesSearch = searchQuery === '' || 
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.typeLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.municipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || business.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [businesses, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: businesses.length,
      active: businesses.filter(b => b.status === 'active').length,
      pending: businesses.filter(b => b.status === 'pending').length,
      expiring: businesses.filter(b => b.complianceScore && b.complianceScore < 70).length
    };
  }, [businesses]);

  return {
    filteredBusinesses,
    stats
  };
};
