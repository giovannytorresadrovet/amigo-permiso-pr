
import { ModuleRegistry } from './moduleRegistry';
import { ModuleMetadata } from '@/types/module';

export const initializeSampleModules = () => {
  const registry = ModuleRegistry.getInstance();

  const sampleModules: ModuleMetadata[] = [
    {
      id: 'health-compliance',
      name: 'Health & Safety Compliance',
      description: 'Manage health permits, inspections, and food safety compliance for restaurants and food businesses',
      version: '1.2.0',
      category: 'compliance',
      tags: ['health', 'food-safety', 'inspections', 'restaurant'],
      author: 'Permisoria Team',
      icon: '🏥',
      pricing: { type: 'freemium', price: 29, currency: 'USD', billingPeriod: 'monthly' },
      compatibility: { minVersion: '1.0.0' },
      status: 'active',
      installCount: 1247,
      rating: 4.8,
      lastUpdated: new Date('2024-01-15')
    },
    {
      id: 'sales-tax-management',
      name: 'Sales Tax Compliance',
      description: 'Automated sales tax calculation, reporting, and compliance for retail businesses',
      version: '2.1.0',
      category: 'finance',
      tags: ['tax', 'sales', 'retail', 'compliance', 'automation'],
      author: 'Permisoria Team',
      icon: '💰',
      pricing: { type: 'paid', price: 49, currency: 'USD', billingPeriod: 'monthly' },
      compatibility: { minVersion: '1.0.0' },
      status: 'active',
      installCount: 892,
      rating: 4.6,
      lastUpdated: new Date('2024-01-10')
    },
    {
      id: 'environmental-compliance',
      name: 'Environmental Compliance Tracker',
      description: 'Monitor and manage environmental permits, EPA regulations, and sustainability reporting',
      version: '1.0.0',
      category: 'compliance',
      tags: ['environmental', 'epa', 'permits', 'sustainability'],
      author: 'Permisoria Team',
      icon: '🌱',
      pricing: { type: 'paid', price: 99, currency: 'USD', billingPeriod: 'monthly' },
      compatibility: { minVersion: '1.0.0' },
      status: 'active',
      installCount: 456,
      rating: 4.9,
      lastUpdated: new Date('2024-01-12')
    },
    {
      id: 'document-automation',
      name: 'Document Automation Suite',
      description: 'Automate document generation, e-signatures, and filing for streamlined paperwork',
      version: '3.0.0',
      category: 'automation',
      tags: ['documents', 'automation', 'e-signature', 'filing'],
      author: 'Permisoria Team',
      icon: '📄',
      pricing: { type: 'freemium', price: 19, currency: 'USD', billingPeriod: 'monthly' },
      compatibility: { minVersion: '1.0.0' },
      status: 'active',
      installCount: 2156,
      rating: 4.7,
      lastUpdated: new Date('2024-01-08')
    },
    {
      id: 'hr-essentials',
      name: 'HR Essentials',
      description: 'Basic HR management tools for growing businesses - employee records, compliance, and reporting',
      version: '1.5.0',
      category: 'hr',
      tags: ['hr', 'employees', 'compliance', 'payroll'],
      author: 'Permisoria Team',
      icon: '👥',
      pricing: { type: 'freemium', price: 39, currency: 'USD', billingPeriod: 'monthly' },
      compatibility: { minVersion: '1.0.0' },
      status: 'active',
      installCount: 1678,
      rating: 4.5,
      lastUpdated: new Date('2024-01-14')
    },
    {
      id: 'inventory-management',
      name: 'Smart Inventory Management',
      description: 'Track inventory, manage suppliers, monitor expiration dates, and optimize stock levels',
      version: '2.3.0',
      category: 'operations',
      tags: ['inventory', 'suppliers', 'stock', 'expiration'],
      author: 'Permisoria Team',
      icon: '📦',
      pricing: { type: 'paid', price: 59, currency: 'USD', billingPeriod: 'monthly' },
      compatibility: { minVersion: '1.0.0' },
      status: 'active',
      installCount: 1089,
      rating: 4.4,
      lastUpdated: new Date('2024-01-11')
    },
    {
      id: 'workflow-automation',
      name: 'Workflow Automation Engine',
      description: 'Create custom workflows to automate repetitive business processes and improve efficiency',
      version: '1.8.0',
      category: 'automation',
      tags: ['workflow', 'automation', 'efficiency', 'processes'],
      author: 'Permisoria Team',
      icon: '⚡',
      pricing: { type: 'paid', price: 79, currency: 'USD', billingPeriod: 'monthly' },
      compatibility: { minVersion: '1.0.0' },
      status: 'active',
      installCount: 734,
      rating: 4.8,
      lastUpdated: new Date('2024-01-13')
    },
    {
      id: 'business-analytics',
      name: 'Business Growth Analytics',
      description: 'Advanced analytics dashboard to track KPIs, identify trends, and make data-driven decisions',
      version: '2.0.0',
      category: 'analytics',
      tags: ['analytics', 'kpi', 'growth', 'reporting'],
      author: 'Permisoria Team',
      icon: '📊',
      pricing: { type: 'paid', price: 89, currency: 'USD', billingPeriod: 'monthly' },
      compatibility: { minVersion: '1.0.0' },
      status: 'active',
      installCount: 567,
      rating: 4.6,
      lastUpdated: new Date('2024-01-09')
    }
  ];

  // Register all sample modules
  sampleModules.forEach(module => {
    registry.registerAvailableModule(module);
  });

  console.log(`Initialized ${sampleModules.length} sample modules`);
};
