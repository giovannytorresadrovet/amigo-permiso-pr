
import { BusinessContext, ModuleDiscoveryResult, ModuleMetadata, ModuleCategory } from '@/types/module';
import { searchKnowledgeBase } from '@/data/knowledgeBase';
import { UserDataService } from './userDataService';

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
    const industryModules = await this.getIndustrySpecificModules(businessContext.industry, businessContext.type);
    results.push(...industryModules);

    // Analyze compliance requirements
    const complianceModules = await this.getComplianceModules(businessContext.complianceRequirements);
    results.push(...complianceModules);

    // Analyze pain points
    const painPointModules = await this.getPainPointSolutions(businessContext.painPoints);
    results.push(...painPointModules);

    // Analyze business goals
    const goalModules = await this.getGoalSupportModules(businessContext.goals);
    results.push(...goalModules);

    // Analyze business size and recommend scalability modules
    const scaleModules = await this.getScalabilityModules(businessContext.size);
    results.push(...scaleModules);

    // Remove duplicates and sort by priority and confidence
    return this.consolidateAndRankResults(results);
  }

  private async getIndustrySpecificModules(industry: string, businessType: string): Promise<ModuleDiscoveryResult[]> {
    const modules: ModuleDiscoveryResult[] = [];

    // Restaurant/Food Service
    if (industry.toLowerCase().includes('restaurant') || industry.toLowerCase().includes('food')) {
      modules.push({
        suggestedModules: [
          {
            id: 'health-compliance',
            name: 'Health & Safety Compliance',
            description: 'Manage health permits, inspections, and food safety compliance',
            version: '1.0.0',
            category: 'compliance',
            tags: ['health', 'food-safety', 'inspections'],
            author: 'Permisoria Team',
            compatibility: { minVersion: '1.0.0' },
            status: 'active',
            lastUpdated: new Date()
          },
          {
            id: 'inventory-management',
            name: 'Food Inventory Management',
            description: 'Track food inventory, expiration dates, and supplier compliance',
            version: '1.0.0',
            category: 'operations',
            tags: ['inventory', 'food', 'suppliers'],
            author: 'Permisoria Team',
            compatibility: { minVersion: '1.0.0' },
            status: 'active',
            lastUpdated: new Date()
          }
        ],
        confidence: 0.9,
        reasoning: 'Food service businesses require specialized health compliance and inventory management',
        category: 'compliance',
        priority: 'high'
      });
    }

    // Retail
    if (industry.toLowerCase().includes('retail') || businessType.toLowerCase().includes('store')) {
      modules.push({
        suggestedModules: [
          {
            id: 'sales-tax-management',
            name: 'Sales Tax Compliance',
            description: 'Automated sales tax calculation and reporting for retail businesses',
            version: '1.0.0',
            category: 'finance',
            tags: ['tax', 'sales', 'compliance'],
            author: 'Permisoria Team',
            compatibility: { minVersion: '1.0.0' },
            status: 'active',
            lastUpdated: new Date()
          }
        ],
        confidence: 0.85,
        reasoning: 'Retail businesses need specialized sales tax management',
        category: 'finance',
        priority: 'high'
      });
    }

    return modules;
  }

  private async getComplianceModules(requirements: string[]): Promise<ModuleDiscoveryResult[]> {
    const modules: ModuleDiscoveryResult[] = [];

    for (const requirement of requirements) {
      if (requirement.toLowerCase().includes('environmental')) {
        modules.push({
          suggestedModules: [
            {
              id: 'environmental-compliance',
              name: 'Environmental Compliance Tracker',
              description: 'Monitor and manage environmental permits and regulations',
              version: '1.0.0',
              category: 'compliance',
              tags: ['environmental', 'epa', 'permits'],
              author: 'Permisoria Team',
              compatibility: { minVersion: '1.0.0' },
              status: 'active',
              lastUpdated: new Date()
            }
          ],
          confidence: 0.95,
          reasoning: 'Business has specific environmental compliance requirements',
          category: 'compliance',
          priority: 'critical'
        });
      }

      if (requirement.toLowerCase().includes('safety')) {
        modules.push({
          suggestedModules: [
            {
              id: 'safety-management',
              name: 'Workplace Safety Management',
              description: 'Track safety training, incidents, and OSHA compliance',
              version: '1.0.0',
              category: 'compliance',
              tags: ['safety', 'osha', 'training'],
              author: 'Permisoria Team',
              compatibility: { minVersion: '1.0.0' },
              status: 'active',
              lastUpdated: new Date()
            }
          ],
          confidence: 0.9,
          reasoning: 'Business requires workplace safety compliance',
          category: 'compliance',
          priority: 'high'
        });
      }
    }

    return modules;
  }

  private async getPainPointSolutions(painPoints: string[]): Promise<ModuleDiscoveryResult[]> {
    const modules: ModuleDiscoveryResult[] = [];

    for (const painPoint of painPoints) {
      if (painPoint.toLowerCase().includes('paperwork') || painPoint.toLowerCase().includes('documents')) {
        modules.push({
          suggestedModules: [
            {
              id: 'document-automation',
              name: 'Document Automation Suite',
              description: 'Automate document generation, e-signatures, and filing',
              version: '1.0.0',
              category: 'automation',
              tags: ['documents', 'automation', 'e-signature'],
              author: 'Permisoria Team',
              compatibility: { minVersion: '1.0.0' },
              status: 'active',
              lastUpdated: new Date()
            }
          ],
          confidence: 0.8,
          reasoning: 'Addresses document management pain points',
          category: 'automation',
          priority: 'medium'
        });
      }

      if (painPoint.toLowerCase().includes('communication') || painPoint.toLowerCase().includes('coordination')) {
        modules.push({
          suggestedModules: [
            {
              id: 'team-collaboration',
              name: 'Team Collaboration Hub',
              description: 'Centralized communication and task management for teams',
              version: '1.0.0',
              category: 'operations',
              tags: ['collaboration', 'communication', 'tasks'],
              author: 'Permisoria Team',
              compatibility: { minVersion: '1.0.0' },
              status: 'active',
              lastUpdated: new Date()
            }
          ],
          confidence: 0.75,
          reasoning: 'Improves team communication and coordination',
          category: 'operations',
          priority: 'medium'
        });
      }
    }

    return modules;
  }

  private async getGoalSupportModules(goals: string[]): Promise<ModuleDiscoveryResult[]> {
    const modules: ModuleDiscoveryResult[] = [];

    for (const goal of goals) {
      if (goal.toLowerCase().includes('growth') || goal.toLowerCase().includes('expand')) {
        modules.push({
          suggestedModules: [
            {
              id: 'growth-analytics',
              name: 'Business Growth Analytics',
              description: 'Track key metrics and identify growth opportunities',
              version: '1.0.0',
              category: 'analytics',
              tags: ['analytics', 'growth', 'metrics'],
              author: 'Permisoria Team',
              compatibility: { minVersion: '1.0.0' },
              status: 'active',
              lastUpdated: new Date()
            }
          ],
          confidence: 0.7,
          reasoning: 'Supports business growth objectives',
          category: 'analytics',
          priority: 'medium'
        });
      }

      if (goal.toLowerCase().includes('efficiency') || goal.toLowerCase().includes('automat')) {
        modules.push({
          suggestedModules: [
            {
              id: 'workflow-automation',
              name: 'Workflow Automation Engine',
              description: 'Automate repetitive business processes and workflows',
              version: '1.0.0',
              category: 'automation',
              tags: ['automation', 'workflow', 'efficiency'],
              author: 'Permisoria Team',
              compatibility: { minVersion: '1.0.0' },
              status: 'active',
              lastUpdated: new Date()
            }
          ],
          confidence: 0.85,
          reasoning: 'Addresses efficiency and automation goals',
          category: 'automation',
          priority: 'high'
        });
      }
    }

    return modules;
  }

  private async getScalabilityModules(businessSize: string): Promise<ModuleDiscoveryResult[]> {
    const modules: ModuleDiscoveryResult[] = [];

    if (businessSize === 'small' || businessSize === 'medium') {
      modules.push({
        suggestedModules: [
          {
            id: 'hr-basics',
            name: 'HR Essentials',
            description: 'Basic HR management for growing businesses',
            version: '1.0.0',
            category: 'hr',
            tags: ['hr', 'employees', 'basic'],
            author: 'Permisoria Team',
            compatibility: { minVersion: '1.0.0' },
            status: 'active',
            lastUpdated: new Date()
          }
        ],
        confidence: 0.6,
        reasoning: 'Small to medium businesses benefit from basic HR tools',
        category: 'hr',
        priority: 'low'
      });
    }

    if (businessSize === 'large' || businessSize === 'enterprise') {
      modules.push({
        suggestedModules: [
          {
            id: 'enterprise-integration',
            name: 'Enterprise Integration Suite',
            description: 'Connect with enterprise systems and third-party services',
            version: '1.0.0',
            category: 'integration',
            tags: ['enterprise', 'integration', 'api'],
            author: 'Permisoria Team',
            compatibility: { minVersion: '1.0.0' },
            status: 'active',
            lastUpdated: new Date()
          }
        ],
        confidence: 0.8,
        reasoning: 'Large businesses need enterprise-grade integration capabilities',
        category: 'integration',
        priority: 'high'
      });
    }

    return modules;
  }

  private consolidateAndRankResults(results: ModuleDiscoveryResult[]): ModuleDiscoveryResult[] {
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

  async getRecommendationsForContext(businessContext: BusinessContext): Promise<string[]> {
    const results = await this.discoverModulesForBusiness(businessContext);
    
    return results
      .filter(result => result.priority === 'critical' || result.priority === 'high')
      .slice(0, 5)
      .map(result => result.reasoning);
  }
}
