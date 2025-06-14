
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarFooter as UISidebarFooter } from '@/components/ui/sidebar';

interface SidebarFooterProps {
  language: 'es' | 'en';
}

export const SidebarFooter = ({ language }: SidebarFooterProps) => {
  return (
    <UISidebarFooter className="border-t border-slate-200 p-4">
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
    </UISidebarFooter>
  );
};
