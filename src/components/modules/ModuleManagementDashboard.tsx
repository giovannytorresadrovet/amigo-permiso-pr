
import { useState } from 'react';
import { useModuleContext } from '@/contexts/ModuleContext';
import { ModuleManagementHeader } from './dashboard/ModuleManagementHeader';
import { ModuleStatsCards } from './dashboard/ModuleStatsCards';
import { ModuleManagementTabs } from './dashboard/ModuleManagementTabs';
import { LoadingState } from './dashboard/LoadingState';
import { ErrorState } from './dashboard/ErrorState';

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

  if (isLoading) {
    return <LoadingState language={language} />;
  }

  if (error) {
    return <ErrorState language={language} error={error} onRetry={refreshModules} />;
  }

  const activeModulesCount = installedModules.filter(m => m.config.enabled).length;
  const totalInstalledCount = installedModules.length;
  const premiumFeaturesCount = userSubscription?.features.length || 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <ModuleManagementHeader 
        language={language} 
        userSubscription={userSubscription} 
      />

      <ModuleStatsCards
        language={language}
        activeModulesCount={activeModulesCount}
        totalInstalledCount={totalInstalledCount}
        premiumFeaturesCount={premiumFeaturesCount}
      />

      <ModuleManagementTabs
        language={language}
        activeTab={activeTab}
        onActiveTabChange={setActiveTab}
        onModuleRefresh={refreshModules}
        userSubscription={userSubscription}
      />
    </div>
  );
};
