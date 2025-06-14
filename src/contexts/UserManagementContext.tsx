
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, VerificationSession, BusinessCreationAccess } from '@/types/user';
import { AuditLogger } from '@/lib/security';

interface UserManagementContextData {
  user: User | null;
  verificationSession: VerificationSession | null;
  businessCreationAccess: BusinessCreationAccess;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  updateUser: (updates: Partial<User>) => void;
  startVerification: () => Promise<string>; // Returns verification URL
  completeVerification: (verificationId: string, data: any) => Promise<void>;
  checkBusinessCreationAccess: () => BusinessCreationAccess;
  logout: () => void;
}

const UserManagementContext = createContext<UserManagementContextData | null>(null);

interface UserManagementProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

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
      // Create verification session
      const session: VerificationSession = {
        id: `session_${Date.now()}`,
        userId: user.id,
        provider: 'id_me',
        status: 'initiated',
        createdAt: new Date()
      };

      setVerificationSession(session);
      
      // Update user status
      updateUser({
        verificationStatus: 'in_progress'
      });

      // Simulate ID.me redirect URL generation
      const verificationUrl = `https://api.id.me/api/public/v3/oauth/authorize?client_id=mock&response_type=code&redirect_uri=${encodeURIComponent(window.location.origin)}/verification/callback&scope=identity`;
      
      session.redirectUrl = verificationUrl;
      setVerificationSession(session);

      AuditLogger.log({
        action: 'identity_verification_started',
        userId: user.id,
        details: {
          provider: 'id_me',
          sessionId: session.id,
          timestamp: new Date().toISOString()
        }
      });

      return verificationUrl;
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
      // Simulate verification completion
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedSession: VerificationSession = {
        ...verificationSession,
        status: 'completed',
        completedAt: new Date(),
        verificationData: data
      };
      
      setVerificationSession(updatedSession);
      
      // Update user with verification success
      updateUser({
        identityVerified: true,
        verificationStatus: 'verified',
        verificationDate: new Date(),
        idMeVerificationId: verificationId,
        role: 'business_owner' // Automatically assign business owner role
      });

      AuditLogger.log({
        action: 'identity_verification_completed',
        userId: user.id,
        details: {
          provider: 'id_me',
          verificationId,
          timestamp: new Date().toISOString()
        }
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      
      updateUser({
        verificationStatus: 'failed'
      });
      
      if (verificationSession) {
        setVerificationSession({
          ...verificationSession,
          status: 'failed',
          errorMessage
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkBusinessCreationAccess = (): BusinessCreationAccess => {
    if (!user) {
      return {
        hasAccess: false,
        reason: 'not_verified',
        requiresVerification: true
      };
    }

    if (!user.identityVerified) {
      return {
        hasAccess: false,
        reason: 'not_verified',
        requiresVerification: true
      };
    }

    if (user.verificationStatus === 'failed') {
      return {
        hasAccess: false,
        reason: 'verification_failed',
        requiresVerification: true
      };
    }

    return {
      hasAccess: true,
      requiresVerification: false
    };
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
