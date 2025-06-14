
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BusinessSetupHeaderProps {
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const BusinessSetupHeader = ({ onBack, currentStep, totalSteps }: BusinessSetupHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al Dashboard
      </Button>
      <div className="text-sm text-slate-600">
        Paso {currentStep} de {totalSteps}
      </div>
    </div>
  );
};
