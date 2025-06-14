
import { searchKnowledgeBase } from '@/data/knowledgeBase';
import { AuditLogger } from '@/lib/security';
import { Message } from './types';
import { UserDataValidator } from './security/userDataValidator';
import { ResponseCoordinator } from './responses/responseCoordinator';
import { AIModuleAwarenessService } from '@/services/modules/aiModuleAwarenessService';
import { ModuleInstance } from '@/types/module';
import { UserSubscription } from '@/services/modules/stripeIntegrationService';
import type { SecureUserContext } from './security/types';

interface ModuleAwareContext extends SecureUserContext {
  installedModules: ModuleInstance[];
  userSubscription: UserSubscription | null;
}

export const generateModuleAwareSecureGerryResponse = async (
  userMessage: string, 
  language: 'es' | 'en', 
  userContext: ModuleAwareContext
): Promise<Message> => {
  // Validate user context security
  UserDataValidator.validateUserContext(userContext);

  // Log AI interaction with user context validation
  UserDataValidator.logInteraction(userContext, userMessage.length);

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  try {
    // Get user-specific data with strict validation
    const userDataContext = await UserDataValidator.getUserDataContext(userContext);

    // Search knowledge base (public information only)
    const knowledgeResults = searchKnowledgeBase(userMessage, language);
    const relevantArticles = knowledgeResults.slice(0, 3);

    // Get module-aware AI service
    const aiService = AIModuleAwarenessService.getInstance();
    
    // Generate module-aware response
    const moduleAwareResult = await aiService.generateModuleAwareResponse(
      userMessage,
      userContext.installedModules,
      userContext.userSubscription,
      language
    );

    // Generate base response using coordinator
    const { responseText: baseResponse, suggestions: baseSuggestions } = ResponseCoordinator.generateResponse(
      {
        userMessage,
        language,
        userContext,
        relevantArticles
      },
      userDataContext
    );

    // Combine base response with module-aware insights
    const enhancedResponse = `${baseResponse}\n\n${moduleAwareResult.response}`;
    
    // Combine suggestions
    const allSuggestions = [
      ...baseSuggestions,
      ...moduleAwareResult.suggestedActions.slice(0, 2) // Limit to avoid too many suggestions
    ];

    // Add module recommendations as suggestions if applicable
    if (moduleAwareResult.moduleRecommendations.length > 0) {
      const recommendationSuggestions = moduleAwareResult.moduleRecommendations
        .slice(0, 2)
        .map(rec => language === 'es' 
          ? `Ver módulo: ${rec.moduleId}`
          : `View module: ${rec.moduleId}`
        );
      allSuggestions.push(...recommendationSuggestions);
    }

    return {
      id: Date.now().toString(),
      text: enhancedResponse,
      sender: 'gerry',
      timestamp: new Date(),
      type: relevantArticles.length > 0 ? 'knowledge_article' : 'text',
      suggestions: allSuggestions.slice(0, 4), // Limit total suggestions
      knowledgeArticles: relevantArticles.length > 0 ? relevantArticles : undefined
    };
  } catch (error) {
    // Log security error
    AuditLogger.log({
      action: 'ai_security_error',
      userId: userContext.userId,
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
    });

    throw error;
  }
};
