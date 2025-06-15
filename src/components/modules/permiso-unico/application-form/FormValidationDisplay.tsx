
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface FormValidationDisplayProps {
  validationErrors: string[];
}

export const FormValidationDisplay = ({ validationErrors }: FormValidationDisplayProps) => {
  if (validationErrors.length === 0) return null;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-1">
          <p className="font-medium">Por favor corrige los siguientes errores:</p>
          <ul className="list-disc list-inside space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
};
