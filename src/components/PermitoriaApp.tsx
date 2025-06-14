
import { AuthenticationFlow } from './auth/AuthenticationFlow';
import { EnhancedBusinessWizard } from './EnhancedBusinessWizard';
import { InspectorEmergencyMode } from './emergency/InspectorEmergencyMode';
import { GerryAIAssistant } from './ai/GerryAIAssistant';
import { AppHeader } from './app/AppHeader';
import { WelcomeSection } from './app/WelcomeSection';
import { QuickActions } from './app/QuickActions';
import { BusinessesSection } from './app/BusinessesSection';
import { usePermitoriaState } from '@/hooks/usePermitoriaState';

export const PermitoriaApp = () => {
  const {
    user,
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
  } = usePermitoriaState();

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
      <AppHeader
        user={user}
        language={language}
        onLanguageChange={setLanguage}
        onLogout={handleLogout}
        urgentNotifications={getUrgentNotifications()}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeSection
          user={user}
          language={language}
          urgentNotifications={getUrgentNotifications()}
        />

        <QuickActions
          language={language}
          onNewBusiness={() => setCurrentView('wizard')}
          onEmergencyMode={() => handleEmergencyMode(businesses[0]?.id)}
          hasBusinesses={businesses.length > 0}
        />

        <BusinessesSection
          businesses={businesses}
          language={language}
          t={t}
          onNewBusiness={() => setCurrentView('wizard')}
          onViewDetails={handleBusinessDetails}
          onRenewPermit={handleRenewPermit}
        />
      </main>

      <GerryAIAssistant 
        language={language}
        businessContext={businesses[0] ? {
          businessId: businesses[0].id,
          name: businesses[0].name,
          type: businesses[0].businessType,
          municipality: businesses[0].municipality,
          status: businesses[0].legalStatus
        } : undefined}
      />
    </div>
  );
};
