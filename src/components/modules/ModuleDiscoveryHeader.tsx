
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';

interface ModuleDiscoveryHeaderProps {
  language: 'es' | 'en';
  isLoading: boolean;
  hasBusinessContext: boolean;
  onRefresh: () => void;
  onBack?: () => void;
}

export const ModuleDiscoveryHeader = ({ 
  language, 
  isLoading, 
  hasBusinessContext, 
  onRefresh, 
  onBack 
}: ModuleDiscoveryHeaderProps) => {
  return (
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
        onClick={onRefresh}
        disabled={isLoading || !hasBusinessContext}
        className="flex items-center gap-2"
      >
        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        {language === 'es' ? 'Actualizar' : 'Refresh'}
      </Button>
    </div>
  );
};
