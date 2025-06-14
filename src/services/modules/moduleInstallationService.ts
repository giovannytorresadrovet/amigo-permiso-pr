
import { ModuleMetadata, ModuleInstance, ModuleConfig } from '@/types/module';
import { AuditLogger } from '@/lib/security';

export class ModuleInstallationService {
  private static instance: ModuleInstallationService;
  private modules: Map<string, ModuleInstance> = new Map();
  private availableModules: Map<string, ModuleMetadata> = new Map();

  static getInstance(): ModuleInstallationService {
    if (!ModuleInstallationService.instance) {
      ModuleInstallationService.instance = new ModuleInstallationService();
    }
    return ModuleInstallationService.instance;
  }

  setModulesMap(modules: Map<string, ModuleInstance>): void {
    this.modules = modules;
  }

  setAvailableModulesMap(availableModules: Map<string, ModuleMetadata>): void {
    this.availableModules = availableModules;
  }

  // Install a module
  async installModule(moduleId: string, config?: Partial<ModuleConfig>, dependencyChecker?: (moduleId: string) => void): Promise<boolean> {
    try {
      const metadata = this.availableModules.get(moduleId);
      if (!metadata) {
        throw new Error(`Module ${moduleId} not found in registry`);
      }

      // Check dependencies if checker is provided
      if (dependencyChecker && metadata.dependencies) {
        for (const depId of metadata.dependencies) {
          dependencyChecker(depId);
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
  async uninstallModule(moduleId: string, dependencyChecker?: (moduleId: string) => string[]): Promise<boolean> {
    try {
      const module = this.modules.get(moduleId);
      if (!module) {
        return false;
      }

      // Check if other modules depend on this one
      if (dependencyChecker) {
        const dependents = dependencyChecker(moduleId);
        if (dependents.length > 0) {
          throw new Error(`Cannot uninstall: modules ${dependents.join(', ')} depend on this module`);
        }
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

  // Register an available module
  registerAvailableModule(metadata: ModuleMetadata): void {
    this.availableModules.set(metadata.id, metadata);
  }
}
