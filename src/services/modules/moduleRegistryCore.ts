
import { ModuleMetadata, ModuleInstance, ModuleConfig } from '@/types/module';
import { ModuleInstallationService } from './moduleInstallationService';
import { ModuleConfigurationService } from './moduleConfigurationService';
import { ModuleDependencyService } from './moduleDependencyService';

export class ModuleRegistryCore {
  private static instance: ModuleRegistryCore;
  private modules: Map<string, ModuleInstance> = new Map();
  private availableModules: Map<string, ModuleMetadata> = new Map();

  private installationService: ModuleInstallationService;
  private configurationService: ModuleConfigurationService;
  private dependencyService: ModuleDependencyService;

  private constructor() {
    this.installationService = ModuleInstallationService.getInstance();
    this.configurationService = ModuleConfigurationService.getInstance();
    this.dependencyService = ModuleDependencyService.getInstance();
    
    // Sync maps across all services
    this.syncServiceMaps();
  }

  static getInstance(): ModuleRegistryCore {
    if (!ModuleRegistryCore.instance) {
      ModuleRegistryCore.instance = new ModuleRegistryCore();
    }
    return ModuleRegistryCore.instance;
  }

  private syncServiceMaps(): void {
    this.installationService.setModulesMap(this.modules);
    this.installationService.setAvailableModulesMap(this.availableModules);
    this.configurationService.setModulesMap(this.modules);
    this.dependencyService.setModulesMap(this.modules);
  }

  // Installation methods
  async installModule(moduleId: string, config?: Partial<ModuleConfig>): Promise<boolean> {
    const result = await this.installationService.installModule(
      moduleId, 
      config, 
      (depId) => this.dependencyService.checkDependency(depId)
    );
    this.syncServiceMaps();
    return result;
  }

  async uninstallModule(moduleId: string): Promise<boolean> {
    const result = await this.installationService.uninstallModule(
      moduleId,
      (depId) => this.dependencyService.getDependentModules(depId)
    );
    this.syncServiceMaps();
    return result;
  }

  registerAvailableModule(metadata: ModuleMetadata): void {
    this.availableModules.set(metadata.id, metadata);
    this.installationService.registerAvailableModule(metadata);
  }

  // Configuration methods
  async setModuleEnabled(moduleId: string, enabled: boolean): Promise<boolean> {
    return this.configurationService.setModuleEnabled(moduleId, enabled);
  }

  async updateModuleConfig(moduleId: string, config: Partial<ModuleConfig>): Promise<boolean> {
    return this.configurationService.updateModuleConfig(moduleId, config);
  }

  // Query methods
  getModule(moduleId: string): ModuleInstance | undefined {
    return this.configurationService.getModule(moduleId);
  }

  getInstalledModules(): ModuleInstance[] {
    return this.configurationService.getInstalledModules();
  }

  getEnabledModules(): ModuleInstance[] {
    return this.configurationService.getEnabledModules();
  }

  getAvailableModules(): ModuleMetadata[] {
    return Array.from(this.availableModules.values());
  }

  // Dependency methods
  validateDependencies(): { valid: boolean; issues: string[] } {
    return this.dependencyService.validateAllDependencies();
  }

  getDependencyChain(moduleId: string): string[] {
    return this.dependencyService.getDependencyChain(moduleId);
  }
}
