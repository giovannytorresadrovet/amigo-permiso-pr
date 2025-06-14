
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserDataService, type UserProfile, type BusinessSummary } from '@/services/userDataService';
import { AuditLogger } from '@/lib/security';

interface UserContextData {
  userProfile: UserProfile | null;
  businesses: BusinessSummary[];
  isLoading: boolean;
  error: string | null;
  refreshUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextData | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
  userId?: string; // Enforce user session validation
}

export const UserContextProvider = ({ children, userId }: UserContextProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [businesses, setBusinesses] = useState<BusinessSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshUserData = async () => {
    if (!userId) {
      setError('No user session found');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Log data access for audit trail
      AuditLogger.log({
        action: 'user_data_access',
        userId,
        details: {
          component: 'UserContextProvider',
          timestamp: new Date().toISOString()
        }
      });

      const [profile, userBusinesses] = await Promise.all([
        UserDataService.getUserProfile(),
        UserDataService.getUserBusinesses()
      ]);

      // Validate that data belongs to current user
      if (profile && profile.id !== userId) {
        throw new Error('Data access violation: Profile mismatch');
      }

      setUserProfile(profile);
      setBusinesses(userBusinesses);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load user data';
      setError(errorMessage);
      
      // Log security violation
      AuditLogger.log({
        action: 'security_violation',
        userId,
        details: {
          error: errorMessage,
          component: 'UserContextProvider',
          timestamp: new Date().toISOString()
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [userId]);

  const contextValue: UserContextData = {
    userProfile,
    businesses,
    isLoading,
    error,
    refreshUserData
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextData => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within UserContextProvider');
  }
  return context;
};
