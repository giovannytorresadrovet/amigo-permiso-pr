
import { Button } from "@/components/ui/button";

interface BusinessSetupNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const BusinessSetupNavigation = ({ 
  currentStep, 
  totalSteps,
  onPrevious, 
  onNext, 
  onSubmit 
}: BusinessSetupNavigationProps) => {
  return (
    <div className="flex justify-between pt-6">
      {currentStep > 1 && (
        <Button 
          variant="outline" 
          onClick={onPrevious}
        >
          Anterior
        </Button>
      )}
      
      {currentStep < totalSteps ? (
        <Button 
          onClick={onNext}
          className="ml-auto"
        >
          Continuar
        </Button>
      ) : (
        <Button 
          onClick={onSubmit}
          className="ml-auto"
        >
          Completar
        </Button>
      )}
    </div>
  );
};
