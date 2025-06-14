
import { getPermitRequirements } from '@/data/governmentAgencies';
import { getZoningInfo, getMunicipalityById } from '@/data/municipalities';
import { BusinessProfile, PermitDiscoveryResult } from './types';
import { PermitAnalyzer } from './permitAnalyzer';
import { ComplianceAnalyzer } from './complianceAnalyzer';
import { RecommendationGenerator } from './recommendationGenerator';
import { CostCalculator } from './costCalculator';

export class PermitDiscoveryEngine {
  static async analyzeBusinessRequirements(
    businessProfile: BusinessProfile,
    language: 'es' | 'en' = 'es'
  ): Promise<PermitDiscoveryResult> {
    // Get basic permit requirements
    const basePermits = getPermitRequirements(businessProfile.businessType, businessProfile.municipality);
    
    // Analyze zoning compliance
    const zoningInfo = getZoningInfo(businessProfile.municipality, businessProfile.businessType);
    const municipality = getMunicipalityById(businessProfile.municipality);
    
    // Discover additional permits based on business characteristics
    const discoveredPermits = PermitAnalyzer.discoverAdditionalPermits(businessProfile, basePermits);
    
    // Identify potential compliance issues
    const complianceIssues = ComplianceAnalyzer.identifyComplianceIssues(businessProfile, zoningInfo);
    
    // Generate recommendations
    const recommendations = RecommendationGenerator.generateRecommendations(
      businessProfile, 
      discoveredPermits, 
      complianceIssues, 
      language
    );
    
    // Calculate timeline and costs
    const timeline = CostCalculator.calculateTimeline(discoveredPermits);
    const cost = CostCalculator.calculateCosts(discoveredPermits);
    
    // Determine critical path
    const criticalPath = PermitAnalyzer.determineCriticalPath(discoveredPermits);
    
    return {
      requiredPermits: discoveredPermits,
      potentialIssues: complianceIssues,
      recommendations,
      estimatedTimeline: timeline,
      estimatedCost: cost,
      criticalPath
    };
  }
}
