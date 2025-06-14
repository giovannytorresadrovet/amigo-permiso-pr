
import { BusinessContext, ModuleDiscoveryResult } from '@/types/module';
import { IndustryAnalysisEngine } from './modules/industryAnalysisEngine';
import { ComplianceAnalysisEngine } from './modules/complianceAnalysisEngine';
import { PainPointAnalysisEngine } from './modules/painPointAnalysisEngine';
import { GoalAnalysisEngine } from './modules/goalAnalysisEngine';
import { ScalabilityAnalysisEngine } from './modules/scalabilityAnalysisEngine';
import { RecommendationRankingEngine } from './modules/recommendationRankingEngine';

export class ModuleDiscoveryEngine {
  private static instance: ModuleDiscoveryEngine;

  static getInstance(): ModuleDiscoveryEngine {
    if (!ModuleDiscoveryEngine.instance) {
      ModuleDiscoveryEngine.instance = new ModuleDiscoveryEngine();
    }
    return ModuleDiscoveryEngine.instance;
  }

  async discoverModulesForBusiness(businessContext: BusinessContext): Promise<ModuleDiscoveryResult[]> {
    const results: ModuleDiscoveryResult[] = [];

    // Analyze business type and industry
    const industryModules = await IndustryAnalysisEngine.getIndustrySpecificModules(
      businessContext.industry, 
      businessContext.type
    );
    results.push(...industryModules);

    // Analyze compliance requirements
    const complianceModules = await ComplianceAnalysisEngine.getComplianceModules(
      businessContext.complianceRequirements
    );
    results.push(...complianceModules);

    // Analyze pain points
    const painPointModules = await PainPointAnalysisEngine.getPainPointSolutions(
      businessContext.painPoints
    );
    results.push(...painPointModules);

    // Analyze business goals
    const goalModules = await GoalAnalysisEngine.getGoalSupportModules(
      businessContext.goals
    );
    results.push(...goalModules);

    // Analyze business size and recommend scalability modules
    const scaleModules = await ScalabilityAnalysisEngine.getScalabilityModules(
      businessContext.size
    );
    results.push(...scaleModules);

    // Remove duplicates and sort by priority and confidence
    return RecommendationRankingEngine.consolidateAndRankResults(results);
  }

  async getRecommendationsForContext(businessContext: BusinessContext): Promise<string[]> {
    const results = await this.discoverModulesForBusiness(businessContext);
    return RecommendationRankingEngine.getRecommendationsForContext(results);
  }
}
