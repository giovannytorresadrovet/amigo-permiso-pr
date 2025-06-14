
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface BusinessCardActionsProps {
  businessId: string;
  businessStatus: string;
  onBusinessSelect: (businessId: string) => void;
}

export const BusinessCardActions = ({ businessId, businessStatus, onBusinessSelect }: BusinessCardActionsProps) => {
  return (
    <div className="flex space-x-2 pt-2 border-t border-slate-100">
      <Button
        onClick={() => onBusinessSelect(businessId)}
        variant="outline"
        size="sm"
        className="flex-1 hover:bg-blue-50 hover:border-blue-200 transition-all"
      >
        <Eye className="w-4 h-4 mr-1" />
        Ver detalles
      </Button>
      
      {businessStatus === 'pending' && (
        <Button
          size="sm"
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
        >
          Completar
        </Button>
      )}
    </div>
  );
};
