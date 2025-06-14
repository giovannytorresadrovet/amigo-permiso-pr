
import { User, VerificationSession, BusinessCreationAccess } from '@/types/user';

export interface UserManagementContextData {
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

export interface UserManagementProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}
