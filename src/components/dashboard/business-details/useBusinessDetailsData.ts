
import { Business } from '@/types/business';

const mockBusinessDetails: Record<string, Business> = {
  '1': {
    id: '1',
    name: 'Café Luna',
    type: 'Restaurant',
    description: 'A cozy café serving authentic Puerto Rican coffee and local pastries in the heart of San Juan.',
    location: 'Calle Fortaleza 123, San Juan, PR 00901',
    employees: 12,
    established: '2020',
    status: 'Active' as const,
    permitCount: 8,
    phone: '+1 (787) 555-0123',
    email: 'info@cafeluna.pr',
    website: 'www.cafeluna.pr',
    owner: 'María González',
    taxId: 'PR-123456789',
    permits: [
      { name: 'Business License', status: 'Active', expires: '2024-12-31', cost: '$250' },
      { name: 'Food Service Permit', status: 'Active', expires: '2024-06-30', cost: '$180' },
      { name: 'Liquor License', status: 'Pending', expires: '2024-08-15', cost: '$450' },
      { name: 'Fire Department Permit', status: 'Active', expires: '2024-09-30', cost: '$125' },
    ],
    operationalMetrics: {
      totalInvestment: 185000,
      annualRevenue: 95000,
      complianceScore: 94,
      riskLevel: 'low',
      lastAudit: '2024-02-15'
    },
    digitalProfile: {
      brandColors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6'
      },
      socialMedia: {
        facebook: 'facebook.com/cafeluna',
        linkedin: 'linkedin.com/company/cafeluna'
      }
    },
    certifications: [
      {
        name: 'Certificación de Seguridad Alimentaria',
        issuer: 'Departamento de Salud PR',
        expires: '2024-08-31',
        verified: true
      },
      {
        name: 'Certificación de Negocio Local',
        issuer: 'Gobierno de Puerto Rico',
        expires: '2024-12-31',
        verified: true
      }
    ],
    businessHours: {
      monday: { open: '7:00', close: '19:00' },
      tuesday: { open: '7:00', close: '19:00' },
      wednesday: { open: '7:00', close: '19:00' },
      thursday: { open: '7:00', close: '19:00' },
      friday: { open: '7:00', close: '21:00' },
      saturday: { open: '8:00', close: '21:00' },
      sunday: { open: '8:00', close: '18:00' }
    }
  },
  '2': {
    id: '2',
    name: 'TechFlow Solutions',
    type: 'Technology',
    description: 'Innovative software development company specializing in web and mobile applications.',
    location: 'Ave. Comerio 456, Bayamón, PR 00959',
    employees: 25,
    established: '2019',
    status: 'Active' as const,
    permitCount: 5,
    phone: '+1 (787) 555-0456',
    email: 'contact@techflow.pr',
    website: 'www.techflow.pr',
    owner: 'Carlos Rodríguez',
    taxId: 'PR-987654321',
    permits: [
      { name: 'Business License', status: 'Active', expires: '2024-12-31' },
      { name: 'Professional Services License', status: 'Active', expires: '2024-09-30' },
    ],
    operationalMetrics: {
      totalInvestment: 350000,
      annualRevenue: 425000,
      complianceScore: 88,
      riskLevel: 'low',
      lastAudit: '2024-01-20'
    },
    digitalProfile: {
      brandColors: {
        primary: '#10B981',
        secondary: '#3B82F6'
      },
      socialMedia: {
        linkedin: 'linkedin.com/company/techflow-solutions',
        twitter: 'twitter.com/techflow_pr'
      }
    },
    businessHours: {
      monday: { open: '9:00', close: '17:00' },
      tuesday: { open: '9:00', close: '17:00' },
      wednesday: { open: '9:00', close: '17:00' },
      thursday: { open: '9:00', close: '17:00' },
      friday: { open: '9:00', close: '17:00' }
    }
  },
  '3': {
    id: '3',
    name: 'Island Retail Store',
    type: 'Retail',
    description: 'Local retail store offering handmade crafts and souvenirs from Puerto Rican artisans.',
    location: 'Plaza del Mercado, Ponce, PR 00716',
    employees: 8,
    established: '2021',
    status: 'Pending' as const,
    permitCount: 3,
    phone: '+1 (787) 555-0789',
    email: 'hello@islandretail.pr',
    website: 'www.islandretail.pr',
    owner: 'Ana Martínez',
    taxId: 'PR-456789123',
    permits: [
      { name: 'Business License', status: 'Pending', expires: '2024-12-31' },
      { name: 'Retail Permit', status: 'Active', expires: '2024-10-31' },
    ],
    operationalMetrics: {
      totalInvestment: 85000,
      annualRevenue: 42000,
      complianceScore: 76,
      riskLevel: 'medium',
      lastAudit: '2024-03-01'
    },
    businessHours: {
      monday: { open: '10:00', close: '18:00' },
      tuesday: { open: '10:00', close: '18:00' },
      wednesday: { open: '10:00', close: '18:00' },
      thursday: { open: '10:00', close: '18:00' },
      friday: { open: '10:00', close: '20:00' },
      saturday: { open: '9:00', close: '20:00' },
      sunday: { open: '12:00', close: '17:00' }
    }
  },
};

export const useBusinessDetailsData = (businessId: string) => {
  const business = mockBusinessDetails[businessId];
  
  const upcomingActions = [
    { action: 'Renovar Licencia de Negocio', dueDate: '2024-12-31', priority: 'medium' as const },
    { action: 'Inspección de Salud', dueDate: '2024-07-15', priority: 'high' as const },
    { action: 'Pago de Patente Municipal', dueDate: '2024-08-01', priority: 'low' as const }
  ];

  return {
    business,
    upcomingActions
  };
};
