
import { Shield, LayoutDashboard, FileText, Upload, User, Settings, LogOut, Building, Briefcase } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  {
    id: 'overview',
    title: 'Overview',
    icon: LayoutDashboard,
  },
  {
    id: 'businesses',
    title: 'My Businesses',
    icon: Building,
  },
  {
    id: 'permits',
    title: 'My Permits',
    icon: FileText,
  },
  {
    id: 'documents',
    title: 'Documents',
    icon: Upload,
  },
  {
    id: 'profile',
    title: 'Profile',
    icon: User,
  },
];

export const DashboardSidebar = ({ currentView, onViewChange }: DashboardSidebarProps) => {
  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-800">PermitPR</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium">
            Business Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => onViewChange(item.id)}
                    isActive={currentView === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 p-4">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-slate-600">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
