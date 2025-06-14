
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { WizardHeader } from './wizard/WizardHeader';
import { WizardNavigation } from './wizard/WizardNavigation';
import { useWizardNotifications } from './wizard/useWizardNotifications';
import { useWizardTranslations } from './wizard/useWizardTranslations';
import { BusinessWizardStep1 } from './BusinessWizardStep1';
import { BusinessWizardStep2 } from './BusinessWizardStep2';
import { BusinessWizardStep3 } from './BusinessWizardStep3';
import { BusinessWizardStep4 } from './BusinessWizardStep4';

interface EnhancedBusinessWizardProps {
  language: 'es' | 'en';
  onComplete: (data: any) => void;
  onBack: () => void;
}

export const EnhancedBusinessWizard = ({ language, onComplete, onBack }: EnhancedBusinessWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessData, setBusinessData] = useState({
    name: '',
    businessType: '',
    description: '',
    address: null,
    employees: '1',
    revenue: 'under50k'
  });
  const [zoningInfo, setZoningInfo] = useState(null);

  const t = useWizardTranslations(language);
  const { 
    notifyStepComplete, 
    notifyCompletion, 
    notifyCompletionError, 
    notifyZoningWarnings 
  } = useWizardNotifications(language);

  const handleNext = () => {
    if (currentStep < 3) {
      notifyStepComplete(currentStep);
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        const completeData = { ...businessData, zoningInfo };
        onComplete(completeData);
        notifyCompletion();
      } catch (error) {
        notifyCompletionError();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleDataChange = (data: Partial<typeof businessData>) => {
    setBusinessData(prev => ({ ...prev, ...data }));
  };

  const handleAddressValidated = (address: any, zoning: any) => {
    setBusinessData(prev => ({ ...prev, address }));
    setZoningInfo(zoning);
    
    if (zoning?.warnings?.length > 0) {
      notifyZoningWarnings();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return businessData.name.trim() !== '' && businessData.businessType !== '';
      case 1:
        return businessData.address !== null;
      case 2:
        return businessData.employees !== '' && businessData.revenue !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const progress = ((currentStep + 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-slate-700">
          <WizardHeader
            onBack={handleBack}
            title={t.title}
            currentStep={currentStep}
            steps={t.steps}
            progress={progress}
          />

          <CardContent className="p-8">
            {currentStep === 0 && (
              <BusinessWizardStep1
                businessData={businessData}
                onDataChange={handleDataChange}
                translations={{
                  businessName: t.businessName,
                  businessType: t.businessType,
                  description: t.description,
                  businessTypes: t.businessTypes
                }}
              />
            )}

            {currentStep === 1 && (
              <BusinessWizardStep2
                onAddressValidated={handleAddressValidated}
                language={language}
              />
            )}

            {currentStep === 2 && (
              <BusinessWizardStep3
                businessData={businessData}
                onDataChange={handleDataChange}
                translations={{
                  employees: t.employees,
                  revenue: t.revenue,
                  employeeRanges: t.employeeRanges,
                  revenueRanges: t.revenueRanges
                }}
              />
            )}

            {currentStep === 3 && (
              <BusinessWizardStep4
                businessData={businessData}
                translations={{
                  businessTypes: t.businessTypes,
                  employeeRanges: t.employeeRanges
                }}
              />
            )}

            <WizardNavigation
              currentStep={currentStep}
              totalSteps={4}
              canProceed={canProceed()}
              onNext={handleNext}
              onBack={handleBack}
              onComplete={handleNext}
              translations={{
                back: t.back,
                next: t.next,
                complete: t.complete
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
