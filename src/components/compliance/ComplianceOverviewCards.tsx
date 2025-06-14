
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { type ComplianceStatus } from '@/lib/compliance/complianceManager';

interface ComplianceOverviewCardsProps {
  complianceStatus: ComplianceStatus;
  language: 'es' | 'en';
}

export const ComplianceOverviewCards = ({ complianceStatus, language }: ComplianceOverviewCardsProps) => {
  const getMaturityBadge = (tier: string) => {
    const colors = {
      tier1: 'bg-red-500/20 text-red-300',
      tier2: 'bg-yellow-500/20 text-yellow-300', 
      tier3: 'bg-blue-500/20 text-blue-300',
      tier4: 'bg-green-500/20 text-green-300'
    };
    return colors[tier as keyof typeof colors] || colors.tier1;
  };

  const getStatusColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm font-medium">
            {language === 'es' ? 'NIST Cybersecurity' : 'NIST Cybersecurity'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">
                {complianceStatus.nist.implementationPercentage}%
              </span>
              <Badge className={getMaturityBadge(complianceStatus.nist.overallMaturity)}>
                {complianceStatus.nist.overallMaturity.toUpperCase()}
              </Badge>
            </div>
            <Progress 
              value={complianceStatus.nist.implementationPercentage} 
              className="h-2"
            />
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <AlertTriangle className="w-4 h-4" />
              <span>
                {complianceStatus.nist.criticalFindings} {' '}
                {language === 'es' ? 'hallazgos críticos' : 'critical findings'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm font-medium">
            {language === 'es' ? 'SOC2 Preparación' : 'SOC2 Readiness'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getStatusColor(complianceStatus.soc2.readinessScore)}`}>
                {complianceStatus.soc2.readinessScore}%
              </span>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <Progress 
              value={complianceStatus.soc2.readinessScore} 
              className="h-2"
            />
            <div className="text-sm text-slate-400">
              {complianceStatus.soc2.implementedControls}/{complianceStatus.soc2.totalControls} {' '}
              {language === 'es' ? 'controles implementados' : 'controls implemented'}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-sm font-medium">
            {language === 'es' ? 'Puntuación General' : 'Overall Score'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${getStatusColor(complianceStatus.overall.complianceScore)}`}>
                {complianceStatus.overall.complianceScore}%
              </span>
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <Progress 
              value={complianceStatus.overall.complianceScore} 
              className="h-2"
            />
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Calendar className="w-4 h-4" />
              <span>
                {language === 'es' ? 'Próxima evaluación:' : 'Next assessment:'} {' '}
                {complianceStatus.overall.nextAssessmentDue.toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
