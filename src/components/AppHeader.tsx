
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
  currentLanguage: 'es' | 'en';
  onLanguageChange: (language: 'es' | 'en') => void;
}

export const AppHeader = ({ currentLanguage, onLanguageChange }: AppHeaderProps) => {
  return (
    <header className="relative z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">PermitPR</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <LanguageToggle 
            currentLanguage={currentLanguage} 
            onLanguageChange={onLanguageChange} 
          />
          
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button 
                variant="ghost" 
                className="text-slate-300 hover:text-white hover:bg-slate-700/50"
              >
                {currentLanguage === 'es' ? 'Iniciar Sesión' : 'Sign In'}
              </Button>
            </Link>
            
            <Link to="/signup">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
              >
                {currentLanguage === 'es' ? 'Registrarse' : 'Sign Up'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
