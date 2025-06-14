
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrustBadge } from '@/components/ui/trust-badge';
import { Bell, LogOut, ShieldCheck, Shield, AlertTriangle } from 'lucide-react';
import { useUserManagement } from '@/contexts/UserManagement';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
  identityVerified: boolean;
  verificationStatus: 'pending' | 'in_progress' | 'verified' | 'failed';
}

interface AppHeaderProps {
  user: User;
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
  onLogout: () => void;
  urgentNotifications: number;
}

export const AppHeader = ({ 
  user, 
  language, 
  onLanguageChange, 
  onLogout, 
  urgentNotifications 
}: AppHeaderProps) => {
  const { businessCreationAccess } = useUserManagement();

  const getVerificationBadge = () => {
    if (user.identityVerified && user.verificationStatus === 'verified') {
      return (
        <TrustBadge variant="verified">
          {language === 'es' ? 'Verificado' : 'Verified'}
        </TrustBadge>
      );
    }

    if (user.verificationStatus === 'failed') {
      return (
        <TrustBadge variant="error">
          {language === 'es' ? 'Verificación Fallida' : 'Verification Failed'}
        </TrustBadge>
      );
    }

    if (user.verificationStatus === 'in_progress') {
      return (
        <TrustBadge variant="info">
          {language === 'es' ? 'En Proceso' : 'In Progress'}
        </TrustBadge>
      );
    }

    return (
      <TrustBadge variant="warning">
        {language === 'es' ? 'Sin Verificar' : 'Unverified'}
      </TrustBadge>
    );
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-professional border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Permisoria
              </div>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
              Beta - Toa Baja
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hover:bg-slate-50 transition-professional">
              <Bell className="w-5 h-5" />
              {urgentNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center animate-pulse-gentle">
                  {urgentNotifications}
                </Badge>
              )}
            </Button>
            
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
              className="border-slate-200 hover:bg-slate-50 transition-professional"
            >
              {language === 'es' ? '🇺🇸 EN' : '🇵🇷 ES'}
            </Button>
            
            {/* User Menu with Enhanced Verification Status */}
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900">{user.firstName} {user.lastName}</p>
                  {getVerificationBadge()}
                </div>
                <p className="text-slate-600 text-xs">{user.email}</p>
                {!businessCreationAccess.hasAccess && (
                  <p className="text-xs text-amber-600 mt-1">
                    {language === 'es' ? 'Verificación requerida para crear negocios' : 'Verification required to create businesses'}
                  </p>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout}
                className="hover:bg-red-50 hover:text-red-600 transition-professional"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
