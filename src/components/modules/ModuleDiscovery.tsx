
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ModuleDiscoveryResult, BusinessContext } from '@/types/module';
import { ModuleDiscoveryEngine } from '@/services/moduleDiscoveryEngine';
import { UserDataService } from '@/services/userDataService';
import { Lightbulb, TrendingUp, Shield, Zap, RefreshCw, Sparkles, ArrowLeft } from 'lucide-react';

interface ModuleDiscoveryProps {
  language: 'es' | 'en';
  onModuleSelect?: (moduleId: string) => void;
  onBack?: () => void;
}

export const ModuleDiscovery = ({ language, onModuleSelect, onBack }: ModuleDiscoveryProps) => {
  const [discoveryResults, setDiscoveryResults] = useState<ModuleDiscoveryResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [businessContext, setBusinessContext] = useState<BusinessContext | null>(null);

  const discoveryEngine = ModuleDiscoveryEngine.getInstance();

  useEffect(() => {
    loadBusinessContext();
  }, []);

  const loadBusinessContext = async () => {
    try {
      // In a real implementation, this would get the current business context
      const businesses = await UserDataService.getUserBusinesses();
      if (businesses.length > 0) {
        const business = businesses[0];
        const context: BusinessContext = {
          id: business.id,
          name: business.name,
          type: business.businessType || 'general',
          industry: business.industry || 'general',
          size: business.employeeCount > 50 ? 'large' : business.employeeCount > 10 ? 'medium' : 'small',
          location: business.municipality,
          currentModules: [], // Would be populated with installed modules
          complianceRequirements: business.complianceRequirements || [],
          painPoints: ['paperwork', 'communication'], // Would be collected from user input
          goals: ['growth', 'efficiency'] // Would be collected from user input
        };
        setBusinessContext(context);
        runDiscovery(context);
      }
    } catch (error) {
      console.error('Failed to load business context:', error);
    }
  };

  const runDiscovery = async (context?: BusinessContext) => {
    if (!context && !businessContext) return;
    
    setIsLoading(true);
    try {
      const results = await discoveryEngine.discoverModulesForBusiness(context || businessContext!);
      setDiscoveryResults(results);
    } catch (error) {
      console.error('Failed to run module discovery:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {language === 'es' ? 'Volver' : 'Back'}
            </Button>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">
                {language === 'es' ? 'Módulos Inteligentes' : 'Smart Modules'}
              </h2>
            </div>
            <p className="text-slate-600">
              {language === 'es' 
                ? 'Descubre módulos personalizados para optimizar tu negocio'
                : 'Discover personalized modules to optimize your business'
              }
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => runDiscovery()}
          disabled={isLoading || !businessContext}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {language === 'es' ? 'Actualizar' : 'Refresh'}
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">
            {language === 'es' ? 'Analizando tu negocio con IA...' : 'Analyzing your business with AI...'}
          </p>
        </div>
      ) : discoveryResults.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <div className="text-slate-400 mb-2">
              {language === 'es' ? 'No hay recomendaciones disponibles' : 'No recommendations available'}
            </div>
            <p className="text-sm text-slate-500">
              {language === 'es' 
                ? 'Completa tu perfil de negocio para obtener recomendaciones personalizadas'
                : 'Complete your business profile to get personalized recommendations'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {discoveryResults.map((result, index) => (
            <Card key={index} className="hover:shadow-professional-lg transition-professional border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getPriorityIcon(result.priority)}
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {result.suggestedModules[0].name}
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
                  {result.suggestedModules[0].description}
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
                  {result.suggestedModules[0].tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    onClick={() => onModuleSelect?.(result.suggestedModules[0].id)}
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
          ))}
        </div>
      )}
    </div>
  );
};
