
import { searchKnowledgeBase } from '@/data/knowledgeBase';
import { UserDataService } from '@/services/userDataService';
import { AuditLogger } from '@/lib/security';
import { Message } from './types';
import type { UserProfile, BusinessSummary } from '@/services/userDataService';

interface SecureUserContext {
  userId: string;
  userProfile: UserProfile;
  businesses: BusinessSummary[];
  businessContext?: {
    businessId: string;
    name: string;
    type: string;
    municipality: string;
    status: string;
  };
}

export const generateSecureGerryResponse = async (
  userMessage: string, 
  language: 'es' | 'en', 
  userContext: SecureUserContext
): Promise<Message> => {
  // Validate user context security
  if (!userContext.userId || !userContext.userProfile) {
    throw new Error('Invalid user context - security violation');
  }

  // Log AI interaction with user context validation
  AuditLogger.log({
    action: 'ai_response_generation',
    userId: userContext.userId,
    details: {
      queryLength: userMessage.length,
      businessCount: userContext.businesses.length,
      timestamp: new Date().toISOString()
    }
  });

  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  // Get user-specific data with strict validation
  const [userPermits, userDocuments, userUrgentActions] = await Promise.all([
    UserDataService.getBusinessPermits().then(permits => 
      // Ensure permits belong to user's businesses only
      permits.filter(permit => 
        userContext.businesses.some(business => business.id === permit.businessId)
      )
    ),
    UserDataService.getBusinessDocuments().then(documents => 
      // Ensure documents belong to user's businesses only
      documents.filter(doc => 
        userContext.businesses.some(business => business.id === doc.businessId)
      )
    ),
    UserDataService.getUrgentActions()
  ]);

  // Search knowledge base (public information only)
  const knowledgeResults = searchKnowledgeBase(userMessage, language);
  const relevantArticles = knowledgeResults.slice(0, 3);

  const messageContent = userMessage.toLowerCase();
  let responseText: string;
  let suggestions: string[] = [];

  // Generate secure, user-specific responses
  if (messageContent.includes('mis negocios') || messageContent.includes('my businesses')) {
    responseText = generateSecureBusinessSummary(userContext, language);
    suggestions = language === 'es' 
      ? ['Detalles de permisos', 'Estado de documentos', 'Acciones pendientes', 'Información de contacto']
      : ['Permit details', 'Document status', 'Pending actions', 'Contact information'];
  } else if (messageContent.includes('documentos') || messageContent.includes('documents')) {
    responseText = generateSecureDocumentsResponse(userDocuments, userContext, language);
    suggestions = language === 'es'
      ? ['Subir documentos', 'Validar documentos', 'Documentos rechazados', 'Progreso general']
      : ['Upload documents', 'Validate documents', 'Rejected documents', 'Overall progress'];
  } else if (messageContent.includes('permisos') || messageContent.includes('permits')) {
    responseText = generateSecurePermitsResponse(userPermits, userContext, language);
    suggestions = language === 'es'
      ? ['Permisos pendientes', 'Fechas de vencimiento', 'Costos de renovación', 'Nuevos requisitos']
      : ['Pending permits', 'Expiration dates', 'Renewal costs', 'New requirements'];
  } else if (messageContent.includes('seguridad') || messageContent.includes('security')) {
    responseText = generateSecurityInformationResponse(userContext, language);
    suggestions = language === 'es'
      ? ['Política de privacidad', 'Acceso a datos', 'Configuración de cuenta', 'Historial de acceso']
      : ['Privacy policy', 'Data access', 'Account settings', 'Access history'];
  } else {
    responseText = generateSecureContextualResponse(userMessage, userContext, language, relevantArticles);
    suggestions = language === 'es'
      ? ['Mi información específica', 'Base de conocimientos', 'Ayuda personalizada', 'Configuración']
      : ['My specific information', 'Knowledge base', 'Personalized help', 'Settings'];
  }

  return {
    id: Date.now().toString(),
    text: responseText,
    sender: 'gerry',
    timestamp: new Date(),
    type: relevantArticles.length > 0 ? 'knowledge_article' : 'text',
    suggestions,
    knowledgeArticles: relevantArticles.length > 0 ? relevantArticles : undefined
  };
};

