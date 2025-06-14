
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useModuleContext } from '@/contexts/ModuleContext';
import { ModuleManager } from './ModuleManager';
import { ModuleStore } from './ModuleStore';
import { ModuleDiscovery } from './ModuleDiscovery';
import { Settings, Store, Compass, CreditCard, Shield } from 'lucide-react';

interface ModuleManagementDashboardProps {
  language: 'es' | 'en';
}

export const ModuleManagementDashboard = ({ language }: ModuleManagementDashboardProps) => {
  const [activeTab, setActiveTab] = useState('installed');
  const { 
    installedModules, 
    userSubscription, 
    isLoading, 
    error,
    refreshModules
  } = useModuleContext();

  const getSubscriptionBadgeColor = (tier: string | null) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'basic': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTabLabel = (tab: string) => {
    const labels = {
      es: {
        installed: 'Instalados',
        store: 'Tienda',
        discovery: 'Recomendados',
        subscription: 'Suscripción'
      },
      en: {
        installed: 'Installed',
        store: 'Store',
        discovery: 'Recommended',
        subscription: 'Subscription'
      }
    };
    return labels[language][tab as keyof typeof labels.es];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="text-red-600 mb-4">
            {language === 'es' ? 'Error al cargar módulos' : 'Error loading modules'}
          </div>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <Button onClick={refreshModules} variant="outline">
            {language === 'es' ? 'Reintentar' : 'Retry'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header with subscription info */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {language === 'es' ? 'Gestión de Módulos' : 'Module Management'}
          </h1>
          <p className="text-gray-600">
            {language === 'es' 
              ? 'Gestiona e instala módulos para tu plataforma'
              : 'Manage and install modules for your platform'
            }
          </p>
        </div>
        
        {userSubscription && (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Plan actual' : 'Current plan'}
              </div>
              <Badge className={getSubscriptionBadgeColor(userSubscription.tier)}>
                <Shield className="w-3 h-3 mr-1" />
                {userSubscription.tier?.toUpperCase() || 'FREE'}
              </Badge>
            </div>
            {userSubscription.expiresAt && (
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  {language === 'es' ? 'Expira' : 'Expires'}
                </div>
                <div className="text-sm font-medium">
                  {new Date(userSubscription.expiresAt).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Module stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {installedModules.filter(m => m.config.enabled).length}
                </div>
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
                <div className="text-2xl font-bold">{installedModules.length}</div>
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
                <div className="text-2xl font-bold">
                  {userSubscription?.features.length || 0}
                </div>
                <div className="text-sm text-gray-600">
                  {language === 'es' ? 'Funciones Premium' : 'Premium Features'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module management tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="installed" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {getTabLabel('installed')}
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Store className="w-4 h-4" />
            {getTabLabel('store')}
          </TabsTrigger>
          <TabsTrigger value="discovery" className="flex items-center gap-2">
            <Compass className="w-4 h-4" />
            {getTabLabel('discovery')}
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            {getTabLabel('subscription')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="installed" className="mt-6">
          <ModuleManager 
            language={language} 
            onModuleUpdate={refreshModules}
          />
        </TabsContent>

        <TabsContent value="store" className="mt-6">
          <ModuleStore 
            language={language}
            onModuleInstall={refreshModules}
          />
        </TabsContent>

        <TabsContent value="discovery" className="mt-6">
          <ModuleDiscovery 
            language={language}
          />
        </TabsContent>

        <TabsContent value="subscription" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'es' ? 'Gestión de Suscripción' : 'Subscription Management'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    {language === 'es' ? 'Plan Actual' : 'Current Plan'}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className={getSubscriptionBadgeColor(userSubscription?.tier)}>
                        {userSubscription?.tier?.toUpperCase() || 'FREE'}
                      </Badge>
                      {userSubscription?.isActive ? (
                        <div className="text-sm text-green-600 mt-1">
                          ✓ {language === 'es' ? 'Activa' : 'Active'}
                        </div>
                      ) : (
                        <div className="text-sm text-red-600 mt-1">
                          ⚠ {language === 'es' ? 'Inactiva' : 'Inactive'}
                        </div>
                      )}
                    </div>
                    <Button variant="outline">
                      {language === 'es' ? 'Gestionar Plan' : 'Manage Plan'}
                    </Button>
                  </div>
                </div>

                {userSubscription?.features && userSubscription.features.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3">
                      {language === 'es' ? 'Funciones Incluidas' : 'Included Features'}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {userSubscription.features.map(feature => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
