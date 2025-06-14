
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { PermitDiscoveryEngine, BusinessProfile, PermitDiscoveryResult } from '@/services/permitDiscoveryEngine';
import { PermitWizardHeader } from './PermitWizardHeader';
import { PermitWizardSteps } from './PermitWizardSteps';
import { PermitWizardNavigation } from './PermitWizardNavigation';

interface PermitWizardContainerProps {
  language: 'es' | 'en';
  onComplete: (result: PermitDiscoveryResult) => void;
  onBack: () => void;
}

export const PermitWizardContainer = ({ 
  language, 
  onComplete, 
  onBack 
}: PermitWizardContainerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessProfile, setBusinessProfile] = useState<Partial<BusinessProfile>>({
    name: '',
    businessType: '',
    description: '',
    municipality: '',
    employees: 1,
    revenue: 'under50k',
    hasPhysicalLocation: true,
    servesFood: false,
    handlesChemicals: false,
    operatesLateHours: false
  });
  const [discoveryResult, setDiscoveryResult] = useState<PermitDiscoveryResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const steps = [
    language === 'es' ? 'Información Básica' : 'Basic Information',
    language === 'es' ? 'Ubicación y Características' : 'Location & Characteristics', 
    language === 'es' ? 'Análisis de Permisos' : 'Permit Analysis',
    language === 'es' ? 'Resultados y Recomendaciones' : 'Results & Recommendations'
  ];

  const handleNext = async () => {
    if (currentStep < 3) {
      if (currentStep === 2) {
        setIsAnalyzing(true);
        try {
          const result = await PermitDiscoveryEngine.analyzeBusinessRequirements(
            businessProfile as BusinessProfile, 
            language
          );
          setDiscoveryResult(result);
        } catch (error) {
          console.error('Error analyzing permits:', error);
        } finally {
          setIsAnalyzing(false);
        }
      }
      setCurrentStep(prev => prev + 1);
    } else if (discoveryResult) {
      onComplete(discoveryResult);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleDataChange = (data: Partial<BusinessProfile>) => {
    setBusinessProfile(prev => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return businessProfile.name && businessProfile.businessType;
      case 1:
        return businessProfile.municipality;
      case 2:
        return true;
      case 3:
        return discoveryResult !== null;
      default:
        return false;
    }
  };

  const progress = ((currentStep + 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'es' ? 'Regresar' : 'Back'}
          </Button>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
            {language === 'es' ? 'Paso' : 'Step'} {currentStep + 1} {language === 'es' ? 'de' : 'of'} 4
          </Badge>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-slate-400">
            {steps.map((step, index) => (
              <span 
                key={index} 
                className={index <= currentStep ? 'text-blue-400' : 'text-slate-500'}
              >
                {step}
              </span>
            ))}
          </div>
        </div>

        <PermitWizardHeader language={language} />

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="space-y-6">
            <PermitWizardSteps
              currentStep={currentStep}
              businessProfile={businessProfile}
              onDataChange={handleDataChange}
              language={language}
              isAnalyzing={isAnalyzing}
              discoveryResult={discoveryResult}
            />

            <PermitWizardNavigation
              currentStep={currentStep}
              onBack={handleBack}
              onNext={handleNext}
              canProceed={canProceed()}
              isAnalyzing={isAnalyzing}
              language={language}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
