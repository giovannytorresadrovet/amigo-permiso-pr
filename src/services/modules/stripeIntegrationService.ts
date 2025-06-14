
import { ModuleMetadata, ModuleConfig } from '@/types/module';
import { AuditLogger } from '@/lib/security';

export interface StripeModuleConfig {
  requiresSubscription: boolean;
  subscriptionTier: 'basic' | 'premium' | 'enterprise';
  trialPeriodDays?: number;
  features: string[];
}

export interface UserSubscription {
  isActive: boolean;
  tier: 'basic' | 'premium' | 'enterprise' | null;
  expiresAt?: Date;
  features: string[];
}

export class StripeIntegrationService {
  private static instance: StripeIntegrationService;

  static getInstance(): StripeIntegrationService {
    if (!StripeIntegrationService.instance) {
      StripeIntegrationService.instance = new StripeIntegrationService();
    }
    return StripeIntegrationService.instance;
  }

  // Check if user can access a module based on subscription
  async canAccessModule(moduleId: string, userSubscription: UserSubscription): Promise<{
    canAccess: boolean;
    reason?: string;
    upgradeRequired?: string;
  }> {
    try {
      // Get module configuration
      const moduleConfig = await this.getModuleStripeConfig(moduleId);
      
      if (!moduleConfig?.requiresSubscription) {
        return { canAccess: true };
      }

      if (!userSubscription.isActive) {
        return {
          canAccess: false,
          reason: 'Subscription required',
          upgradeRequired: moduleConfig.subscriptionTier
        };
      }

      const tierHierarchy = { basic: 1, premium: 2, enterprise: 3 };
      const userTierLevel = userSubscription.tier ? tierHierarchy[userSubscription.tier] : 0;
      const requiredTierLevel = tierHierarchy[moduleConfig.subscriptionTier];

      if (userTierLevel < requiredTierLevel) {
        return {
          canAccess: false,
          reason: 'Upgrade required',
          upgradeRequired: moduleConfig.subscriptionTier
        };
      }

      return { canAccess: true };
    } catch (error) {
      AuditLogger.log({
        action: 'module_access_check_failed',
        userId: 'system',
        details: { moduleId, error: error instanceof Error ? error.message : 'Unknown error' }
      });
      return { canAccess: false, reason: 'Access check failed' };
    }
  }

  // Get modules available for user's subscription tier
  async getAvailableModules(userSubscription: UserSubscription): Promise<ModuleMetadata[]> {
    // This would typically fetch from a database or API
    // For now, return a mock list based on subscription tier
    const allModules = await this.getAllModules();
    
    const availableModules = [];
    for (const module of allModules) {
      const access = await this.canAccessModule(module.id, userSubscription);
      if (access.canAccess) {
        availableModules.push(module);
      }
    }
    
    return availableModules;
  }

  // Get Stripe configuration for a module
  private async getModuleStripeConfig(moduleId: string): Promise<StripeModuleConfig | null> {
    // Mock configurations - in real implementation, this would come from database
    const configs: Record<string, StripeModuleConfig> = {
      'advanced-analytics': {
        requiresSubscription: true,
        subscriptionTier: 'premium',
        features: ['advanced-reporting', 'custom-dashboards', 'data-export']
      },
      'enterprise-integration': {
        requiresSubscription: true,
        subscriptionTier: 'enterprise',
        features: ['api-access', 'webhook-support', 'sso-integration']
      },
      'ai-compliance-assistant': {
        requiresSubscription: true,
        subscriptionTier: 'premium',
        trialPeriodDays: 14,
        features: ['ai-recommendations', 'document-analysis', 'risk-assessment']
      }
    };

    return configs[moduleId] || null;
  }

  private async getAllModules(): Promise<ModuleMetadata[]> {
    // Mock modules - in real implementation, this would fetch from registry
    return [
      {
        id: 'basic-permits',
        name: 'Basic Permit Management',
        description: 'Essential permit tracking and management',
        version: '1.0.0',
        category: 'core',
        tags: ['permits', 'basic'],
        author: 'Permisoria Team',
        compatibility: { minVersion: '1.0.0' },
        status: 'active',
        lastUpdated: new Date()
      },
      {
        id: 'advanced-analytics',
        name: 'Advanced Analytics',
        description: 'Advanced reporting and analytics for business insights',
        version: '1.0.0',
        category: 'analytics',
        tags: ['analytics', 'reporting', 'premium'],
        author: 'Permisoria Team',
        compatibility: { minVersion: '1.0.0' },
        status: 'active',
        lastUpdated: new Date()
      }
    ];
  }

  // Generate checkout URL for module subscription
  async createModuleCheckoutSession(moduleId: string, userId: string): Promise<string> {
    try {
      // This would integrate with actual Stripe service
      // For now, return a mock URL
      AuditLogger.log({
        action: 'module_checkout_initiated',
        userId,
        details: { moduleId }
      });

      return `https://checkout.stripe.com/pay/mock-session-${moduleId}`;
    } catch (error) {
      AuditLogger.log({
        action: 'module_checkout_failed',
        userId,
        details: { moduleId, error: error instanceof Error ? error.message : 'Unknown error' }
      });
      throw error;
    }
  }
}
