
import { Municipality, ZoningInfo } from './types';

export const municipalitiesData: Municipality[] = [
  {
    id: 'san-juan',
    name: 'San Juan',
    nameEn: 'San Juan',
    region: 'Área Metropolitana',
    population: 342259,
    area: '199.2 km²',
    mayorName: 'Miguel Romero',
    website: 'https://www.sanjuan.gov.pr',
    phone: '787-480-2020',
    email: 'info@sanjuan.gov.pr',
    address: 'Alcaldía de San Juan, Plaza de Armas',
    businessFriendly: true,
    digitalCapability: 'full',
    averagePermitTime: '45-60 días',
    businessIncentives: [
      'Exención contributiva hasta 90%',
      'Facilidades de financiamiento',
      'Zona de Oportunidad',
      'Incentivos para startups'
    ],
    economicZones: ['Zona Histórica', 'Distrito Central de Negocios', 'Zona de Oportunidad'],
    majorIndustries: ['Turismo', 'Servicios Financieros', 'Tecnología', 'Manufactura'],
    services: [
      {
        id: 'licencia-municipal',
        name: 'Licencia Municipal',
        description: 'Autorización municipal para operar negocio',
        cost: '$25-200',
        processingTime: '15-30 días',
        onlineAvailable: true,
        requirements: [
          'Solicitud de licencia',
          'Registro de comerciante',
          'Certificado de incorporación (si aplica)',
          'Plano de ubicación'
        ],
        contactInfo: {
          phone: '787-480-2020',
          email: 'licencias@sanjuan.gov.pr',
          website: 'https://www.sanjuan.gov.pr/licencias'
        }
      }
    ],
    zoningInfo: [
      {
        zone: 'C-1 Comercial Local',
        allowedUses: ['Comercio al detal', 'Oficinas', 'Servicios personales'],
        restrictions: ['No industrias pesadas', 'Límite de ruido 65dB'],
        parkingRequirements: '1 espacio por cada 300 pies²',
        heightLimits: '3 pisos máximo',
        setbackRequirements: 'Frontal: 10 pies, Lateral: 5 pies',
        signageRestrictions: ['Máximo 2 letreros', 'Área máxima 32 pies²'],
        specialRequirements: ['Certificación de zonificación obligatoria']
      }
    ]
  },
  {
    id: 'bayamon',
    name: 'Bayamón',
    nameEn: 'Bayamón',
    region: 'Área Metropolitana',
    population: 185187,
    area: '117.5 km²',
    mayorName: 'Ramón Luis Rivera Jr.',
    website: 'https://www.bayamon.gov.pr',
    phone: '787-780-5080',
    email: 'alcalde@bayamon.gov.pr',
    address: 'Alcaldía de Bayamón, Plaza Pública',
    businessFriendly: true,
    digitalCapability: 'advanced',
    averagePermitTime: '30-45 días',
    businessIncentives: [
      'Programa de incentivos industriales',
      'Facilidades para PYMES',
      'Zona de desarrollo económico'
    ],
    economicZones: ['Parque Industrial', 'Centro Urbano'],
    majorIndustries: ['Manufactura', 'Comercio', 'Servicios'],
    services: [
      {
        id: 'patente-municipal',
        name: 'Patente Municipal',
        description: 'Licencia para operar negocio en Bayamón',
        cost: '$15-150',
        processingTime: '10-20 días',
        onlineAvailable: true,
        requirements: [
          'Planilla de solicitud',
          'Registro de comerciante',
          'Comprobante de dirección'
        ],
        contactInfo: {
          phone: '787-780-5080',
          website: 'https://www.bayamon.gov.pr'
        }
      }
    ],
    zoningInfo: [
      {
        zone: 'I-1 Industrial Liviano',
        allowedUses: ['Manufactura liviana', 'Almacenes', 'Distribución'],
        restrictions: ['Emisiones controladas', 'Horario 6AM-10PM'],
        parkingRequirements: '1 espacio por cada 500 pies²',
        heightLimits: '40 pies máximo',
        setbackRequirements: 'Frontal: 25 pies, Lateral: 15 pies',
        signageRestrictions: ['Letrero identificativo únicamente'],
        specialRequirements: ['Estudio de impacto ambiental']
      }
    ]
  },
  {
    id: 'toa-baja',
    name: 'Toa Baja',
    nameEn: 'Toa Baja',
    region: 'Área Metropolitana',
    population: 89609,
    area: '63.1 km²',
    mayorName: 'Bernardo Márquez García',
    website: 'https://www.toabaja.gov.pr',
    phone: '787-261-2025',
    email: 'info@toabaja.gov.pr',
    address: 'Alcaldía de Toa Baja, Plaza Pública',
    businessFriendly: true,
    digitalCapability: 'basic',
    averagePermitTime: '20-35 días',
    businessIncentives: [
      'Reducción en patentes municipales',
      'Facilidades de pago',
      'Apoyo a empresas locales'
    ],
    economicZones: ['Centro Urbano', 'Zona Costera'],
    majorIndustries: ['Servicios', 'Comercio', 'Turismo'],
    services: [
      {
        id: 'licencia-negocio',
        name: 'Licencia de Negocio',
        description: 'Autorización para operar en Toa Baja',
        cost: '$20-100',
        processingTime: '15-25 días',
        onlineAvailable: false,
        requirements: [
          'Formulario municipal',
          'Copia de registro mercantil',
          'Identificación del solicitante'
        ],
        contactInfo: {
          phone: '787-261-2025'
        }
      }
    ],
    zoningInfo: [
      {
        zone: 'R-3 Residencial Múltiple',
        allowedUses: ['Viviendas multifamiliares', 'Servicios de vecindario'],
        restrictions: ['Densidad máxima 20 unidades/acre'],
        parkingRequirements: '2 espacios por unidad',
        heightLimits: '35 pies máximo',
        setbackRequirements: 'Frontal: 15 pies, Lateral: 8 pies',
        signageRestrictions: ['Solo letreros identificativos'],
        specialRequirements: ['Áreas verdes obligatorias']
      }
    ]
  }
];

export const getMunicipalityById = (id: string): Municipality | undefined => {
  return municipalitiesData.find(municipality => municipality.id === id);
};

export const searchMunicipalities = (query: string): Municipality[] => {
  const searchTerm = query.toLowerCase();
  return municipalitiesData.filter(municipality =>
    municipality.name.toLowerCase().includes(searchTerm) ||
    municipality.nameEn.toLowerCase().includes(searchTerm) ||
    municipality.region.toLowerCase().includes(searchTerm)
  );
};

export const getZoningInfo = (municipalityId: string, businessType: string): ZoningInfo[] => {
  const municipality = getMunicipalityById(municipalityId);
  if (!municipality) return [];
  
  return municipality.zoningInfo.filter(zone => {
    const businessTypeMapping: Record<string, string[]> = {
      'restaurant': ['Comercio al detal', 'Servicios de vecindario'],
      'retail': ['Comercio al detal'],
      'salon': ['Servicios personales', 'Servicios de vecindario'],
      'barbershop': ['Servicios personales', 'Servicios de vecindario'],
      'manufacturing': ['Manufactura liviana', 'Manufactura'],
      'technology': ['Oficinas', 'Servicios profesionales']
    };
    
    const allowedForBusiness = businessTypeMapping[businessType] || [];
    return zone.allowedUses.some(use => 
      allowedForBusiness.some(allowed => use.includes(allowed))
    );
  });
};
