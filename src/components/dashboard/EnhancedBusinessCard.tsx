
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Eye, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  MoreHorizontal
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Business {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  description: string;
  address: string;
  municipality: string;
  zipCode: string;
  phone: string;
  email: string;
  status: string;
  permitCount: number;
  lastUpdate: string;
  socialProvider: string;
  revenue?: number;
  employeeCount?: number;
  nextRenewal?: string;
  complianceScore?: number;
}

interface EnhancedBusinessCardProps {
  business: Business;
  onBusinessSelect: (businessId: string) => void;
}

export const EnhancedBusinessCard = ({ business, onBusinessSelect }: EnhancedBusinessCardProps) => {
  const getStatusConfig = () => {
    switch (business.status) {
      case 'active':
        return {
          icon: CheckCircle,
          color: 'bg-green-100 text-green-800 border-green-200',
          text: 'Activo'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          text: 'Pendiente'
        };
      case 'inactive':
        return {
          icon: AlertTriangle,
          color: 'bg-red-100 text-red-800 border-red-200',
          text: 'Inactivo'
        };
      default:
        return {
          icon: Clock,
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          text: 'Desconocido'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;
  const complianceScore = business.complianceScore || Math.floor(Math.random() * 40) + 60;

  const getSocialProviderBadge = (provider: string) => {
    if (provider === 'email') return null;
    
    const providerConfig = {
      google: { name: 'Google', color: 'bg-blue-100 text-blue-800' },
      facebook: { name: 'Facebook', color: 'bg-blue-100 text-blue-800' },
      apple: { name: 'Apple', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = providerConfig[provider as keyof typeof providerConfig];
    if (!config) return null;
    
    return (
      <Badge variant="outline" className={`text-xs ${config.color}`}>
        via {config.name}
      </Badge>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {business.name}
              </CardTitle>
              <CardDescription className="text-sm flex items-center space-x-2">
                <span>{business.typeLabel}</span>
                {getSocialProviderBadge(business.socialProvider)}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <Badge className={statusConfig.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig.text}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem>Editar información</DropdownMenuItem>
                <DropdownMenuItem>Generar reporte</DropdownMenuItem>
                <DropdownMenuItem>Exportar datos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600 line-clamp-2">{business.description}</p>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-slate-500">Puntuación</p>
            <p className="text-lg font-semibold text-slate-700">{complianceScore}%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-500">Permisos</p>
            <p className="text-lg font-semibold text-slate-700">{business.permitCount}</p>
          </div>
        </div>

        {/* Compliance Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Cumplimiento</span>
            <span className="font-medium">{complianceScore}%</span>
          </div>
          <Progress value={complianceScore} className="h-2" />
        </div>
        
        {/* Contact Info */}
        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{business.address}, {business.municipality}</span>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{business.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{business.email}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 pt-3 border-t">
          <Button
            onClick={() => onBusinessSelect(business.id)}
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-blue-50"
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver detalles
          </Button>
          
          {business.status === 'pending' && (
            <Button
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Completar
            </Button>
          )}
        </div>

        {/* Last Update */}
        <div className="text-xs text-slate-400 flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          Actualizado: {business.lastUpdate}
        </div>
      </CardContent>
    </Card>
  );
};
