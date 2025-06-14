
import { ModuleMetadata, ModuleInstance, ModuleConfig, ModuleHooks } from '@/types/module';
import { PermisoUnicoComponent } from '@/components/modules/permiso-unico/PermisoUnicoComponent';

export const PERMISO_UNICO_MODULE_ID = 'permiso-unico';

export const permisoUnicoMetadata: ModuleMetadata = {
  id: PERMISO_UNICO_MODULE_ID,
  name: 'Permiso Único',
  description: 'Permiso único de operación para establecimientos comerciales en Puerto Rico',
  version: '1.0.0',
  category: 'compliance',
  tags: ['permiso', 'comercial', 'puerto-rico', 'obligatorio'],
  author: 'Permitoria',
  icon: '📋',
  dependencies: [],
  permissions: [
    {
      id: 'business_data_read',
      name: 'Leer datos del negocio',
      description: 'Acceso a información básica del negocio',
      required: true
    },
    {
      id: 'permit_management',
      name: 'Gestión de permisos',
      description: 'Crear y gestionar solicitudes de permisos',
      required: true
    }
  ],
  pricing: {
    type: 'free'
  },
  compatibility: {
    minVersion: '1.0.0'
  },
  status: 'active',
  installCount: 0,
  rating: 5.0,
  lastUpdated: new Date()
};

export const createPermisoUnicoModule = (): ModuleInstance => {
  const hooks: ModuleHooks = {
    onInstall: async () => {
      console.log('Permiso Único module installed');
    },
    onEnable: async () => {
      console.log('Permiso Único module enabled');
    },
    onDisable: async () => {
      console.log('Permiso Único module disabled');
    },
    onUninstall: async () => {
      console.log('Permiso Único module uninstalled');
    }
  };

  const config: ModuleConfig = {
    enabled: true,
    settings: {
      autoAssign: true,
      requiresInspection: true,
      validityPeriod: 365, // days
      renewalNotificationDays: 30
    }
  };

  return {
    metadata: permisoUnicoMetadata,
    config,
    component: PermisoUnicoComponent,
    hooks
  };
};
