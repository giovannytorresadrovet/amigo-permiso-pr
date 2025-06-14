
import { ModuleInstance, ModuleMetadata } from '@/types/module';
import { UserSubscription } from '@/services/modules/stripeIntegrationService';

export interface ModuleContextData {
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

export interface ModuleContextProviderProps {
  children: React.ReactNode;
}
