
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ModuleDiscoveryResult } from '@/types/module';
import { Lightbulb, TrendingUp, Shield, Zap, Sparkles } from 'lucide-react';

interface ModuleRecommendationCardProps {
  result: ModuleDiscoveryResult;
  language: 'es' | 'en';
  onModuleSelect?: (moduleId: string) => void;
}

export const ModuleRecommendationCard = ({ 
  result, 
  language, 
  onModuleSelect 
}: ModuleRecommendationCardProps) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <Shield className="w-4 h-4 text-red-500" />;
      case 'high':
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case 'medium':
        return <Zap className="w-4 h-4 text-blue-500" />;
      default:
        return <Lightbulb className="w-4 h-4 text-slate-500" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      es: {
        critical: 'Crítico',
        high: 'Alto',
        medium: 'Medio',
        low: 'Bajo'
      },
      en: {
        critical: 'Critical',
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      }
    };
    return labels[language][priority as keyof typeof labels.es] || priority;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-50 border-green-200';
    if (confidence >= 0.6) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  const module = result.suggestedModules[0];

  return (
    <Card className="hover:shadow-professional-lg transition-professional border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getPriorityIcon(result.priority)}
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {module.name}
                <Sparkles className="w-4 h-4 text-blue-500" />
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                <Badge variant="outline">
                  {getPriorityLabel(result.priority)}
                </Badge>
                <Badge className={getConfidenceColor(result.confidence)}>
                  {Math.round(result.confidence * 100)}% {language === 'es' ? 'confianza' : 'confidence'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600">
          {module.description}
        </p>

        <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-blue-900 mb-1">
                {language === 'es' ? '¿Por qué lo recomendamos?' : 'Why we recommend this:'}
              </div>
              <p className="text-sm text-blue-800">
                {result.reasoning}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {module.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={() => onModuleSelect?.(module.id)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <TrendingUp className="w-4 h-4" />
            {language === 'es' ? 'Ver Detalles' : 'View Details'}
          </Button>
          <Button variant="outline" size="sm">
            {language === 'es' ? 'Más Tarde' : 'Later'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
