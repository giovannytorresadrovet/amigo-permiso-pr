
import { ModuleMetadata } from '@/types/module';
import { ModuleStoreCard } from './ModuleStoreCard';

interface ModuleStoreGridProps {
  modules: ModuleMetadata[];
  installingModules: Set<string>;
  language: 'es' | 'en';
  onInstall: (moduleId: string) => void;
}

export const ModuleStoreGrid = ({ 
  modules, 
  installingModules, 
  language, 
  onInstall 
}: ModuleStoreGridProps) => {
  if (modules.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-2">
          {language === 'es' ? 'No se encontraron módulos' : 'No modules found'}
        </div>
        <p className="text-sm text-slate-500">
          {language === 'es' 
            ? 'Intenta ajustar tus filtros de búsqueda'
            : 'Try adjusting your search filters'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {modules.map(module => (
        <ModuleStoreCard
          key={module.id}
          module={module}
          isInstalling={installingModules.has(module.id)}
          language={language}
          onInstall={onInstall}
        />
      ))}
    </div>
  );
};
