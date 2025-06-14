
import { useState, useEffect } from 'react';
import { ModuleMetadata, ModuleCategory } from '@/types/module';
import { ModuleRegistry } from '@/services/moduleRegistry';

export const useModuleStoreLogic = (onModuleInstall?: (moduleId: string) => void) => {
  const [availableModules, setAvailableModules] = useState<ModuleMetadata[]>([]);
  const [filteredModules, setFilteredModules] = useState<ModuleMetadata[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory | 'all'>('all');
  const [installingModules, setInstallingModules] = useState<Set<string>>(new Set());

  const registry = ModuleRegistry.getInstance();

  useEffect(() => {
    loadAvailableModules();
  }, []);

  useEffect(() => {
    filterModules();
  }, [availableModules, searchTerm, selectedCategory]);

  const loadAvailableModules = () => {
    const modules = registry.getAvailableModules();
    setAvailableModules(modules);
  };

  const filterModules = () => {
    let filtered = availableModules;

    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(module => module.category === selectedCategory);
    }

    setFilteredModules(filtered);
  };

  const handleInstallModule = async (moduleId: string) => {
    setInstallingModules(prev => new Set(prev).add(moduleId));
    
    try {
      const success = await registry.installModule(moduleId);
      if (success && onModuleInstall) {
        onModuleInstall(moduleId);
      }
    } catch (error) {
      console.error('Failed to install module:', error);
    } finally {
      setInstallingModules(prev => {
        const next = new Set(prev);
        next.delete(moduleId);
        return next;
      });
    }
  };

  return {
    filteredModules,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    installingModules,
    handleInstallModule
  };
};
