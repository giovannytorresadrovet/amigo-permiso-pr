
import { Shield } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';

interface AppHeaderProps {
  currentLanguage: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export const AppHeader = ({ currentLanguage, onLanguageChange }: AppHeaderProps) => {
  return (
    <header className="relative z-10 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">PermitPR</h1>
            <p className="text-xs text-slate-400">Versión Beta Gratuita</p>
          </div>
        </div>
        <LanguageToggle currentLanguage={currentLanguage} onChange={onLanguageChange} />
      </div>
    </header>
  );
};
