
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

interface Permit {
  name: string;
  status: string;
  expires: string;
  cost?: string;
}

interface BusinessPermitsCardProps {
  permits: Permit[];
}

export const BusinessPermitsCard = ({ permits }: BusinessPermitsCardProps) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Permisos y Licencias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {permits.map((permit, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(permit.status)}`}>
                  {permit.status === 'Active' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : permit.status === 'Pending' ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{permit.name}</p>
                  <p className="text-sm text-slate-600">Vence: {permit.expires}</p>
                  {permit.cost && (
                    <p className="text-sm text-slate-500">Costo: {permit.cost}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(permit.status)}>
                  {permit.status}
                </Badge>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-1" />
                  Ver
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
