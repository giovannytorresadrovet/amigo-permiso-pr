
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  RefreshCw 
} from 'lucide-react';
import { useUserManagement } from '@/contexts/UserManagementContext';

interface VerificationStatusProps {
  language: 'es' | 'en';
  showActions?: boolean;
}

export const VerificationStatus = ({ language, showActions = true }: VerificationStatusProps) => {
  const { user, verificationSession, startVerification, isLoading } = useUserManagement();

  if (!user) return null;

  const getStatusIcon = () => {
    switch (user.verificationStatus) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (user.verificationStatus) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            {language === 'es' ? 'Verificado' : 'Verified'}
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            {language === 'es' ? 'Falló' : 'Failed'}
          </Badge>
        );
      case 'in_progress':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            {language === 'es' ? 'En Proceso' : 'In Progress'}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            {language === 'es' ? 'Pendiente' : 'Pending'}
          </Badge>
        );
    }
  };

  const getStatusMessage = () => {
    switch (user.verificationStatus) {
      case 'verified':
        return language === 'es' 
          ? `Identidad verificada el ${user.verificationDate?.toLocaleDateString()}`
          : `Identity verified on ${user.verificationDate?.toLocaleDateString()}`;
      case 'failed':
        return language === 'es' 
          ? 'La verificación de identidad falló. Inténtalo de nuevo.'
          : 'Identity verification failed. Please try again.';
      case 'in_progress':
        return language === 'es' 
          ? 'Verificación en proceso. Esto puede tomar unos minutos.'
          : 'Verification in progress. This may take a few minutes.';
      default:
        return language === 'es' 
          ? 'La verificación de identidad es requerida para crear negocios.'
          : 'Identity verification is required to create businesses.';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <CardTitle className="text-lg">
              {language === 'es' ? 'Estado de Verificación' : 'Verification Status'}
            </CardTitle>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-gray-600">
          {getStatusMessage()}
        </p>

        {user.verificationStatus === 'verified' && user.verificationDate && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <AlertDescription className="text-green-700">
              {language === 'es' 
                ? `Rol actualizado a: Propietario de Negocio`
                : `Role updated to: Business Owner`
              }
            </AlertDescription>
          </Alert>
        )}

        {user.verificationStatus === 'failed' && showActions && (
          <div className="space-y-3">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <AlertDescription className="text-red-700">
                {language === 'es' 
                  ? 'No se pudo verificar tu identidad. Contacta soporte si el problema persiste.'
                  : 'Could not verify your identity. Contact support if the problem persists.'
                }
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={() => startVerification()}
              disabled={isLoading}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Intentar de Nuevo' : 'Try Again'}
            </Button>
          </div>
        )}

        {verificationSession && verificationSession.status === 'in_progress' && (
          <Alert className="border-blue-200 bg-blue-50">
            <Clock className="w-4 h-4 text-blue-500" />
            <AlertDescription className="text-blue-700">
              {language === 'es' 
                ? `Sesión de verificación iniciada: ${verificationSession.createdAt.toLocaleTimeString()}`
                : `Verification session started: ${verificationSession.createdAt.toLocaleTimeString()}`
              }
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
