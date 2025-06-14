
import type { SecureUserContext } from '../security/types';

export class SecurityResponseGenerator {
  static generateSecurityInformationResponse(userContext: SecureUserContext, language: 'es' | 'en'): string {
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
}
