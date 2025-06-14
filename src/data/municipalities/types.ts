
export interface MunicipalService {
  id: string;
  name: string;
  description: string;
  cost: string;
  processingTime: string;
  onlineAvailable: boolean;
  requirements: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
}

export interface ZoningInfo {
  zone: string;
  allowedUses: string[];
  restrictions: string[];
  parkingRequirements: string;
  heightLimits: string;
  setbackRequirements: string;
  signageRestrictions: string[];
  specialRequirements: string[];
}

export interface Municipality {
  id: string;
  name: string;
  nameEn: string;
  region: string;
  population: number;
  area: string;
  mayorName: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  services: MunicipalService[];
  businessFriendly: boolean;
  digitalCapability: 'none' | 'basic' | 'advanced' | 'full';
  averagePermitTime: string;
  businessIncentives: string[];
  zoningInfo: ZoningInfo[];
  economicZones: string[];
  majorIndustries: string[];
}
