
import type { SecureUserContext } from '../security/types';

export class BusinessResponseGenerator {
  static generateSecureBusinessSummary(userContext: SecureUserContext, language: 'es' | 'en'): string {
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
}
