
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, LogOut } from 'lucide-react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
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
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-sm">
                <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-gray-500">{user.email}</p>
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
