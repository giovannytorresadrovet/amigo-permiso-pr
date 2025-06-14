
import { useState } from 'react';

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

export const useBusinessSetupState = (onBack: () => void) => {
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

  return {
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
  };
};
