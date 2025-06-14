
import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { OverviewStats } from '@/components/dashboard/OverviewStats';
import { PermitsList } from '@/components/dashboard/PermitsList';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { BusinessList } from '@/components/dashboard/BusinessList';
import { BusinessDetails } from '@/components/dashboard/BusinessDetails';
import { BusinessSetupWizard } from '@/components/dashboard/BusinessSetupWizard';
import { DocumentUploadArea } from '@/components/DocumentUploadArea';
import { PermitDiscoveryAI } from '@/components/PermitDiscoveryAI';
import { ProfileSettings } from '@/components/dashboard/ProfileSettings';
import { ModuleDiscovery } from '@/components/modules/ModuleDiscovery';
import { ModuleStore } from '@/components/modules/ModuleStore';
import { ModuleManager } from '@/components/modules/ModuleManager';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';
import { SecureGerryAIAssistant } from '@/components/ai/SecureGerryAIAssistant';
import { UserContextProvider } from '@/contexts/UserContextProvider';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('overview');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  
  // Initialize notification effects
  useNotificationEffects();

  const handleBusinessSelect = (businessId: string) => {
    setSelectedBusinessId(businessId);
    setCurrentView('business-details');
  };

  const handleBackToBusinesses = () => {
    setSelectedBusinessId(null);
    setCurrentView('businesses');
  };

  const handleBackToDashboard = () => {
    setCurrentView('overview');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <OverviewStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PermitsList />
              <RecentActivity />
            </div>
          </div>
        );
      case 'businesses':
        return <BusinessList onBusinessSelect={handleBusinessSelect} />;
      case 'business-details':
        return selectedBusinessId ? (
          <BusinessDetails 
            businessId={selectedBusinessId} 
            onBack={handleBackToBusinesses} 
          />
        ) : (
          <BusinessList onBusinessSelect={handleBusinessSelect} />
        );
      case 'business-setup':
        return <BusinessSetupWizard onBack={handleBackToDashboard} />;
      case 'permits':
        return (
          <div className="p-6 bg-white rounded-lg shadow-professional animate-fade-in-up">
            My Permits - Coming Soon
          </div>
        );
      case 'documents':
        return <DocumentUploadArea language={language} onBack={handleBackToDashboard} />;
      case 'ai-discovery':
        return <PermitDiscoveryAI language={language} onBack={handleBackToDashboard} />;
      case 'modules':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <ModuleDiscovery language={language} />
          </div>
        );
      case 'module-store':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <ModuleStore language={language} />
          </div>
        );
      case 'module-manager':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <ModuleManager language={language} />
          </div>
        );
      case 'profile':
        return <ProfileSettings onBack={handleBackToDashboard} />;
      default:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <OverviewStats />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PermitsList />
              <RecentActivity />
            </div>
          </div>
        );
    }
  };

  return (
    <UserContextProvider userId="user-123">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-slate-50">
          <DashboardSidebar 
            currentView={currentView} 
            onViewChange={setCurrentView}
            language={language}
            onLanguageChange={setLanguage}
          />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 p-4 sm:p-6 bg-gradient-to-br from-slate-50/50 to-transparent">
              <div className="max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </main>
          </div>
          <SecureGerryAIAssistant 
            language={language}
            businessContext={selectedBusinessId ? {
              businessId: selectedBusinessId,
              name: 'Current Business',
              type: 'Business',
              municipality: 'Puerto Rico',
              status: 'active'
            } : undefined}
          />
        </div>
      </SidebarProvider>
    </UserContextProvider>
  );
};

export default Dashboard;
