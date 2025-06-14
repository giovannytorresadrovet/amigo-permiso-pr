
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
}
