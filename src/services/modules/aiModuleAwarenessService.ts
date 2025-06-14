
import { ModuleInstance, ModuleMetadata } from '@/types/module';
import { ModuleRegistry } from '@/services/moduleRegistry';
import { StripeIntegrationService, UserSubscription } from './stripeIntegrationService';
import { AuditLogger } from '@/lib/security';

export interface ModuleCapability {
  id: string;
  name: string;
  description: string;
  actions: string[];
  dataTypes: string[];
}

export interface AIModuleRecommendation {
  moduleId: string;
  reason: string;
  confidence: number;
  requiredSubscription?: string;
  estimatedBenefit: string;
}

export class AIModuleAwarenessService {
  private static instance: AIModuleAwarenessService;
  private moduleCapabilities: Map<string, ModuleCapability[]> = new Map();

  static getInstance(): AIModuleAwarenessService {
    if (!AIModuleAwarenessService.instance) {
      AIModuleAwarenessService.instance = new AIModuleAwarenessService();
      AIModuleAwarenessService.instance.initializeCapabilities();
    }
    return AIModuleAwarenessService.instance;
  }

  private initializeCapabilities() {
    // Initialize module capabilities mapping
    this.moduleCapabilities.set('advanced-analytics', [
      {
        id: 'reporting',
        name: 'Advanced Reporting',
        description: 'Generate detailed business reports and insights',
        actions: ['generate_report', 'export_data', 'create_dashboard'],
        dataTypes: ['permits', 'business_metrics', 'compliance_data']
      },
      {
        id: 'predictive_analysis',
        name: 'Predictive Analysis',
        description: 'Predict permit approval times and business trends',
        actions: ['predict_approval_time', 'forecast_trends', 'risk_analysis'],
        dataTypes: ['historical_permits', 'business_patterns']
      }
    ]);

    this.moduleCapabilities.set('document-automation', [
      {
        id: 'form_filling',
        name: 'Automated Form Filling',
        description: 'Automatically fill permit forms with business data',
        actions: ['autofill_forms', 'validate_documents', 'submit_applications'],
        dataTypes: ['business_info', 'permit_forms', 'user_documents']
      }
    ]);

    this.moduleCapabilities.set('ai-compliance-assistant', [
      {
        id: 'compliance_check',
        name: 'AI Compliance Checking',
        description: 'AI-powered compliance verification and recommendations',
        actions: ['check_compliance', 'suggest_improvements', 'risk_assessment'],
        dataTypes: ['regulations', 'business_activities', 'permit_status']
      }
    ]);
  }

  // Get capabilities for installed modules
  getAvailableCapabilities(installedModules: ModuleInstance[]): ModuleCapability[] {
    const capabilities: ModuleCapability[] = [];
    
    for (const module of installedModules) {
      if (module.config.enabled) {
        const moduleCapabilities = this.moduleCapabilities.get(module.metadata.id);
        if (moduleCapabilities) {
          capabilities.push(...moduleCapabilities);
        }
      }
    }
    
    return capabilities;
  }

  // Check if AI can perform a specific action
  canPerformAction(action: string, installedModules: ModuleInstance[]): {
    canPerform: boolean;
    moduleId?: string;
    capability?: ModuleCapability;
  } {
    const capabilities = this.getAvailableCapabilities(installedModules);
    
    for (const capability of capabilities) {
      if (capability.actions.includes(action)) {
        const moduleId = this.findModuleIdForCapability(capability.id, installedModules);
        return {
          canPerform: true,
          moduleId,
          capability
        };
      }
    }
    
    return { canPerform: false };
  }

  // Generate AI response with module awareness
  async generateModuleAwareResponse(
    userQuery: string,
    installedModules: ModuleInstance[],
    userSubscription: UserSubscription | null,
    language: 'es' | 'en'
  ): Promise<{
    response: string;
    suggestedActions: string[];
    moduleRecommendations: AIModuleRecommendation[];
  }> {
    try {
      const capabilities = this.getAvailableCapabilities(installedModules);
      const stripeService = StripeIntegrationService.getInstance();
      
      // Analyze user query for actionable items
      const actionableItems = this.analyzeQueryForActions(userQuery);
      const suggestedActions: string[] = [];
      const moduleRecommendations: AIModuleRecommendation[] = [];
      
      // Check what actions are available with current modules
      for (const action of actionableItems) {
        const actionCheck = this.canPerformAction(action, installedModules);
        
        if (actionCheck.canPerform) {
          suggestedActions.push(
            language === 'es' 
              ? `Usar ${actionCheck.capability?.name} para ${action}`
              : `Use ${actionCheck.capability?.name} for ${action}`
          );
        } else {
          // Recommend modules that could help
          const recommendation = await this.recommendModuleForAction(action, userSubscription, stripeService);
          if (recommendation) {
            moduleRecommendations.push(recommendation);
          }
        }
      }

      // Generate contextual response
      const response = this.generateContextualResponse(
        userQuery,
        capabilities,
        suggestedActions,
        moduleRecommendations,
        language
      );

      AuditLogger.log({
        action: 'ai_module_aware_response',
        userId: 'system',
        details: {
          queryLength: userQuery.length,
          capabilitiesCount: capabilities.length,
          actionsCount: suggestedActions.length,
          recommendationsCount: moduleRecommendations.length
        }
      });

      return {
        response,
        suggestedActions,
        moduleRecommendations
      };
    } catch (error) {
      console.error('Error generating module-aware response:', error);
      
      return {
        response: language === 'es' 
          ? 'Lo siento, hubo un error al procesar tu consulta con los módulos disponibles.'
          : 'Sorry, there was an error processing your query with available modules.',
        suggestedActions: [],
        moduleRecommendations: []
      };
    }
  }

