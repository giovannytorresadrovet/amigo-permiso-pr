
import { Button } from '@/components/ui/button';
import { Plus, Shield, FileText, Settings } from 'lucide-react';

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
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      <Button 
        onClick={onNewBusiness}
        className="h-20 bg-blue-600 hover:bg-blue-700"
      >
        <div className="text-center">
          <Plus className="w-6 h-6 mx-auto mb-1" />
          <span className="text-sm">{language === 'es' ? 'Nuevo Negocio' : 'New Business'}</span>
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
