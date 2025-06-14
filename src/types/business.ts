
export interface Business {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  employees: number;
  established: string;
  status: 'Active' | 'Pending' | 'Inactive';
  permitCount: number;
  phone: string;
  email: string;
  website: string;
  owner: string;
  taxId: string;
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
