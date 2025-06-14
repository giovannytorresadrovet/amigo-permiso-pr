
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

interface AddressValidatorProps {
  onAddressValidated: (address: any, zoningInfo: any) => void;
  language: 'es' | 'en';
}

export const AddressValidator = ({ onAddressValidated, language }: AddressValidatorProps) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    municipality: '',
    zipCode: ''
  });
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  const translations = {
    es: {
      title: "Validación de Dirección y Zonificación",
      street: "Dirección",
      city: "Ciudad",
      municipality: "Municipio",
      zipCode: "Código Postal",
      validate: "Validar Dirección",
      validating: "Validando...",
      success: "Dirección válida",
      warning: "Restricciones de zonificación detectadas",
      error: "Error en la validación",
      continue: "Continuar"
    },
    en: {
      title: "Address and Zoning Validation",
      street: "Street Address",
      city: "City",
      municipality: "Municipality",
      zipCode: "ZIP Code",
      validate: "Validate Address",
      validating: "Validating...",
      success: "Valid address",
      warning: "Zoning restrictions detected",
      error: "Validation error",
      continue: "Continue"
    }
  };

  const t = translations[language];

  const validateAddress = async () => {
    setIsValidating(true);
    try {
      // Simulate zoning API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock zoning validation results
      const mockResult = {
        isValid: true,
        zoning: 'Commercial',
        restrictions: Math.random() > 0.7 ? [
          language === 'es' ? 'Requiere permiso especial para restaurantes' : 'Special permit required for restaurants',
          language === 'es' ? 'Restricciones de estacionamiento' : 'Parking restrictions'
        ] : [],
        municipality: address.municipality,
        permitRequirements: [
          { name: language === 'es' ? 'Permiso de Uso' : 'Use Permit', required: true },
          { name: language === 'es' ? 'Licencia Comercial' : 'Business License', required: true },
          { name: language === 'es' ? 'Certificado de Salud' : 'Health Certificate', required: false }
        ]
      };

      setValidationResult(mockResult);
    } catch (error) {
      setValidationResult({ error: 'Validation failed' });
    } finally {
      setIsValidating(false);
    }
  };

  const handleContinue = () => {
    onAddressValidated(address, validationResult);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="street">{t.street}</Label>
            <Input
              id="street"
              value={address.street}
              onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
              placeholder="123 Calle Principal"
            />
          </div>
          <div>
            <Label htmlFor="city">{t.city}</Label>
            <Input
              id="city"
              value={address.city}
              onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
              placeholder="San Juan"
            />
          </div>
          <div>
            <Label htmlFor="municipality">{t.municipality}</Label>
            <select
              id="municipality"
              value={address.municipality}
              onChange={(e) => setAddress(prev => ({ ...prev, municipality: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Seleccionar Municipio</option>
              <option value="San Juan">San Juan</option>
              <option value="Bayamón">Bayamón</option>
              <option value="Carolina">Carolina</option>
              <option value="Ponce">Ponce</option>
              <option value="Caguas">Caguas</option>
              <option value="Guaynabo">Guaynabo</option>
              <option value="Arecibo">Arecibo</option>
              <option value="Toa Baja">Toa Baja</option>
              <option value="Mayagüez">Mayagüez</option>
              <option value="Trujillo Alto">Trujillo Alto</option>
            </select>
          </div>
          <div>
            <Label htmlFor="zipCode">{t.zipCode}</Label>
            <Input
              id="zipCode"
              value={address.zipCode}
              onChange={(e) => setAddress(prev => ({ ...prev, zipCode: e.target.value }))}
              placeholder="00901"
            />
          </div>
        </div>

        <Button 
          onClick={validateAddress}
          disabled={isValidating || !address.street || !address.municipality}
          className="w-full"
        >
          {isValidating ? t.validating : t.validate}
        </Button>

        {validationResult && (
          <div className="space-y-4">
            {validationResult.error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{t.error}</AlertDescription>
              </Alert>
            ) : (
              <>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {t.success} - Zona: {validationResult.zoning}
                  </AlertDescription>
                </Alert>

                {validationResult.restrictions.length > 0 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-medium">{t.warning}</div>
                      <ul className="mt-2 list-disc list-inside">
                        {validationResult.restrictions.map((restriction: string, index: number) => (
                          <li key={index}>{restriction}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                <Button onClick={handleContinue} className="w-full">
                  {t.continue}
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
