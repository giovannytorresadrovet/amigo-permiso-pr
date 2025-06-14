
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, AlertTriangle, CheckCircle, Building, Clock } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface BusinessSetupWizardProps {
  language: 'es' | 'en';
  onBack: () => void;
}

export const BusinessSetupWizard = ({ language, onBack }: BusinessSetupWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    location: '',
    municipality: '',
    employees: '',
    revenue: ''
  });
  const [zoningResult, setZoningResult] = useState<'checking' | 'compatible' | 'issues' | null>(null);
  const [discoveredIssues, setDiscoveredIssues] = useState<string[]>([]);

  const translations = {
    es: {
      title: "Asistente de Configuración Empresarial",
      subtitle: "Descubramos problemas potenciales antes de que inviertas tiempo y dinero",
      step1: "Información Básica",
      step2: "Ubicación y Zonificación",
      step3: "Análisis Inteligente",
      businessName: "Nombre del Negocio",
      businessType: "Tipo de Negocio",
      location: "Dirección Específica",
      municipality: "Municipio",
      employees: "Número de Empleados",
      revenue: "Ingresos Anuales Estimados",
      continue: "Continuar",
      back: "Regresar",
      analyzing: "Analizando zonificación...",
      compatible: "✅ Ubicación Compatible",
      issues: "⚠️ Problemas Detectados",
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
      municipalities: {
        sanJuan: "San Juan",
        bayamon: "Bayamón",
        carolina: "Carolina",
        ponce: "Ponce",
        caguas: "Caguas",
        guaynabo: "Guaynabo",
        arecibo: "Arecibo",
        mayaguez: "Mayagüez",
        other: "Otro"
      },
      revenueRanges: {
        under50k: "Menos de $50,000",
        "50k-100k": "$50,000 - $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1M",
        over1m: "Más de $1M"
      }
    },
    en: {
      title: "Business Setup Wizard",
      subtitle: "Let's discover potential problems before you invest time and money",
      step1: "Basic Information",
      step2: "Location & Zoning",
      step3: "Smart Analysis",
      businessName: "Business Name",
      businessType: "Business Type",
      location: "Specific Address",
      municipality: "Municipality",
      employees: "Number of Employees",
      revenue: "Estimated Annual Revenue",
      continue: "Continue",
      back: "Back",
      analyzing: "Analyzing zoning...",
      compatible: "✅ Location Compatible",
      issues: "⚠️ Issues Detected",
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
      municipalities: {
        sanJuan: "San Juan",
        bayamon: "Bayamón",
        carolina: "Carolina",
        ponce: "Ponce",
        caguas: "Caguas",
        guaynabo: "Guaynabo",
        arecibo: "Arecibo",
        mayaguez: "Mayagüez",
        other: "Other"
      },
      revenueRanges: {
        under50k: "Under $50,000",
        "50k-100k": "$50,000 - $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1M",
        over1m: "Over $1M"
      }
    }
  };

  const t = translations[language];

  // Simulate real-time zoning analysis
  useEffect(() => {
    if (currentStep === 2 && formData.location && formData.municipality && formData.businessType) {
      setZoningResult('checking');
      
      setTimeout(() => {
        // Simulate AI analysis results
        const hasIssues = Math.random() > 0.6; // 40% chance of issues for demo
        
        if (hasIssues) {
          setZoningResult('issues');
          setDiscoveredIssues([
            language === 'es' 
              ? "Restricción de estacionamiento: Se requieren 5 espacios adicionales"
              : "Parking restriction: 5 additional spaces required",
            language === 'es'
              ? "Permiso de ruido requerido para operaciones después de las 8 PM"
              : "Noise permit required for operations after 8 PM",
            language === 'es'
              ? "Restricción de señalización: Máximo 2 letreros exteriores"
              : "Signage restriction: Maximum 2 exterior signs allowed"
          ]);
        } else {
          setZoningResult('compatible');
          setDiscoveredIssues([]);
        }
      }, 2000);
    }
  }, [currentStep, formData.location, formData.municipality, formData.businessType, language]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canContinue = () => {
    if (currentStep === 1) {
      return formData.businessName && formData.businessType && formData.employees && formData.revenue;
    }
    if (currentStep === 2) {
      return formData.location && formData.municipality;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Button>
          <div className="text-right">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
              Paso {currentStep} de 3
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={(currentStep / 3) * 100} className="h-2" />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Step Content */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {currentStep === 1 && t.step1}
              {currentStep === 2 && t.step2}
              {currentStep === 3 && t.step3}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="businessName" className="text-slate-300">
                      {t.businessName}
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Ej. Café Luna"
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessType" className="text-slate-300">
                      {t.businessType}
                    </Label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.businessTypes).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="employees" className="text-slate-300">
                      {t.employees}
                    </Label>
                    <Select value={formData.employees} onValueChange={(value) => handleInputChange('employees', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Seleccionar cantidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2-5">2-5</SelectItem>
                        <SelectItem value="6-10">6-10</SelectItem>
                        <SelectItem value="11-20">11-20</SelectItem>
                        <SelectItem value="21+">21+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="revenue" className="text-slate-300">
                      {t.revenue}
                    </Label>
                    <Select value={formData.revenue} onValueChange={(value) => handleInputChange('revenue', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Seleccionar rango" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.revenueRanges).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="municipality" className="text-slate-300">
                      {t.municipality}
                    </Label>
                    <Select value={formData.municipality} onValueChange={(value) => handleInputChange('municipality', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Seleccionar municipio" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(t.municipalities).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-slate-300">
                      {t.location}
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="123 Calle Principal, Santurce"
                    />
                  </div>
                </div>

                {/* Real-time Zoning Analysis */}
                {(formData.location && formData.municipality && formData.businessType) && (
                  <div className="mt-8 p-6 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-center space-x-3 mb-4">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <h3 className="text-white font-semibold">Análisis de Zonificación en Tiempo Real</h3>
                    </div>

                    {zoningResult === 'checking' && (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                        <span className="text-slate-300">{t.analyzing}</span>
                      </div>
                    )}

                    {zoningResult === 'compatible' && (
                      <div className="flex items-center space-x-3 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span>{t.compatible}</span>
                      </div>
                    )}

                    {zoningResult === 'issues' && (
                      <div>
                        <div className="flex items-center space-x-3 text-yellow-400 mb-4">
                          <AlertTriangle className="w-5 h-5" />
                          <span>{t.issues}</span>
                        </div>
                        <div className="space-y-2">
                          {discoveredIssues.map((issue, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                              <span className="text-yellow-200 text-sm">{issue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {currentStep === 3 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¡Análisis Completado!
                </h3>
                <p className="text-slate-300 mb-6">
                  Hemos identificado todos los permisos requeridos y problemas potenciales para tu negocio.
                </p>
                <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <Building className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">7</div>
                    <div className="text-sm text-blue-300">Permisos Requeridos</div>
                  </div>
                  <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{discoveredIssues.length}</div>
                    <div className="text-sm text-yellow-300">Problemas Evitados</div>
                  </div>
                  <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                    <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">45</div>
                    <div className="text-sm text-green-300">Días Ahorrados</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  {t.back}
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  disabled={!canContinue()}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 ml-auto"
                >
                  {t.continue}
                </Button>
              ) : (
                <Button 
                  onClick={onBack}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 ml-auto"
                >
                  Ver Documentos Requeridos
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
