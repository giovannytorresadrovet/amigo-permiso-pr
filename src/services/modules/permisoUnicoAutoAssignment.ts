
import { ModuleRegistry } from '@/services/moduleRegistry';
import { AuditLogger } from '@/lib/security';
import { PERMISO_UNICO_MODULE_ID, permisoUnicoMetadata } from './permisoUnicoModule';

export class PermisoUnicoAutoAssignment {
  private static instance: PermisoUnicoAutoAssignment;
  private registry: ModuleRegistry;

  private constructor() {
    this.registry = ModuleRegistry.getInstance();
  }

  static getInstance(): PermisoUnicoAutoAssignment {
    if (!PermisoUnicoAutoAssignment.instance) {
      PermisoUnicoAutoAssignment.instance = new PermisoUnicoAutoAssignment();
    }
    return PermisoUnicoAutoAssignment.instance;
  }

  async autoAssignToNewBusiness(businessId: string): Promise<boolean> {
    try {
      // Check if module is already installed
      const existingModule = this.registry.getModule(PERMISO_UNICO_MODULE_ID);
      
      if (!existingModule) {
        // Register and install the module
        this.registry.registerAvailableModule(permisoUnicoMetadata);
        const success = await this.registry.installModule(PERMISO_UNICO_MODULE_ID);
        
        if (success) {
          AuditLogger.log({
            action: 'permiso_unico_auto_assigned',
            userId: 'system',
            details: { businessId, moduleId: PERMISO_UNICO_MODULE_ID }
          });
          
          console.log(`Permiso Único automatically assigned to business ${businessId}`);
          return true;
        }
      } else {
        // Module already exists, ensure it's enabled
        await this.registry.setModuleEnabled(PERMISO_UNICO_MODULE_ID, true);
        
        AuditLogger.log({
          action: 'permiso_unico_enabled_for_business',
          userId: 'system',
          details: { businessId, moduleId: PERMISO_UNICO_MODULE_ID }
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      AuditLogger.log({
        action: 'permiso_unico_auto_assignment_failed',
        userId: 'system',
        details: { 
          businessId, 
          moduleId: PERMISO_UNICO_MODULE_ID,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
      
      console.error('Failed to auto-assign Permiso Único:', error);
      return false;
    }
  }

  async checkAndAssignToExistingBusinesses(): Promise<void> {
    try {
      // This would integrate with the business data service
      // For now, we'll just ensure the module is available
      this.registry.registerAvailableModule(permisoUnicoMetadata);
      
      console.log('Permiso Único module registered for existing businesses');
    } catch (error) {
      console.error('Failed to register Permiso Único for existing businesses:', error);
    }
  }
}
