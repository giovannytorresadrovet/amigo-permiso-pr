
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ModuleStoreHeader } from './store/ModuleStoreHeader';
import { ModuleStoreFilters } from './store/ModuleStoreFilters';
import { ModuleStoreGrid } from './store/ModuleStoreGrid';
import { useModuleStoreLogic } from './store/useModuleStoreLogic';

interface ModuleStoreProps {
  language: 'es' | 'en';
  onModuleInstall?: (moduleId: string) => void;
}

export const ModuleStore = ({ language, onModuleInstall }: ModuleStoreProps) => {
  const {
    filteredModules,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    installingModules,
    handleInstallModule
  } = useModuleStoreLogic(onModuleInstall);

  return (
    <div className="space-y-6">
      <ModuleStoreHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        language={language}
      />

      <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
        <ModuleStoreFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          language={language}
        />

        <TabsContent value={selectedCategory} className="mt-6">
          <ModuleStoreGrid
            modules={filteredModules}
            installingModules={installingModules}
            language={language}
            onInstall={handleInstallModule}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
