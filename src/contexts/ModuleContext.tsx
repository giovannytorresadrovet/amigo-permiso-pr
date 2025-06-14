
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ModuleRegistry } from '@/services/moduleRegistry';
import { StripeIntegrationService, UserSubscription } from '@/services/modules/stripeIntegrationService';
import { ModuleInstance, ModuleMetadata } from '@/types/module';
import { useUserContext } from './UserContextProvider';
import { AuditLogger } from '@/lib/security';

interface ModuleContextData {
  installedModules: ModuleInstance[];
  availableModules: ModuleMetadata[];
  userSubscription: UserSubscription | null;
  isLoading: boolean;
  error: string | null;
  installModule: (moduleId: string) => Promise<boolean>;
  uninstallModule: (moduleId: string) => Promise<boolean>;
  toggleModule: (moduleId: string, enabled: boolean) => Promise<boolean>;
  canAccessModule: (moduleId: string) => Promise<{ canAccess: boolean; reason?: string; upgradeRequired?: string }>;
  refreshModules: () => Promise<void>;
}

const ModuleContext = createContext<ModuleContextData | null>(null);

interface ModuleContextProviderProps {
  children: ReactNode;
}

export const ModuleContextProvider = ({ children }: ModuleContextProviderProps) => {
  const [installedModules, setInstalledModules] = useState<ModuleInstance[]>([]);
  const [availableModules, setAvailableModules] = useState<ModuleMetadata[]>([]);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userProfile } = useUserContext();
  const registry = ModuleRegistry.getInstance();
  const stripeService = StripeIntegrationService.getInstance();

  const loadUserSubscription = async () => {
    if (!userProfile) {
      setUserSubscription(null);
      return;
    }

    try {
      // Mock user subscription - in real implementation, this would come from Stripe/Supabase
      const mockSubscription: UserSubscription = {
        isActive: true,
        tier: 'premium',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        features: ['advanced-reporting', 'custom-dashboards', 'ai-recommendations']
      };
      
      setUserSubscription(mockSubscription);
    } catch (err) {
      console.error('Failed to load user subscription:', err);
      setUserSubscription({ isActive: false, tier: null, features: [] });
    }
  };

  const loadModules = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const installed = registry.getInstalledModules();
      setInstalledModules(installed);

      if (userSubscription) {
        const available = await stripeService.getAvailableModules(userSubscription);
        setAvailableModules(available);
      } else {
        setAvailableModules(registry.getAvailableModules());
      }

      AuditLogger.log({
        action: 'modules_loaded',
        userId: userProfile?.id || 'anonymous',
        details: { 
          installedCount: installed.length,
          availableCount: availableModules.length
        }
      });
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
    if (!userProfile || !userSubscription) return false;

    try {
      const accessCheck = await stripeService.canAccessModule(moduleId, userSubscription);
      if (!accessCheck.canAccess) {
        setError(`Cannot install module: ${accessCheck.reason}`);
        return false;
      }

      const success = await registry.installModule(moduleId);
      if (success) {
        await loadModules();
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Installation failed';
      setError(errorMessage);
      return false;
    }
  };

  const uninstallModule = async (moduleId: string): Promise<boolean> => {
    try {
      const success = await registry.uninstallModule(moduleId);
      if (success) {
        await loadModules();
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Uninstallation failed';
      setError(errorMessage);
      return false;
    }
  };

  const toggleModule = async (moduleId: string, enabled: boolean): Promise<boolean> => {
    if (!userProfile || !userSubscription) return false;

    try {
      if (enabled) {
        const accessCheck = await stripeService.canAccessModule(moduleId, userSubscription);
        if (!accessCheck.canAccess) {
          setError(`Cannot enable module: ${accessCheck.reason}`);
          return false;
        }
      }

      const success = await registry.setModuleEnabled(moduleId, enabled);
      if (success) {
        await loadModules();
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Toggle failed';
      setError(errorMessage);
      return false;
    }
  };

  const canAccessModule = async (moduleId: string) => {
    if (!userSubscription) {
      return { canAccess: false, reason: 'No subscription found' };
    }
    return stripeService.canAccessModule(moduleId, userSubscription);
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

export const useModuleContext = (): ModuleContextData => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModuleContext must be used within ModuleContextProvider');
  }
  return context;
};
