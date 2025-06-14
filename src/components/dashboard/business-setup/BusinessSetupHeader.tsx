
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from 'lucide-react';

interface BusinessSetupHeaderProps {
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export const BusinessSetupHeader = ({ onBack, currentStep, totalSteps }: BusinessSetupHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>
      <div className="text-right">
        <Badge variant="secondary">
          Paso {currentStep} de {totalSteps}
        </Badge>
      </div>
    </div>
  );
};
