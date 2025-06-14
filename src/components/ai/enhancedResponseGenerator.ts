
import { searchKnowledgeBase, type KnowledgeArticle } from '@/data/knowledgeBase';
import { UserDataService } from '@/services/userDataService';
import { Message } from './types';

interface BusinessContext {
  name: string;
  type: string;
  municipality: string;
  status: string;
  permits?: any[];
  documents?: any[];
}

export const generateEnhancedGerryResponse = async (
  userMessage: string, 
  language: 'es' | 'en', 
  businessContext?: BusinessContext
): Promise<Message> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  // Get comprehensive user data
  const [userProfile, businesses, allPermits, allDocuments, urgentActions] = await Promise.all([
    UserDataService.getUserProfile(),
    UserDataService.getUserBusinesses(),
    UserDataService.getBusinessPermits(),
    UserDataService.getBusinessDocuments(),
    UserDataService.getUrgentActions()
  ]);

  // Search knowledge base for relevant articles
  const knowledgeResults = searchKnowledgeBase(userMessage, language);
  const relevantArticles = knowledgeResults.slice(0, 3);

  const messageContent = userMessage.toLowerCase();
  let responseText: string;
  let suggestions: string[] = [];

  // Generate personalized responses based on user data
  if (messageContent.includes('mis negocios') || messageContent.includes('my businesses')) {
    responseText = generateBusinessSummaryResponse(businesses, language, userProfile);
    suggestions = language === 'es' 
      ? ['Ver detalles específicos', 'Acciones urgentes', 'Estado de permisos', 'Documentos pendientes']
      : ['View specific details', 'Urgent actions', 'Permit status', 'Pending documents'];
  } else if (messageContent.includes('documentos') || messageContent.includes('documents')) {
    responseText = generateDocumentsResponse(allDocuments, businesses, language);
    suggestions = language === 'es'
      ? ['Documentos faltantes', 'Calidad de documentos', 'Subir documentos', 'Validar documentos']
      : ['Missing documents', 'Document quality', 'Upload documents', 'Validate documents'];
  } else if (messageContent.includes('permisos') || messageContent.includes('permits')) {
    responseText = generatePermitsResponse(allPermits, businesses, language);
    suggestions = language === 'es'
      ? ['Permisos vencidos', 'Próximos vencimientos', 'Costos estimados', 'Renovaciones']
      : ['Expired permits', 'Upcoming expirations', 'Estimated costs', 'Renewals'];
  } else if (messageContent.includes('urgente') || messageContent.includes('urgent')) {
    responseText = generateUrgentActionsResponse(urgentActions, language);
    suggestions = language === 'es'
      ? ['Priorizar acciones', 'Programar citas', 'Ver fechas límite', 'Contactar oficinas']
      : ['Prioritize actions', 'Schedule appointments', 'View deadlines', 'Contact offices'];
  } else if (messageContent.includes('status') || messageContent.includes('estado')) {
    responseText = generateOverallStatusResponse(businesses, allPermits, urgentActions, language, userProfile);
    suggestions = language === 'es'
      ? ['Resumen detallado', 'Próximos pasos', 'Recomendaciones', 'Cronograma']
      : ['Detailed summary', 'Next steps', 'Recommendations', 'Timeline'];
  } else {
    // Default personalized response with context
    responseText = generateContextualResponse(userMessage, businesses, language, userProfile, relevantArticles);
    suggestions = language === 'es'
      ? ['Mi situación específica', 'Artículos relevantes', 'Próximas acciones', 'Contactar soporte']
      : ['My specific situation', 'Relevant articles', 'Next actions', 'Contact support'];
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

function generateBusinessSummaryResponse(businesses: any[], language: 'es' | 'en', userProfile: any): string {
  if (language === 'es') {
    return `Hola ${userProfile?.firstName || 'Usuario'}, he revisado tus negocios registrados:

📊 **Resumen de tus ${businesses.length} negocio(s):**

${businesses.map((business, index) => `
${index + 1}. **${business.name}** (${business.type})
   📍 ${business.municipality}
   📋 Estado: ${business.status}
   📄 ${business.permitCount} permisos, ${business.documentsCount} documentos
   ⚠️ ${business.urgentActions} acciones urgentes
`).join('\n')}

💡 **Recomendaciones personalizadas:**
- Prioriza las acciones urgentes pendientes
- Revisa los documentos con problemas de calidad
- Programa las renovaciones próximas a vencer

¿En qué negocio específico te gustaría que me enfoque?`;
  } else {
    return `Hello ${userProfile?.firstName || 'User'}, I've reviewed your registered businesses:

📊 **Summary of your ${businesses.length} business(es):**

${businesses.map((business, index) => `
${index + 1}. **${business.name}** (${business.type})
   📍 ${business.municipality}
   📋 Status: ${business.status}
   📄 ${business.permitCount} permits, ${business.documentsCount} documents
   ⚠️ ${business.urgentActions} urgent actions
`).join('\n')}

💡 **Personalized recommendations:**
- Prioritize pending urgent actions
- Review documents with quality issues
- Schedule upcoming renewals

Which specific business would you like me to focus on?`;
  }
}

function generateDocumentsResponse(documents: any[], businesses: any[], language: 'es' | 'en'): string {
  const pendingDocs = documents.filter(doc => doc.status === 'pending');
  const rejectedDocs = documents.filter(doc => doc.status === 'rejected');
  
  if (language === 'es') {
    return `📄 **Estado de tus documentos:**

**Total de documentos:** ${documents.length}
- ✅ Validados: ${documents.filter(d => d.status === 'validated').length}
- ⏳ Pendientes: ${pendingDocs.length}
- ❌ Rechazados: ${rejectedDocs.length}

${rejectedDocs.length > 0 ? `
⚠️ **Documentos que requieren atención:**
${rejectedDocs.map(doc => `
• ${doc.fileName} - ${doc.issues?.join(', ') || 'Problemas de calidad'}
`).join('')}
` : ''}

💡 **Siguiente paso:** ${pendingDocs.length > 0 ? 'Completa la validación de documentos pendientes' : 'Todos tus documentos están en orden ✅'}`;
  } else {
    return `📄 **Your documents status:**

**Total documents:** ${documents.length}
- ✅ Validated: ${documents.filter(d => d.status === 'validated').length}
- ⏳ Pending: ${pendingDocs.length}
- ❌ Rejected: ${rejectedDocs.length}

${rejectedDocs.length > 0 ? `
⚠️ **Documents requiring attention:**
${rejectedDocs.map(doc => `
• ${doc.fileName} - ${doc.issues?.join(', ') || 'Quality issues'}
`).join('')}
` : ''}

💡 **Next step:** ${pendingDocs.length > 0 ? 'Complete validation of pending documents' : 'All your documents are in order ✅'}`;
  }
}

function generatePermitsResponse(permits: any[], businesses: any[], language: 'es' | 'en'): string {
  const activePermits = permits.filter(p => p.status === 'completed');
  const pendingPermits = permits.filter(p => p.status === 'pending');
  
  if (language === 'es') {
    return `🏛️ **Estado de tus permisos:**

**Total de permisos:** ${permits.length}
- ✅ Activos: ${activePermits.length}
- ⏳ En proceso: ${pendingPermits.length}
- ❗ Requeridos: ${permits.filter(p => p.status === 'required').length}

${pendingPermits.length > 0 ? `
📋 **Permisos en proceso:**
${pendingPermits.slice(0, 3).map(permit => `
• ${permit.name} - ${permit.category}
  ${permit.cost ? `💰 Costo: $${permit.cost}` : ''}
`).join('')}
` : ''}

💡 **Prioridad:** ${pendingPermits.length > 0 ? 'Completa los permisos pendientes para mantener tu negocio al día' : 'Mantén al día las renovaciones programadas'}`;
  } else {
    return `🏛️ **Your permits status:**

**Total permits:** ${permits.length}
- ✅ Active: ${activePermits.length}
- ⏳ In process: ${pendingPermits.length}
- ❗ Required: ${permits.filter(p => p.status === 'required').length}

${pendingPermits.length > 0 ? `
📋 **Permits in process:**
${pendingPermits.slice(0, 3).map(permit => `
• ${permit.name} - ${permit.category}
  ${permit.cost ? `💰 Cost: $${permit.cost}` : ''}
`).join('')}
` : ''}

💡 **Priority:** ${pendingPermits.length > 0 ? 'Complete pending permits to keep your business up to date' : 'Keep scheduled renewals current'}`;
  }
}

function generateUrgentActionsResponse(urgentActions: any[], language: 'es' | 'en'): string {
  if (language === 'es') {
    return `⚡ **Acciones urgentes pendientes:**

${urgentActions.length === 0 ? '✅ ¡Perfecto! No tienes acciones urgentes pendientes.' : 
urgentActions.map((action, index) => `
${index + 1}. **${action.action}**
   🏢 ${action.businessName}
   📅 Fecha límite: ${action.dueDate || 'Por determinar'}
   🔴 Prioridad: ${action.priority === 'high' ? 'Alta' : action.priority === 'medium' ? 'Media' : 'Baja'}
`).join('\n')}

💡 **Recomendación:** ${urgentActions.length > 0 ? 'Programa estas acciones inmediatamente para evitar multas o cierres temporales.' : 'Mantén esta disciplina para evitar problemas futuros.'}`;
  } else {
    return `⚡ **Pending urgent actions:**

${urgentActions.length === 0 ? '✅ Perfect! You have no pending urgent actions.' : 
urgentActions.map((action, index) => `
${index + 1}. **${action.action}**
   🏢 ${action.businessName}
   📅 Deadline: ${action.dueDate || 'To be determined'}
   🔴 Priority: ${action.priority}
`).join('\n')}

💡 **Recommendation:** ${urgentActions.length > 0 ? 'Schedule these actions immediately to avoid fines or temporary closures.' : 'Maintain this discipline to avoid future problems.'}`;
  }
}

function generateOverallStatusResponse(businesses: any[], permits: any[], urgentActions: any[], language: 'es' | 'en', userProfile: any): string {
  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter(b => b.status === 'active').length;
  
  if (language === 'es') {
    return `👋 Hola ${userProfile?.firstName || 'Usuario'}, aquí está tu resumen general:

🏢 **Tus Negocios:** ${totalBusinesses} registrados, ${activeBusinesses} activos
🏛️ **Permisos:** ${permits.length} total, ${permits.filter(p => p.status === 'completed').length} completados
⚡ **Acciones Urgentes:** ${urgentActions.length} pendientes
📍 **Municipio Principal:** ${userProfile?.municipality || 'No especificado'}

📊 **Estado General:** ${
  urgentActions.length === 0 ? '🟢 Excelente - Todo al día' :
  urgentActions.length <= 2 ? '🟡 Bueno - Pocas acciones pendientes' :
  '🔴 Requiere atención - Varias acciones urgentes'
}

💡 **Próximo paso recomendado:** ${
  urgentActions.length > 0 ? 'Atender las acciones urgentes pendientes' :
  'Programar revisiones de mantenimiento y renovaciones'
}`;
  } else {
    return `👋 Hello ${userProfile?.firstName || 'User'}, here's your general summary:

🏢 **Your Businesses:** ${totalBusinesses} registered, ${activeBusinesses} active
🏛️ **Permits:** ${permits.length} total, ${permits.filter(p => p.status === 'completed').length} completed
⚡ **Urgent Actions:** ${urgentActions.length} pending
📍 **Main Municipality:** ${userProfile?.municipality || 'Not specified'}

📊 **General Status:** ${
  urgentActions.length === 0 ? '🟢 Excellent - Everything up to date' :
  urgentActions.length <= 2 ? '🟡 Good - Few pending actions' :
  '🔴 Requires attention - Several urgent actions'
}

💡 **Recommended next step:** ${
  urgentActions.length > 0 ? 'Address pending urgent actions' :
  'Schedule maintenance reviews and renewals'
}`;
  }
}

function generateContextualResponse(userMessage: string, businesses: any[], language: 'es' | 'en', userProfile: any, articles: KnowledgeArticle[]): string {
  const hasBusinesses = businesses.length > 0;
  const mainBusiness = hasBusinesses ? businesses[0] : null;
  
  if (language === 'es') {
    return `He analizado tu consulta "${userMessage}" considerando tu situación específica:

${hasBusinesses ? `
🎯 **Contexto de tu negocio:**
- **${mainBusiness.name}** (${mainBusiness.type}) en ${mainBusiness.municipality}
- Estado actual: ${mainBusiness.status}
` : ''}

📚 **Basándome en nuestra base de conocimientos**, encontré información relevante que se aplica a tu situación.

💡 **Recomendación personalizada:**
${hasBusinesses ? 
  `Para tu negocio en ${mainBusiness.municipality}, te sugiero revisar los requisitos específicos del municipio y considerar tu tipo de actividad comercial.` :
  'Te recomiendo registrar tu primer negocio para poder brindarte asesoría más específica.'
}

${articles.length > 0 ? '📖 He encontrado artículos específicos que pueden ayudarte con información detallada.' : ''}

¿Te gustaría que profundice en algún aspecto específico de tu situación?`;
  } else {
    return `I've analyzed your query "${userMessage}" considering your specific situation:

${hasBusinesses ? `
🎯 **Your business context:**
- **${mainBusiness.name}** (${mainBusiness.type}) in ${mainBusiness.municipality}
- Current status: ${mainBusiness.status}
` : ''}

📚 **Based on our knowledge base**, I found relevant information that applies to your situation.

💡 **Personalized recommendation:**
${hasBusinesses ? 
  `For your business in ${mainBusiness.municipality}, I suggest reviewing the municipality's specific requirements and considering your commercial activity type.` :
  'I recommend registering your first business so I can provide more specific advice.'
}

${articles.length > 0 ? '📖 I found specific articles that can help you with detailed information.' : ''}

Would you like me to go deeper into any specific aspect of your situation?`;
  }
}
