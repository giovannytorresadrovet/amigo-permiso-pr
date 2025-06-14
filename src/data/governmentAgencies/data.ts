
import { GovernmentAgency, PermitRequirement } from './types';

export const governmentAgenciesData: GovernmentAgency[] = [
  {
    id: 'hacienda',
    name: 'Departamento de Hacienda',
    nameEn: 'Department of Treasury',
    acronym: 'DH',
    type: 'state',
    description: 'Administra los impuestos y licencias comerciales del estado',
    descriptionEn: 'Administers state taxes and commercial licenses',
    website: 'https://www.hacienda.pr.gov',
    phone: '787-721-2020',
    email: 'info@hacienda.pr.gov',
    address: 'Centro Gubernamental Minillas, San Juan, PR',
    operatingHours: 'Lunes a Viernes: 7:30 AM - 4:30 PM',
    languages: ['español', 'english'],
    onlineServices: true,
    digitalCapability: 'advanced',
    services: [
      {
        id: 'registro-comerciante',
        name: 'Registro de Comerciante',
        description: 'Registro obligatorio para operar un negocio en Puerto Rico',
        requiredFor: ['todos los negocios'],
        estimatedTime: '5-10 días laborables',
        cost: '$25 - $150 (según tipo de negocio)',
        onlineAvailable: true,
        requirements: [
          'Formulario de Solicitud (Forma SC 2885)',
          'Identificación con foto',
          'Número de Seguro Social o ITIN',
          'Pago de derechos'
        ],
        applicationProcess: [
          'Completar formulario SC 2885',
          'Adjuntar documentos requeridos',
          'Realizar pago',
          'Enviar solicitud',
          'Recibir certificado'
        ],
        contactInfo: {
          phone: '787-721-2020',
          email: 'registro@hacienda.pr.gov',
          website: 'https://suri.hacienda.pr.gov'
        }
      }
    ]
  },
  {
    id: 'estado',
    name: 'Departamento de Estado',
    nameEn: 'Department of State',
    acronym: 'DE',
    type: 'state',
    description: 'Registra corporaciones y entidades comerciales',
    descriptionEn: 'Registers corporations and commercial entities',
    website: 'https://www.estado.pr.gov',
    phone: '787-722-2121',
    email: 'info@estado.pr.gov',
    address: 'Fortaleza 154, San Juan, PR 00901',
    operatingHours: 'Lunes a Viernes: 8:00 AM - 4:30 PM',
    languages: ['español', 'english'],
    onlineServices: true,
    digitalCapability: 'advanced',
    services: [
      {
        id: 'certificado-incorporacion',
        name: 'Certificado de Incorporación',
        description: 'Registro legal de corporaciones',
        requiredFor: ['corporaciones', 'LLC'],
        estimatedTime: '3-5 días laborables',
        cost: '$25 - $100',
        onlineAvailable: true,
        requirements: [
          'Artículos de Incorporación',
          'Agente Residente',
          'Pago de derechos'
        ],
        applicationProcess: [
          'Reservar nombre corporativo',
          'Preparar artículos de incorporación',
          'Designar agente residente',
          'Radicar documentos',
          'Pagar derechos'
        ],
        contactInfo: {
          phone: '787-722-2121',
          website: 'https://www.estado.pr.gov'
        }
      }
    ]
  },
  {
    id: 'arpe',
    name: 'Administración de Reglamentos y Permisos',
    nameEn: 'Administration of Regulations and Permits',
    acronym: 'ARPE',
    type: 'autonomous',
    description: 'Evalúa y expide permisos de construcción y uso',
    descriptionEn: 'Evaluates and issues construction and use permits',
    website: 'https://www.arpe.pr.gov',
    phone: '787-999-2200',
    email: 'info@arpe.pr.gov',
    address: 'Centro Gubernamental Roberto Sánchez Vilella, San Juan',
    operatingHours: 'Lunes a Viernes: 7:30 AM - 4:30 PM',
    languages: ['español', 'english'],
    onlineServices: true,
    digitalCapability: 'full',
    services: [
      {
        id: 'permiso-uso',
        name: 'Permiso de Uso',
        description: 'Autorización para operar un negocio en una ubicación específica',
        requiredFor: ['negocios con ubicación física'],
        estimatedTime: '30-60 días',
        cost: '$50 - $500',
        onlineAvailable: true,
        requirements: [
          'Solicitud de Permiso de Uso',
          'Planos de ubicación',
          'Certificación de zonificación',
          'Evidencia de cumplimiento con códigos'
        ],
        applicationProcess: [
          'Consulta previa de zonificación',
          'Solicitud de permiso',
          'Evaluación técnica',
          'Inspección (si aplica)',
          'Expedición del permiso'
        ],
        contactInfo: {
          phone: '787-999-2200',
          website: 'https://www.arpe.pr.gov'
        }
      }
    ]
  }
];

export const permitRequirementsData: PermitRequirement[] = [
  {
    permitId: 'registro-comerciante',
    permitName: 'Registro de Comerciante',
    agency: 'Departamento de Hacienda',
    businessTypes: ['all'],
    municipality: ['all'],
    required: true,
    estimatedCost: '$25-150',
    processingTime: '5-10 días laborables',
    renewalPeriod: 'Anual',
    dependencies: [],
    documents: ['Forma SC 2885', 'Identificación', 'SSN/ITIN'],
    inspectionRequired: false
  },
  {
    permitId: 'permiso-uso',
    permitName: 'Permiso de Uso',
    agency: 'ARPE',
    businessTypes: ['restaurant', 'retail', 'salon', 'barbershop'],
    municipality: ['all'],
    required: true,
    estimatedCost: '$50-500',
    processingTime: '30-60 días',
    renewalPeriod: '5 años',
    dependencies: ['registro-comerciante'],
    documents: ['Planos', 'Certificación zonificación'],
    inspectionRequired: true
  },
  {
    permitId: 'licencia-salud',
    permitName: 'Licencia Sanitaria',
    agency: 'Departamento de Salud',
    businessTypes: ['restaurant', 'salon', 'barbershop'],
    municipality: ['all'],
    required: true,
    estimatedCost: '$25-100',
    processingTime: '15-30 días',
    renewalPeriod: 'Anual',
    dependencies: ['permiso-uso'],
    documents: ['Certificado sanitario', 'Planos de instalaciones'],
    inspectionRequired: true
  }
];

export const getAgenciesByMunicipality = (municipality: string): GovernmentAgency[] => {
  return governmentAgenciesData.filter(agency => 
    !agency.municipalities || agency.municipalities.includes(municipality) || agency.municipalities.includes('all')
  );
};

export const searchAgencies = (query: string): GovernmentAgency[] => {
  const searchTerm = query.toLowerCase();
  return governmentAgenciesData.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm) ||
    agency.nameEn.toLowerCase().includes(searchTerm) ||
    agency.description.toLowerCase().includes(searchTerm) ||
    agency.services.some(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm)
    )
  );
};

export const getPermitRequirements = (businessType: string, municipality: string): PermitRequirement[] => {
  return permitRequirementsData.filter(permit =>
    (permit.businessTypes.includes(businessType) || permit.businessTypes.includes('all')) &&
    (permit.municipality.includes(municipality) || permit.municipality.includes('all'))
  );
};
