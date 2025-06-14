
export interface PermisoUnicoApplication {
  id: string;
  businessId: string;
  applicationNumber?: string;
  status: PermisoUnicoStatus;
  submittedAt?: Date;
  lastUpdated: Date;
  businessInfo: PermisoUnicoBusinessInfo;
  documents: PermisoUnicoDocument[];
  inspectionInfo?: PermisoUnicoInspection;
  fees: PermisoUnicoFees;
  notes: string[];
  estimatedCompletionDate?: Date;
}

export interface PermisoUnicoBusinessInfo {
  businessName: string;
  dbaName?: string;
  businessType: string;
  crimNumber: string;
  taxId: string;
  municipality: string;
  address: string;
  urbanization?: string;
  zipCode: string;
  phone: string;
  email: string;
  description: string;
  operatingHours: OperatingHours;
  employeeCount: number;
  estimatedRevenue: string;
}

export interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface PermisoUnicoDocument {
  id: string;
  type: DocumentType;
  name: string;
  fileName: string;
  uploadedAt: Date;
  status: DocumentStatus;
  required: boolean;
  description: string;
  fileUrl?: string;
}

export interface PermisoUnicoInspection {
  id: string;
  scheduledDate?: Date;
  completedDate?: Date;
  inspectorId?: string;
  inspectorName?: string;
  status: InspectionStatus;
  checklist: InspectionItem[];
  notes: string;
  passed: boolean;
  deficiencies: string[];
}

export interface InspectionItem {
  id: string;
  category: string;
  description: string;
  status: 'pending' | 'passed' | 'failed' | 'not_applicable';
  notes?: string;
}

export interface PermisoUnicoFees {
  baseFee: number;
  additionalFees: FeeItem[];
  totalAmount: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentDate?: Date;
  receiptNumber?: string;
}

export interface FeeItem {
  description: string;
  amount: number;
  category: string;
}

export type PermisoUnicoStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'pending_documents'
  | 'inspection_scheduled'
  | 'inspection_completed'
  | 'pending_payment'
  | 'approved'
  | 'rejected'
  | 'expired';

export type DocumentType = 
  | 'incorporation_certificate'
  | 'tax_exempt_certificate'
  | 'crim_certificate'
  | 'municipal_license'
  | 'fire_department_permit'
  | 'health_permit'
  | 'environmental_permit'
  | 'zoning_certification'
  | 'building_plans'
  | 'insurance_certificate'
  | 'other';

export type DocumentStatus = 
  | 'pending'
  | 'uploaded'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'requires_update';

export type InspectionStatus = 
  | 'not_scheduled'
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'rescheduled'
  | 'cancelled';

export type PaymentStatus = 
  | 'pending'
  | 'partial'
  | 'paid'
  | 'refunded'
  | 'failed';

export interface PermisoUnicoRequirements {
  businessType: string;
  requiredDocuments: DocumentType[];
  estimatedProcessingTime: number; // days
  baseFee: number;
  requiresInspection: boolean;
  specificRequirements: string[];
}
