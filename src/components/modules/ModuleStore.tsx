
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModuleMetadata, ModuleCategory } from '@/types/module';
import { ModuleRegistry } from '@/services/moduleRegistry';
import { Search, Download, Star, Users, Zap } from 'lucide-react';

interface ModuleStoreProps {
  language: 'es' | 'en';
  onModuleInstall?: (moduleId: string) => void;
}

export const ModuleStore = ({ language, onModuleInstall }: ModuleStoreProps) => {
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
    // In a real implementation, this would fetch from an API
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

  const getPricingDisplay = (module: ModuleMetadata) => {
    if (!module.pricing || module.pricing.type === 'free') {
      return language === 'es' ? 'Gratis' : 'Free';
    }
    if (module.pricing.type === 'freemium') {
      return language === 'es' ? 'Freemium' : 'Freemium';
    }
    return `$${module.pricing.price}${module.pricing.billingPeriod === 'monthly' ? '/mo' : '/yr'}`;
  };

  const categories: (ModuleCategory | 'all')[] = [
    'all', 'core', 'compliance', 'finance', 'hr', 'operations', 'analytics', 'automation', 'integration', 'utility'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder={language === 'es' ? 'Buscar módulos...' : 'Search modules...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ModuleCategory | 'all')}>
        <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="text-xs">
              {getCategoryLabel(category)}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map(module => (
              <Card key={module.id} className="hover:shadow-professional-lg transition-professional">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {module.icon && (
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">{module.icon}</span>
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{module.name}</CardTitle>
                        <p className="text-sm text-slate-600">v{module.version}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {getCategoryLabel(module.category)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {module.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {module.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {module.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{module.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-4">
                      {module.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{module.rating.toFixed(1)}</span>
                        </div>
                      )}
                      {module.installCount && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{module.installCount.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="font-semibold text-blue-600">
                      {getPricingDisplay(module)}
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleInstallModule(module.id)}
                    disabled={installingModules.has(module.id)}
                  >
                    {installingModules.has(module.id) ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-spin" />
                        {language === 'es' ? 'Instalando...' : 'Installing...'}
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        {language === 'es' ? 'Instalar' : 'Install'}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredModules.length === 0 && (
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
