
import { Button } from '@/components/ui/button';
import { TrustBadge } from '@/components/ui/trust-badge';
import { Plus, Shield, FileText, Settings, Lock, CheckCircle } from 'lucide-react';
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
    <div className="grid md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
      {/* New Business Action - Enhanced with trust indicators */}
      <Button 
        onClick={handleNewBusinessClick}
        className={`h-24 relative overflow-hidden transition-professional shadow-professional hover:shadow-professional-lg ${
          businessCreationAccess.hasAccess 
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
            : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
        }`}
        title={!businessCreationAccess.hasAccess ? (language === 'es' ? 'Verificación requerida' : 'Verification required') : undefined}
      >
        <div className="text-center relative z-10">
          <div className="flex items-center justify-center mb-2">
            {businessCreationAccess.hasAccess ? (
              <Plus className="w-6 h-6" />
            ) : (
              <Lock className="w-6 h-6" />
            )}
          </div>
          <span className="text-sm font-medium">
            {language === 'es' ? 'Nuevo Negocio' : 'New Business'}
          </span>
          <div className="mt-1">
            {businessCreationAccess.hasAccess ? (
              <TrustBadge variant="verified" size="sm" className="bg-green-100/20 text-green-100 border-green-200/30">
                <CheckCircle className="w-3 h-3" />
                {language === 'es' ? 'Verificado' : 'Verified'}
              </TrustBadge>
            ) : (
              <TrustBadge variant="warning" size="sm" className="bg-amber-100/20 text-amber-100 border-amber-200/30">
                {language === 'es' ? 'Verificación requerida' : 'Verification required'}
              </TrustBadge>
            )}
          </div>
        </div>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </Button>
      
      {/* Emergency Mode - Enhanced */}
      <Button 
        variant="outline" 
        className="h-24 border-red-200 hover:bg-red-50 hover:border-red-300 transition-professional shadow-professional hover:shadow-professional-lg"
        onClick={onEmergencyMode}
        disabled={!hasBusinesses}
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <span className="text-sm font-medium">{language === 'es' ? 'Modo Emergencia' : 'Emergency Mode'}</span>
          <div className="mt-1">
            <TrustBadge variant="error" size="sm">
              {language === 'es' ? 'Seguro' : 'Secure'}
            </TrustBadge>
          </div>
        </div>
      </Button>
      
      {/* Documents - Enhanced */}
      <Button 
        variant="outline" 
        className="h-24 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-professional shadow-professional hover:shadow-professional-lg"
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <FileText className="w-6 h-6 text-slate-600" />
          </div>
          <span className="text-sm font-medium">{language === 'es' ? 'Documentos' : 'Documents'}</span>
          <div className="mt-1">
            <TrustBadge variant="info" size="sm">
              {language === 'es' ? 'Protegido' : 'Protected'}
            </TrustBadge>
          </div>
        </div>
      </Button>
      
      {/* Settings - Enhanced */}
      <Button 
        variant="outline" 
        className="h-24 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-professional shadow-professional hover:shadow-professional-lg"
      >
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Settings className="w-6 h-6 text-slate-600" />
          </div>
          <span className="text-sm font-medium">{language === 'es' ? 'Configuración' : 'Settings'}</span>
          <div className="mt-1">
            <TrustBadge variant="info" size="sm">
              {language === 'es' ? 'Privado' : 'Private'}
            </TrustBadge>
          </div>
        </div>
      </Button>
    </div>
  );
};
