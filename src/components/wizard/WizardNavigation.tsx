
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

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

  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep}
        className="border-slate-600 text-slate-300 hover:bg-slate-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {translations.back}
      </Button>
      
      {isLastStep ? (
        <Button
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          {translations.complete}
        </Button>
      ) : (
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {translations.next}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
