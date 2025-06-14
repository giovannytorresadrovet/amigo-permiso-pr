
export interface AgencyService {
  id: string;
  name: string;
  description: string;
  requiredFor: string[];
  estimatedTime: string;
  cost: string;
  onlineAvailable: boolean;
  requirements: string[];
  applicationProcess: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
}

export interface PermitRequirement {
  permitId: string;
  permitName: string;
  agency: string;
  businessTypes: string[];
  municipality: string[];
  required: boolean;
  estimatedCost: string;
  processingTime: string;
  renewalPeriod: string;
  dependencies: string[];
  documents: string[];
  inspectionRequired: boolean;
}

export interface GovernmentAgency {
  id: string;
  name: string;
  nameEn: string;
  acronym: string;
  type: 'federal' | 'state' | 'municipal' | 'autonomous';
  description: string;
  descriptionEn: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  services: AgencyService[];
  operatingHours: string;
  languages: string[];
  onlineServices: boolean;
  municipalities?: string[];
  digitalCapability: 'none' | 'basic' | 'advanced' | 'full';
}
