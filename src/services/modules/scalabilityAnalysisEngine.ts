
import { ModuleDiscoveryResult } from '@/types/module';

export class ScalabilityAnalysisEngine {
  static async getScalabilityModules(businessSize: string): Promise<ModuleDiscoveryResult[]> {
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
}
