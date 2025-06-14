
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useUserManagement } from '@/contexts/UserManagement';
import { SidebarHeader } from './SidebarHeader';
import { VerificationStatus } from '@/components/verification/VerificationStatus';
import { SidebarMenuItems } from './SidebarMenuItems';
import { VerificationAlert } from './VerificationAlert';
import { SidebarFooter } from './SidebarFooter';

interface DashboardSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  language: 'es' | 'en';
  onLanguageChange: (language: 'es' | 'en') => void;
}

export const DashboardSidebar = ({ currentView, onViewChange, language, onLanguageChange }: DashboardSidebarProps) => {
  const { user, businessCreationAccess, startVerification, isLoading } = useUserManagement();

  const handleStartVerification = async () => {
    try {
      const verificationUrl = await startVerification();
      window.location.href = verificationUrl;
    } catch (error) {
      console.error('Failed to start verification:', error);
    }
  };

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader 
        language={language} 
        onLanguageChange={onLanguageChange} 
      />
      
      <div className="px-4">
        <VerificationStatus
          language={language}
          showActions={true}
        />
      </div>

      <SidebarContent>
        <SidebarMenuItems
          currentView={currentView}
          onViewChange={onViewChange}
          language={language}
          hasAccess={businessCreationAccess.hasAccess}
        />

        <VerificationAlert
          language={language}
          hasAccess={businessCreationAccess.hasAccess}
        />
      </SidebarContent>

      <SidebarFooter language={language} />
    </Sidebar>
  );
};
