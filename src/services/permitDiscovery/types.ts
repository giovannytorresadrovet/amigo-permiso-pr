
export interface BusinessProfile {
  name: string;
  businessType: string;
  description: string;
  municipality: string;
  address?: string;
  employees: number;
  revenue: string;
  hasPhysicalLocation: boolean;
  servesFood: boolean;
  handlesChemicals: boolean;
  operatesLateHours: boolean;
}

export interface PermitDiscoveryResult {
  requiredPermits: DiscoveredPermit[];
  potentialIssues: ComplianceIssue[];
  recommendations: string[];
  estimatedTimeline: string;
  estimatedCost: string;
  criticalPath: string[];
}

export interface DiscoveredPermit {
  id: string;
  name: string;
  agency: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  required: boolean;
  estimatedCost: string;
  processingTime: string;
  dependencies: string[];
  description: string;
  applicationSteps: string[];
  documents: string[];
  inspectionRequired: boolean;
}

export interface ComplianceIssue {
  type: 'zoning' | 'regulatory' | 'safety' | 'environmental';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  solution: string;
  estimatedCost?: string;
  timeToResolve?: string;
}
