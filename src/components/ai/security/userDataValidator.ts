
import { UserDataService } from '@/services/userDataService';
import { AuditLogger } from '@/lib/security';
import type { SecureUserContext, UserDataContext } from './types';

export class UserDataValidator {
  static validateUserContext(userContext: SecureUserContext): void {
    if (!userContext.userId || !userContext.userProfile) {
      throw new Error('Invalid user context - security violation');
    }
  }

  static async getUserDataContext(userContext: SecureUserContext): Promise<UserDataContext> {
    // Get user-specific data with strict validation
    const [userPermits, userDocuments, userUrgentActions] = await Promise.all([
      UserDataService.getBusinessPermits().then(permits => 
        // Ensure permits belong to user's businesses only
        permits.filter(permit => 
          userContext.businesses.some(business => business.id === permit.businessId)
        )
      ),
      UserDataService.getBusinessDocuments().then(documents => 
        // Ensure documents belong to user's businesses only
        documents.filter(doc => 
          userContext.businesses.some(business => business.id === doc.businessId)
        )
      ),
      UserDataService.getUrgentActions()
    ]);

    return {
      userPermits,
      userDocuments,
      userUrgentActions
    };
  }

  static logInteraction(userContext: SecureUserContext, queryLength: number): void {
    AuditLogger.log({
      action: 'ai_response_generation',
      userId: userContext.userId,
      details: {
        queryLength,
        businessCount: userContext.businesses.length,
        timestamp: new Date().toISOString()
      }
    });
  }
}