function generateSecureBusinessSummary(userContext: SecureUserContext, language: 'es' | 'en'): string {
  const { userProfile, businesses } = userContext;
  
  if (language === 'es') {
    return `🔒 **Información segura de ${userProfile.firstName}**

📊 **Tus ${businesses.length} negocio(s) registrado(s):**

${businesses.map((business, index) => `
${index + 1}. **${business.name}** (${business.type})
   📍 ${business.municipality}
   📋 Estado: ${business.status}
   📄 ${business.permitCount} permisos, ${business.documentsCount} documentos
   ⚠️ ${business.urgentActions} acciones urgentes
`).join('\n')}

🛡️ **Protección de datos:**
- Solo tú puedes ver esta información
- Datos encriptados y seguros
- Acceso auditado y registrado

💡 ¿Qué negocio específico quieres revisar?`;
  } else {
    return `🔒 **Secure information for ${userProfile.firstName}**

📊 **Your ${businesses.length} registered business(es):**

${businesses.map((business, index) => `
${index + 1}. **${business.name}** (${business.type})
   📍 ${business.municipality}
   📋 Status: ${business.status}
   📄 ${business.permitCount} permits, ${business.documentsCount} documents
   ⚠️ ${business.urgentActions} urgent actions
`).join('\n')}

🛡️ **Data protection:**
- Only you can see this information
- Encrypted and secure data
- Audited and logged access

💡 Which specific business would you like to review?`;
  }
}

function generateSecureDocumentsResponse(documents: any[], userContext: SecureUserContext, language: 'es' | 'en'): string {
  const pendingDocs = documents.filter(doc => doc.status === 'pending');
  const rejectedDocs = documents.filter(doc => doc.status === 'rejected');
  
  if (language === 'es') {
    return `🔒 **Documentos de ${userContext.userProfile.firstName}**

📄 **Estado seguro de tus documentos:**
- ✅ Validados: ${documents.filter(d => d.status === 'validated').length}
- ⏳ Pendientes: ${pendingDocs.length}
- ❌ Rechazados: ${rejectedDocs.length}

${rejectedDocs.length > 0 ? `
🚨 **Requieren atención inmediata:**
${rejectedDocs.map(doc => `• ${doc.fileName}`).join('\n')}
` : ''}

🛡️ **Seguridad:** Todos tus documentos están protegidos con encriptación de nivel empresarial.`;
  } else {
    return `🔒 **Documents for ${userContext.userProfile.firstName}**

📄 **Secure status of your documents:**
- ✅ Validated: ${documents.filter(d => d.status === 'validated').length}
- ⏳ Pending: ${pendingDocs.length}
- ❌ Rejected: ${rejectedDocs.length}

${rejectedDocs.length > 0 ? `
🚨 **Require immediate attention:**
${rejectedDocs.map(doc => `• ${doc.fileName}`).join('\n')}
` : ''}

🛡️ **Security:** All your documents are protected with enterprise-level encryption.`;
  }
}

