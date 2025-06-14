
import { ModuleDiscoveryResult } from '@/types/module';

export class RecommendationRankingEngine {
  static consolidateAndRankResults(results: ModuleDiscoveryResult[]): ModuleDiscoveryResult[] {
    // Remove duplicates based on module ID
    const uniqueResults = new Map<string, ModuleDiscoveryResult>();
    
    for (const result of results) {
      for (const module of result.suggestedModules) {
        const existing = uniqueResults.get(module.id);
        if (!existing || result.confidence > existing.confidence) {
          uniqueResults.set(module.id, {
            ...result,
            suggestedModules: [module]
          });
        }
      }
    }

    // Sort by priority and confidence
    const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
    
    return Array.from(uniqueResults.values()).sort((a, b) => {
      const aPriority = priorityWeight[a.priority];
      const bPriority = priorityWeight[b.priority];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return b.confidence - a.confidence;
    });
  }

  static async getRecommendationsForContext(results: ModuleDiscoveryResult[]): Promise<string[]> {
    return results
      .filter(result => result.priority === 'critical' || result.priority === 'high')
      .slice(0, 5)
      .map(result => result.reasoning);
  }
}
