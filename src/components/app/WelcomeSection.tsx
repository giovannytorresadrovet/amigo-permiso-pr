
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface User {
  firstName: string;
}

interface WelcomeSectionProps {
  user: User;
  language: 'es' | 'en';
  urgentNotifications: number;
}

export const WelcomeSection = ({ user, language, urgentNotifications }: WelcomeSectionProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {language === 'es' ? `¡Hola, ${user.firstName}!` : `Hello, ${user.firstName}!`}
      </h1>
      <p className="text-gray-600">
        {language === 'es' 
          ? 'Administra tus negocios y mantén tus permisos al día.'
          : 'Manage your businesses and keep your permits up to date.'
        }
      </p>

      {/* Urgent Alerts */}
      {urgentNotifications > 0 && (
        <Alert className="mt-6 border-red-200 bg-red-50">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {language === 'es' 
              ? `Tienes ${urgentNotifications} permisos que vencen pronto. Revisa tus negocios.`
              : `You have ${urgentNotifications} permits expiring soon. Review your businesses.`
            }
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
