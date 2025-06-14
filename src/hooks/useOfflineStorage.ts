
import { useState, useEffect } from 'react';
import { db, Business, Document, Permit } from '@/lib/db';

export const useOfflineStorage = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveBusiness = async (business: Omit<Business, 'id'>) => {
    try {
      const id = await db.businesses.add({
        ...business,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return id;
    } catch (error) {
      console.error('Error saving business:', error);
      throw error;
    }
  };

  const saveDocument = async (document: Omit<Document, 'id'>) => {
    try {
      const id = await db.documents.add({
        ...document,
        uploadedAt: new Date()
      });
      return id;
    } catch (error) {
      console.error('Error saving document:', error);
      throw error;
    }
  };

  const getBusinesses = async () => {
    try {
      return await db.businesses.orderBy('createdAt').reverse().toArray();
    } catch (error) {
      console.error('Error getting businesses:', error);
      return [];
    }
  };

  const getDocumentsByBusiness = async (businessId: number) => {
    try {
      return await db.documents.where('businessId').equals(businessId).toArray();
    } catch (error) {
      console.error('Error getting documents:', error);
      return [];
    }
  };

  const syncData = async () => {
    if (!isOnline) return;
    
    setSyncStatus('syncing');
    try {
      // This would sync with Supabase when online
      console.log('Syncing data with server...');
      // Implementation would depend on Supabase integration
      setSyncStatus('idle');
    } catch (error) {
      console.error('Sync error:', error);
      setSyncStatus('error');
    }
  };

  return {
    isOnline,
    syncStatus,
    saveBusiness,
    saveDocument,
    getBusinesses,
    getDocumentsByBusiness,
    syncData
  };
};
