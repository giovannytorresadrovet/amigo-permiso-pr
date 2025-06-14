
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VerificationAlertProps {
  language: 'es' | 'en';
  hasAccess: boolean;
}

export const VerificationAlert = ({ language, hasAccess }: VerificationAlertProps) => {
  if (hasAccess) return null;

  return (
    <div className="px-4 mt-4">
      <Alert className="border-blue-200 bg-blue-50">
        <AlertTriangle className="w-4 h-4 text-blue-600" />
        <AlertDescription className="text-blue-800 text-xs">
          {language === 'es' 
            ? 'Verifica tu identidad para acceder a todas las funciones.'
            : 'Verify your identity to access all features.'
          }
        </AlertDescription>
      </Alert>
    </div>
  );
};
