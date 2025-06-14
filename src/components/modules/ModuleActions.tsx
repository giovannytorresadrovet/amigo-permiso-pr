
import { Button } from '@/components/ui/button';
import { Settings, Trash2 } from 'lucide-react';

interface ModuleActionsProps {
  moduleId: string;
  isCore: boolean;
  isUpdating: boolean;
  language: 'es' | 'en';
  onUninstall: (moduleId: string) => void;
}

export const ModuleActions = ({ 
  moduleId, 
  isCore, 
  isUpdating, 
  language, 
  onUninstall 
}: ModuleActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        disabled
      >
        <Settings className="w-4 h-4" />
        {language === 'es' ? 'Configurar' : 'Configure'}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 text-red-600 hover:text-red-700"
        onClick={() => onUninstall(moduleId)}
        disabled={isUpdating || isCore}
      >
        <Trash2 className="w-4 h-4" />
        {language === 'es' ? 'Desinstalar' : 'Uninstall'}
      </Button>
    </div>
  );
};
