
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Users
} from 'lucide-react';

interface BusinessOverviewCardProps {
  business: {
    description: string;
    location: string;
    phone: string;
    email: string;
    website?: string;
    established: string;
    employees: number;
  };
}

export const BusinessOverviewCard = ({ business }: BusinessOverviewCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Información General</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-slate-700">{business.description}</p>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center text-sm text-slate-600">
              <MapPin className="w-4 h-4 mr-2" />
              {business.location}
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Phone className="w-4 h-4 mr-2" />
              {business.phone}
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Mail className="w-4 h-4 mr-2" />
              {business.email}
            </div>
          </div>
          <div className="space-y-3">
            {business.website && (
              <div className="flex items-center text-sm text-slate-600">
                <Globe className="w-4 h-4 mr-2" />
                {business.website}
              </div>
            )}
            <div className="flex items-center text-sm text-slate-600">
              <Calendar className="w-4 h-4 mr-2" />
              Establecido en {business.established}
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <Users className="w-4 h-4 mr-2" />
              {business.employees} empleados
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
