
import { LayoutDashboard, FileText, Upload, User, Building, Briefcase, Brain, Shield, Lightbulb } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

interface MenuItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

interface SidebarMenuItemsProps {
  currentView: string;
  onViewChange: (view: string) => void;
  language: 'es' | 'en';
  hasAccess: boolean;
}

const getMenuItems = (language: 'es' | 'en'): MenuItem[] => [
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
    id: 'module-discovery',
    title: language === 'es' ? 'Módulos Inteligentes' : 'Smart Modules',
    icon: Lightbulb,
    badge: language === 'es' ? 'IA' : 'AI',
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

export const SidebarMenuItems = ({ currentView, onViewChange, language, hasAccess }: SidebarMenuItemsProps) => {
  const menuItems = getMenuItems(language);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-slate-600 font-medium">
        {language === 'es' ? 'Panel de Negocios' : 'Business Dashboard'}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isBusinessRelated = ['businesses', 'business-setup'].includes(item.id);
            const isDisabled = isBusinessRelated && !hasAccess;
            
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
                    <Shield className="w-3 h-3 ml-auto text-blue-500" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
