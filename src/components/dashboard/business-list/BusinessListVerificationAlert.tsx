
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const BusinessListVerificationAlert = () => {
  return (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertTriangle className="w-4 h-4 text-yellow-600" />
      <AlertDescription className="text-yellow-800">
        <p className="font-medium">Verificación de Identidad Requerida</p>
        <p className="text-sm mt-1">
          Para ver y crear negocios, necesitas completar la verificación de identidad. 
          Haz clic en "Verificación Requerida" para comenzar el proceso.
        </p>
      </AlertDescription>
    </Alert>
  );
};
