
import type { SecureUserContext } from '../security/types';

export class ContextualResponseGenerator {
  static generateSecureContextualResponse(userMessage: string, userContext: SecureUserContext, language: 'es' | 'en', articles: any[]): string {
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
}
