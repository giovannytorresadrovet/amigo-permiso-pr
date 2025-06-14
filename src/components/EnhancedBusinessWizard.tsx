
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Building2, MapPin, FileText, CheckCircle } from 'lucide-react';
import { AddressValidator } from './AddressValidator';
import { useOfflineStorage } from '@/hooks/useOfflineStorage';

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

  const handleAddressValidated = (address: any, zoningInfo: any) => {
    setBusinessData(prev => ({ ...prev, address, zoningInfo }));
    handleNext();
  };

  const handleComplete = async () => {
    try {
      await saveBusiness({
        name: businessData.name,
        address: businessData.address,
        businessType: businessData.businessType,
        permitStatus: 'pending'
      });
      onComplete(businessData);
    } catch (error) {
      console.error('Error saving business:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.businessName}</label>
              <input
                type="text"
                value={businessData.name}
                onChange={(e) => setBusinessData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Mi Empresa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t.businessType}</label>
              <select
                value={businessData.businessType}
                onChange={(e) => setBusinessData(prev => ({ ...prev, businessType: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Seleccionar tipo</option>
                {Object.entries(t.businessTypes).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t.description}</label>
              <textarea
                value={businessData.description}
                onChange={(e) => setBusinessData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={3}
                placeholder="Describe tu negocio..."
              />
            </div>
          </div>
        );

      case 1:
        return (
          <AddressValidator
            onAddressValidated={handleAddressValidated}
            language={language}
          />
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.employees}</label>
              <select
                value={businessData.employees}
                onChange={(e) => setBusinessData(prev => ({ ...prev, employees: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                {Object.entries(t.employeeRanges).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t.revenue}</label>
              <select
                value={businessData.revenue}
                onChange={(e) => setBusinessData(prev => ({ ...prev, revenue: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                {Object.entries(t.revenueRanges).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">¡Configuración Completa!</h3>
              <p className="text-gray-600">Revisa la información de tu negocio</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p><strong>Negocio:</strong> {businessData.name}</p>
              <p><strong>Tipo:</strong> {t.businessTypes[businessData.businessType as keyof typeof t.businessTypes]}</p>
              <p><strong>Ubicación:</strong> {businessData.address?.street}, {businessData.address?.city}</p>
              <p><strong>Empleados:</strong> {t.employeeRanges[businessData.employees as keyof typeof t.employeeRanges]}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-slate-300 hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Building2 className="w-6 h-6 mr-2" />
              {t.title}
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Paso {currentStep + 1} de {steps.length}</span>
                <span>{steps[currentStep]}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          <CardContent className="text-white">
            {renderStep()}
            
            {currentStep !== 1 && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t.back}
                </Button>
                
                {currentStep === steps.length - 1 ? (
                  <Button
                    onClick={handleComplete}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t.complete}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={
                      (currentStep === 0 && (!businessData.name || !businessData.businessType)) ||
                      (currentStep === 2 && (!businessData.employees || !businessData.revenue))
                    }
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {t.next}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
