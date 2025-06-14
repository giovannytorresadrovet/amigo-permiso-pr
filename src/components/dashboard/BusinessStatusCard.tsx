
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, Building, FileText, Calendar } from 'lucide-react';
import { getTranslation } from '@/utils/translations';

interface BusinessStatusCardProps {
  business: {
    id: string;
    name: string;
    legalStatus: 'legal' | 'in_process' | 'illegal' | 'expiring_soon';
    permitType: string;
    expirationDate?: string;
    completionPercentage: number;
    daysUntilExpiration?: number;
  };
  language: 'es' | 'en';
  onViewDetails: (businessId: string) => void;
  onRenewPermit: (businessId: string) => void;
}

export const BusinessStatusCard = ({ 
  business, 
  language, 
  onViewDetails, 
  onRenewPermit 
}: BusinessStatusCardProps) => {
  const t = (key: string) => getTranslation(key, language);

  const getStatusConfig = () => {
    switch (business.legalStatus) {
      case 'legal':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          label: language === 'es' ? 'Legal' : 'Legal',
          description: language === 'es' ? 'Todos los permisos están al día' : 'All permits are up to date'
        };
      case 'expiring_soon':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          label: language === 'es' ? 'Expira Pronto' : 'Expiring Soon',
          description: language === 'es' ? 'Renovación requerida pronto' : 'Renewal required soon'
        };
      case 'in_process':
        return {
          icon: Clock,
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/30',
          label: language === 'es' ? 'En Proceso' : 'In Process',
          description: language === 'es' ? 'Esperando aprobación' : 'Awaiting approval'
        };
      case 'illegal':
        return {
          icon: AlertTriangle,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          label: language === 'es' ? 'Ilegal' : 'Illegal',
          description: language === 'es' ? 'Acción inmediata requerida' : 'Immediate action required'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          label: language === 'es' ? 'Desconocido' : 'Unknown',
          description: language === 'es' ? 'Estado no determinado' : 'Status not determined'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const IconComponent = statusConfig.icon;

  const getUrgencyMessage = () => {
    if (!business.daysUntilExpiration) return null;

    if (business.daysUntilExpiration <= 1) {
      return {
        text: language === 'es' ? '¡Expira hoy!' : 'Expires today!',
        color: 'text-red-500'
      };
    } else if (business.daysUntilExpiration <= 7) {
      return {
        text: language === 'es' ? `Expira en ${business.daysUntilExpiration} días` : `Expires in ${business.daysUntilExpiration} days`,
        color: 'text-red-400'
      };
    } else if (business.daysUntilExpiration <= 14) {
      return {
        text: language === 'es' ? `Expira en ${business.daysUntilExpiration} días` : `Expires in ${business.daysUntilExpiration} days`,
        color: 'text-yellow-400'
      };
    } else if (business.daysUntilExpiration <= 30) {
      return {
        text: language === 'es' ? `Expira en ${business.daysUntilExpiration} días` : `Expires in ${business.daysUntilExpiration} days`,
        color: 'text-blue-400'
      };
    }
    return null;
  };

  const urgencyMessage = getUrgencyMessage();

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
              <Building className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-slate-800 mb-1">
                {business.name}
              </CardTitle>
              <p className="text-sm text-slate-600">{business.permitType}</p>
            </div>
          </div>
          
          <Badge className={`${statusConfig.bgColor} ${statusConfig.color} border-0`}>
            <IconComponent className="w-3 h-3 mr-1" />
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">
              {language === 'es' ? 'Progreso de Cumplimiento' : 'Compliance Progress'}
            </span>
            <span className="font-medium">{business.completionPercentage}%</span>
          </div>
          <Progress value={business.completionPercentage} className="h-2" />
          <p className="text-xs text-slate-500">{statusConfig.description}</p>
        </div>

        {urgencyMessage && (
          <div className={`flex items-center space-x-2 p-2 bg-white/50 rounded-lg`}>
            <Calendar className={`w-4 h-4 ${urgencyMessage.color}`} />
            <span className={`text-sm font-medium ${urgencyMessage.color}`}>
              {urgencyMessage.text}
            </span>
          </div>
        )}

        {business.expirationDate && (
          <div className="text-xs text-slate-500">
            {language === 'es' ? 'Vence el:' : 'Expires on:'} {business.expirationDate}
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(business.id)}
            className="flex-1"
          >
            <FileText className="w-4 h-4 mr-1" />
            {language === 'es' ? 'Ver Detalles' : 'View Details'}
          </Button>
          
          {(business.legalStatus === 'expiring_soon' || business.legalStatus === 'illegal') && (
            <Button 
              size="sm" 
              onClick={() => onRenewPermit(business.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {language === 'es' ? 'Renovar' : 'Renew'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
