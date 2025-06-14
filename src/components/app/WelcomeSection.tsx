import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, ShieldCheck, ExternalLink } from 'lucide-react';
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
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {language === 'es' ? `¡Hola, ${user.firstName}!` : `Hello, ${user.firstName}!`}
      </h1>
      <p className="text-gray-600">
        {language === 'es' 
          ? 'Administra tus negocios y mantén tus permisos al día.'
          : 'Manage your businesses and keep your permits up to date.'
        }
      </p>

      {/* Verification Status Alerts */}
      {!user.identityVerified && user.verificationStatus === 'pending' && (
        <Alert className="mt-6 border-blue-200 bg-blue-50">
          <Shield className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-800 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {language === 'es' ? 'Verificación de Identidad Requerida' : 'Identity Verification Required'}
              </p>
              <p className="text-sm mt-1">
                {language === 'es' 
                  ? 'Para crear y gestionar negocios, necesitas verificar tu identidad.'
                  : 'To create and manage businesses, you need to verify your identity.'
                }
              </p>
            </div>
            <Button 
              onClick={handleStartVerification}
              disabled={isLoading}
              className="ml-4 bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Verificar Ahora' : 'Verify Now'}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {user.verificationStatus === 'in_progress' && (
        <Alert className="mt-6 border-blue-200 bg-blue-50">
          <Shield className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <p className="font-medium">
              {language === 'es' ? 'Verificación en Proceso' : 'Verification in Progress'}
            </p>
            <p className="text-sm mt-1">
              {language === 'es' 
                ? 'Tu verificación de identidad está siendo procesada. Esto puede tomar unos minutos.'
                : 'Your identity verification is being processed. This may take a few minutes.'
              }
            </p>
          </AlertDescription>
        </Alert>
      )}

      {user.verificationStatus === 'failed' && (
        <Alert className="mt-6 border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {language === 'es' ? 'Verificación Fallida' : 'Verification Failed'}
              </p>
              <p className="text-sm mt-1">
                {language === 'es' 
                  ? 'No se pudo verificar tu identidad. Inténtalo de nuevo o contacta soporte.'
                  : 'Could not verify your identity. Please try again or contact support.'
                }
              </p>
            </div>
            <Button 
              onClick={handleStartVerification}
              disabled={isLoading}
              variant="destructive"
              className="ml-4"
            >
              {language === 'es' ? 'Intentar de Nuevo' : 'Try Again'}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {user.identityVerified && user.verificationStatus === 'verified' && (
        <Alert className="mt-6 border-green-200 bg-green-50">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <p className="font-medium">
              {language === 'es' ? '✅ Identidad Verificada' : '✅ Identity Verified'}
            </p>
            <p className="text-sm mt-1">
              {language === 'es' 
                ? 'Tu identidad ha sido verificada exitosamente. Ahora puedes crear y gestionar negocios.'
                : 'Your identity has been successfully verified. You can now create and manage businesses.'
              }
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Urgent Alerts */}
      {urgentNotifications > 0 && (
        <Alert className="mt-6 border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {language === 'es' 
              ? `Tienes ${urgentNotifications} permisos que vencen pronto. Revisa tus negocios.`
              : `You have ${urgentNotifications} permits expiring soon. Review your businesses.`
            }
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
