import { Button } from '@/components/ui/button';
import { Plus, Shield, FileText, Settings, Lock } from 'lucide-react';
import { useUserManagement } from '@/contexts/UserManagement';

interface QuickActionsProps {
  language: 'es' | 'en';
  onNewBusiness: () => void;
  onEmergencyMode: () => void;
  hasBusinesses: boolean;
}

export const QuickActions = ({ 
  language, 
  onNewBusiness, 
  onEmergencyMode, 
  hasBusinesses 
}: QuickActionsProps) => {
  const { businessCreationAccess } = useUserManagement();

  const handleNewBusinessClick = () => {
    if (businessCreationAccess.hasAccess) {
      onNewBusiness();
    } else {
      // This will trigger the verification prompt in the wizard guard
      onNewBusiness();
    }
  };

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      <Button 
        onClick={handleNewBusinessClick}
        className={`h-20 ${businessCreationAccess.hasAccess ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 hover:bg-gray-500'}`}
        title={!businessCreationAccess.hasAccess ? (language === 'es' ? 'Verificación requerida' : 'Verification required') : undefined}
      >
        <div className="text-center">
          {businessCreationAccess.hasAccess ? (
            <Plus className="w-6 h-6 mx-auto mb-1" />
          ) : (
            <Lock className="w-6 h-6 mx-auto mb-1" />
          )}
          <span className="text-sm">
            {language === 'es' ? 'Nuevo Negocio' : 'New Business'}
          </span>
          {!businessCreationAccess.hasAccess && (
            <div className="text-xs opacity-75">
              {language === 'es' ? 'Verificación requerida' : 'Verification required'}
            </div>
          )}
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="h-20"
        onClick={onEmergencyMode}
        disabled={!hasBusinesses}
      >
        <div className="text-center">
          <Shield className="w-6 h-6 mx-auto mb-1 text-red-500" />
          <span className="text-sm">{language === 'es' ? 'Modo Emergencia' : 'Emergency Mode'}</span>
        </div>
      </Button>
      
      <Button variant="outline" className="h-20">
        <div className="text-center">
          <FileText className="w-6 h-6 mx-auto mb-1" />
          <span className="text-sm">{language === 'es' ? 'Documentos' : 'Documents'}</span>
        </div>
      </Button>
      
      <Button variant="outline" className="h-20">
        <div className="text-center">
          <Settings className="w-6 h-6 mx-auto mb-1" />
          <span className="text-sm">{language === 'es' ? 'Configuración' : 'Settings'}</span>
        </div>
      </Button>
    </div>
  );
};
