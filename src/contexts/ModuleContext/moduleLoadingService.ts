
import { ModuleInstance, ModuleMetadata } from '@/types/module';
import { ModuleRegistry } from '@/services/moduleRegistry';
import { StripeIntegrationService, UserSubscription } from '@/services/modules/stripeIntegrationService';
import { AuditLogger } from '@/lib/security';

export class ModuleLoadingService {
  private registry: ModuleRegistry;
  private stripeService: StripeIntegrationService;

  constructor() {
    this.registry = ModuleRegistry.getInstance();
    this.stripeService = StripeIntegrationService.getInstance();
  }

  async loadModules(
    userSubscription: UserSubscription | null,
    userProfileId: string | undefined
  ): Promise<{ installed: ModuleInstance[]; available: ModuleMetadata[] }> {
    const installed = this.registry.getInstalledModules();
    
    let available: ModuleMetadata[];
    if (userSubscription) {
      available = await this.stripeService.getAvailableModules(userSubscription);
    } else {
      available = this.registry.getAvailableModules();
    }

    AuditLogger.log({
      action: 'modules_loaded',
      userId: userProfileId || 'anonymous',
      details: { 
        installedCount: installed.length,
        availableCount: available.length
      }
    });

    return { installed, available };
  }
}
