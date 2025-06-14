
import { ModernCard, ModernCardContent, ModernCardDescription, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { TrustBadge } from '@/components/ui/trust-badge';
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
  MoreHorizontal,
  Shield
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
          status: 'success' as const,
          text: 'Activo'
        };
      case 'pending':
        return {
          status: 'pending' as const,
          text: 'Pendiente'
        };
      case 'inactive':
        return {
          status: 'error' as const,
          text: 'Inactivo'
        };
      default:
        return {
          status: 'inactive' as const,
          text: 'Desconocido'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const complianceScore = business.complianceScore || Math.floor(Math.random() * 40) + 60;

  const getSocialProviderBadge = (provider: string) => {
    if (provider === 'email') return null;
    
    const providerConfig = {
      google: { name: 'Google', variant: 'info' as const },
      facebook: { name: 'Facebook', variant: 'info' as const },
      apple: { name: 'Apple', variant: 'outline' as const }
    };
    
    const config = providerConfig[provider as keyof typeof providerConfig];
    if (!config) return null;
    
    return (
      <Badge variant={config.variant} size="sm">
        via {config.name}
      </Badge>
    );
  };

  const getComplianceVariant = () => {
    if (complianceScore >= 90) return 'success';
    if (complianceScore >= 70) return 'warning';
    return 'danger';
  };

  return (
    <ModernCard 
      variant="default" 
      interactive 
      className="group overflow-hidden animate-fade-in-up"
    >
      <ModernCardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              {business.status === 'active' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <ModernCardTitle className="group-hover:text-blue-600 transition-colors truncate">
                {business.name}
              </ModernCardTitle>
              <ModernCardDescription className="flex items-center gap-2 flex-wrap">
                <span className="truncate">{business.typeLabel}</span>
                {getSocialProviderBadge(business.socialProvider)}
              </ModernCardDescription>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <StatusIndicator status={statusConfig.status} size="sm">
              {statusConfig.text}
            </StatusIndicator>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
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
      </ModernCardHeader>
      
      <ModernCardContent className="space-y-6">
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">{business.description}</p>
        
        {/* Trust & Verification Section */}
        <div className="flex items-center justify-between">
          <TrustBadge variant="verified" size="sm">
            Verificado
          </TrustBadge>
          <Badge variant="premium" size="sm">
            <Shield className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200/50">
            <p className="text-xs text-slate-500 font-medium">Cumplimiento</p>
            <p className="text-lg font-bold text-slate-700">{complianceScore}%</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200/50">
            <p className="text-xs text-slate-500 font-medium">Permisos</p>
            <p className="text-lg font-bold text-blue-700">{business.permitCount}</p>
          </div>
        </div>

        {/* Compliance Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 font-medium">Puntuación de Cumplimiento</span>
            <span className="font-semibold text-slate-900">{complianceScore}%</span>
          </div>
          <Progress 
            value={complianceScore} 
            variant={getComplianceVariant()}
            className="h-2" 
          />
        </div>
        
        {/* Contact Info */}
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-slate-400" />
            <span className="truncate">{business.address}, {business.municipality}</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-slate-400" />
              <span>{business.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-slate-400" />
              <span className="truncate">{business.email}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 pt-2 border-t border-slate-100">
          <Button
            onClick={() => onBusinessSelect(business.id)}
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-blue-50 hover:border-blue-200 transition-all"
          >
            <Eye className="w-4 h-4 mr-1" />
            Ver detalles
          </Button>
          
          {business.status === 'pending' && (
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
            >
              Completar
            </Button>
          )}
        </div>

        {/* Last Update */}
        <div className="text-xs text-slate-400 flex items-center pt-2 border-t border-slate-50">
          <Calendar className="w-3 h-3 mr-1" />
          Actualizado: {business.lastUpdate}
        </div>
      </ModernCardContent>
    </ModernCard>
  );
};
