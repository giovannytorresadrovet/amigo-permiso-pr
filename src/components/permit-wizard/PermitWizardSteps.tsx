
import { CardHeader, CardTitle } from "@/components/ui/card";
import { BusinessProfile, PermitDiscoveryResult } from '@/services/permitDiscoveryEngine';
import { BusinessWizardStep1 } from '../BusinessWizardStep1';
import { BusinessWizardStep2 } from '../BusinessWizardStep2';
import { PermitAnalysisStep } from './PermitAnalysisStep';
import { PermitResultsStep } from './PermitResultsStep';

interface PermitWizardStepsProps {
  currentStep: number;
  businessProfile: Partial<BusinessProfile>;
  onDataChange: (data: Partial<BusinessProfile>) => void;
  language: 'es' | 'en';
  isAnalyzing: boolean;
  discoveryResult: PermitDiscoveryResult | null;
}

export const PermitWizardSteps = ({
  currentStep,
  businessProfile,
  onDataChange,
  language,
  isAnalyzing,
  discoveryResult
}: PermitWizardStepsProps) => {
  const steps = [
    language === 'es' ? 'Información Básica' : 'Basic Information',
    language === 'es' ? 'Ubicación y Características' : 'Location & Characteristics', 
    language === 'es' ? 'Análisis de Permisos' : 'Permit Analysis',
    language === 'es' ? 'Resultados y Recomendaciones' : 'Results & Recommendations'
  ];

  return (
    <>
      <CardHeader>
        <CardTitle className="text-white">
          {steps[currentStep]}
        </CardTitle>
      </CardHeader>

      {currentStep === 0 && (
        <BusinessWizardStep1
          businessData={{
            name: businessProfile.name || '',
            businessType: businessProfile.businessType || '',
            description: businessProfile.description || ''
          }}
          onDataChange={onDataChange}
          translations={{
            businessName: language === 'es' ? 'Nombre del Negocio' : 'Business Name',
            businessType: language === 'es' ? 'Tipo de Negocio' : 'Business Type',
            description: language === 'es' ? 'Descripción' : 'Description',
            businessTypes: {
              restaurant: language === 'es' ? 'Restaurante' : 'Restaurant',
              retail: language === 'es' ? 'Comercio al Detal' : 'Retail Store',
              salon: language === 'es' ? 'Salón de Belleza' : 'Beauty Salon',
              barbershop: language === 'es' ? 'Barbería' : 'Barbershop',
              services: language === 'es' ? 'Servicios Profesionales' : 'Professional Services',
              manufacturing: language === 'es' ? 'Manufactura' : 'Manufacturing',
              technology: language === 'es' ? 'Tecnología' : 'Technology'
            }
          }}
        />
      )}

      {currentStep === 1 && (
        <BusinessWizardStep2
          onAddressValidated={(address, zoning) => {
            onDataChange({ 
              municipality: address?.municipality || '',
              address: address?.street + ', ' + address?.city 
            });
          }}
          language={language}
        />
      )}

      {currentStep === 2 && (
        <PermitAnalysisStep
          businessProfile={businessProfile}
          onDataChange={onDataChange}
          language={language}
          isAnalyzing={isAnalyzing}
        />
      )}

      {currentStep === 3 && discoveryResult && (
        <PermitResultsStep
          discoveryResult={discoveryResult}
          language={language}
        />
      )}
    </>
  );
};
