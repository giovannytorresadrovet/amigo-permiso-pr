
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ModuleInstance } from '@/types/module';
import { ModuleStatus } from './ModuleStatus';
import { ModuleActions } from './ModuleActions';

interface ModuleCardProps {
  module: ModuleInstance;
  isUpdating: boolean;
  language: 'es' | 'en';
  onToggle: (moduleId: string, enabled: boolean) => void;
  onUninstall: (moduleId: string) => void;
}

export const ModuleCard = ({ 
  module, 
  isUpdating, 
  language, 
  onToggle, 
  onUninstall 
}: ModuleCardProps) => {
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
    <Card className="hover:shadow-professional transition-professional">
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
            <ModuleStatus status={module.metadata.status} language={language} />
            <Switch
              checked={module.config.enabled}
              onCheckedChange={(enabled) => onToggle(module.metadata.id, enabled)}
              disabled={isUpdating}
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

        <ModuleActions
          moduleId={module.metadata.id}
          isCore={module.metadata.category === 'core'}
          isUpdating={isUpdating}
          language={language}
          onUninstall={onUninstall}
        />
      </CardContent>
    </Card>
  );
};
