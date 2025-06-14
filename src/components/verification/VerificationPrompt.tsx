
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { useUserManagement } from '@/contexts/UserManagementContext';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';

interface VerificationPromptProps {
  language: 'es' | 'en';
  onClose?: () => void;
  required?: boolean;
}

export const VerificationPrompt = ({ language, onClose, required = false }: VerificationPromptProps) => {
  const { user, startVerification, isLoading, error } = useUserManagement();
  const [isStarting, setIsStarting] = useState(false);
  const { notifySuccess, notifyError } = useNotificationEffects();

  const handleStartVerification = async () => {
    setIsStarting(true);
    try {
      const verificationUrl = await startVerification();
      
      notifySuccess(
        language === 'es' ? 'Verificación Iniciada' : 'Verification Started',
        language === 'es' 
          ? 'Serás redirigido a ID.me para completar la verificación.'
          : 'You will be redirected to ID.me to complete verification.',
        false
      );

      // Redirect to ID.me
      window.location.href = verificationUrl;
    } catch (err) {
      notifyError(
        language === 'es' ? 'Error de Verificación' : 'Verification Error',
        language === 'es' 
          ? 'No se pudo iniciar la verificación. Inténtalo de nuevo.'
          : 'Could not start verification. Please try again.',
        true
      );
    } finally {
      setIsStarting(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="w-full max-w-md mx-auto bg-blue-50 border-blue-200">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl text-blue-900">
          {language === 'es' ? 'Verificación de Identidad Requerida' : 'Identity Verification Required'}
        </CardTitle>
        <CardDescription className="text-blue-700">
          {language === 'es' 
            ? 'Para crear y gestionar negocios, necesitas verificar tu identidad con ID.me'
            : 'To create and manage businesses, you need to verify your identity with ID.me'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <span className="text-sm text-gray-700">
              {language === 'es' 
                ? 'Proceso seguro y encriptado'
                : 'Secure and encrypted process'
              }
            </span>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <span className="text-sm text-gray-700">
              {language === 'es' 
                ? 'Solo toma unos minutos'
                : 'Takes only a few minutes'
              }
            </span>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
            <span className="text-sm text-gray-700">
              {language === 'es' 
                ? 'Cumple con regulaciones federales'
                : 'Complies with federal regulations'
              }
            </span>
          </div>
        </div>

        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <Button 
            onClick={handleStartVerification}
            disabled={isLoading || isStarting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isStarting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {language === 'es' ? 'Iniciando...' : 'Starting...'}
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Verificar con ID.me' : 'Verify with ID.me'}
              </>
            )}
          </Button>
          
          {!required && onClose && (
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              {language === 'es' ? 'Verificar Más Tarde' : 'Verify Later'}
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500 text-center">
          {language === 'es' 
            ? 'ID.me es un servicio seguro de verificación de identidad usado por el gobierno estadounidense'
            : 'ID.me is a secure identity verification service used by the U.S. government'
          }
        </div>
      </CardContent>
    </Card>
  );
};
