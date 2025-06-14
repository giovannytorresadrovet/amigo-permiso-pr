import { AuthenticationFlow } from './auth/AuthenticationFlow';
import { EnhancedBusinessWizard } from './EnhancedBusinessWizard';
import { InspectorEmergencyMode } from './emergency/InspectorEmergencyMode';
import { GerryAIAssistant } from './ai/GerryAIAssistant';
import { AppHeader } from './app/AppHeader';
import { WelcomeSection } from './app/WelcomeSection';
import { QuickActions } from './app/QuickActions';
import { BusinessesSection } from './app/BusinessesSection';
import { usePermitoriaState } from '@/hooks/usePermitoriaState';
import { UserContextProvider } from '@/contexts/UserContextProvider';
import { SecureGerryAIAssistant } from './ai/SecureGerryAIAssistant';

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

  // Wrap everything in UserContextProvider for secure data access
  return (
    <UserContextProvider userId={user.id}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Emergency Mode */}
        {currentView === 'emergency' && emergencyBusiness && (
          <InspectorEmergencyMode
            businessData={emergencyBusiness}
            language={language}
            onClose={() => setCurrentView('dashboard')}
          />
        )}

        {/* Business Registration Wizard */}
        {currentView === 'wizard' && (
          <EnhancedBusinessWizard
            language={language}
            onComplete={handleBusinessWizardComplete}
            onBack={() => setCurrentView('dashboard')}
          />
        )}

        {/* Main Dashboard */}
        {currentView === 'dashboard' && (
          <>
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
          </>
        )}

        {/* Secure AI Assistant - only renders when user context is available */}
        <SecureGerryAIAssistant 
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
    </UserContextProvider>
  );
};
