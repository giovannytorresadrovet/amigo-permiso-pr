
import { TrendingUp, DollarSign, Shield, AlertTriangle } from 'lucide-react';
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { Business } from '@/types/business';

interface BusinessOperationalMetricsCardProps {
  business: Business;
}

export const BusinessOperationalMetricsCard = ({ business }: BusinessOperationalMetricsCardProps) => {
  // Default metrics if not provided
  const metrics = business.operationalMetrics || {
    totalInvestment: 150000,
    annualRevenue: 85000,
    complianceScore: 92,
    riskLevel: 'low' as const,
    lastAudit: '2024-03-15'
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-700 bg-green-100';
      case 'medium': return 'text-yellow-700 bg-yellow-100';
      case 'high': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-700 bg-green-100';
    if (score >= 75) return 'text-yellow-700 bg-yellow-100';
    return 'text-red-700 bg-red-100';
  };

  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>Métricas Operacionales</span>
        </ModernCardTitle>
      </ModernCardHeader>
      <ModernCardContent className="space-y-6">
        {/* Financial Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Inversión Total</span>
            </div>
            <div className="text-2xl font-bold text-green-900">
              ${metrics.totalInvestment.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Ingresos Anuales</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">
              ${metrics.annualRevenue.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Compliance Score */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-slate-600" />
              <span className="font-medium text-slate-900">Puntuación de Cumplimiento</span>
            </div>
            <Badge className={getComplianceColor(metrics.complianceScore)}>
              {metrics.complianceScore}%
            </Badge>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                metrics.complianceScore >= 90 ? 'bg-green-500' :
                metrics.complianceScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${metrics.complianceScore}%` }}
            />
          </div>
          
          <div className="text-xs text-slate-600">
            {metrics.complianceScore >= 90 ? 'Excelente cumplimiento' :
             metrics.complianceScore >= 75 ? 'Buen cumplimiento' : 'Requiere atención'}
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-slate-900">Nivel de Riesgo</span>
            </div>
            <Badge className={getRiskColor(metrics.riskLevel)}>
              {metrics.riskLevel === 'low' ? 'Bajo' :
               metrics.riskLevel === 'medium' ? 'Medio' : 'Alto'}
            </Badge>
          </div>
          
          {metrics.lastAudit && (
            <div className="text-xs text-slate-600">
              Última auditoría: {new Date(metrics.lastAudit).toLocaleDateString('es-ES')}
            </div>
          )}
        </div>

        {/* Business Health Indicator */}
        <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
          <div className="text-lg font-semibold text-indigo-900 mb-1">
            Estado General del Negocio
          </div>
          <Badge variant="outline" className="bg-white text-indigo-700 border-indigo-300">
            {metrics.complianceScore >= 90 && metrics.riskLevel === 'low' ? 'Óptimo' :
             metrics.complianceScore >= 75 ? 'Saludable' : 'Requiere Atención'}
          </Badge>
        </div>
      </ModernCardContent>
    </ModernCard>
  );
};
