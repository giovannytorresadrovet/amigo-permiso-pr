
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Building2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WizardHeaderProps {
  onBack: () => void;
  title: string;
  currentStep: number;
  steps: string[];
  progress: number;
}

export const WizardHeader = ({
  onBack,
  title,
  currentStep,
  steps,
  progress
}: WizardHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-slate-300 hover:text-white mb-4 sm:mb-6"
        size={isMobile ? "sm" : "default"}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-white flex flex-col sm:flex-row sm:items-center text-lg sm:text-xl">
          <div className="flex items-center mb-2 sm:mb-0">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            {isMobile ? title.replace('Configuración de ', '') : title}
          </div>
        </CardTitle>
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-slate-400 space-y-1 sm:space-y-0">
            <span>Paso {currentStep + 1} de {steps.length}</span>
            <span className="text-xs sm:text-sm">{steps[currentStep]}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
    </>
  );
};
