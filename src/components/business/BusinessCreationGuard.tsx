
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, AlertTriangle } from 'lucide-react';
import { useUserManagement } from '@/contexts/UserManagementContext';
import { VerificationPrompt } from '@/components/verification/VerificationPrompt';

interface BusinessCreationGuardProps {
  children: ReactNode;
  language: 'es' | 'en';
  showPrompt?: boolean;
}

export const BusinessCreationGuard = ({ 
  children, 
  language, 
  showPrompt = true 
}: BusinessCreationGuardProps) => {
  const { user, businessCreationAccess } = useUserManagement();

  // If user has access, render children
  if (businessCreationAccess.hasAccess) {
    return <>{children}</>;
  }

  // If no user, show basic message
  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <Lock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <CardTitle>
            {language === 'es' ? 'Acceso Requerido' : 'Access Required'}
          </CardTitle>
          <CardDescription>
            {language === 'es' 
              ? 'Necesitas iniciar sesión para crear negocios.'
              : 'You need to sign in to create businesses.'
            }
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Show verification prompt if required
  if (businessCreationAccess.requiresVerification && showPrompt) {
    return (
      <div className="space-y-6">
        <VerificationPrompt 
          language={language} 
          required={true}
        />
        
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <AlertDescription className="text-yellow-700">
            {language === 'es' 
              ? 'La creación de negocios está restringida hasta completar la verificación de identidad.'
              : 'Business creation is restricted until identity verification is completed.'
            }
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Show access denied message
  return (
    <Card className="w-full max-w-md mx-auto border-red-200 bg-red-50">
      <CardHeader className="text-center">
        <Shield className="w-12 h-12 mx-auto text-red-500 mb-4" />
        <CardTitle className="text-red-900">
          {language === 'es' ? 'Acceso Denegado' : 'Access Denied'}
        </CardTitle>
        <CardDescription className="text-red-700">
          {businessCreationAccess.reason === 'verification_failed' && (
            language === 'es' 
              ? 'La verificación de identidad falló. Contacta soporte para asistencia.'
              : 'Identity verification failed. Contact support for assistance.'
          )}
          {businessCreationAccess.reason === 'account_suspended' && (
            language === 'es' 
              ? 'Tu cuenta está suspendida. Contacta soporte.'
              : 'Your account is suspended. Contact support.'
          )}
          {businessCreationAccess.reason === 'not_verified' && (
            language === 'es' 
              ? 'Se requiere verificación de identidad para crear negocios.'
              : 'Identity verification is required to create businesses.'
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Alert className="border-red-300 bg-red-100">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {language === 'es' 
              ? 'No puedes crear o gestionar negocios sin verificación de identidad completada.'
              : 'You cannot create or manage businesses without completed identity verification.'
            }
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
