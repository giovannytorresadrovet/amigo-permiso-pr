
import type { UserProfile, BusinessSummary } from '@/services/userDataService';

export interface SecureUserContext {
  userId: string;
  userProfile: UserProfile;
  businesses: BusinessSummary[];
  businessContext?: {
    businessId: string;
    name: string;
    type: string;
    municipality: string;
    status: string;
  };
}

export interface ResponseGeneratorParams {
  userMessage: string;
  language: 'es' | 'en';
  userContext: SecureUserContext;
  relevantArticles?: any[];
}

export interface UserDataContext {
  userPermits: any[];
  userDocuments: any[];
  userUrgentActions: any[];
}
