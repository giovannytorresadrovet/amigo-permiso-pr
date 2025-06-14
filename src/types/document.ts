
export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'validated' | 'rejected';
  score?: number;
  issues?: string[];
}

export interface DocumentTranslations {
  title: string;
  subtitle: string;
  uploadArea: string;
  takePhoto: string;
  or: string;
  browse: string;
  pending: string;
  uploaded: string;
  validated: string;
  rejected: string;
  score: string;
  issues: string;
  required: string;
  optional: string;
  progress: string;
  complete: string;
  categories: {
    legal: string;
    business: string;
    zoning: string;
    tax: string;
    insurance: string;
  };
}