  private analyzeQueryForActions(query: string): string[] {
    const actionKeywords = {
      'generate_report': ['reporte', 'report', 'análisis', 'analysis'],
      'autofill_forms': ['llenar', 'fill', 'formulario', 'form', 'completar'],
      'check_compliance': ['cumplimiento', 'compliance', 'verificar', 'check'],
      'predict_approval_time': ['tiempo', 'time', 'cuánto', 'when', 'approval'],
      'export_data': ['exportar', 'export', 'descargar', 'download'],
      'risk_assessment': ['riesgo', 'risk', 'evaluación', 'assessment']
    };

    const detectedActions: string[] = [];
    const lowerQuery = query.toLowerCase();

    for (const [action, keywords] of Object.entries(actionKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        detectedActions.push(action);
      }
    }

    return detectedActions;
  }

  private async recommendModuleForAction(
    action: string,
    userSubscription: UserSubscription | null,
    stripeService: StripeIntegrationService
  ): Promise<AIModuleRecommendation | null> {
    const moduleActionMap: Record<string, string> = {
      'generate_report': 'advanced-analytics',
      'autofill_forms': 'document-automation',
      'check_compliance': 'ai-compliance-assistant',
      'predict_approval_time': 'advanced-analytics',
      'export_data': 'advanced-analytics',
      'risk_assessment': 'ai-compliance-assistant'
    };

    const moduleId = moduleActionMap[action];
    if (!moduleId) return null;

    const accessCheck = userSubscription 
      ? await stripeService.canAccessModule(moduleId, userSubscription)
      : { canAccess: false, upgradeRequired: 'premium' };

    return {
      moduleId,
      reason: `Para realizar ${action}, necesitas el módulo ${moduleId}`,
      confidence: 0.8,
      requiredSubscription: accessCheck.upgradeRequired,
      estimatedBenefit: 'Alto - automatización y mejores insights'
    };
  }

  private generateContextualResponse(
    userQuery: string,
    capabilities: ModuleCapability[],
    suggestedActions: string[],
    moduleRecommendations: AIModuleRecommendation[],
    language: 'es' | 'en'
  ): string {
    const capabilityText = capabilities.length > 0 
      ? (language === 'es' 
          ? `Con tus módulos instalados, puedo ayudarte con: ${capabilities.map(c => c.name).join(', ')}.`
          : `With your installed modules, I can help you with: ${capabilities.map(c => c.name).join(', ')}.`)
      : (language === 'es'
          ? 'Actualmente no tienes módulos adicionales instalados.'
          : 'You currently have no additional modules installed.');

    let response = capabilityText;

    if (suggestedActions.length > 0) {
      response += language === 'es'
        ? `\n\n🚀 Acciones disponibles:\n${suggestedActions.map(action => `• ${action}`).join('\n')}`
        : `\n\n🚀 Available actions:\n${suggestedActions.map(action => `• ${action}`).join('\n')}`;
    }

    if (moduleRecommendations.length > 0) {
      response += language === 'es'
        ? `\n\n💡 Módulos recomendados para mejorar mi asistencia:\n${moduleRecommendations.map(rec => `• ${rec.moduleId}: ${rec.reason}`).join('\n')}`
        : `\n\n💡 Recommended modules to enhance my assistance:\n${moduleRecommendations.map(rec => `• ${rec.moduleId}: ${rec.reason}`).join('\n')}`;
    }

    return response;
  }

  private findModuleIdForCapability(capabilityId: string, installedModules: ModuleInstance[]): string | undefined {
    for (const [moduleId, capabilities] of this.moduleCapabilities.entries()) {
      if (capabilities.some(cap => cap.id === capabilityId)) {
        const isInstalled = installedModules.some(module => 
          module.metadata.id === moduleId && module.config.enabled
        );
        if (isInstalled) {
          return moduleId;
        }
      }
    }
    return undefined;
  }
}
