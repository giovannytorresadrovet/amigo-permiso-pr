
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SubscriptionTabProps {
  language: 'es' | 'en';
  userSubscription?: {
    tier: string | null;
    isActive?: boolean;
    features?: string[];
  };
}

export const SubscriptionTab = ({ language, userSubscription }: SubscriptionTabProps) => {
  const getSubscriptionBadgeColor = (tier: string | null) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'basic': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'es' ? 'Gestión de Suscripción' : 'Subscription Management'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">
              {language === 'es' ? 'Plan Actual' : 'Current Plan'}
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <Badge className={getSubscriptionBadgeColor(userSubscription?.tier)}>
                  {userSubscription?.tier?.toUpperCase() || 'FREE'}
                </Badge>
                {userSubscription?.isActive ? (
                  <div className="text-sm text-green-600 mt-1">
                    ✓ {language === 'es' ? 'Activa' : 'Active'}
                  </div>
                ) : (
                  <div className="text-sm text-red-600 mt-1">
                    ⚠ {language === 'es' ? 'Inactiva' : 'Inactive'}
                  </div>
                )}
              </div>
              <Button variant="outline">
                {language === 'es' ? 'Gestionar Plan' : 'Manage Plan'}
              </Button>
            </div>
          </div>

          {userSubscription?.features && userSubscription.features.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">
                {language === 'es' ? 'Funciones Incluidas' : 'Included Features'}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {userSubscription.features.map(feature => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
