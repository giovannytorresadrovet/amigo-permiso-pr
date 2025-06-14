
import { Building, MapPin, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WizardBasicInfo } from './WizardBasicInfo';
import { WizardLocation } from './WizardLocation';
import { WizardOperational } from './WizardOperational';
import { WizardSummary } from './WizardSummary';

interface WizardStepContentProps {
  currentStep: number;
  businessData: any;
  onInputChange: (field: string, value: string) => void;
  businessTypes: Array<{ value: string; label: string }>;
  cities: string[];
}

export const WizardStepContent = ({
  currentStep,
  businessData,
  onInputChange,
  businessTypes,
  cities
}: WizardStepContentProps) => {
  const stepConfigs = [
    {
      icon: Building,
      title: "Información Básica del Negocio",
      description: "Comencemos con los detalles básicos de tu negocio",
      component: WizardBasicInfo
    },
    {
      icon: MapPin,
      title: "Ubicación del Negocio",
      description: "Información sobre dónde opera tu negocio",
      component: WizardLocation
    },
    {
      icon: Users,
      title: "Detalles Operacionales",
      description: "Información sobre el tamaño y operaciones de tu negocio",
      component: WizardOperational
    },
    {
      icon: CheckCircle,
      title: "Resumen y Confirmación",
      description: "Revisa la información de tu negocio antes de continuar",
      component: WizardSummary
    }
  ];

  const currentConfig = stepConfigs[currentStep];
  const IconComponent = currentConfig.icon;
  const StepComponent = currentConfig.component;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <IconComponent className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{currentConfig.title}</h2>
        <p className="text-slate-600">{currentConfig.description}</p>
      </div>
      
      <StepComponent
        businessData={businessData}
        onInputChange={onInputChange}
        businessTypes={businessTypes}
        cities={cities}
      />
    </div>
  );
};
