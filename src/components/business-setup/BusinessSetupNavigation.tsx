
import { Button } from "@/components/ui/button";

interface BusinessSetupNavigationProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
  onBack: () => void;
  canContinue: boolean;
  translations: {
    back: string;
    continue: string;
  };
}

export const BusinessSetupNavigation = ({ 
  currentStep, 
  onPrevious, 
  onNext, 
  onBack, 
  canContinue, 
  translations 
}: BusinessSetupNavigationProps) => {
  return (
    <div className="flex justify-between pt-6">
      {currentStep > 1 && (
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          {translations.back}
        </Button>
      )}
      
      {currentStep < 3 ? (
        <Button 
          onClick={onNext}
          disabled={!canContinue}
          className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 ml-auto"
        >
          {translations.continue}
        </Button>
      ) : (
        <Button 
          onClick={onBack}
          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 ml-auto"
        >
          Ver Documentos Requeridos
        </Button>
      )}
    </div>
  );
};
