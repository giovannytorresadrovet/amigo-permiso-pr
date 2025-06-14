
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ModuleInstance, ModuleStatus } from '@/types/module';
import { ModuleRegistry } from '@/services/moduleRegistry';
import { Settings, Trash2, AlertCircle, CheckCircle, Loader } from 'lucide-react';

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

  const getStatusIcon = (status: ModuleStatus) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'updating':
      case 'installing':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusLabel = (status: ModuleStatus) => {
    const labels = {
      es: {
        active: 'Activo',
        inactive: 'Inactivo',
        installing: 'Instalando',
        updating: 'Actualizando',
        error: 'Error',
        deprecated: 'Obsoleto'
      },
      en: {
        active: 'Active',
        inactive: 'Inactive',
        installing: 'Installing',
        updating: 'Updating',
        error: 'Error',
        deprecated: 'Deprecated'
      }
    };
    return labels[language][status];
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      es: {
        core: 'Esencial',
        compliance: 'Cumplimiento',
        finance: 'Finanzas',
        hr: 'Recursos Humanos',
        operations: 'Operaciones',
        analytics: 'Analíticas',
        automation: 'Automatización',
        integration: 'Integración',
        utility: 'Utilidades'
      },
      en: {
        core: 'Core',
        compliance: 'Compliance',
        finance: 'Finance',
        hr: 'HR',
        operations: 'Operations',
        analytics: 'Analytics',
        automation: 'Automation',
        integration: 'Integration',
        utility: 'Utility'
      }
    };
    return labels[language][category] || category;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {language === 'es' ? 'Módulos Instalados' : 'Installed Modules'}
        </h2>
        <Badge variant="secondary">
          {installedModules.length} {language === 'es' ? 'módulos' : 'modules'}
        </Badge>
      </div>

      {installedModules.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-slate-400 mb-2">
              {language === 'es' ? 'No hay módulos instalados' : 'No modules installed'}
            </div>
            <p className="text-sm text-slate-500">
              {language === 'es' 
                ? 'Visita la tienda de módulos para empezar'
                : 'Visit the module store to get started'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {installedModules.map(module => (
            <Card key={module.metadata.id} className="hover:shadow-professional transition-professional">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {module.metadata.icon && (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">{module.metadata.icon}</span>
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{module.metadata.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>v{module.metadata.version}</span>
                        <span>•</span>
                        <span>{getCategoryLabel(module.metadata.category)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(module.metadata.status)}
                      <span className="text-sm text-slate-600">
                        {getStatusLabel(module.metadata.status)}
                      </span>
                    </div>
                    <Switch
                      checked={module.config.enabled}
                      onCheckedChange={(enabled) => handleToggleModule(module.metadata.id, enabled)}
                      disabled={updatingModules.has(module.metadata.id)}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  {module.metadata.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {module.metadata.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    disabled
                  >
                    <Settings className="w-4 h-4" />
                    {language === 'es' ? 'Configurar' : 'Configure'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                    onClick={() => handleUninstallModule(module.metadata.id)}
                    disabled={updatingModules.has(module.metadata.id) || module.metadata.category === 'core'}
                  >
                    <Trash2 className="w-4 h-4" />
                    {language === 'es' ? 'Desinstalar' : 'Uninstall'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
