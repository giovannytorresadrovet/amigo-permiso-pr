
import Dexie, { Table } from 'dexie';

export interface Business {
  id?: number;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    municipality: string;
  };
  businessType: string;
  permitStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id?: number;
  businessId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileData: ArrayBuffer;
  qualityScore?: number;
  issues?: string[];
  status: 'pending' | 'uploaded' | 'validated' | 'rejected';
  uploadedAt: Date;
}

export interface Permit {
  id?: number;
  businessId: number;
  category: string;
  name: string;
  status: 'required' | 'optional' | 'completed' | 'pending';
  description: string;
  estimatedCost?: number;
  processingTime?: string;
  requirements?: string[];
  createdAt: Date;
}

export interface AppSettings {
  id?: number;
  language: 'es' | 'en';
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  lastSync: Date;
}

export class PermitAppDB extends Dexie {
  businesses!: Table<Business>;
  documents!: Table<Document>;
  permits!: Table<Permit>;
  settings!: Table<AppSettings>;

  constructor() {
    super('PermitAppDB');
    this.version(1).stores({
      businesses: '++id, name, businessType, permitStatus, createdAt',
      documents: '++id, businessId, fileName, fileType, status, uploadedAt',
      permits: '++id, businessId, category, status, createdAt',
      settings: '++id, language, theme'
    });
  }
}

export const db = new PermitAppDB();

// Initialize default settings
db.settings.count().then(count => {
  if (count === 0) {
    db.settings.add({
      language: 'es',
      theme: 'dark',
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      lastSync: new Date()
    });
  }
});
