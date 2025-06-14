import { BusinessDetailsHeader } from './BusinessDetailsHeader';
import { BusinessMetricsCards } from './BusinessMetricsCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  DollarSign
} from 'lucide-react';

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
      { name: 'Business License', status: 'Active', expires: '2024-12-31', cost: '$250' },
      { name: 'Food Service Permit', status: 'Active', expires: '2024-06-30', cost: '$180' },
      { name: 'Liquor License', status: 'Pending', expires: '2024-08-15', cost: '$450' },
      { name: 'Fire Department Permit', status: 'Active', expires: '2024-09-30', cost: '$125' },
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
          Volver a Negocios
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

  const upcomingActions = [
    { action: 'Renovar Licencia de Negocio', dueDate: '2024-12-31', priority: 'medium' },
    { action: 'Inspección de Salud', dueDate: '2024-07-15', priority: 'high' },
    { action: 'Pago de Patente Municipal', dueDate: '2024-08-01', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      <BusinessDetailsHeader business={business} onBack={onBack} />
      
      <BusinessMetricsCards business={business} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business Overview */}
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
                  <div className="flex items-center text-sm text-slate-600">
                    <Globe className="w-4 h-4 mr-2" />
                    {business.website}
                  </div>
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

          {/* Permits & Licenses */}
          <Card>
            <CardHeader>
              <CardTitle>Permisos y Licencias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {business.permits.map((permit, index) => (
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
                        <p className="text-sm text-slate-500">Costo: {permit.cost}</p>
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Business Owner */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Propietario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Nombre</p>
                <p className="font-medium text-slate-800">{business.owner}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">ID Fiscal</p>
                <p className="font-medium text-slate-800">{business.taxId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximas Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingActions.map((action, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{action.action}</p>
                      <p className="text-xs text-slate-500">Fecha límite: {action.dueDate}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        action.priority === 'high' ? 'border-red-200 text-red-700' :
                        action.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                        'border-gray-200 text-gray-700'
                      }
                    >
                      {action.priority === 'high' ? 'Alta' : 
                       action.priority === 'medium' ? 'Media' : 'Baja'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Generar Reporte
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Programar Cita
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                <DollarSign className="w-4 h-4 mr-2" />
                Ver Costos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
