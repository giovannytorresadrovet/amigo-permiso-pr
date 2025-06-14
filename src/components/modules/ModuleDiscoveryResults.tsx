
import { ModuleDiscoveryResult } from '@/types/module';
import { ModuleRecommendationCard } from './ModuleRecommendationCard';

interface ModuleDiscoveryResultsProps {
  results: ModuleDiscoveryResult[];
  language: 'es' | 'en';
  onModuleSelect?: (moduleId: string) => void;
}

export const ModuleDiscoveryResults = ({ 
  results, 
  language, 
  onModuleSelect 
}: ModuleDiscoveryResultsProps) => {
  return (
    <div className="grid gap-6">
      {results.map((result, index) => (
        <ModuleRecommendationCard
          key={index}
          result={result}
          language={language}
          onModuleSelect={onModuleSelect}
        />
      ))}
    </div>
  );
};
