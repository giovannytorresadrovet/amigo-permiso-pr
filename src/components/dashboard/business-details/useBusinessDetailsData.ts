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
