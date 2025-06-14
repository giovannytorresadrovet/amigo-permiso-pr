
import { Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusinessListTitleProps {
  onNewBusiness: () => void;
  showVerificationWarning?: boolean;
}

export const BusinessListTitle = ({
  onNewBusiness,
  showVerificationWarning = false
}: BusinessListTitleProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mis Negocios</h1>
        <p className="text-slate-600">
          Administra y monitorea el estado de tus negocios registrados
        </p>
      </div>
      
      <Button 
        onClick={onNewBusiness}
        className={`${showVerificationWarning ? 'bg-gray-400 hover:bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {showVerificationWarning ? (
          <>
            <Shield className="w-4 h-4 mr-2" />
            Verificación Requerida
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Negocio
          </>
        )}
      </Button>
    </div>
  );
};
