
import { ModuleInstance } from '@/types/module';

export class ModuleDependencyService {
  private static instance: ModuleDependencyService;
  private modules: Map<string, ModuleInstance> = new Map();

  static getInstance(): ModuleDependencyService {
    if (!ModuleDependencyService.instance) {
      ModuleDependencyService.instance = new ModuleDependencyService();
    }
    return ModuleDependencyService.instance;
  }

  setModulesMap(modules: Map<string, ModuleInstance>): void {
    this.modules = modules;
  }

  // Check if a dependency exists (throws error if not found)
  checkDependency(moduleId: string): void {
    if (!this.modules.has(moduleId)) {
      throw new Error(`Missing dependency: ${moduleId}`);
    }
  }

  // Get modules that depend on a specific module
  getDependentModules(moduleId: string): string[] {
    const dependents: string[] = [];
    
    for (const [id, module] of this.modules) {
      if (module.metadata.dependencies?.includes(moduleId)) {
        dependents.push(id);
      }
    }
    
    return dependents;
  }

  // Validate all dependencies for all installed modules
  validateAllDependencies(): { valid: boolean; issues: string[] } {
    const issues: string[] = [];

    for (const [moduleId, module] of this.modules) {
      if (module.metadata.dependencies) {
        for (const depId of module.metadata.dependencies) {
          if (!this.modules.has(depId)) {
            issues.push(`Module ${moduleId} requires missing dependency: ${depId}`);
          }
        }
      }
    }

    return {
      valid: issues.length === 0,
      issues
    };
  }

  // Get dependency chain for a module
  getDependencyChain(moduleId: string): string[] {
    const visited = new Set<string>();
    const chain: string[] = [];

    const traverse = (id: string) => {
      if (visited.has(id)) {
        return; // Avoid circular dependencies
      }
      visited.add(id);

      const module = this.modules.get(id);
      if (module?.metadata.dependencies) {
        for (const depId of module.metadata.dependencies) {
          chain.push(depId);
          traverse(depId);
        }
      }
    };

    traverse(moduleId);
    return [...new Set(chain)]; // Remove duplicates
  }
}
