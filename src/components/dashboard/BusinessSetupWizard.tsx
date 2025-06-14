
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Building, MapPin, Users, FileText } from 'lucide-react';

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
    // Here you would typically save the business data
    onBack();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Building className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Información Básica del Negocio</h2>
              <p className="text-slate-600">Comencemos con los detalles básicos de tu negocio</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Nombre del Negocio</Label>
                <Input
                  id="businessName"
                  value={businessData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej. Café Luna"
                />
              </div>
              
              <div>
                <Label htmlFor="businessType">Tipo de Negocio</Label>
                <Select onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de negocio" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Descripción del Negocio</Label>
                <Textarea
                  id="description"
                  value={businessData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe brevemente tu negocio y los servicios que ofreces"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Ubicación del Negocio</h2>
              <p className="text-slate-600">Información sobre dónde opera tu negocio</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={businessData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Ej. 123 Calle Principal"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Select onValueChange={(value) => handleInputChange('city', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="zipCode">Código Postal</Label>
                  <Input
                    id="zipCode"
                    value={businessData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="00901"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Detalles Operacionales</h2>
              <p className="text-slate-600">Información sobre el tamaño y operaciones de tu negocio</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="employees">Número de Empleados</Label>
                <Select onValueChange={(value) => handleInputChange('employees', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el número de empleados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo yo</SelectItem>
                    <SelectItem value="2-5">2-5 empleados</SelectItem>
                    <SelectItem value="6-10">6-10 empleados</SelectItem>
                    <SelectItem value="11-25">11-25 empleados</SelectItem>
                    <SelectItem value="26-50">26-50 empleados</SelectItem>
                    <SelectItem value="50+">Más de 50 empleados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="revenue">Ingresos Anuales Estimados</Label>
                <Select onValueChange={(value) => handleInputChange('revenue', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el rango de ingresos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-50k">Menos de $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                    <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                    <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                    <SelectItem value="1m+">Más de $1,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Resumen y Confirmación</h2>
              <p className="text-slate-600">Revisa la información de tu negocio antes de continuar</p>
            </div>
            
            <Card className="bg-slate-50">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-800">Información Básica</h3>
                  <p className="text-slate-600">Nombre: {businessData.name}</p>
                  <p className="text-slate-600">Tipo: {businessTypes.find(t => t.value === businessData.type)?.label}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800">Ubicación</h3>
                  <p className="text-slate-600">{businessData.address}</p>
                  <p className="text-slate-600">{businessData.city}, PR {businessData.zipCode}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-800">Detalles Operacionales</h3>
                  <p className="text-slate-600">Empleados: {businessData.employees}</p>
                  <p className="text-slate-600">Ingresos: {businessData.revenue}</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800">Próximos Pasos</h4>
                  <p className="text-blue-700 text-sm">
                    Una vez configurado tu negocio, podrás usar nuestro sistema de IA para 
                    identificar los permisos necesarios y subir documentos para validación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
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
          {renderStep()}
          
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
