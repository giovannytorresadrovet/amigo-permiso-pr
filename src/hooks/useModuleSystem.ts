
import { useEffect } from 'react';
import { ModuleRegistry } from '@/services/moduleRegistry';
import { ModuleDiscoveryEngine } from '@/services/moduleDiscoveryEngine';
import { initializeSampleModules } from '@/services/sampleModules';

export const useModuleSystem = () => {
  useEffect(() => {
    // Initialize the module system
    const registry = ModuleRegistry.getInstance();
    const discoveryEngine = ModuleDiscoveryEngine.getInstance();

    // Load sample modules for demonstration
    initializeSampleModules();

    console.log('Module system initialized');
  }, []);

  return {
    registry: ModuleRegistry.getInstance(),
    discoveryEngine: ModuleDiscoveryEngine.getInstance()
  };
};
