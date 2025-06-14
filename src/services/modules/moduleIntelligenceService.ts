
import { BusinessIntelligenceEngine } from './businessIntelligenceEngine';
import { BusinessContext, ModuleDiscoveryResult } from '@/types/module';

export class ModuleIntelligenceService {
  private static instance: ModuleIntelligenceService;

  static getInstance(): ModuleIntelligenceService {
    if (!ModuleIntelligenceService.instance) {
      ModuleIntelligenceService.instance = new ModuleIntelligenceService();
    }
    return ModuleIntelligenceService.instance;
  }

  async getIntelligentRecommendations(context: BusinessContext): Promise<ModuleDiscoveryResult[]> {
    // Combine multiple intelligence engines
    const businessNeeds = await BusinessIntelligenceEngine.analyzeBusinessNeeds(context);
    
    // Sort by priority and confidence
    return businessNeeds.sort((a, b) => {
      const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityWeight[a.priority];
      const bPriority = priorityWeight[b.priority];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return b.confidence - a.confidence;
    });
  }

  async getPersonalizedInsights(context: BusinessContext): Promise<string[]> {
    return BusinessIntelligenceEngine.getPersonalizedRecommendations(context);
  }
}
