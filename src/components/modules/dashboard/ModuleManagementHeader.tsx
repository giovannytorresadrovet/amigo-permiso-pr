
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface ModuleManagementHeaderProps {
  language: 'es' | 'en';
  userSubscription?: {
    tier: string | null;
    expiresAt?: Date;
    isActive?: boolean;
  };
}

export const ModuleManagementHeader = ({ 
  language, 
  userSubscription 
}: ModuleManagementHeaderProps) => {
  const getSubscriptionBadgeColor = (tier: string | null) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'basic': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          {language === 'es' ? 'Gestión de Módulos' : 'Module Management'}
        </h1>
        <p className="text-gray-600">
          {language === 'es' 
            ? 'Gestiona e instala módulos para tu plataforma'
            : 'Manage and install modules for your platform'
          }
        </p>
      </div>
      
      {userSubscription && (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-600">
              {language === 'es' ? 'Plan actual' : 'Current plan'}
            </div>
            <Badge className={getSubscriptionBadgeColor(userSubscription.tier)}>
              <Shield className="w-3 h-3 mr-1" />
              {userSubscription.tier?.toUpperCase() || 'FREE'}
            </Badge>
          </div>
          {userSubscription.expiresAt && (
            <div className="text-right">
              <div className="text-sm text-gray-600">
                {language === 'es' ? 'Expira' : 'Expires'}
              </div>
              <div className="text-sm font-medium">
                {new Date(userSubscription.expiresAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
