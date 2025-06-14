
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from 'lucide-react';

interface BusinessSetupHeaderProps {
  onBack: () => void;
  currentStep: number;
  translations: {
    back: string;
  };
}

export const BusinessSetupHeader = ({ onBack, currentStep, translations }: BusinessSetupHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-slate-300 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {translations.back}
      </Button>
      <div className="text-right">
        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
          Paso {currentStep} de 3
        </Badge>
      </div>
    </div>
  );
};
