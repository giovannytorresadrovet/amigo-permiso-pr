
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, FileText, AlertTriangle } from 'lucide-react';
import { PermitRecommendation, PermitDiscoveryTranslations } from './types';

interface PermitRecommendationsSectionProps {
  recommendations: PermitRecommendation[];
  translations: PermitDiscoveryTranslations;
}

export const PermitRecommendationsSection = ({
  recommendations,
  translations: t
}: PermitRecommendationsSectionProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-400" />
          {t.recommendations}
        </CardTitle>
        <CardDescription className="text-slate-400">
          Basado en tu perfil de negocio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {recommendations.map((permit) => (
          <div key={permit.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-white">{permit.name}</h3>
              <Badge className={getPriorityColor(permit.priority)}>
                {t.priority[permit.priority]}
              </Badge>
            </div>
            
            <p className="text-slate-300 text-sm mb-4">{permit.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-400">{t.timeframe}</div>
                  <div className="text-sm text-white">{permit.timeframe}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <div>
                  <div className="text-xs text-slate-400">{t.cost}</div>
                  <div className="text-sm text-white">{permit.cost}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-1">{t.requirements}:</h4>
                <ul className="text-xs text-slate-400 space-y-1">
                  {permit.requirements.map((req, index) => (
                    <li key={index}>• {req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-red-300 mb-1 flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {t.risks}:
                </h4>
                <ul className="text-xs text-red-200 space-y-1">
                  {permit.risks.map((risk, index) => (
                    <li key={index}>• {risk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
