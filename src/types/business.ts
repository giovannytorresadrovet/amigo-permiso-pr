
export interface Business {
  id: string;
  name: string;
  type: string;
  typeLabel?: string;
  description: string;
  location: string;
  address?: string;
  municipality?: string;
  zipCode?: string;
  employees: number;
  established: string;
  status: 'Active' | 'Pending' | 'Inactive' | 'active' | 'pending' | 'inactive';
  permitCount: number;
  phone: string;
  email: string;
  website?: string;
  owner: string;
  taxId: string;
  lastUpdate?: string;
  socialProvider?: string;
  revenue?: number;
  employeeCount?: number;
  nextRenewal?: string;
  complianceScore?: number;
  permits: Array<{
    name: string;
    status: string;
    expires: string;
    cost?: string;
  }>;
  // Enhanced fields for Digital Enterprise Identity
  operationalMetrics?: {
    totalInvestment: number;
    annualRevenue: number;
    complianceScore: number;
    riskLevel: 'low' | 'medium' | 'high';
    lastAudit?: string;
  };
  digitalProfile?: {
    logoUrl?: string;
    brandColors?: {
      primary: string;
      secondary: string;
    };
    socialMedia?: {
      linkedin?: string;
      facebook?: string;
      twitter?: string;
    };
  };
  certifications?: Array<{
    name: string;
    issuer: string;
    expires: string;
    verified: boolean;
  }>;
  businessHours?: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday?: { open: string; close: string };
    sunday?: { open: string; close: string };
  };
}

// Simplified interface for list views
export interface BusinessSummary {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  status: string;
  permitCount: number;
  complianceScore?: number;
  lastUpdate: string;
}

// Interface for business creation
export interface BusinessFormData {
  name: string;
  businessType: string;
  description: string;
  address: any;
  employees: string;
  revenue: string;
  zoningInfo?: any;
}
