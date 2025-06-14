
import { searchKnowledgeBase } from '@/data/knowledgeBase';
import { AuditLogger } from '@/lib/security';
import { Message } from './types';
import { UserDataValidator } from './security/userDataValidator';
import { ResponseCoordinator } from './responses/responseCoordinator';
import type { SecureUserContext } from './security/types';

export const generateSecureGerryResponse = async (
  userMessage: string, 
  language: 'es' | 'en', 
  userContext: SecureUserContext
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

    // Generate response using coordinator
    const { responseText, suggestions } = ResponseCoordinator.generateResponse(
      {
        userMessage,
        language,
        userContext,
        relevantArticles
      },
      userDataContext
    );

    return {
      id: Date.now().toString(),
      text: responseText,
      sender: 'gerry',
      timestamp: new Date(),
      type: relevantArticles.length > 0 ? 'knowledge_article' : 'text',
      suggestions,
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
