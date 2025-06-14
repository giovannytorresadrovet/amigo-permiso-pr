
import type { SecureUserContext } from '../security/types';

export class PermitsResponseGenerator {
  static generateSecurePermitsResponse(permits: any[], userContext: SecureUserContext, language: 'es' | 'en'): string {
    const activePermits = permits.filter(p => p.status === 'completed');
    const pendingPermits = permits.filter(p => p.status === 'pending');
    
    if (language === 'es') {
      return `🔒 **Permisos de ${userContext.userProfile.metadata?.firstName || userContext.userProfile.name}**

🏛️ **Estado seguro de tus permisos:**
- ✅ Activos: ${activePermits.length}
- ⏳ En proceso: ${pendingPermits.length}
- ❗ Requeridos: ${permits.filter(p => p.status === 'required').length}

🛡️ **Privacidad garantizada:** Esta información es exclusivamente tuya y está protegida.

💡 **Próximo paso:** ${pendingPermits.length > 0 ? 'Completar permisos pendientes' : 'Mantener renovaciones al día'}`;
    } else {
      return `🔒 **Permits for ${userContext.userProfile.metadata?.firstName || userContext.userProfile.name}**

🏛️ **Secure status of your permits:**
- ✅ Active: ${activePermits.length}
- ⏳ In process: ${pendingPermits.length}
- ❗ Required: ${permits.filter(p => p.status === 'required').length}

🛡️ **Privacy guaranteed:** This information is exclusively yours and protected.

💡 **Next step:** ${pendingPermits.length > 0 ? 'Complete pending permits' : 'Keep renewals up to date'}`;
    }
  }
}
