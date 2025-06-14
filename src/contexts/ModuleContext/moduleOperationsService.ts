
import { ModuleRegistry } from '@/services/moduleRegistry';
import { StripeIntegrationService, UserSubscription } from '@/services/modules/stripeIntegrationService';
import { UserProfile } from '@/types/user';

export class ModuleOperationsService {
  private registry: ModuleRegistry;
  private stripeService: StripeIntegrationService;

  constructor() {
    this.registry = ModuleRegistry.getInstance();
    this.stripeService = StripeIntegrationService.getInstance();
  }

  async installModule(
    moduleId: string,
    userProfile: UserProfile | null,
    userSubscription: UserSubscription | null
  ): Promise<{ success: boolean; error?: string }> {
    if (!userProfile || !userSubscription) {
      return { success: false, error: 'No user profile or subscription found' };
    }

    try {
      const accessCheck = await this.stripeService.canAccessModule(moduleId, userSubscription);
      if (!accessCheck.canAccess) {
        return { success: false, error: `Cannot install module: ${accessCheck.reason}` };
      }

      const success = await this.registry.installModule(moduleId);
      return { success };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Installation failed';
      return { success: false, error: errorMessage };
    }
  }

  async uninstallModule(moduleId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const success = await this.registry.uninstallModule(moduleId);
      return { success };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Uninstallation failed';
      return { success: false, error: errorMessage };
    }
  }

  async toggleModule(
    moduleId: string,
    enabled: boolean,
    userProfile: UserProfile | null,
    userSubscription: UserSubscription | null
  ): Promise<{ success: boolean; error?: string }> {
    if (!userProfile || !userSubscription) {
      return { success: false, error: 'No user profile or subscription found' };
    }

    try {
      if (enabled) {
        const accessCheck = await this.stripeService.canAccessModule(moduleId, userSubscription);
        if (!accessCheck.canAccess) {
          return { success: false, error: `Cannot enable module: ${accessCheck.reason}` };
        }
      }

      const success = await this.registry.setModuleEnabled(moduleId, enabled);
      return { success };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Toggle failed';
      return { success: false, error: errorMessage };
    }
  }

  async canAccessModule(
    moduleId: string,
    userSubscription: UserSubscription | null
  ): Promise<{ canAccess: boolean; reason?: string; upgradeRequired?: string }> {
    if (!userSubscription) {
      return { canAccess: false, reason: 'No subscription found' };
    }
    return this.stripeService.canAccessModule(moduleId, userSubscription);
  }
}
