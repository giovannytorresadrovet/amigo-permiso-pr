
// Re-export everything from the new modular structure
export type { 
  BusinessProfile, 
  PermitDiscoveryResult, 
  DiscoveredPermit, 
  ComplianceIssue 
} from './permitDiscovery';

export { 
  PermitDiscoveryEngine,
  PermitAnalyzer,
  ComplianceAnalyzer,
  RecommendationGenerator,
  CostCalculator
} from './permitDiscovery';
