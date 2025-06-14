
import { BusinessResponseGenerator } from './businessResponseGenerator';
import { DocumentsResponseGenerator } from './documentsResponseGenerator';
import { PermitsResponseGenerator } from './permitsResponseGenerator';
import { SecurityResponseGenerator } from './securityResponseGenerator';
import { ContextualResponseGenerator } from './contextualResponseGenerator';
import type { ResponseGeneratorParams, UserDataContext } from '../security/types';

export class ResponseCoordinator {
  static generateResponse(
    params: ResponseGeneratorParams,
    userDataContext: UserDataContext
  ): { responseText: string; suggestions: string[] } {
    const { userMessage, language, userContext, relevantArticles = [] } = params;
    const { userPermits, userDocuments } = userDataContext;
    
    const messageContent = userMessage.toLowerCase();
    let responseText: string;
    let suggestions: string[] = [];

    // Generate secure, user-specific responses
    if (messageContent.includes('mis negocios') || messageContent.includes('my businesses')) {
      responseText = BusinessResponseGenerator.generateSecureBusinessSummary(userContext, language);
      suggestions = language === 'es' 
        ? ['Detalles de permisos', 'Estado de documentos', 'Acciones pendientes', 'Información de contacto']
        : ['Permit details', 'Document status', 'Pending actions', 'Contact information'];
    } else if (messageContent.includes('documentos') || messageContent.includes('documents')) {
      responseText = DocumentsResponseGenerator.generateSecureDocumentsResponse(userDocuments, userContext, language);
      suggestions = language === 'es'
        ? ['Subir documentos', 'Validar documentos', 'Documentos rechazados', 'Progreso general']
        : ['Upload documents', 'Validate documents', 'Rejected documents', 'Overall progress'];
    } else if (messageContent.includes('permisos') || messageContent.includes('permits')) {
      responseText = PermitsResponseGenerator.generateSecurePermitsResponse(userPermits, userContext, language);
      suggestions = language === 'es'
        ? ['Permisos pendientes', 'Fechas de vencimiento', 'Costos de renovación', 'Nuevos requisitos']
        : ['Pending permits', 'Expiration dates', 'Renewal costs', 'New requirements'];
    } else if (messageContent.includes('seguridad') || messageContent.includes('security')) {
      responseText = SecurityResponseGenerator.generateSecurityInformationResponse(userContext, language);
      suggestions = language === 'es'
        ? ['Política de privacidad', 'Acceso a datos', 'Configuración de cuenta', 'Historial de acceso']
        : ['Privacy policy', 'Data access', 'Account settings', 'Access history'];
    } else {
      responseText = ContextualResponseGenerator.generateSecureContextualResponse(userMessage, userContext, language, relevantArticles);
      suggestions = language === 'es'
        ? ['Mi información específica', 'Base de conocimientos', 'Ayuda personalizada', 'Configuración']
        : ['My specific information', 'Knowledge base', 'Personalized help', 'Settings'];
    }

    return { responseText, suggestions };
  }
}
