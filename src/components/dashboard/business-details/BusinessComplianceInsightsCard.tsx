
import { Shield, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { Business } from '@/types/business';

interface BusinessComplianceInsightsCardProps {
  business: Business;
}

export const BusinessComplianceInsightsCard = ({ business }: BusinessComplianceInsightsCardProps) => {
  const complianceInsights = [
    {
      category: 'Permisos Municipales',
      status: 'compliant',
      score: 95,
      items: [
        { name: 'Licencia de Negocio', status: 'active', nextAction: null },
        { name: 'Permiso de Uso', status: 'active', nextAction: null },
        { name: 'Certificado de Zonificación', status: 'pending', nextAction: 'Renovar antes del 30/06/2024' }
      ]
    },
    {
      category: 'Seguridad y Salud',
      status: 'warning',
      score: 78,
      items: [
        { name: 'Inspección de Bomberos', status: 'active', nextAction: null },
        { name: 'Certificado de Salud', status: 'expiring', nextAction: 'Renovar en 15 días' },
        { name: 'Plan de Emergencia', status: 'missing', nextAction: 'Crear y presentar plan' }
      ]
    },
    {
      category: 'Regulaciones Ambientales',
      status: 'compliant',
      score: 88,
      items: [
        { name: 'Manejo de Residuos', status: 'active', nextAction: null },
        { name: 'Emisiones', status: 'active', nextAction: null }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Shield className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getItemStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'expiring': return 'text-orange-600 bg-orange-50';
      case 'missing': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-blue-600 bg-blue-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const overallScore = Math.round(
    complianceInsights.reduce((sum, insight) => sum + insight.score, 0) / complianceInsights.length
  );

  return (
    <ModernCard variant="gradient">
      <ModernCardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <ModernCardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Insights de Cumplimiento</span>
          </div>
          <Badge className="bg-blue-100 text-blue-800 font-semibold">
            Score: {overallScore}%
          </Badge>
        </ModernCardTitle>
      </ModernCardHeader>
      <ModernCardContent className="space-y-6">
        {/* Overall Compliance Trend */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-medium text-slate-900">Tendencia General</span>
            </div>
            <Badge className="bg-green-100 text-green-800">+5% este mes</Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
              style={{ width: `${overallScore}%` }}
            />
          </div>
          <div className="text-xs text-slate-600 mt-2">
            Su empresa mantiene un excelente nivel de cumplimiento
          </div>
        </div>

        {/* Compliance Categories */}
        <div className="space-y-4">
          {complianceInsights.map((insight, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="p-4 bg-slate-50 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(insight.status)}
                    <h4 className="font-medium text-slate-900">{insight.category}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{insight.score}%</span>
                    <Badge variant="outline" className={getStatusColor(insight.status)}>
                      {insight.status === 'compliant' ? 'Cumpliendo' :
                       insight.status === 'warning' ? 'Atención' : 'Crítico'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {insight.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge size="sm" className={getItemStatusColor(item.status)}>
                        {item.status === 'active' ? 'Activo' :
                         item.status === 'expiring' ? 'Por Vencer' :
                         item.status === 'missing' ? 'Faltante' : 'Pendiente'}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {insight.items.some(item => item.nextAction) && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">Próximas Acciones:</h5>
                    {insight.items
                      .filter(item => item.nextAction)
                      .map((item, actionIndex) => (
                        <div key={actionIndex} className="text-sm text-blue-700">
                          • {item.nextAction}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ModernCardContent>
    </ModernCard>
  );
};
