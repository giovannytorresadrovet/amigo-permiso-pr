
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LandingHeaderProps {
  currentLanguage: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export const LandingHeader = ({ currentLanguage, onLanguageChange }: LandingHeaderProps) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-2xl font-bold text-white">Permisoria</div>
      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
        Beta - Toa Baja
      </Badge>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onLanguageChange(currentLanguage === 'es' ? 'en' : 'es')}
        className="ml-4"
      >
        {currentLanguage === 'es' ? '🇺🇸 EN' : '🇵🇷 ES'}
      </Button>
    </div>
  );
};
