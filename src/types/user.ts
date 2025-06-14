
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  verified: boolean;
  identityVerified: boolean;
  role: 'guest' | 'business_owner' | 'admin';
  verificationStatus: 'pending' | 'in_progress' | 'verified' | 'failed';
  verificationDate?: Date;
  idMeVerificationId?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface VerificationSession {
  id: string;
  userId: string;
  provider: 'id_me';
  status: 'initiated' | 'in_progress' | 'completed' | 'failed' | 'expired';
  redirectUrl?: string;
  verificationData?: any;
  createdAt: Date;
  completedAt?: Date;
  errorMessage?: string;
}

export interface BusinessCreationAccess {
  hasAccess: boolean;
  reason?: 'not_verified' | 'verification_failed' | 'account_suspended';
  requiresVerification: boolean;
}
