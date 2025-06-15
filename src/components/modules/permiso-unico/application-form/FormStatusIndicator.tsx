
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock } from 'lucide-react';

interface FormStatusIndicatorProps {
  isDraft: boolean;
  lastSaved?: Date;
}

export const FormStatusIndicator = ({ isDraft, lastSaved }: FormStatusIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {isDraft ? (
          <>
            <Clock className="w-4 h-4 text-yellow-600" />
            <Badge variant="secondary">Borrador</Badge>
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 text-green-600" />
            <Badge variant="default">Enviado</Badge>
          </>
        )}
      </div>
      {lastSaved && (
        <p className="text-sm text-gray-500">
          Guardado: {lastSaved.toLocaleString()}
        </p>
      )}
    </div>
  );
};
