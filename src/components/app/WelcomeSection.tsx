
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { TrustBadge } from '@/components/ui/trust-badge';
import { AlertTriangle, Shield, ShieldCheck, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import { useUserManagement } from '@/contexts/UserManagement';

interface User {
  firstName: string;
  identityVerified: boolean;
  verificationStatus: 'pending' | 'in_progress' | 'verified' | 'failed';
}

interface WelcomeSectionProps {
  user: User;
  language: 'es' | 'en';
  urgentNotifications: number;
}

export const WelcomeSection = ({ user, language, urgentNotifications }: WelcomeSectionProps) => {
  const { businessCreationAccess, startVerification, isLoading } = useUserManagement();

  const handleStartVerification = async () => {
    try {
      const verificationUrl = await startVerification();
      window.location.href = verificationUrl;
    } catch (error) {
      console.error('Failed to start verification:', error);
    }
  };

  return (
    <div className="mb-8 animate-fade-in-up">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          {language === 'es' ? `¡Hola, ${user.firstName}!` : `Hello, ${user.firstName}!`}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          {language === 'es' 
            ? 'Administra tus negocios de forma segura y mantén tus permisos al día con nuestra plataforma confiable.'
            : 'Securely manage your businesses and keep your permits up to date with our trusted platform.'
          }
        </p>
      </div>

      {/* Enhanced Verification Status Alerts */}
      {!user.identityVerified && user.verificationStatus === 'pending' && (
        <Alert className="border-blue-200 bg-blue-50/50 backdrop-blur-sm shadow-professional animate-scale-in">
          <Shield className="w-5 h-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-base">
                    {language === 'es' ? 'Verificación de Identidad Requerida' : 'Identity Verification Required'}
                  </h3>
                  <TrustBadge variant="info" size="sm">
                    {language === 'es' ? 'Seguro' : 'Secure'}
                  </TrustBadge>
                </div>
                <p className="text-sm text-blue-800 mb-3">
                  {language === 'es' 
                    ? 'Para crear y gestionar negocios de forma segura, necesitas verificar tu identidad usando ID.me, nuestro proveedor de verificación confiable.'
                    : 'To securely create and manage businesses, you need to verify your identity using ID.me, our trusted verification provider.'
                  }
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-700">
                  <CheckCircle className="w-3 h-3" />
                  <span>{language === 'es' ? 'Proceso 100% seguro' : '100% secure process'}</span>
                  <span>•</span>
                  <span>{language === 'es' ? 'Datos protegidos' : 'Protected data'}</span>
                  <span>•</span>
                  <span>{language === 'es' ? 'Verificación instantánea' : 'Instant verification'}</span>
                </div>
              </div>
              <Button 
                onClick={handleStartVerification}
                disabled={isLoading}
                className="ml-4 bg-blue-600 hover:bg-blue-700 shadow-professional transition-professional"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Verificar Ahora' : 'Verify Now'}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {user.verificationStatus === 'in_progress' && (
        <Alert className="border-blue-200 bg-blue-50/50 backdrop-blur-sm shadow-professional animate-scale-in">
          <Clock className="w-5 h-5 text-blue-600 animate-pulse-gentle" />
          <AlertDescription className="text-blue-900">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-base">
                {language === 'es' ? 'Verificación en Proceso' : 'Verification in Progress'}
              </h3>
              <TrustBadge variant="info" size="sm">
                {language === 'es' ? 'Procesando' : 'Processing'}
              </TrustBadge>
            </div>
            <p className="text-sm text-blue-800">
              {language === 'es' 
                ? 'Tu verificación de identidad está siendo procesada de forma segura. Esto puede tomar unos minutos.'
                : 'Your identity verification is being processed securely. This may take a few minutes.'
              }
            </p>
          </AlertDescription>
        </Alert>
      )}

      {user.verificationStatus === 'failed' && (
        <Alert className="border-red-200 bg-red-50/50 backdrop-blur-sm shadow-professional animate-scale-in">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <AlertDescription className="text-red-900">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-base">
                    {language === 'es' ? 'Verificación Fallida' : 'Verification Failed'}
                  </h3>
                  <TrustBadge variant="error" size="sm">
                    {language === 'es' ? 'Acción Requerida' : 'Action Required'}
                  </TrustBadge>
                </div>
                <p className="text-sm text-red-800">
                  {language === 'es' 
                    ? 'No se pudo verificar tu identidad. Inténtalo de nuevo o contacta nuestro soporte seguro.'
                    : 'Could not verify your identity. Please try again or contact our secure support.'
                  }
                </p>
              </div>
              <Button 
                onClick={handleStartVerification}
                disabled={isLoading}
                variant="destructive"
                className="ml-4 shadow-professional transition-professional"
              >
                {language === 'es' ? 'Intentar de Nuevo' : 'Try Again'}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {user.identityVerified && user.verificationStatus === 'verified' && (
        <Alert className="border-green-200 bg-green-50/50 backdrop-blur-sm shadow-professional animate-scale-in">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <AlertDescription className="text-green-900">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-base">
                {language === 'es' ? '✅ Identidad Verificada' : '✅ Identity Verified'}
              </h3>
              <TrustBadge variant="verified" size="sm">
                {language === 'es' ? 'Confiable' : 'Trusted'}
              </TrustBadge>
            </div>
            <p className="text-sm text-green-800">
              {language === 'es' 
                ? 'Tu identidad ha sido verificada exitosamente de forma segura. Ahora puedes crear y gestionar negocios con total confianza.'
                : 'Your identity has been successfully verified securely. You can now create and manage businesses with complete confidence.'
              }
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced Urgent Alerts */}
      {urgentNotifications > 0 && (
        <Alert className="mt-4 border-amber-200 bg-amber-50/50 backdrop-blur-sm shadow-professional animate-scale-in">
          <AlertTriangle className="w-5 h-5 text-amber-600 animate-pulse-gentle" />
          <AlertDescription className="text-amber-900">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">
                {language === 'es' ? 'Atención Requerida' : 'Attention Required'}
              </h3>
              <TrustBadge variant="warning" size="sm">
                {language === 'es' ? 'Urgente' : 'Urgent'}
              </TrustBadge>
            </div>
            <p className="text-sm">
              {language === 'es' 
                ? `Tienes ${urgentNotifications} permisos que vencen pronto. Mantén tu negocio en regla revisando tus permisos.`
                : `You have ${urgentNotifications} permits expiring soon. Keep your business compliant by reviewing your permits.`
              }
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