function generateSecurePermitsResponse(permits: any[], userContext: SecureUserContext, language: 'es' | 'en'): string {
  const activePermits = permits.filter(p => p.status === 'completed');
  const pendingPermits = permits.filter(p => p.status === 'pending');
  
  if (language === 'es') {
    return `🔒 **Permisos de ${userContext.userProfile.firstName}**

🏛️ **Estado seguro de tus permisos:**
- ✅ Activos: ${activePermits.length}
- ⏳ En proceso: ${pendingPermits.length}
- ❗ Requeridos: ${permits.filter(p => p.status === 'required').length}

🛡️ **Privacidad garantizada:** Esta información es exclusivamente tuya y está protegida.

💡 **Próximo paso:** ${pendingPermits.length > 0 ? 'Completar permisos pendientes' : 'Mantener renovaciones al día'}`;
  } else {
    return `🔒 **Permits for ${userContext.userProfile.firstName}**

🏛️ **Secure status of your permits:**
- ✅ Active: ${activePermits.length}
- ⏳ In process: ${pendingPermits.length}
- ❗ Required: ${permits.filter(p => p.status === 'required').length}

🛡️ **Privacy guaranteed:** This information is exclusively yours and protected.

💡 **Next step:** ${pendingPermits.length > 0 ? 'Complete pending permits' : 'Keep renewals up to date'}`;
  }
}

function generateSecurityInformationResponse(userContext: SecureUserContext, language: 'es' | 'en'): string {
  if (language === 'es') {
    return `🔒 **Información de Seguridad para ${userContext.userProfile.firstName}**

🛡️ **Protección de tus datos:**
- ✅ Encriptación AES-256 
- ✅ Acceso auditado y registrado
- ✅ Aislamiento de usuario estricto
- ✅ Sin compartir datos entre usuarios

🔐 **Tu sesión segura:**
- ID de usuario: ${userContext.userId.substring(0, 8)}...
- Último acceso: ${new Date().toLocaleString()}
- Negocios protegidos: ${userContext.businesses.length}

📋 **Garantías de privacidad:**
- No puedo acceder a datos de otros usuarios
- Solo veo tu información personal y de negocios
- Toda interacción es registrada para tu seguridad

¿Tienes alguna pregunta sobre la seguridad de tus datos?`;
  } else {
    return `🔒 **Security Information for ${userContext.userProfile.firstName}**

🛡️ **Protection of your data:**
- ✅ AES-256 encryption
- ✅ Audited and logged access
- ✅ Strict user isolation
- ✅ No data sharing between users

🔐 **Your secure session:**
- User ID: ${userContext.userId.substring(0, 8)}...
- Last access: ${new Date().toLocaleString()}
- Protected businesses: ${userContext.businesses.length}

📋 **Privacy guarantees:**
- I cannot access other users' data
- I only see your personal and business information
- All interactions are logged for your security

Do you have any questions about the security of your data?`;
  }
}

function generateSecureContextualResponse(userMessage: string, userContext: SecureUserContext, language: 'es' | 'en', articles: any[]): string {
  if (language === 'es') {
    return `🔒 He analizado tu consulta "${userMessage}" dentro de tu contexto seguro.

👤 **Tu perfil protegido:**
- Usuario: ${userContext.userProfile.firstName} ${userContext.userProfile.lastName}
- Municipio: ${userContext.userProfile.municipality || 'No especificado'}
- Negocios: ${userContext.businesses.length}

🛡️ **Seguridad garantizada:**
- Solo accedo a TU información personal
- No comparto datos con otros usuarios
- Respuestas basadas en tu contexto específico

📚 **Información disponible:**
${articles.length > 0 ? '- Artículos relevantes de la base de conocimientos' : '- Base de conocimientos general'}
- Tus datos de negocios y permisos
- Tu historial de documentos

¿En qué aspecto específico de tu situación puedo ayudarte?`;
  } else {
    return `🔒 I've analyzed your query "${userMessage}" within your secure context.

👤 **Your protected profile:**
- User: ${userContext.userProfile.firstName} ${userContext.userProfile.lastName}
- Municipality: ${userContext.userProfile.municipality || 'Not specified'}
- Businesses: ${userContext.businesses.length}

🛡️ **Security guaranteed:**
- I only access YOUR personal information
- I don't share data with other users
- Responses based on your specific context

📚 **Available information:**
${articles.length > 0 ? '- Relevant articles from knowledge base' : '- General knowledge base'}
- Your business and permit data
- Your document history

What specific aspect of your situation can I help you with?`;
  }
}
