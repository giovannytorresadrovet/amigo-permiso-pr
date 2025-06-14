
import { User, BusinessCreationAccess } from '@/types/user';

export class BusinessAccessChecker {
  static checkAccess(user: User | null): BusinessCreationAccess {
    if (!user) {
      return {
        allowed: false,
        hasAccess: false,
        reason: 'not_verified',
        requiresVerification: true
      };
    }

    if (!user.identityVerified) {
      return {
        allowed: false,
        hasAccess: false,
        reason: 'not_verified',
        requiresVerification: true
      };
    }

    if (user.verificationStatus === 'failed') {
      return {
        allowed: false,
        hasAccess: false,
        reason: 'verification_failed',
        requiresVerification: true
      };
    }

    return {
      allowed: true,
      hasAccess: true,
      requiresVerification: false
    };
  }
}
