
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Building2 } from 'lucide-react';

interface BusinessWizardHeaderProps {
  onBack: () => void;
  title: string;
  currentStep: number;
  steps: string[];
  progress: number;
}

export const BusinessWizardHeader = ({
  onBack,
  title,
  currentStep,
  steps,
  progress
}: BusinessWizardHeaderProps) => {
  return (
    <>
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-slate-300 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Building2 className="w-6 h-6 mr-2" />
          {title}
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Paso {currentStep + 1} de {steps.length}</span>
            <span>{steps[currentStep]}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
    </>
  );
};
