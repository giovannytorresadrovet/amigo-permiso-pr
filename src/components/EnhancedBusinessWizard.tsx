import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BusinessWizardHeader } from './BusinessWizardHeader';
import { BusinessWizardStep1 } from './BusinessWizardStep1';
import { BusinessWizardStep2 } from './BusinessWizardStep2';
import { BusinessWizardStep3 } from './BusinessWizardStep3';
import { BusinessWizardStep4 } from './BusinessWizardStep4';
import { BusinessWizardNavigation } from './BusinessWizardNavigation';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';

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
  const { notifySuccess, notifyError, notifyInfo } = useNotificationEffects();

  const translations = {
    es: {
      title: "Asistente de Configuración Empresarial",
      steps: ["Información Básica", "Ubicación", "Detalles", "Resumen"],
      businessName: "Nombre del Negocio",
      businessType: "Tipo de Negocio",
      description: "Descripción",
      back: "Atrás",
      next: "Siguiente",
      complete: "Completar",
      businessTypes: {
        restaurant: "Restaurante",
        retail: "Comercio al Detal",
        services: "Servicios Profesionales",
        manufacturing: "Manufactura",
        tech: "Tecnología",
        healthcare: "Salud",
        education: "Educación",
        other: "Otro"
      },
      employeeRanges: {
        "1": "1 empleado",
        "2-5": "2-5 empleados",
        "6-10": "6-10 empleados",
        "11-20": "11-20 empleados",
        "21+": "21+ empleados"
      },
      revenueRanges: {
        under50k: "Menos de $50,000",
        "50k-100k": "$50,000 - $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1M",
        over1m: "Más de $1M"
      },
      employees: "Número de Empleados",
      revenue: "Ingresos Anuales Estimados"
    },
    en: {
      title: "Business Setup Wizard",
      steps: ["Basic Info", "Location", "Details", "Summary"],
      businessName: "Business Name",
      businessType: "Business Type",
      description: "Description",
      back: "Back",
      next: "Next",
      complete: "Complete",
      businessTypes: {
        restaurant: "Restaurant",
        retail: "Retail Store",
        services: "Professional Services",
        manufacturing: "Manufacturing",
        tech: "Technology",
        healthcare: "Healthcare",
        education: "Education",
        other: "Other"
      },
      employeeRanges: {
        "1": "1 employee",
        "2-5": "2-5 employees",
        "6-10": "6-10 employees",
        "11-20": "11-20 employees",
        "21+": "21+ employees"
      },
      revenueRanges: {
        under50k: "Under $50,000",
        "50k-100k": "$50,000 - $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1M",
        over1m: "Over $1M"
      },
      employees: "Number of Employees",
      revenue: "Estimated Annual Revenue"
    }
  };

  const t = translations[language];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      
      // Show step completion notifications
      if (currentStep === 0) {
        notifySuccess(
          language === 'es' ? 'Información Básica Completada' : 'Basic Information Completed',
          language === 'es' 
            ? 'Datos del negocio guardados exitosamente.' 
            : 'Business information saved successfully.'
        );
      } else if (currentStep === 1) {
        notifySuccess(
          language === 'es' ? 'Ubicación Validada' : 'Location Validated',
          language === 'es' 
            ? 'Dirección verificada y información de zonificación obtenida.' 
            : 'Address verified and zoning information obtained.'
        );
      } else if (currentStep === 2) {
        notifyInfo(
          language === 'es' ? 'Revisión Final' : 'Final Review',
          language === 'es' 
            ? 'Revisa toda la información antes de completar.' 
            : 'Review all information before completing.'
        );
      }
    } else {
      try {
        const completeData = { ...businessData, zoningInfo };
        onComplete(completeData);
        notifySuccess(
          language === 'es' ? '¡Configuración Completada!' : 'Setup Completed!',
          language === 'es' 
            ? 'Tu perfil de negocio ha sido configurado exitosamente.' 
            : 'Your business profile has been set up successfully.',
          true
        );
      } catch (error) {
        notifyError(
          language === 'es' ? 'Error al Completar' : 'Completion Error',
          language === 'es' 
            ? 'Hubo un problema al guardar la configuración.' 
            : 'There was a problem saving the setup.'
        );
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
      notifyError(
        language === 'es' ? 'Advertencias de Zonificación' : 'Zoning Warnings',
        language === 'es' 
          ? 'Se encontraron posibles problemas de zonificación.' 
          : 'Potential zoning issues were found.',
        true
      );
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
          <BusinessWizardHeader
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

            <BusinessWizardNavigation
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
