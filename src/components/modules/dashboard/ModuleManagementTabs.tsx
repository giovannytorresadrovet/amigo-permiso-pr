
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Store, Compass, CreditCard } from 'lucide-react';
import { ModuleManager } from '../ModuleManager';
import { ModuleStore } from '../ModuleStore';
import { ModuleDiscovery } from '../ModuleDiscovery';
import { SubscriptionTab } from './SubscriptionTab';

interface ModuleManagementTabsProps {
  language: 'es' | 'en';
  activeTab: string;
  onActiveTabChange: (tab: string) => void;
  onModuleRefresh: () => void;
  userSubscription?: any;
}

export const ModuleManagementTabs = ({ 
  language, 
  activeTab, 
  onActiveTabChange, 
  onModuleRefresh,
  userSubscription 
}: ModuleManagementTabsProps) => {
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

  return (
    <Tabs value={activeTab} onValueChange={onActiveTabChange}>
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
          onModuleUpdate={onModuleRefresh}
        />
      </TabsContent>

      <TabsContent value="store" className="mt-6">
        <ModuleStore 
          language={language}
          onModuleInstall={onModuleRefresh}
        />
      </TabsContent>

      <TabsContent value="discovery" className="mt-6">
        <ModuleDiscovery 
          language={language}
        />
      </TabsContent>

      <TabsContent value="subscription" className="mt-6">
        <SubscriptionTab 
          language={language}
          userSubscription={userSubscription}
        />
      </TabsContent>
    </Tabs>
  );
};
