
import { useState, useEffect } from 'react';
import { AuthenticationFlow } from './auth/AuthenticationFlow';
import { EnhancedBusinessWizard } from './EnhancedBusinessWizard';
import { BusinessStatusCard } from './dashboard/BusinessStatusCard';
import { InspectorEmergencyMode } from './emergency/InspectorEmergencyMode';
import { GerryAIAssistant } from './ai/GerryAIAssistant';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Building, 
  Plus, 
  AlertTriangle, 
  Settings, 
  FileText, 
  Shield,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import { getTranslation } from '@/utils/translations';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
}

interface Business {
  id: string;
  name: string;
  legalStatus: 'legal' | 'in_process' | 'illegal' | 'expiring_soon';
  permitType: string;
  expirationDate?: string;
  completionPercentage: number;
  daysUntilExpiration?: number;
  address: string;
  municipality: string;
  businessType: string;
  ownerName: string;
  phone: string;
  permitNumber?: string;
}

export const PermitoriaApp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [currentView, setCurrentView] = useState<'dashboard' | 'wizard' | 'emergency'>('dashboard');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [emergencyBusiness, setEmergencyBusiness] = useState<Business | null>(null);

  const { notifySuccess } = useNotificationEffects();
  const t = (key: string) => getTranslation(key, language);

  // Mock businesses data
  useEffect(() => {
    if (user) {
      setBusinesses([
        {
          id: '1',
          name: 'Café Luna',
          legalStatus: 'legal',
          permitType: 'Permiso Único de Negocio',
          expirationDate: '2024-12-15',
          completionPercentage: 100,
          daysUntilExpiration: 45,
          address: '123 Calle Principal, Toa Baja',
          municipality: 'Toa Baja',
          businessType: 'restaurant',
          ownerName: user.firstName + ' ' + user.lastName,
          phone: '787-555-0123',
          permitNumber: 'TB-2024-001'
        },
        {
          id: '2',
          name: 'Salón Belleza Real',
          legalStatus: 'expiring_soon',
          permitType: 'Permiso de Uso + Salud',
          expirationDate: '2024-07-22',
          completionPercentage: 85,
          daysUntilExpiration: 8,
          address: '456 Ave. San José, Toa Baja',
          municipality: 'Toa Baja',
          businessType: 'salon',
          ownerName: user.firstName + ' ' + user.lastName,
          phone: '787-555-0124'
        },
        {
          id: '3',
          name: 'TechConsult PR',
          legalStatus: 'in_process',
          permitType: 'Permiso de Servicios Profesionales',
          completionPercentage: 60,
          address: '789 Urb. Las Flores, Toa Baja',
          municipality: 'Toa Baja',
          businessType: 'technology',
          ownerName: user.firstName + ' ' + user.lastName,
          phone: '787-555-0125'
        }
      ]);
    }
  }, [user]);

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    notifySuccess(
      t('loginSuccessful'),
      language === 'es' 
        ? `¡Bienvenido ${authenticatedUser.firstName}! Tu cuenta está verificada.`
        : `Welcome ${authenticatedUser.firstName}! Your account is verified.`,
      false
    );
  };

  const handleBusinessWizardComplete = (businessData: any) => {
    const newBusiness: Business = {
      id: Date.now().toString(),
      name: businessData.name,
      legalStatus: 'in_process',
      permitType: 'Permiso Único de Negocio',
      completionPercentage: 30,
      address: businessData.address?.street + ', ' + businessData.address?.city,
      municipality: businessData.address?.municipality || 'Toa Baja',
      businessType: businessData.businessType,
      ownerName: user?.firstName + ' ' + user?.lastName || 'Usuario',
      phone: user?.email || '787-555-0100'
    };
    
    setBusinesses(prev => [...prev, newBusiness]);
    setCurrentView('dashboard');
    
    notifySuccess(
      t('businessCreated'),
      language === 'es' 
        ? `${businessData.name} ha sido registrado exitosamente.`
        : `${businessData.name} has been registered successfully.`,
      false
    );
  };

  const handleBusinessDetails = (businessId: string) => {
    console.log('Viewing business details for:', businessId);
    // Navigate to business details view
  };

  const handleRenewPermit = (businessId: string) => {
    console.log('Renewing permit for:', businessId);
    // Navigate to permit renewal flow
  };

  const handleEmergencyMode = (businessId: string) => {
    const business = businesses.find(b => b.id === businessId);
    if (business) {
      setEmergencyBusiness(business);
      setCurrentView('emergency');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setBusinesses([]);
    setCurrentView('dashboard');
  };

  const getUrgentNotifications = () => {
    return businesses.filter(b => 
      b.daysUntilExpiration && b.daysUntilExpiration <= 14
    ).length;
  };

  // Authentication Flow
  if (!user) {
    return (
      <AuthenticationFlow
        onAuthSuccess={handleAuthSuccess}
        language={language}
        onLanguageChange={setLanguage}
      />
    );
  }

  // Emergency Mode
  if (currentView === 'emergency' && emergencyBusiness) {
    return (
      <InspectorEmergencyMode
        businessData={emergencyBusiness}
        language={language}
        onClose={() => setCurrentView('dashboard')}
      />
    );
  }

  // Business Registration Wizard
  if (currentView === 'wizard') {
    return (
      <EnhancedBusinessWizard
        language={language}
        onComplete={handleBusinessWizardComplete}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
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
                {getUrgentNotifications() > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs">
                    {getUrgentNotifications()}
                  </Badge>
                )}
              </Button>
              
              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              >
                {language === 'es' ? '🇺🇸 EN' : '🇵🇷 ES'}
              </Button>
              
              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
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
        </div>

        {/* Urgent Alerts */}
        {getUrgentNotifications() > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {language === 'es' 
                ? `Tienes ${getUrgentNotifications()} permisos que vencen pronto. Revisa tus negocios.`
                : `You have ${getUrgentNotifications()} permits expiring soon. Review your businesses.`
              }
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={() => setCurrentView('wizard')}
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
            onClick={() => handleEmergencyMode(businesses[0]?.id)}
            disabled={businesses.length === 0}
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

        {/* Businesses Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Building className="w-6 h-6 mr-2" />
              {t('myBusinesses')} ({businesses.length})
            </h2>
          </div>
          
          {businesses.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {language === 'es' ? 'No tienes negocios registrados' : 'No businesses registered'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'es' 
                    ? 'Comienza registrando tu primer negocio para obtener tus permisos.'
                    : 'Start by registering your first business to get your permits.'
                  }
                </p>
                <Button onClick={() => setCurrentView('wizard')}>
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'es' ? 'Registrar Primer Negocio' : 'Register First Business'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <BusinessStatusCard
                  key={business.id}
                  business={business}
                  language={language}
                  onViewDetails={handleBusinessDetails}
                  onRenewPermit={handleRenewPermit}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* AI Assistant */}
      <GerryAIAssistant 
        language={language}
        businessContext={businesses[0] ? {
          name: businesses[0].name,
          type: businesses[0].businessType,
          municipality: businesses[0].municipality,
          status: businesses[0].legalStatus
        } : undefined}
      />
    </div>
  );
};
