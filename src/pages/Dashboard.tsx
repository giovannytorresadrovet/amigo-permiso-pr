
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
import { SidebarProvider } from '@/components/ui/sidebar';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';

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
          <div className="space-y-6">
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
        return <div className="p-6 bg-white rounded-lg shadow">My Permits - Coming Soon</div>;
      case 'documents':
        return <DocumentUploadArea language={language} onBack={handleBackToDashboard} />;
      case 'ai-discovery':
        return <PermitDiscoveryAI language={language} onBack={handleBackToDashboard} />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return (
          <div className="space-y-6">
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          language={language}
          onLanguageChange={setLanguage}
        />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
