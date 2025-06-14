
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useOfflineStorage } from '@/hooks/useOfflineStorage';
import { BusinessWizardStep1 } from './BusinessWizardStep1';
import { BusinessWizardStep2 } from './BusinessWizardStep2';
import { BusinessWizardStep3 } from './BusinessWizardStep3';
import { BusinessWizardStep4 } from './BusinessWizardStep4';
import { BusinessWizardNavigation } from './BusinessWizardNavigation';
import { BusinessWizardHeader } from './BusinessWizardHeader';

interface EnhancedBusinessWizardProps {
  language: 'es' | 'en';
  onComplete: (businessData: any) => void;
  onBack: () => void;
}

export const EnhancedBusinessWizard = ({ language, onComplete, onBack }: EnhancedBusinessWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessData, setBusinessData] = useState({
    name: '',
    businessType: '',
    description: '',
    address: null,
    zoningInfo: null,
    employees: '1-5',
    revenue: 'under-100k'
  });

  const { saveBusiness } = useOfflineStorage();

  const translations = {
    es: {
      title: "Asistente de Configuración de Negocio",
      steps: ["Información Básica", "Ubicación", "Detalles", "Confirmación"],
      businessName: "Nombre del Negocio",
      businessType: "Tipo de Negocio",
      description: "Descripción",
      employees: "Número de Empleados",
      revenue: "Ingresos Anuales Estimados",
      next: "Siguiente",
      back: "Anterior",
      complete: "Completar Configuración",
      businessTypes: {
        restaurant: "Restaurante",
        retail: "Comercio al por menor",
        service: "Servicios",
        manufacturing: "Manufactura",
        professional: "Servicios Profesionales",
        technology: "Tecnología",
        healthcare: "Salud",
        education: "Educación"
      },
      employeeRanges: {
        "1-5": "1-5 empleados",
        "6-20": "6-20 empleados",
        "21-50": "21-50 empleados",
        "51+": "Más de 50 empleados"
      },
      revenueRanges: {
        "under-100k": "Menos de $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1,000,000",
        "1m+": "Más de $1,000,000"
      }
    },
    en: {
      title: "Business Setup Wizard",
      steps: ["Basic Info", "Location", "Details", "Confirmation"],
      businessName: "Business Name",
      businessType: "Business Type",
      description: "Description",
      employees: "Number of Employees",
      revenue: "Estimated Annual Revenue",
      next: "Next",
      back: "Back",
      complete: "Complete Setup",
      businessTypes: {
        restaurant: "Restaurant",
        retail: "Retail",
        service: "Services",
        manufacturing: "Manufacturing",
        professional: "Professional Services",
        technology: "Technology",
        healthcare: "Healthcare",
        education: "Education"
      },
      employeeRanges: {
        "1-5": "1-5 employees",
        "6-20": "6-20 employees",
        "21-50": "21-50 employees",
        "51+": "50+ employees"
      },
      revenueRanges: {
        "under-100k": "Under $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1,000,000",
        "1m+": "Over $1,000,000"
      }
    }
  };

  const t = translations[language];
  const steps = t.steps;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataChange = (newData: any) => {
    setBusinessData(prev => ({ ...prev, ...newData }));
  };

  const handleAddressValidated = (address: any, zoningInfo: any) => {
    setBusinessData(prev => ({ ...prev, address, zoningInfo }));
    handleNext();
  };

  const handleComplete = async () => {
    try {
      await saveBusiness({
        name: businessData.name,
        address: businessData.address || {
          street: '',
          city: '',
          state: 'PR',
          zipCode: '',
          municipality: ''
        },
        businessType: businessData.businessType,
        permitStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      onComplete(businessData);
    } catch (error) {
      console.error('Error saving business:', error);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return businessData.name && businessData.businessType;
      case 2:
        return businessData.employees && businessData.revenue;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessWizardStep1
            businessData={businessData}
            onDataChange={handleDataChange}
            translations={t}
          />
        );
      case 1:
        return (
          <BusinessWizardStep2
            onAddressValidated={handleAddressValidated}
            language={language}
          />
        );
      case 2:
        return (
          <BusinessWizardStep3
            businessData={businessData}
            onDataChange={handleDataChange}
            translations={t}
          />
        );
      case 3:
        return (
          <BusinessWizardStep4
            businessData={businessData}
            translations={t}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-800/50 border-slate-700">
          <BusinessWizardHeader
            onBack={onBack}
            title={t.title}
            currentStep={currentStep}
            steps={steps}
            progress={progress}
          />
          
          <CardContent className="text-white">
            {renderStep()}
            
            {currentStep !== 1 && (
              <BusinessWizardNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onBack={handleBack}
                onNext={handleNext}
                onComplete={handleComplete}
                canProceed={canProceed()}
                translations={t}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
