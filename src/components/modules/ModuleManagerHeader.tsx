
import { Badge } from '@/components/ui/badge';

interface ModuleManagerHeaderProps {
  moduleCount: number;
  language: 'es' | 'en';
}

export const ModuleManagerHeader = ({ moduleCount, language }: ModuleManagerHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        {language === 'es' ? 'Módulos Instalados' : 'Installed Modules'}
      </h2>
      <Badge variant="secondary">
        {moduleCount} {language === 'es' ? 'módulos' : 'modules'}
      </Badge>
    </div>
  );
};
