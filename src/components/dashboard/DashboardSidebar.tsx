
import { Shield, LayoutDashboard, FileText, Upload, User, Settings, LogOut, Building, Briefcase, Brain, Globe, ShieldCheck, AlertTriangle } from 'lucide-react';
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
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUserManagement } from '@/contexts/UserManagementContext';

interface DashboardSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  language: 'es' | 'en';
  onLanguageChange: (language: 'es' | 'en') => void;
}

const getMenuItems = (language: 'es' | 'en') => [
  {
    id: 'overview',
    title: language === 'es' ? 'Resumen' : 'Overview',
    icon: LayoutDashboard,
  },
  {
    id: 'businesses',
    title: language === 'es' ? 'Mis Negocios' : 'My Businesses',
    icon: Building,
  },
  {
    id: 'business-setup',
    title: language === 'es' ? 'Configurar Negocio' : 'Business Setup',
    icon: Briefcase,
    badge: language === 'es' ? 'Nuevo' : 'New',
  },
  {
    id: 'permits',
    title: language === 'es' ? 'Mis Permisos' : 'My Permits',
    icon: FileText,
  },
  {
    id: 'documents',
    title: language === 'es' ? 'Documentos' : 'Documents',
    icon: Upload,
  },
  {
    id: 'ai-discovery',
    title: language === 'es' ? 'Guía con IA' : 'AI Guidance',
    icon: Brain,
    badge: 'AI',
  },
  {
    id: 'profile',
    title: language === 'es' ? 'Perfil' : 'Profile',
    icon: User,
  },
];

export const DashboardSidebar = ({ currentView, onViewChange, language, onLanguageChange }: DashboardSidebarProps) => {
  const { user, businessCreationAccess, startVerification, isLoading } = useUserManagement();
  const menuItems = getMenuItems(language);

  const getVerificationIcon = () => {
    if (user?.identityVerified && user?.verificationStatus === 'verified') {
      return <ShieldCheck className="w-4 h-4 text-green-500" />;
    }
    return <Shield className="w-4 h-4 text-yellow-500" />;
  };

  const getVerificationStatus = () => {
    if (user?.identityVerified && user?.verificationStatus === 'verified') {
      return language === 'es' ? 'Verificado' : 'Verified';
    }
    if (user?.verificationStatus === 'in_progress') {
      return language === 'es' ? 'En Proceso' : 'In Progress';
    }
    if (user?.verificationStatus === 'failed') {
      return language === 'es' ? 'Fallida' : 'Failed';
    }
    return language === 'es' ? 'Sin Verificar' : 'Unverified';
  };

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
      <SidebarHeader className="border-b border-slate-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">Permisoria</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onLanguageChange(language === 'es' ? 'en' : 'es')}
            className="text-xs"
          >
            <Globe className="w-4 h-4 mr-1" />
            {language.toUpperCase()}
          </Button>
        </div>

        {/* Verification Status Section */}
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {getVerificationIcon()}
            <span className="text-sm font-medium">
              {language === 'es' ? 'Estado de Verificación' : 'Verification Status'}
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-2">
            {getVerificationStatus()}
          </p>
          
          {!businessCreationAccess.hasAccess && (
            <Button 
              onClick={handleStartVerification}
              disabled={isLoading}
              size="sm"
              className="w-full text-xs bg-blue-600 hover:bg-blue-700"
            >
              {language === 'es' ? 'Verificar Identidad' : 'Verify Identity'}
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium">
            {language === 'es' ? 'Panel de Negocios' : 'Business Dashboard'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isBusinessRelated = ['businesses', 'business-setup'].includes(item.id);
                const isDisabled = isBusinessRelated && !businessCreationAccess.hasAccess;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => onViewChange(item.id)}
                      isActive={currentView === item.id}
                      className={`w-full justify-start ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isDisabled}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {isDisabled && (
                        <Shield className="w-3 h-3 ml-auto text-yellow-500" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Verification Alert */}
        {!businessCreationAccess.hasAccess && (
          <div className="px-4 mt-4">
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-xs">
                {language === 'es' 
                  ? 'Verifica tu identidad para acceder a todas las funciones.'
                  : 'Verify your identity to access all features.'
                }
              </AlertDescription>
            </Alert>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 p-4">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-slate-600">
            <Settings className="w-4 h-4 mr-2" />
            {language === 'es' ? 'Configuración' : 'Settings'}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600">
            <LogOut className="w-4 h-4 mr-2" />
            {language === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
