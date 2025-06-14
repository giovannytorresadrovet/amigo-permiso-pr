
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';

interface VerificationSession {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

interface UserManagementContextType {
  user: User | null;
  verificationSession: VerificationSession | null;
  isLoading: boolean;
  startVerification: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
};

interface UserManagementProviderProps {
  children: React.ReactNode;
  initialUser: User;
}

export const UserManagementProvider = ({ children, initialUser }: UserManagementProviderProps) => {
  const [user, setUser] = useState<User>(initialUser);
  const [verificationSession, setVerificationSession] = useState<VerificationSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startVerification = async () => {
    setIsLoading(true);
    
    // Simulate verification process
    const session: VerificationSession = {
      id: Math.random().toString(36).substring(7),
      status: 'in_progress',
      createdAt: new Date()
    };
    
    setVerificationSession(session);
    
    // Simulate verification completion after 3 seconds
    setTimeout(() => {
      const completedSession = {
        ...session,
        status: 'completed' as const,
        completedAt: new Date()
      };
      setVerificationSession(completedSession);
      
      // Update user verification status
      setUser(prev => ({
        ...prev,
        identityVerified: true,
        verificationStatus: 'verified',
        verificationDate: new Date(),
        role: 'business_owner'
      }));
      
      setIsLoading(false);
    }, 3000);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const value = {
    user,
    verificationSession,
    isLoading,
    startVerification,
    updateUser
  };

  return (
    <UserManagementContext.Provider value={value}>
      {children}
    </UserManagementContext.Provider>
  );
};
