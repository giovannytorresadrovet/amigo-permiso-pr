import { db } from '@/lib/db';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  verified: boolean;
  preferredLanguage: 'es' | 'en';
  municipality?: string;
}

export interface BusinessSummary {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'pending' | 'suspended';
  municipality: string;
  address: string;
  permitCount: number;
  documentsCount: number;
  completionPercentage: number;
  urgentActions: number;
  businessType?: string;
  industry?: string;
  employeeCount?: number;
  complianceRequirements?: string[];
}

export interface PermitInfo {
  id: string;
  businessId: string;
  name: string;
  category: string;
  status: 'required' | 'optional' | 'completed' | 'pending' | 'expired';
  expirationDate?: string;
  daysUntilExpiration?: number;
  cost?: number;
  description: string;
}

export interface DocumentInfo {
  id: string;
  businessId: string;
  fileName: string;
  type: string;
  status: 'pending' | 'uploaded' | 'validated' | 'rejected';
  qualityScore?: number;
  issues?: string[];
  uploadedAt: Date;
}

export class UserDataService {
  static async getUserProfile(): Promise<UserProfile | null> {
    // Mock user data - in real app this would come from Supabase/auth
    return {
      id: 'user-123',
      email: 'maria.gonzalez@email.com',
      firstName: 'María',
      lastName: 'González',
      phone: '787-555-0123',
      verified: true,
      preferredLanguage: 'es',
      municipality: 'Toa Baja'
    };
  }

  static async getUserBusinesses(): Promise<BusinessSummary[]> {
    try {
      const businesses = await db.businesses.toArray();
      return businesses.map(business => ({
        id: business.id?.toString() || '',
        name: business.name,
        type: business.businessType,
        status: business.permitStatus as 'active' | 'pending' | 'suspended',
        municipality: business.address.municipality,
        address: `${business.address.street}, ${business.address.city}`,
        permitCount: 0, // Will be calculated from permits
        documentsCount: 0, // Will be calculated from documents
        completionPercentage: 75, // Mock value
        urgentActions: 2 // Mock value
      }));
    } catch (error) {
      console.error('Error fetching businesses:', error);
      return [];
    }
  }

  static async getBusinessPermits(businessId?: string): Promise<PermitInfo[]> {
    try {
      const permits = businessId 
        ? await db.permits.where('businessId').equals(parseInt(businessId)).toArray()
        : await db.permits.toArray();
      
      return permits.map(permit => ({
        id: permit.id?.toString() || '',
        businessId: permit.businessId.toString(),
        name: permit.name,
        category: permit.category,
        status: permit.status,
        cost: permit.estimatedCost,
        description: permit.description,
        expirationDate: undefined, // Mock data doesn't have expiration
        daysUntilExpiration: undefined
      }));
    } catch (error) {
      console.error('Error fetching permits:', error);
      return [];
    }
  }

  static async getBusinessDocuments(businessId?: string): Promise<DocumentInfo[]> {
    try {
      const documents = businessId 
        ? await db.documents.where('businessId').equals(parseInt(businessId)).toArray()
        : await db.documents.toArray();
      
      return documents.map(doc => ({
        id: doc.id?.toString() || '',
        businessId: doc.businessId.toString(),
        fileName: doc.fileName,
        type: doc.fileType,
        status: doc.status,
        qualityScore: doc.qualityScore,
        issues: doc.issues,
        uploadedAt: doc.uploadedAt
      }));
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  }

  static async getUrgentActions(): Promise<Array<{
    businessId: string;
    businessName: string;
    action: string;
    priority: 'high' | 'medium' | 'low';
    dueDate?: string;
  }>> {
    // Mock urgent actions data
    return [
      {
        businessId: '1',
        businessName: 'Café Luna',
        action: 'Renovar Permiso de Salud',
        priority: 'high',
        dueDate: '2024-07-22'
      },
      {
        businessId: '2',
        businessName: 'TechFlow Solutions',
        action: 'Completar documentos faltantes',
        priority: 'medium',
        dueDate: '2024-08-15'
      }
    ];
  }

  static async getBusinessContext(businessId?: string): Promise<{
    name: string;
    type: string;
    municipality: string;
    status: string;
    permits: PermitInfo[];
    documents: DocumentInfo[];
  } | null> {
    const businesses = await this.getUserBusinesses();
    const business = businessId ? businesses.find(b => b.id === businessId) : businesses[0];
    
    if (!business) return null;

    const permits = await this.getBusinessPermits(businessId);
    const documents = await this.getBusinessDocuments(businessId);

    return {
      name: business.name,
      type: business.type,
      municipality: business.municipality,
      status: business.status,
      permits,
      documents
    };
  }
}
