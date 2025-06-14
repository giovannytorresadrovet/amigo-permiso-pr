
import type { SecureUserContext } from '../security/types';

export class DocumentsResponseGenerator {
  static generateSecureDocumentsResponse(documents: any[], userContext: SecureUserContext, language: 'es' | 'en'): string {
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
}
