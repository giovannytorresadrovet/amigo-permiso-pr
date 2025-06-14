
import { ArrowLeft, Building, MapPin, Users, Calendar, Phone, Mail, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface BusinessDetailsProps {
  businessId: string;
  onBack: () => void;
}

const mockBusinessDetails = {
  '1': {
    id: '1',
    name: 'Café Luna',
    type: 'Restaurant',
    description: 'A cozy café serving authentic Puerto Rican coffee and local pastries in the heart of San Juan.',
    location: 'Calle Fortaleza 123, San Juan, PR 00901',
    employees: 12,
    established: '2020',
    status: 'Active' as const,
    permitCount: 8,
    phone: '+1 (787) 555-0123',
    email: 'info@cafeluna.pr',
    website: 'www.cafeluna.pr',
    owner: 'María González',
    taxId: 'PR-123456789',
    permits: [
      { name: 'Business License', status: 'Active', expires: '2024-12-31' },
      { name: 'Food Service Permit', status: 'Active', expires: '2024-06-30' },
      { name: 'Liquor License', status: 'Pending', expires: '2024-08-15' },
    ],
  },
  '2': {
    id: '2',
    name: 'TechFlow Solutions',
    type: 'Technology',
    description: 'Innovative software development company specializing in web and mobile applications.',
    location: 'Ave. Comerio 456, Bayamón, PR 00959',
    employees: 25,
    established: '2019',
    status: 'Active' as const,
    permitCount: 5,
    phone: '+1 (787) 555-0456',
    email: 'contact@techflow.pr',
    website: 'www.techflow.pr',
    owner: 'Carlos Rodríguez',
    taxId: 'PR-987654321',
    permits: [
      { name: 'Business License', status: 'Active', expires: '2024-12-31' },
      { name: 'Professional Services License', status: 'Active', expires: '2024-09-30' },
    ],
  },
  '3': {
    id: '3',
    name: 'Island Retail Store',
    type: 'Retail',
    description: 'Local retail store offering handmade crafts and souvenirs from Puerto Rican artisans.',
    location: 'Plaza del Mercado, Ponce, PR 00716',
    employees: 8,
    established: '2021',
    status: 'Pending' as const,
    permitCount: 3,
    phone: '+1 (787) 555-0789',
    email: 'hello@islandretail.pr',
    website: 'www.islandretail.pr',
    owner: 'Ana Martínez',
    taxId: 'PR-456789123',
    permits: [
      { name: 'Business License', status: 'Pending', expires: '2024-12-31' },
      { name: 'Retail Permit', status: 'Active', expires: '2024-10-31' },
    ],
  },
};

export const BusinessDetails = ({ businessId, onBack }: BusinessDetailsProps) => {
  const business = mockBusinessDetails[businessId as keyof typeof mockBusinessDetails];

  if (!business) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-600">Business not found</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Businesses
        </Button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Businesses
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-800">
                      {business.name}
                    </CardTitle>
                    <p className="text-slate-600">{business.type}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(business.status)}>
                  {business.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-slate-700">{business.description}</p>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {business.location}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Users className="w-4 h-4 mr-2" />
                  {business.employees} employees
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Established {business.established}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {business.phone}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {business.email}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Globe className="w-4 h-4 mr-2" />
                  {business.website}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Permits & Licenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {business.permits.map((permit, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{permit.name}</p>
                      <p className="text-sm text-slate-600">Expires: {permit.expires}</p>
                    </div>
                    <Badge className={getStatusColor(permit.status)}>
                      {permit.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Owner</p>
                <p className="font-medium text-slate-800">{business.owner}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Tax ID</p>
                <p className="font-medium text-slate-800">{business.taxId}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Permits</p>
                <p className="font-medium text-slate-800">{business.permitCount}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">Edit Business</Button>
              <Button className="w-full" variant="outline" size="sm">View All Permits</Button>
              <Button className="w-full" variant="outline" size="sm">Generate Reports</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
