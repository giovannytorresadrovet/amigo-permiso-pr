
import { Card, CardContent } from '@/components/ui/card';

interface ModuleManagerEmptyStateProps {
  language: 'es' | 'en';
}

export const ModuleManagerEmptyState = ({ language }: ModuleManagerEmptyStateProps) => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <div className="text-slate-400 mb-2">
          {language === 'es' ? 'No hay módulos instalados' : 'No modules installed'}
        </div>
        <p className="text-sm text-slate-500">
          {language === 'es' 
            ? 'Visita la tienda de módulos para empezar'
            : 'Visit the module store to get started'
          }
        </p>
      </CardContent>
    </Card>
  );
};
