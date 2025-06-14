
import { Card, CardContent } from '@/components/ui/card';
import { Settings, Store, Compass } from 'lucide-react';

interface ModuleStatsCardsProps {
  language: 'es' | 'en';
  activeModulesCount: number;
  totalInstalledCount: number;
  premiumFeaturesCount: number;
}

export const ModuleStatsCards = ({ 
  language, 
  activeModulesCount, 
  totalInstalledCount, 
  premiumFeaturesCount 
}: ModuleStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{activeModulesCount}</div>
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Módulos Activos' : 'Active Modules'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Store className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold">{totalInstalledCount}</div>
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Total Instalados' : 'Total Installed'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Compass className="w-8 h-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold">{premiumFeaturesCount}</div>
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Funciones Premium' : 'Premium Features'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
