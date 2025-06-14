
export interface MockBusiness {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  description: string;
  address: string;
  municipality: string;
  zipCode: string;
  phone: string;
  email: string;
  status: string;
  permitCount: number;
  lastUpdate: string;
  socialProvider: string;
  complianceScore: number;
}

export const mockBusinesses: MockBusiness[] = [
  {
    id: '1',
    name: 'Café Luna',
    type: 'restaurant',
    typeLabel: 'Restaurante',
    description: 'Café artesanal con ambiente acogedor en el corazón de Viejo San Juan. Especialidad en café puertorriqueño y repostería local.',
    address: 'Calle Fortaleza 123',
    municipality: 'San Juan',
    zipCode: '00901',
    phone: '(787) 555-0123',
    email: 'info@cafeluna.com',
    status: 'active',
    permitCount: 5,
    lastUpdate: '2024-01-15',
    socialProvider: 'google',
    complianceScore: 95
  },
  {
    id: '2',
    name: 'TechFlow Solutions',
    type: 'technology',
    typeLabel: 'Tecnología',
    description: 'Consultoría en tecnología para pequeñas empresas y startups. Desarrollo de software y soluciones digitales.',
    address: 'Av. Ashford 456',
    municipality: 'Guaynabo',
    zipCode: '00968',
    phone: '(787) 555-0456',
    email: 'contact@techflow.pr',
    status: 'pending',
    permitCount: 3,
    lastUpdate: '2024-01-10',
    socialProvider: 'facebook',
    complianceScore: 78
  },
  {
    id: '3',
    name: 'Panadería Doña Carmen',
    type: 'retail',
    typeLabel: 'Comercio',
    description: 'Panadería tradicional puertorriqueña con más de 30 años sirviendo la comunidad con productos frescos diarios.',
    address: 'Calle Principal 789',
    municipality: 'Bayamón',
    zipCode: '00961',
    phone: '(787) 555-0789',
    email: 'panaderia@carmen.pr',
    status: 'active',
    permitCount: 7,
    lastUpdate: '2024-01-18',
    socialProvider: 'email',
    complianceScore: 88
  },
  {
    id: '4',
    name: 'Eco Adventures PR',
    type: 'services',
    typeLabel: 'Servicios',
    description: 'Tours ecológicos y aventuras en la naturaleza de Puerto Rico. Experiencias únicas en contacto con el ambiente.',
    address: 'Carr. 191 Km 4.5',
    municipality: 'Rincón',
    zipCode: '00677',
    phone: '(787) 555-0321',
    email: 'adventures@ecopr.com',
    status: 'inactive',
    permitCount: 2,
    lastUpdate: '2024-01-05',
    socialProvider: 'apple',
    complianceScore: 45
  },
  {
    id: '5',
    name: 'Farmacia San Miguel',
    type: 'healthcare',
    typeLabel: 'Salud',
    description: 'Farmacia comunitaria con servicios de salud y consultas. Comprometidos con el bienestar de la comunidad.',
    address: 'Ave. Luis Muñoz Rivera 234',
    municipality: 'Caguas',
    zipCode: '00725',
    phone: '(787) 555-0654',
    email: 'farmacia@sanmiguel.pr',
    status: 'active',
    permitCount: 8,
    lastUpdate: '2024-01-20',
    socialProvider: 'google',
    complianceScore: 92
  }
];
