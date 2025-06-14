
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'inspector';
  permissions: string[];
  businessIds: string[];
  createdAt: Date;
  lastLoginAt?: Date;
  isEmailVerified: boolean;
  preferences: {
    language: 'en' | 'es';
    theme: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
  metadata: Record<string, any>;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  verified: boolean;
  identityVerified: boolean;
  verificationStatus: string;
  preferredLanguage: string;
  createdAt: Date;
}

export interface VerificationSession {
  id: string;
  userId: string;
  type: string;
  status: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface BusinessCreationAccess {
  allowed: boolean;
  reason?: string;
  requiredVerifications?: string[];
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  details: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  lastActiveAt: Date;
  ipAddress?: string;
  userAgent?: string;
}
