
import { User, BusinessCreationAccess } from '@/types/user';

export class BusinessAccessChecker {
  static checkAccess(user: User | null): BusinessCreationAccess {
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
  }
}
