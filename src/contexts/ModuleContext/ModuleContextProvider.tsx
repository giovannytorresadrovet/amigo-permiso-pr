
import React, { useEffect, useState } from 'react';
import { ModuleInstance, ModuleMetadata } from '@/types/module';
import { UserSubscription } from '@/services/modules/stripeIntegrationService';
import { useUserContext } from '@/contexts/UserContextProvider';
import { ModuleContext } from './ModuleContext';
import { ModuleContextData, ModuleContextProviderProps } from './types';
import { SubscriptionService } from './subscriptionService';
import { ModuleLoadingService } from './moduleLoadingService';
import { ModuleOperationsService } from './moduleOperationsService';

export const ModuleContextProvider = ({ children }: ModuleContextProviderProps) => {
  const [installedModules, setInstalledModules] = useState<ModuleInstance[]>([]);
  const [availableModules, setAvailableModules] = useState<ModuleMetadata[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userProfile } = useUserContext();
  const moduleLoadingService = new ModuleLoadingService();
  const moduleOperationsService = new ModuleOperationsService();

  const loadUserSubscription = async () => {
    const subscription = await SubscriptionService.loadUserSubscription(userProfile);
    setUserSubscription(subscription);
  };

  const loadModules = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { installed, available } = await moduleLoadingService.loadModules(
        userSubscription,
        userProfile?.id
      );
      
      setInstalledModules(installed);
      setAvailableModules(available);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load modules';
      setError(errorMessage);
      console.error('Error loading modules:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshModules = async () => {
    await loadUserSubscription();
    await loadModules();
  };

  const installModule = async (moduleId: string): Promise<boolean> => {
    const result = await moduleOperationsService.installModule(moduleId, userProfile, userSubscription);
    if (result.error) {
      setError(result.error);
    }
    if (result.success) {
      await loadModules();
    }
    return result.success;
  };

  const uninstallModule = async (moduleId: string): Promise<boolean> => {
    const result = await moduleOperationsService.uninstallModule(moduleId);
    if (result.error) {
      setError(result.error);
    }
    if (result.success) {
      await loadModules();
    }
    return result.success;
  };

  const toggleModule = async (moduleId: string, enabled: boolean): Promise<boolean> => {
    const result = await moduleOperationsService.toggleModule(moduleId, enabled, userProfile, userSubscription);
    if (result.error) {
      setError(result.error);
    }
    if (result.success) {
      await loadModules();
    }
    return result.success;
  };

  const canAccessModule = async (moduleId: string) => {
    return moduleOperationsService.canAccessModule(moduleId, userSubscription);
  };

  useEffect(() => {
    if (userProfile) {
      loadUserSubscription();
    }
  }, [userProfile]);

  useEffect(() => {
    if (userSubscription !== null) {
      loadModules();
    }
  }, [userSubscription]);

  const contextValue: ModuleContextData = {
    installedModules,
    availableModules,
    userSubscription,
    isLoading,
    error,
    installModule,
    uninstallModule,
    toggleModule,
    canAccessModule,
    refreshModules
  };

  return (
    <ModuleContext.Provider value={contextValue}>
      {children}
    </ModuleContext.Provider>
  );
};
