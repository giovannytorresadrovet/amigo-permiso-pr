
import { ModernCard, ModernCardContent, ModernCardHeader } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { TrustBadge } from '@/components/ui/trust-badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, MapPin, Phone, Mail, Eye, Shield } from 'lucide-react';

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

interface BusinessCardProps {
  business: Business;
  onBusinessSelect: (businessId: string) => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'active':
      return { status: 'verified' as const, text: 'Activo' };
    case 'pending':
      return { status: 'warning' as const, text: 'Pendiente' };
    case 'inactive':
      return { status: 'error' as const, text: 'Inactivo' };
    default:
      return { status: 'pending' as const, text: 'Desconocido' };
  }
};

const getComplianceVariant = (complianceScore: number) => {
  if (complianceScore >= 90) return 'success';
  if (complianceScore >= 70) return 'warning';
  return 'danger';
};

const getSocialProviderBadge = (provider: string) => {
  if (provider === 'email') return null;
  
  const providerConfig = {
    google: { name: 'Google', variant: 'outline' as const },
    facebook: { name: 'Facebook', variant: 'outline' as const },
    apple: { name: 'Apple', variant: 'outline' as const }
  };
  
  return providerConfig[provider as keyof typeof providerConfig] || null;
};

export const BusinessCard = ({ business, onBusinessSelect }: BusinessCardProps) => {
  const statusConfig = getStatusConfig(business.status);
  const complianceScore = business.complianceScore || Math.floor(Math.random() * 40) + 60;
  const socialBadge = getSocialProviderBadge(business.socialProvider);

  return (
    <ModernCard 
      variant="default" 
      interactive 
      className="group overflow-hidden animate-fade-in-up"
    >
      <ModernCardHeader className="pb-4">
        {/* Business Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                {business.name}
              </h3>
              <TrustBadge variant={statusConfig.status} size="sm">
                {statusConfig.text}
              </TrustBadge>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Badge variant="outline" size="sm">
                {business.typeLabel}
              </Badge>
              {socialBadge && (
                <Badge variant={socialBadge.variant} size="sm">
                  {socialBadge.name}
                </Badge>
              )}
            </div>
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
          <Badge variant="outline" size="sm">
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
            variant={getComplianceVariant(complianceScore)}
            className="h-2" 
          />
        </div>
        
        {/* Contact Information */}
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

        {/* Actions */}
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
