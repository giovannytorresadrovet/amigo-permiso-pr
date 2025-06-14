
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { BusinessSetupHeader } from './BusinessSetupHeader';
import { BusinessSetupNavigation } from './BusinessSetupNavigation';
import { WizardStepContent } from '../../wizard/WizardStepContent';
import { useBusinessSetupState } from './useBusinessSetupState';

interface BusinessSetupContainerProps {
  onBack: () => void;
}

export const BusinessSetupContainer = ({ onBack }: BusinessSetupContainerProps) => {
  const {
    currentStep,
    businessData,
    totalSteps,
    progress,
    businessTypes,
    cities,
    handleInputChange,
    handleNext,
    handlePrevious,
    handleSubmit
  } = useBusinessSetupState(onBack);

  return (
    <div className="max-w-2xl mx-auto">
      <BusinessSetupHeader onBack={onBack} currentStep={currentStep} totalSteps={totalSteps} />

      <Card>
        <CardHeader>
          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <CardTitle className="text-center">Configuración de Negocio</CardTitle>
            <CardDescription className="text-center">
              Te ayudamos a configurar tu perfil de negocio para identificar los permisos necesarios
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <WizardStepContent
            currentStep={currentStep - 1}
            businessData={businessData}
            onInputChange={handleInputChange}
            businessTypes={businessTypes}
            cities={cities}
          />
          
          <BusinessSetupNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
};
