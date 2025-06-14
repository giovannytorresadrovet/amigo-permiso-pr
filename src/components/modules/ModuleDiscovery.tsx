
import { useState, useEffect } from 'react';
import { ModuleDiscoveryResult, BusinessContext } from '@/types/module';
import { ModuleDiscoveryEngine } from '@/services/moduleDiscoveryEngine';
import { UserDataService } from '@/services/userDataService';
import { ModuleDiscoveryHeader } from './ModuleDiscoveryHeader';
import { ModuleDiscoveryLoading } from './ModuleDiscoveryLoading';
import { ModuleDiscoveryEmptyState } from './ModuleDiscoveryEmptyState';
import { ModuleDiscoveryResults } from './ModuleDiscoveryResults';

interface ModuleDiscoveryProps {
  language: 'es' | 'en';
  onModuleSelect?: (moduleId: string) => void;
  onBack?: () => void;
}

export const ModuleDiscovery = ({ language, onModuleSelect, onBack }: ModuleDiscoveryProps) => {
  const [discoveryResults, setDiscoveryResults] = useState<ModuleDiscoveryResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [businessContext, setBusinessContext] = useState<BusinessContext | null>(null);

  const discoveryEngine = ModuleDiscoveryEngine.getInstance();

  useEffect(() => {
    loadBusinessContext();
  }, []);

  const loadBusinessContext = async () => {
    try {
      // In a real implementation, this would get the current business context
      const businesses = await UserDataService.getUserBusinesses();
      if (businesses.length > 0) {
        const business = businesses[0];
        const context: BusinessContext = {
          id: business.id,
          name: business.name,
          type: business.businessType || 'general',
          industry: business.industry || 'general',
          size: business.employeeCount > 50 ? 'large' : business.employeeCount > 10 ? 'medium' : 'small',
          location: business.municipality,
          currentModules: [], // Would be populated with installed modules
          complianceRequirements: business.complianceRequirements || [],
          painPoints: ['paperwork', 'communication'], // Would be collected from user input
          goals: ['growth', 'efficiency'] // Would be collected from user input
        };
        setBusinessContext(context);
        runDiscovery(context);
      }
    } catch (error) {
      console.error('Failed to load business context:', error);
    }
  };

  const runDiscovery = async (context?: BusinessContext) => {
    if (!context && !businessContext) return;
    
    setIsLoading(true);
    try {
      const results = await discoveryEngine.discoverModulesForBusiness(context || businessContext!);
      setDiscoveryResults(results);
    } catch (error) {
      console.error('Failed to run module discovery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    runDiscovery();
  };

  return (
    <div className="space-y-6">
      <ModuleDiscoveryHeader
        language={language}
        isLoading={isLoading}
        hasBusinessContext={!!businessContext}
        onRefresh={handleRefresh}
        onBack={onBack}
      />

      {isLoading ? (
        <ModuleDiscoveryLoading language={language} />
      ) : discoveryResults.length === 0 ? (
        <ModuleDiscoveryEmptyState language={language} />
      ) : (
        <ModuleDiscoveryResults
          results={discoveryResults}
          language={language}
          onModuleSelect={onModuleSelect}
        />
      )}
    </div>
  );
};
