
import { Button } from "@/components/ui/button";
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: 'es' | 'en';
  onChange: (lang: 'es' | 'en') => void;
}

export const LanguageToggle = ({ currentLanguage, onChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center space-x-2 bg-slate-800/50 rounded-full p-1 border border-slate-700">
      <Button
        variant={currentLanguage === 'es' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('es')}
        className={`rounded-full px-4 focus-ring-primary no-yellow-focus ${
          currentLanguage === 'es' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'text-slate-300 hover:text-white hover:bg-slate-700'
        }`}
      >
        ES
      </Button>
      <Button
        variant={currentLanguage === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('en')}
        className={`rounded-full px-4 focus-ring-primary no-yellow-focus ${
          currentLanguage === 'en' 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'text-slate-300 hover:text-white hover:bg-slate-700'
        }`}
      >
        EN
      </Button>
      <Globe className="w-4 h-4 text-slate-400" />
    </div>
  );
};
