
import { useState, useEffect } from 'react';
import { ModuleInstance } from '@/types/module';
import { ModuleRegistry } from '@/services/moduleRegistry';
import { ModuleManagerHeader } from './ModuleManagerHeader';
import { ModuleManagerEmptyState } from './ModuleManagerEmptyState';
import { ModuleCard } from './ModuleCard';

interface ModuleManagerProps {
  language: 'es' | 'en';
  onModuleUpdate?: () => void;
}

export const ModuleManager = ({ language, onModuleUpdate }: ModuleManagerProps) => {
  const [installedModules, setInstalledModules] = useState<ModuleInstance[]>([]);
  const [updatingModules, setUpdatingModules] = useState<Set<string>>(new Set());

  const registry = ModuleRegistry.getInstance();

  useEffect(() => {
    loadInstalledModules();
  }, []);

  const loadInstalledModules = () => {
    const modules = registry.getInstalledModules();
    setInstalledModules(modules);
  };

  const handleToggleModule = async (moduleId: string, enabled: boolean) => {
    setUpdatingModules(prev => new Set(prev).add(moduleId));
    
    try {
      await registry.setModuleEnabled(moduleId, enabled);
      loadInstalledModules();
      onModuleUpdate?.();
    } catch (error) {
      console.error('Failed to toggle module:', error);
    } finally {
      setUpdatingModules(prev => {
        const next = new Set(prev);
        next.delete(moduleId);
        return next;
      });
    }
  };

  const handleUninstallModule = async (moduleId: string) => {
    if (window.confirm(
      language === 'es' 
        ? '¿Estás seguro de que quieres desinstalar este módulo?'
        : 'Are you sure you want to uninstall this module?'
    )) {
      setUpdatingModules(prev => new Set(prev).add(moduleId));
      
      try {
        await registry.uninstallModule(moduleId);
        loadInstalledModules();
        onModuleUpdate?.();
      } catch (error) {
        console.error('Failed to uninstall module:', error);
        alert(
          language === 'es'
            ? 'Error al desinstalar el módulo. Verifica las dependencias.'
            : 'Failed to uninstall module. Check dependencies.'
        );
      } finally {
        setUpdatingModules(prev => {
          const next = new Set(prev);
          next.delete(moduleId);
          return next;
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <ModuleManagerHeader 
        moduleCount={installedModules.length} 
        language={language} 
      />

      {installedModules.length === 0 ? (
        <ModuleManagerEmptyState language={language} />
      ) : (
        <div className="grid gap-4">
          {installedModules.map(module => (
            <ModuleCard
              key={module.metadata.id}
              module={module}
              isUpdating={updatingModules.has(module.metadata.id)}
              language={language}
              onToggle={handleToggleModule}
              onUninstall={handleUninstallModule}
            />
          ))}
        </div>
      )}
    </div>
  );
};
