
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ModuleMetadata } from '@/types/module';
import { Download, Star, Users, Zap } from 'lucide-react';

interface ModuleStoreCardProps {
  module: ModuleMetadata;
  isInstalling: boolean;
  language: 'es' | 'en';
  onInstall: (moduleId: string) => void;
}

export const ModuleStoreCard = ({ 
  module, 
  isInstalling, 
  language, 
  onInstall 
}: ModuleStoreCardProps) => {
  const getCategoryLabel = (category: string) => {
    const labels = {
      es: {
        core: 'Esencial',
        compliance: 'Cumplimiento',
        finance: 'Finanzas',
        hr: 'Recursos Humanos',
        operations: 'Operaciones',
        analytics: 'Analíticas',
        automation: 'Automatización',
        integration: 'Integración',
        utility: 'Utilidades'
      },
      en: {
        core: 'Core',
        compliance: 'Compliance',
        finance: 'Finance',
        hr: 'HR',
        operations: 'Operations',
        analytics: 'Analytics',
        automation: 'Automation',
        integration: 'Integration',
        utility: 'Utility'
      }
    };
    return labels[language][category as keyof typeof labels.es] || category;
  };

  const getPricingDisplay = (module: ModuleMetadata) => {
    if (!module.pricing || module.pricing.type === 'free') {
      return language === 'es' ? 'Gratis' : 'Free';
    }
    if (module.pricing.type === 'freemium') {
      return language === 'es' ? 'Freemium' : 'Freemium';
    }
    return `$${module.pricing.price}${module.pricing.billingPeriod === 'monthly' ? '/mo' : '/yr'}`;
  };

  return (
    <Card className="hover:shadow-professional-lg transition-professional">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {module.icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">{module.icon}</span>
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{module.name}</CardTitle>
              <p className="text-sm text-slate-600">v{module.version}</p>
            </div>
          </div>
          <Badge variant="secondary">
            {getCategoryLabel(module.category)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-slate-600 line-clamp-2">
          {module.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {module.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {module.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{module.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-4">
            {module.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{module.rating.toFixed(1)}</span>
              </div>
            )}
            {module.installCount && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{module.installCount.toLocaleString()}</span>
              </div>
            )}
          </div>
          <div className="font-semibold text-blue-600">
            {getPricingDisplay(module)}
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => onInstall(module.id)}
          disabled={isInstalling}
        >
          {isInstalling ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-spin" />
              {language === 'es' ? 'Instalando...' : 'Installing...'}
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Instalar' : 'Install'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
