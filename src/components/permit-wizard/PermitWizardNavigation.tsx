
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface PermitWizardNavigationProps {
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  isAnalyzing: boolean;
  language: 'es' | 'en';
}

export const PermitWizardNavigation = ({
  currentStep,
  onBack,
  onNext,
  canProceed,
  isAnalyzing,
  language
}: PermitWizardNavigationProps) => {
  return (
    <div className="flex justify-between pt-6">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="border-slate-600 text-slate-300 hover:bg-slate-700"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {language === 'es' ? 'Anterior' : 'Previous'}
      </Button>
      
      <Button 
        onClick={onNext}
        disabled={!canProceed || isAnalyzing}
        className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
      >
        {currentStep < 3 ? (
          <>
            {language === 'es' ? 'Siguiente' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        ) : (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            {language === 'es' ? 'Ver Plan Detallado' : 'View Detailed Plan'}
          </>
        )}
      </Button>
    </div>
  );
};
