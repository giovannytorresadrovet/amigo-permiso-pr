
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

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
    <div className="flex justify-between mt-8">
      <Button 
        variant="outline" 
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Anterior
      </Button>
      
      {currentStep < totalSteps ? (
        <Button onClick={onNext}>
          Siguiente
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button onClick={onSubmit} className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="w-4 h-4 mr-2" />
          Completar Configuración
        </Button>
      )}
    </div>
  );
};
