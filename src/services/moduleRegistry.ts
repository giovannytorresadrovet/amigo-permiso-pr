
import { ModuleMetadata, ModuleInstance, ModuleConfig, BusinessContext, ModuleDiscoveryResult } from '@/types/module';
import { AuditLogger } from '@/lib/security';

export class ModuleRegistry {
  private static instance: ModuleRegistry;
  private modules: Map<string, ModuleInstance> = new Map();
  private availableModules: Map<string, ModuleMetadata> = new Map();

  static getInstance(): ModuleRegistry {
    if (!ModuleRegistry.instance) {
      ModuleRegistry.instance = new ModuleRegistry();
    }
    return ModuleRegistry.instance;
  }

  // Install a module
  async installModule(moduleId: string, config?: Partial<ModuleConfig>): Promise<boolean> {
    try {
      const metadata = this.availableModules.get(moduleId);
      if (!metadata) {
        throw new Error(`Module ${moduleId} not found in registry`);
      }

      // Check dependencies
      if (metadata.dependencies) {
        for (const depId of metadata.dependencies) {
          if (!this.modules.has(depId)) {
            throw new Error(`Missing dependency: ${depId}`);
          }
        }
      }

      // Create module instance
      const moduleInstance: ModuleInstance = {
        metadata,
        config: {
          enabled: true,
          settings: {},
          ...config
        }
      };

      // Run installation hook
      if (moduleInstance.hooks?.onInstall) {
        await moduleInstance.hooks.onInstall();
      }

      this.modules.set(moduleId, moduleInstance);

      AuditLogger.log({
        action: 'module_installed',
        userId: 'system',
        details: { moduleId, version: metadata.version }
      });

      return true;
    } catch (error) {
      AuditLogger.log({
        action: 'module_install_failed',
        userId: 'system',
        details: { moduleId, error: error instanceof Error ? error.message : 'Unknown error' }
      });
      return false;
    }
  }

  // Uninstall a module
  async uninstallModule(moduleId: string): Promise<boolean> {
    try {
      const module = this.modules.get(moduleId);
      if (!module) {
        return false;
      }

      // Check if other modules depend on this one
      const dependents = this.getDependentModules(moduleId);
      if (dependents.length > 0) {
        throw new Error(`Cannot uninstall: modules ${dependents.join(', ')} depend on this module`);
      }

      // Run uninstallation hook
      if (module.hooks?.onUninstall) {
        await module.hooks.onUninstall();
      }

      this.modules.delete(moduleId);

      AuditLogger.log({
        action: 'module_uninstalled',
        userId: 'system',
        details: { moduleId }
      });

      return true;
    } catch (error) {
      AuditLogger.log({
        action: 'module_uninstall_failed',
        userId: 'system',
        details: { moduleId, error: error instanceof Error ? error.message : 'Unknown error' }
      });
      return false;
    }
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

  // Get installed modules
  getInstalledModules(): ModuleInstance[] {
    return Array.from(this.modules.values());
  }

  // Get enabled modules
  getEnabledModules(): ModuleInstance[] {
    return Array.from(this.modules.values()).filter(m => m.config.enabled);
  }

  // Get available modules for installation
  getAvailableModules(): ModuleMetadata[] {
    return Array.from(this.availableModules.values());
  }

  // Register an available module
  registerAvailableModule(metadata: ModuleMetadata): void {
    this.availableModules.set(metadata.id, metadata);
  }

  // Get module by ID
  getModule(moduleId: string): ModuleInstance | undefined {
    return this.modules.get(moduleId);
  }

  // Get dependent modules
  private getDependentModules(moduleId: string): string[] {
    const dependents: string[] = [];
    
    for (const [id, module] of this.modules) {
      if (module.metadata.dependencies?.includes(moduleId)) {
        dependents.push(id);
      }
    }
    
    return dependents;
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
}
