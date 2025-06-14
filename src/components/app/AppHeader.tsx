import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
        <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          {language === 'es' ? 'Verificado' : 'Verified'}
        </Badge>
      );
    }

    if (user.verificationStatus === 'failed') {
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {language === 'es' ? 'Verificación Fallida' : 'Verification Failed'}
        </Badge>
      );
    }

    if (user.verificationStatus === 'in_progress') {
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200 flex items-center gap-1">
          <Shield className="w-3 h-3" />
          {language === 'es' ? 'En Proceso' : 'In Progress'}
        </Badge>
      );
    }

    return (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
        <Shield className="w-3 h-3" />
        {language === 'es' ? 'Sin Verificar' : 'Unverified'}
      </Badge>
    );
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-600">Permisoria</div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Beta - Toa Baja
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {urgentNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs">
                  {urgentNotifications}
                </Badge>
              )}
            </Button>
            
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
            >
              {language === 'es' ? '🇺🇸 EN' : '🇵🇷 ES'}
            </Button>
            
            {/* User Menu with Verification Status */}
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  {getVerificationBadge()}
                </div>
                <p className="text-gray-500">{user.email}</p>
                {!businessCreationAccess.hasAccess && (
                  <p className="text-xs text-yellow-600">
                    {language === 'es' ? 'Verificación requerida para crear negocios' : 'Verification required to create businesses'}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
