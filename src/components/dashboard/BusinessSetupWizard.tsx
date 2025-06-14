
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { WizardStepContent } from '../wizard/WizardStepContent';

interface BusinessSetupWizardProps {
  onBack: () => void;
}

interface BusinessData {
  name: string;
  type: string;
  description: string;
  address: string;
  city: string;
  zipCode: string;
  employees: string;
  revenue: string;
}

export const BusinessSetupWizard = ({ onBack }: BusinessSetupWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '',
    type: '',
    description: '',
    address: '',
    city: '',
    zipCode: '',
    employees: '',
    revenue: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const businessTypes = [
    { value: 'restaurant', label: 'Restaurante / Restaurant' },
    { value: 'retail', label: 'Comercio al Detalle / Retail' },
    { value: 'professional', label: 'Servicios Profesionales / Professional Services' },
    { value: 'construction', label: 'Construcción / Construction' },
    { value: 'technology', label: 'Tecnología / Technology' },
    { value: 'healthcare', label: 'Salud / Healthcare' },
    { value: 'education', label: 'Educación / Education' },
    { value: 'other', label: 'Otro / Other' }
  ];

  const cities = [
    'San Juan', 'Bayamón', 'Carolina', 'Ponce', 'Caguas', 'Guaynabo', 
    'Arecibo', 'Toa Baja', 'Mayagüez', 'Trujillo Alto', 'Aguadilla', 'Humacao'
  ];

  const handleInputChange = (field: keyof BusinessData, value: string) => {
    setBusinessData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Business setup completed:', businessData);
    onBack();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>
        <div className="text-sm text-slate-600">
          Paso {currentStep} de {totalSteps}
        </div>
      </div>

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
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Completar Configuración
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
