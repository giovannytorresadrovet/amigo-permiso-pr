
import { Building, MapPin, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Business {
  id: string;
  name: string;
  type: string;
  location: string;
  employees: number;
  established: string;
  status: 'Active' | 'Pending' | 'Inactive';
  permitCount: number;
}

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Café Luna',
    type: 'Restaurant',
    location: 'San Juan, PR',
    employees: 12,
    established: '2020',
    status: 'Active',
    permitCount: 8,
  },
  {
    id: '2',
    name: 'TechFlow Solutions',
    type: 'Technology',
    location: 'Bayamón, PR',
    employees: 25,
    established: '2019',
    status: 'Active',
    permitCount: 5,
  },
  {
    id: '3',
    name: 'Island Retail Store',
    type: 'Retail',
    location: 'Ponce, PR',
    employees: 8,
    established: '2021',
    status: 'Pending',
    permitCount: 3,
  },
];

interface BusinessListProps {
  onBusinessSelect: (businessId: string) => void;
}

export const BusinessList = ({ onBusinessSelect }: BusinessListProps) => {
  const getStatusColor = (status: Business['status']) => {
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">My Businesses</h2>
        <Button>Add New Business</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBusinesses.map((business) => (
          <Card key={business.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-800">
                      {business.name}
                    </CardTitle>
                    <p className="text-sm text-slate-500">{business.type}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(business.status)}>
                  {business.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
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
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-sm text-slate-600">
                  {business.permitCount} permits
                </span>
                <Button 
                  size="sm" 
                  onClick={() => onBusinessSelect(business.id)}
                  className="text-sm"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
