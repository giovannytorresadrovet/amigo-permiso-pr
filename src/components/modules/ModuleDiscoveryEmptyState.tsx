
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface ModuleDiscoveryEmptyStateProps {
  language: 'es' | 'en';
}

export const ModuleDiscoveryEmptyState = ({ language }: ModuleDiscoveryEmptyStateProps) => {
  return (
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
  );
};
