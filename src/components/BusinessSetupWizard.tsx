
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BusinessSetupHeader,
  BusinessSetupTitle,
  BusinessSetupStep1,
  BusinessSetupStep2,
  BusinessSetupStep3,
  BusinessSetupNavigation,
  useBusinessSetupTranslations,
  useZoningAnalysis
} from './business-setup';

interface BusinessSetupWizardProps {
  language: 'es' | 'en';
  onBack: () => void;
}

export const BusinessSetupWizard = ({ language, onBack }: BusinessSetupWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    location: '',
    municipality: '',
    employees: '',
    revenue: ''
  });
  const [zoningResult, setZoningResult] = useState<'checking' | 'compatible' | 'issues' | null>(null);
  const [discoveredIssues, setDiscoveredIssues] = useState<string[]>([]);

  const t = useBusinessSetupTranslations(language);

  useZoningAnalysis({
    currentStep,
    formData,
    language,
    setZoningResult,
    setDiscoveredIssues
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canContinue = (): boolean => {
    if (currentStep === 1) {
      return !!(formData.businessName && formData.businessType && formData.employees && formData.revenue);
    }
    if (currentStep === 2) {
      return !!(formData.location && formData.municipality);
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <BusinessSetupHeader 
          onBack={onBack}
          currentStep={currentStep}
          translations={t}
        />

        <div className="mb-8">
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        <BusinessSetupTitle 
          title={t.title}
          subtitle={t.subtitle}
        />

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {currentStep === 1 && t.step1}
              {currentStep === 2 && t.step2}
              {currentStep === 3 && t.step3}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <BusinessSetupStep1
                formData={formData}
                onInputChange={handleInputChange}
                translations={t}
              />
            )}

            {currentStep === 2 && (
              <BusinessSetupStep2
                formData={formData}
                onInputChange={handleInputChange}
                zoningResult={zoningResult}
                discoveredIssues={discoveredIssues}
                translations={t}
              />
            )}

            {currentStep === 3 && (
              <BusinessSetupStep3 
                discoveredIssues={discoveredIssues}
              />
            )}

            <BusinessSetupNavigation
              currentStep={currentStep}
              onPrevious={() => setCurrentStep(prev => prev - 1)}
              onNext={() => setCurrentStep(prev => prev + 1)}
              onBack={onBack}
              canContinue={canContinue()}
              translations={t}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
