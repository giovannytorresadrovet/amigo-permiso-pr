
import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { OverviewStats } from '@/components/dashboard/OverviewStats';
import { PermitsList } from '@/components/dashboard/PermitsList';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { SidebarProvider } from '@/components/ui/sidebar';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('overview');

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
      case 'permits':
        return <div className="p-6 bg-white rounded-lg shadow">Permits Management - Coming Soon</div>;
      case 'documents':
        return <div className="p-6 bg-white rounded-lg shadow">Documents - Coming Soon</div>;
      case 'profile':
        return <div className="p-6 bg-white rounded-lg shadow">Profile Settings - Coming Soon</div>;
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
        <DashboardSidebar currentView={currentView} onViewChange={setCurrentView} />
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
