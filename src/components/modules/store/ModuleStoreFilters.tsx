
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModuleCategory } from '@/types/module';

interface ModuleStoreFiltersProps {
  selectedCategory: ModuleCategory | 'all';
  onCategoryChange: (category: ModuleCategory | 'all') => void;
  language: 'es' | 'en';
}

export const ModuleStoreFilters = ({ 
  selectedCategory, 
  onCategoryChange, 
  language 
}: ModuleStoreFiltersProps) => {
  const getCategoryLabel = (category: ModuleCategory | 'all') => {
    const labels = {
      es: {
        all: 'Todos',
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
        all: 'All',
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
    return labels[language][category];
  };

  const categories: (ModuleCategory | 'all')[] = [
    'all', 'core', 'compliance', 'finance', 'hr', 'operations', 'analytics', 'automation', 'integration', 'utility'
  ];

  return (
    <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full">
      {categories.map(category => (
        <TabsTrigger 
          key={category} 
          value={category} 
          className="text-xs"
          onClick={() => onCategoryChange(category)}
        >
          {getCategoryLabel(category)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
