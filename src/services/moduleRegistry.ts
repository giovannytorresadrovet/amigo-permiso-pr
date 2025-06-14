
import { ModuleMetadata, ModuleInstance, ModuleConfig } from '@/types/module';
import { ModuleRegistryCore } from './modules/moduleRegistryCore';

export class ModuleRegistry {
  private static instance: ModuleRegistry;
  private core: ModuleRegistryCore;

  private constructor() {
    this.core = ModuleRegistryCore.getInstance();
  }

  static getInstance(): ModuleRegistry {
    if (!ModuleRegistry.instance) {
      ModuleRegistry.instance = new ModuleRegistry();
    }
    return ModuleRegistry.instance;
  }

  // Installation methods
  async installModule(moduleId: string, config?: Partial<ModuleConfig>): Promise<boolean> {
    return this.core.installModule(moduleId, config);
  }

  async uninstallModule(moduleId: string): Promise<boolean> {
    return this.core.uninstallModule(moduleId);
  }

  // Configuration methods
  async setModuleEnabled(moduleId: string, enabled: boolean): Promise<boolean> {
    return this.core.setModuleEnabled(moduleId, enabled);
  }

  async updateModuleConfig(moduleId: string, config: Partial<ModuleConfig>): Promise<boolean> {
    return this.core.updateModuleConfig(moduleId, config);
  }

  // Query methods
  getModule(moduleId: string): ModuleInstance | undefined {
    return this.core.getModule(moduleId);
  }

  getInstalledModules(): ModuleInstance[] {
    return this.core.getInstalledModules();
  }

  getEnabledModules(): ModuleInstance[] {
    return this.core.getEnabledModules();
  }

  getAvailableModules(): ModuleMetadata[] {
    return this.core.getAvailableModules();
  }

  // Registration methods
  registerAvailableModule(metadata: ModuleMetadata): void {
    this.core.registerAvailableModule(metadata);
  }

  // Dependency methods
  validateDependencies(): { valid: boolean; issues: string[] } {
    return this.core.validateDependencies();
  }

  getDependencyChain(moduleId: string): string[] {
    return this.core.getDependencyChain(moduleId);
  }
}
