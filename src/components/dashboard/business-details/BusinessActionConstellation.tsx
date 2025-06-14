
import { FileText, Calendar, DollarSign, Settings, Download, Share2, Edit3, AlertTriangle } from 'lucide-react';
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { Button } from '@/components/ui/button';
import { Business } from '@/types/business';

interface BusinessActionConstellationProps {
  business: Business;
}

export const BusinessActionConstellation = ({ business }: BusinessActionConstellationProps) => {
  const primaryActions = [
    {
      icon: Edit3,
      label: 'Editar Información',
      description: 'Actualizar datos del negocio',
      variant: 'default' as const,
      priority: 'high'
    },
    {
      icon: FileText,
      label: 'Generar Reporte',
      description: 'Crear reporte de cumplimiento',
      variant: 'outline' as const,
      priority: 'high'
    },
    {
      icon: Calendar,
      label: 'Programar Cita',
      description: 'Agendar con inspector',
      variant: 'outline' as const,
      priority: 'medium'
    },
    {
      icon: DollarSign,
      label: 'Ver Costos',
      description: 'Revisar tarifas y pagos',
      variant: 'outline' as const,
      priority: 'medium'
    }
  ];

  const secondaryActions = [
    {
      icon: Download,
      label: 'Exportar Perfil',
      description: 'Descargar información completa'
    },
    {
      icon: Share2,
      label: 'Compartir',
      description: 'Enviar información a terceros'
    },
    {
      icon: Settings,
      label: 'Configuración',
      description: 'Ajustes avanzados'
    },
    {
      icon: AlertTriangle,
      label: 'Soporte',
      description: 'Obtener ayuda'
    }
  ];

  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span>Centro de Acciones</span>
        </ModernCardTitle>
      </ModernCardHeader>
      <ModernCardContent className="space-y-6">
        {/* Primary Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
          {primaryActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                variant={action.variant}
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center space-x-2 w-full">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium text-sm">{action.label}</span>
                </div>
                <span className="text-xs text-left text-slate-600 font-normal">
                  {action.description}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Secondary Actions */}
        <div className="pt-4 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2">
            {secondaryActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="justify-start h-auto p-3 hover:bg-slate-50"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{action.label}</div>
                    <div className="text-xs text-slate-500">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-slate-100">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="text-lg font-bold text-green-700">{business.permitCount}</div>
              <div className="text-xs text-green-600">Permisos Activos</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700">
                {business.operationalMetrics?.complianceScore || 85}%
              </div>
              <div className="text-xs text-blue-600">Cumplimiento</div>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
              <div className="text-lg font-bold text-purple-700">{business.employees}</div>
              <div className="text-xs text-purple-600">Empleados</div>
            </div>
          </div>
        </div>
      </ModernCardContent>
    </ModernCard>
  );
};
