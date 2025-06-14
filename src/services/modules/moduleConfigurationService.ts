
import { ModuleInstance, ModuleConfig } from '@/types/module';
import { AuditLogger } from '@/lib/security';

export class ModuleConfigurationService {
  private static instance: ModuleConfigurationService;
  private modules: Map<string, ModuleInstance> = new Map();

  static getInstance(): ModuleConfigurationService {
    if (!ModuleConfigurationService.instance) {
      ModuleConfigurationService.instance = new ModuleConfigurationService();
    }
    return ModuleConfigurationService.instance;
  }

  setModulesMap(modules: Map<string, ModuleInstance>): void {
    this.modules = modules;
  }

  // Enable/disable module
  async setModuleEnabled(moduleId: string, enabled: boolean): Promise<boolean> {
    const module = this.modules.get(moduleId);
    if (!module) {
      return false;
    }

    const wasEnabled = module.config.enabled;
    module.config.enabled = enabled;

    try {
      if (enabled && !wasEnabled && module.hooks?.onEnable) {
        await module.hooks.onEnable();
      } else if (!enabled && wasEnabled && module.hooks?.onDisable) {
        await module.hooks.onDisable();
      }

      AuditLogger.log({
        action: enabled ? 'module_enabled' : 'module_disabled',
        userId: 'system',
        details: { moduleId }
      });

      return true;
    } catch (error) {
      // Revert state on error
      module.config.enabled = wasEnabled;
      return false;
    }
  }

  // Update module configuration
  async updateModuleConfig(moduleId: string, config: Partial<ModuleConfig>): Promise<boolean> {
    const module = this.modules.get(moduleId);
    if (!module) {
      return false;
    }

    const oldConfig = { ...module.config };
    module.config = { ...module.config, ...config };

    try {
      if (module.hooks?.onConfigChange) {
        await module.hooks.onConfigChange(module.config);
      }

      AuditLogger.log({
        action: 'module_config_updated',
        userId: 'system',
        details: { moduleId, changes: config }
      });

      return true;
    } catch (error) {
      // Revert configuration on error
      module.config = oldConfig;
      return false;
    }
  }

  // Get module by ID
  getModule(moduleId: string): ModuleInstance | undefined {
    return this.modules.get(moduleId);
  }

  // Get installed modules
  getInstalledModules(): ModuleInstance[] {
    return Array.from(this.modules.values());
  }

  // Get enabled modules
  getEnabledModules(): ModuleInstance[] {
    return Array.from(this.modules.values()).filter(m => m.config.enabled);
  }
}
