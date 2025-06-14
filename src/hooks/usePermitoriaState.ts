
import { useState, useEffect } from 'react';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';
import { getTranslation } from '@/utils/translations';

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

export const usePermitoriaState = () => {
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

  return {
    user,
    setUser,
    language,
    setLanguage,
    currentView,
    setCurrentView,
    businesses,
    emergencyBusiness,
    t,
    handleAuthSuccess,
    handleBusinessWizardComplete,
    handleBusinessDetails,
    handleRenewPermit,
    handleEmergencyMode,
    handleLogout,
    getUrgentNotifications
  };
};
