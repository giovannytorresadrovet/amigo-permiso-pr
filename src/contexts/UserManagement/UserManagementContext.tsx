
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, VerificationSession } from '@/types/user';
import { AuditLogger } from '@/lib/security';
import { VerificationService } from './verificationService';
import { BusinessAccessChecker } from './businessAccessChecker';
import { UserManagementContextData, UserManagementProviderProps } from './types';

const UserManagementContext = createContext<UserManagementContextData | null>(null);

export const UserManagementProvider = ({ children, initialUser }: UserManagementProviderProps) => {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [verificationSession, setVerificationSession] = useState<VerificationSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    AuditLogger.log({
      action: 'user_profile_updated',
      userId: user.id,
      details: {
        changes: Object.keys(updates),
        timestamp: new Date().toISOString()
      }
    });
  };

  const startVerification = async (): Promise<string> => {
    if (!user) throw new Error('No user session found');
    
    setIsLoading(true);
    setError(null);

    try {
      const session = await VerificationService.createVerificationSession(user);
      setVerificationSession(session);
      
      // Update user status
      updateUser({
        verificationStatus: 'in_progress'
      });

      return session.redirectUrl!;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification initiation failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const completeVerification = async (verificationId: string, data: any) => {
    if (!user || !verificationSession) return;
    
    setIsLoading(true);
    try {
      const updatedSession = await VerificationService.completeVerification(
        verificationId, 
        data, 
        verificationSession
      );
      
      setVerificationSession(updatedSession);
      
      // Update user with verification success
      updateUser({
        identityVerified: true,
        verificationStatus: 'verified',
        verificationDate: new Date(),
        idMeVerificationId: verificationId,
        role: 'business_owner' // Automatically assign business owner role
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      
      updateUser({
        verificationStatus: 'failed'
      });
      
      if (verificationSession) {
        const failedSession = VerificationService.failVerification(verificationSession, errorMessage);
        setVerificationSession(failedSession);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkBusinessCreationAccess = () => {
    return BusinessAccessChecker.checkAccess(user);
  };

  const logout = () => {
    setUser(null);
    setVerificationSession(null);
    setError(null);
    
    AuditLogger.log({
      action: 'user_logout',
      userId: user?.id,
      details: {
        timestamp: new Date().toISOString()
      }
    });
  };

  const businessCreationAccess = checkBusinessCreationAccess();

  const contextValue: UserManagementContextData = {
    user,
    verificationSession,
    businessCreationAccess,
    isLoading,
    error,
    updateUser,
    startVerification,
    completeVerification,
    checkBusinessCreationAccess,
    logout
  };

  return (
    <UserManagementContext.Provider value={contextValue}>
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagement = (): UserManagementContextData => {
  const context = useContext(UserManagementContext);
  if (!context) {
    throw new Error('useUserManagement must be used within UserManagementProvider');
  }
  return context;
};
