
import { Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarHeader as UISidebarHeader } from '@/components/ui/sidebar';

interface SidebarHeaderProps {
  language: 'es' | 'en';
  onLanguageChange: (language: 'es' | 'en') => void;
}

export const SidebarHeader = ({ language, onLanguageChange }: SidebarHeaderProps) => {
  return (
    <UISidebarHeader className="border-b border-slate-200 p-4">
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
    </UISidebarHeader>
  );
};
