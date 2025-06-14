
export interface ModuleMetadata {
  id: string;
  name: string;
  description: string;
  version: string;
  category: ModuleCategory;
  tags: string[];
  author: string;
  icon?: string;
  screenshots?: string[];
  dependencies?: string[];
  permissions?: ModulePermission[];
  pricing?: ModulePricing;
  compatibility: CompatibilityInfo;
  status: ModuleStatus;
  installCount?: number;
  rating?: number;
  lastUpdated: Date;
}

export interface ModuleConfig {
  enabled: boolean;
  settings: Record<string, any>;
  customizations?: Record<string, any>;
  permissions?: ModulePermission[];
}

export interface ModuleInstance {
  metadata: ModuleMetadata;
  config: ModuleConfig;
  component?: React.ComponentType<any>;
  hooks?: ModuleHooks;
  routes?: ModuleRoute[];
  services?: ModuleService[];
}

export interface ModuleHooks {
  onInstall?: () => Promise<void>;
  onUninstall?: () => Promise<void>;
  onEnable?: () => Promise<void>;
  onDisable?: () => Promise<void>;
  onConfigChange?: (config: ModuleConfig) => Promise<void>;
}

export interface ModuleRoute {
  path: string;
  component: React.ComponentType<any>;
  permissions?: string[];
  exact?: boolean;
}

export interface ModuleService {
  name: string;
  methods: Record<string, Function>;
  events?: Record<string, Function>;
}

export type ModuleCategory = 
  | 'core'
  | 'compliance'
  | 'finance'
  | 'hr'
  | 'operations'
  | 'analytics'
  | 'automation'
  | 'integration'
  | 'utility';

export type ModuleStatus = 
  | 'active'
  | 'inactive'
  | 'installing'
  | 'updating'
  | 'error'
  | 'deprecated';

export interface ModulePermission {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export interface ModulePricing {
  type: 'free' | 'paid' | 'freemium' | 'subscription';
  price?: number;
  currency?: string;
  billingPeriod?: 'monthly' | 'yearly' | 'one-time';
}

export interface CompatibilityInfo {
  minVersion: string;
  maxVersion?: string;
  requiredFeatures?: string[];
}

export interface ModuleDiscoveryResult {
  suggestedModules: ModuleMetadata[];
  confidence: number;
  reasoning: string;
  category: ModuleCategory;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface BusinessContext {
  id: string;
  name: string;
  type: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'enterprise';
  location: string;
  currentModules: string[];
  complianceRequirements: string[];
  painPoints: string[];
  goals: string[];
}
