
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
  canProceed: boolean;
  translations: {
    back: string;
    next: string;
    complete: string;
  };
}

export const WizardNavigation = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onComplete,
  canProceed,
  translations
}: WizardNavigationProps) => {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col sm:flex-row justify-between mt-6 space-y-3 sm:space-y-0 px-4 sm:px-0">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep}
        className="border-slate-600 text-slate-300 hover:bg-slate-700 w-full sm:w-auto"
        size={isMobile ? "default" : "default"}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {translations.back}
      </Button>
      
      {isLastStep ? (
        <Button
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
          size={isMobile ? "default" : "default"}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {translations.complete}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          size={isMobile ? "default" : "default"}
        >
          {translations.next}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
