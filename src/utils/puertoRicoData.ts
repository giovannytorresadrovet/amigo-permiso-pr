
// Puerto Rico specific data and validation utilities
export const municipalities = [
  'Adjuntas', 'Aguada', 'Aguadilla', 'Aguas Buenas', 'Aibonito', 'Arecibo',
  'Arroyo', 'Barceloneta', 'Barranquitas', 'Bayamón', 'Cabo Rojo', 'Caguas',
  'Camuy', 'Canóvanas', 'Carolina', 'Cataño', 'Cayey', 'Ceiba', 'Cidra',
  'Coamo', 'Comerío', 'Corozal', 'Culebra', 'Dorado', 'Fajardo', 'Florida',
  'Guánica', 'Guayama', 'Guayanilla', 'Guaynabo', 'Gurabo', 'Hatillo',
  'Hormigueros', 'Humacao', 'Isabela', 'Jayuya', 'Juana Díaz', 'Juncos',
  'Lajas', 'Lares', 'Las Marías', 'Las Piedras', 'Loíza', 'Luquillo',
  'Manatí', 'Maricao', 'Maunabo', 'Mayagüez', 'Moca', 'Morovis',
  'Naguabo', 'Naranjito', 'Orocovis', 'Patillas', 'Peñuelas', 'Ponce',
  'Quebradillas', 'Rincón', 'Río Grande', 'Sabana Grande', 'Salinas',
  'San Germán', 'San Juan', 'San Lorenzo', 'San Sebastián', 'Santa Isabel',
  'Toa Alta', 'Toa Baja', 'Trujillo Alto', 'Utuado', 'Vega Alta', 'Vega Baja',
  'Vieques', 'Villalba', 'Yabucoa', 'Yauco'
];

export const businessTypes = {
  restaurant: {
    es: 'Restaurante',
    en: 'Restaurant',
    industryFields: ['seatCapacity', 'kitchenType', 'alcoholServed']
  },
  salon: {
    es: 'Salón de Belleza',
    en: 'Beauty Salon',
    industryFields: ['stationCount', 'serviceTypes', 'chemicalServices']
  },
  barbershop: {
    es: 'Barbería',
    en: 'Barbershop',
    industryFields: ['chairCount', 'serviceTypes']
  },
  retail: {
    es: 'Comercio al Detal',
    en: 'Retail Store',
    industryFields: ['storeSize', 'productTypes']
  },
  services: {
    es: 'Servicios Profesionales',
    en: 'Professional Services',
    industryFields: ['serviceTypes', 'clientCapacity']
  },
  homeServices: {
    es: 'Servicios a Domicilio',
    en: 'Home Services',
    industryFields: ['serviceRadius', 'equipmentNeeded']
  },
  manufacturing: {
    es: 'Manufactura',
    en: 'Manufacturing',
    industryFields: ['facilitySize', 'productionType']
  },
  technology: {
    es: 'Tecnología',
    en: 'Technology',
    industryFields: ['serviceTypes', 'clientBase']
  },
  healthcare: {
    es: 'Servicios de Salud',
    en: 'Healthcare',
    industryFields: ['practiceType', 'patientCapacity']
  },
  education: {
    es: 'Educación',
    en: 'Education',
    industryFields: ['studentCapacity', 'educationType']
  },
  construction: {
    es: 'Construcción',
    en: 'Construction',
    industryFields: ['projectTypes', 'equipmentOwned']
  },
  transportation: {
    es: 'Transporte',
    en: 'Transportation',
    industryFields: ['vehicleCount', 'routeTypes']
  }
};

// CRIM number validation (Puerto Rico tax ID)
export const validateCRIM = (crim: string): boolean => {
  // CRIM format: XXX-XXX-XXX (9 digits with dashes)
  const crimRegex = /^\d{3}-\d{3}-\d{3}$/;
  return crimRegex.test(crim);
};

// Puerto Rico SSN validation
export const validatePRSSN = (ssn: string): boolean => {
  // Standard SSN format: XXX-XX-XXXX
  const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
  return ssnRegex.test(ssn);
};

// Phone number validation for Puerto Rico
export const validatePRPhone = (phone: string): boolean => {
  // PR phone: (787) XXX-XXXX or (939) XXX-XXXX
  const phoneRegex = /^\(?(787|939)\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
};

export const formatCRIM = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Format as XXX-XXX-XXX
  if (digits.length >= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}`;
  } else if (digits.length >= 4) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}`;
  } else if (digits.length >= 1) {
    return digits.slice(0, 3);
  }
  return digits;
};

export const formatPRPhone = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Format as (787) XXX-XXXX
  if (digits.length >= 8) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  } else if (digits.length >= 4) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}`;
  } else if (digits.length >= 1) {
    return `(${digits.slice(0, 3)}`;
  }
  return digits;
};
