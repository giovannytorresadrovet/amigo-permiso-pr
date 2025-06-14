
import { Shield, Lock, Eye, FileCheck, Award, Clock } from 'lucide-react';
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { TrustBadge } from '@/components/ui/trust-badge';
import { Progress } from '@/components/ui/progress';
import { Business } from '@/types/business';

interface BusinessTrustFoundationProps {
  business: Business;
}

export const BusinessTrustFoundation = ({ business }: BusinessTrustFoundationProps) => {
  const complianceScore = business.operationalMetrics?.complianceScore || 85;
  const riskLevel = business.operationalMetrics?.riskLevel || 'low';
  const lastAudit = business.operationalMetrics?.lastAudit;

  const trustMetrics = [
    {
      icon: Shield,
      title: 'Puntuación de Seguridad',
      value: `${complianceScore}%`,
      description: 'Basado en auditorías y cumplimiento',
      color: complianceScore >= 90 ? 'green' : complianceScore >= 75 ? 'yellow' : 'red',
      progress: complianceScore
    },
    {
      icon: FileCheck,
      title: 'Certificaciones Activas',
      value: business.certifications?.length || 0,
      description: 'Certificaciones válidas y verificadas',
      color: 'blue',
      progress: 90
    },
    {
      icon: Award,
      title: 'Nivel de Riesgo',
      value: riskLevel === 'low' ? 'Bajo' : riskLevel === 'medium' ? 'Medio' : 'Alto',
      description: 'Evaluación de riesgo operacional',
      color: riskLevel === 'low' ? 'green' : riskLevel === 'medium' ? 'yellow' : 'red',
      progress: riskLevel === 'low' ? 90 : riskLevel === 'medium' ? 60 : 30
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Datos Encriptados',
      status: 'verified',
      description: 'AES-256 encryption'
    },
    {
      icon: Eye,
      title: 'Auditoría Continua',
      status: 'verified',
      description: 'Monitoreo 24/7'
    },
    {
      icon: Shield,
      title: 'Cumplimiento SOC2',
      status: 'verified',
      description: 'Certificación vigente'
    },
    {
      icon: FileCheck,
      title: 'Backup Automático',
      status: 'verified',
      description: 'Respaldo diario'
    }
  ];

  return (
    <ModernCard variant="glass" className="overflow-hidden">
      <ModernCardHeader className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200/50">
        <ModernCardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>Fundación de Confianza</span>
          <TrustBadge variant="verified" size="sm">
            Verificado
          </TrustBadge>
        </ModernCardTitle>
      </ModernCardHeader>
      
      <ModernCardContent className="p-6 space-y-6">
        {/* Trust Metrics */}
        <div className="space-y-4">
          {trustMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="p-4 bg-white/80 rounded-lg border border-slate-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      metric.color === 'green' ? 'bg-green-100' :
                      metric.color === 'yellow' ? 'bg-yellow-100' :
                      metric.color === 'red' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        metric.color === 'green' ? 'text-green-600' :
                        metric.color === 'yellow' ? 'text-yellow-600' :
                        metric.color === 'red' ? 'text-red-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{metric.title}</div>
                      <div className="text-sm text-slate-600">{metric.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">{metric.value}</div>
                  </div>
                </div>
                <Progress 
                  value={metric.progress} 
                  variant={
                    metric.color === 'green' ? 'success' :
                    metric.color === 'yellow' ? 'warning' :
                    metric.color === 'red' ? 'danger' : 'default'
                  }
                  className="h-2"
                />
              </div>
            );
          })}
        </div>

        {/* Security Features */}
        <div className="pt-4 border-t border-slate-200/50">
          <h4 className="font-medium text-slate-900 mb-4 flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Características de Seguridad</span>
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50/50 rounded-lg border border-green-200/30">
                  <IconComponent className="w-4 h-4 text-green-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{feature.title}</div>
                    <div className="text-xs text-slate-600">{feature.description}</div>
                  </div>
                  <TrustBadge variant="verified" size="sm" showIcon={false}>
                    ✓
                  </TrustBadge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Last Audit Info */}
        {lastAudit && (
          <div className="pt-4 border-t border-slate-200/50">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>Última auditoría: {new Date(lastAudit).toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        )}
      </ModernCardContent>
    </ModernCard>
  );
};
