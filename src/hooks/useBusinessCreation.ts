
import { useCallback } from 'react';
import { PermisoUnicoAutoAssignment } from '@/services/modules/permisoUnicoAutoAssignment';

export const useBusinessCreation = () => {
  const handleBusinessCreated = useCallback(async (businessId: string) => {
    try {
      // Auto-assign Permiso Unico to new business
      const permisoUnicoAutoAssignment = PermisoUnicoAutoAssignment.getInstance();
      await permisoUnicoAutoAssignment.autoAssignToNewBusiness(businessId);
      
      console.log(`Business ${businessId} created and Permiso Unico auto-assigned`);
    } catch (error) {
      console.error('Failed to auto-assign Permiso Unico to new business:', error);
    }
  }, []);

  return {
    handleBusinessCreated
  };
};
