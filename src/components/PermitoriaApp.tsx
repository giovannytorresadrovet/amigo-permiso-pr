
import { AuthenticationFlow } from './auth/AuthenticationFlow';
import { EnhancedBusinessWizard } from './EnhancedBusinessWizard';
import { InspectorEmergencyMode } from './emergency/InspectorEmergencyMode';
import { AppHeader } from './app/AppHeader';
import { WelcomeSection } from './app/WelcomeSection';
import { QuickActions } from './app/QuickActions';
import { BusinessesSection } from './app/BusinessesSection';
import { usePermitoriaState } from '@/hooks/usePermitoriaState';
import { UserContextProvider } from '@/contexts/UserContextProvider';
import { UserManagementProvider } from '@/contexts/UserManagement';
import { ModuleContextProvider } from '@/contexts/ModuleContext';
import { ComplianceProvider } from './compliance/ComplianceProvider';
import { ModuleAwareSecureGerryAIAssistant } from './ai/ModuleAwareSecureGerryAIAssistant';
import { BusinessCreationGuard } from './business/BusinessCreationGuard';
import { VerificationPrompt } from './verification/VerificationPrompt';
import { VerificationStatus } from './verification/VerificationStatus';

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

  // Wrap everything in the enhanced context providers
  return (
    <UserManagementProvider initialUser={user}>
      <UserContextProvider userId={user.id}>
        <ModuleContextProvider>
          <ComplianceProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
              {/* Emergency Mode */}
              {currentView === 'emergency' && emergencyBusiness && (
                <InspectorEmergencyMode
                  businessData={emergencyBusiness}
                  language={language}
                  onClose={() => setCurrentView('dashboard')}
                />
              )}

              {/* Business Registration Wizard - Protected */}
              {currentView === 'wizard' && (
                <BusinessCreationGuard language={language}>
                  <EnhancedBusinessWizard
                    language={language}
                    onComplete={handleBusinessWizardComplete}
                    onBack={() => setCurrentView('dashboard')}
                  />
                </BusinessCreationGuard>
              )}

              {/* Verification View */}
              {currentView === 'verification' && (
                <div className="min-h-screen flex items-center justify-center p-4">
                  <div className="w-full max-w-md space-y-6">
                    <VerificationStatus language={language} />
                    <div className="text-center">
                      <button
                        onClick={() => setCurrentView('dashboard')}
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        {language === 'es' ? 'Volver al Dashboard' : 'Back to Dashboard'}
                      </button>
                    </div>
                  </div>
                </div>
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

                    {/* Show verification prompt if not verified */}
                    {!user.identityVerified && (
                      <div className="mb-8">
                        <VerificationPrompt 
                          language={language}
                          required={false}
                        />
                      </div>
                    )}

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

              {/* Module-Aware AI Assistant - enhanced with module awareness */}
              <ModuleAwareSecureGerryAIAssistant 
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
          </ComplianceProvider>
        </ModuleContextProvider>
      </UserContextProvider>
    </UserManagementProvider>
  );
};
