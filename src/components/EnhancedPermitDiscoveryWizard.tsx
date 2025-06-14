
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Clock, DollarSign } from 'lucide-react';
import { PermitDiscoveryEngine, BusinessProfile, PermitDiscoveryResult } from '@/services/permitDiscoveryEngine';
import { BusinessWizardStep1 } from './BusinessWizardStep1';
import { BusinessWizardStep2 } from './BusinessWizardStep2';
import { BusinessWizardStep3 } from './BusinessWizardStep3';

interface EnhancedPermitDiscoveryWizardProps {
  language: 'es' | 'en';
  onComplete: (result: PermitDiscoveryResult) => void;
  onBack: () => void;
}

export const EnhancedPermitDiscoveryWizard = ({ 
  language, 
  onComplete, 
  onBack 
}: EnhancedPermitDiscoveryWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessProfile, setBusinessProfile] = useState<Partial<BusinessProfile>>({
    name: '',
    businessType: '',
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
        // Trigger permit discovery analysis
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
        {/* Header */}
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

        {/* Progress */}
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

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {language === 'es' 
              ? 'Descubrimiento Inteligente de Permisos'
              : 'Smart Permit Discovery'
            }
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Identifiquemos todos los permisos que necesitas y los problemas potenciales antes de invertir'
              : 'Let\'s identify all the permits you need and potential issues before you invest'
            }
          </p>
        </div>

        {/* Step Content */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {steps[currentStep]}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <BusinessWizardStep1
                businessData={businessProfile}
                onDataChange={handleDataChange}
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
                  handleDataChange({ 
                    municipality: address?.municipality || '',
                    address: address?.street + ', ' + address?.city 
                  });
                }}
                language={language}
              />
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <BusinessWizardStep3
                  businessData={{
                    employees: businessProfile.employees?.toString() || '1',
                    revenue: businessProfile.revenue || 'under50k'
                  }}
                  onDataChange={(data) => handleDataChange({
                    employees: parseInt(data.employees || '1'),
                    revenue: data.revenue
                  })}
                  translations={{
                    employees: language === 'es' ? 'Número de Empleados' : 'Number of Employees',
                    revenue: language === 'es' ? 'Ingresos Anuales' : 'Annual Revenue',
                    employeeRanges: {
                      '1': '1',
                      '2-5': '2-5',
                      '6-10': '6-10',
                      '11+': '11+'
                    },
                    revenueRanges: {
                      under50k: language === 'es' ? 'Menos de $50,000' : 'Under $50,000',
                      '50k-100k': '$50,000 - $100,000',
                      '100k+': language === 'es' ? 'Más de $100,000' : 'Over $100,000'
                    }
                  }}
                />

                {/* Additional Business Characteristics */}
                <div className="space-y-4 p-6 bg-slate-700/50 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {language === 'es' ? 'Características del Negocio' : 'Business Characteristics'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3 text-slate-300">
                      <input
                        type="checkbox"
                        checked={businessProfile.servesFood}
                        onChange={(e) => handleDataChange({ servesFood: e.target.checked })}
                        className="rounded"
                      />
                      <span>{language === 'es' ? 'Sirve comida' : 'Serves food'}</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 text-slate-300">
                      <input
                        type="checkbox"
                        checked={businessProfile.handlesChemicals}
                        onChange={(e) => handleDataChange({ handlesChemicals: e.target.checked })}
                        className="rounded"
                      />
                      <span>{language === 'es' ? 'Maneja químicos' : 'Handles chemicals'}</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 text-slate-300">
                      <input
                        type="checkbox"
                        checked={businessProfile.operatesLateHours}
                        onChange={(e) => handleDataChange({ operatesLateHours: e.target.checked })}
                        className="rounded"
                      />
                      <span>{language === 'es' ? 'Opera horario extendido' : 'Operates late hours'}</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 text-slate-300">
                      <input
                        type="checkbox"
                        checked={businessProfile.hasPhysicalLocation}
                        onChange={(e) => handleDataChange({ hasPhysicalLocation: e.target.checked })}
                        className="rounded"
                      />
                      <span>{language === 'es' ? 'Tiene ubicación física' : 'Has physical location'}</span>
                    </label>
                  </div>
                </div>

                {/* Analysis Status */}
                {isAnalyzing && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-slate-300">
                      {language === 'es' 
                        ? 'Analizando requisitos de permisos...'
                        : 'Analyzing permit requirements...'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && discoveryResult && (
              <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                      <div>
                        <div className="text-xl font-bold text-white">
                          {discoveryResult.requiredPermits.length}
                        </div>
                        <div className="text-sm text-blue-300">
                          {language === 'es' ? 'Permisos Requeridos' : 'Required Permits'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      <div>
                        <div className="text-xl font-bold text-white">
                          {discoveryResult.potentialIssues.length}
                        </div>
                        <div className="text-sm text-yellow-300">
                          {language === 'es' ? 'Problemas Potenciales' : 'Potential Issues'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-green-400" />
                      <div>
                        <div className="text-xl font-bold text-white">
                          {discoveryResult.estimatedTimeline}
                        </div>
                        <div className="text-sm text-green-300">
                          {language === 'es' ? 'Tiempo Estimado' : 'Estimated Time'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Estimate */}
                <div className="p-6 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">
                      {language === 'es' ? 'Costo Estimado Total' : 'Total Estimated Cost'}
                    </h3>
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {discoveryResult.estimatedCost}
                  </div>
                  <p className="text-sm text-slate-400 mt-2">
                    {language === 'es' 
                      ? 'Incluye tarifas gubernamentales, no incluye costos de consultoría'
                      : 'Includes government fees, excludes consulting costs'
                    }
                  </p>
                </div>

                {/* Critical Issues */}
                {discoveryResult.potentialIssues.some(issue => issue.severity === 'critical') && (
                  <div className="p-6 bg-red-500/10 rounded-lg border border-red-500/30">
                    <h3 className="text-lg font-semibold text-red-400 mb-4">
                      {language === 'es' ? '⚠️ Problemas Críticos Detectados' : '⚠️ Critical Issues Detected'}
                    </h3>
                    {discoveryResult.potentialIssues
                      .filter(issue => issue.severity === 'critical')
                      .map((issue, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <h4 className="font-medium text-red-300">{issue.title}</h4>
                          <p className="text-sm text-red-200">{issue.description}</p>
                          <p className="text-sm text-red-100 mt-1">
                            <strong>{language === 'es' ? 'Solución:' : 'Solution:'}</strong> {issue.solution}
                          </p>
                        </div>
                      ))
                    }
                  </div>
                )}

                {/* Recommendations */}
                <div className="p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <h3 className="text-lg font-semibold text-blue-400 mb-4">
                    {language === 'es' ? '💡 Recomendaciones' : '💡 Recommendations'}
                  </h3>
                  <ul className="space-y-2">
                    {discoveryResult.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-blue-200 flex items-start space-x-2">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Anterior' : 'Previous'}
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!canProceed() || isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                {currentStep < 3 ? (
                  <>
                    {language === 'es' ? 'Siguiente' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {language === 'es' ? 'Ver Plan Detallado' : 'View Detailed Plan'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
