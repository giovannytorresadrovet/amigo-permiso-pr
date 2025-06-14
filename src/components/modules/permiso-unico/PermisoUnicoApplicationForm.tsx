
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, Clock, Users } from 'lucide-react';
import { PermisoUnicoApplication, PermisoUnicoBusinessInfo, OperatingHours } from '@/types/permisoUnico';

interface PermisoUnicoApplicationFormProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  businessId?: string;
  language: 'es' | 'en';
}

export const PermisoUnicoApplicationForm = ({ 
  application, 
  onApplicationUpdate, 
  businessId, 
  language 
}: PermisoUnicoApplicationFormProps) => {
  const [formData, setFormData] = useState<PermisoUnicoBusinessInfo>(() => {
    return application?.businessInfo || {
      businessName: '',
      dbaName: '',
      businessType: '',
      crimNumber: '',
      taxId: '',
      municipality: '',
      address: '',
      urbanization: '',
      zipCode: '',
      phone: '',
      email: '',
      description: '',
      operatingHours: {
        monday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        tuesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        wednesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        thursday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        friday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        saturday: { isOpen: false },
        sunday: { isOpen: false }
      },
      employeeCount: 1,
      estimatedRevenue: ''
    };
  });

  const handleInputChange = (field: keyof PermisoUnicoBusinessInfo, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOperatingHoursChange = (day: keyof OperatingHours, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = () => {
    // Create or update application
    const newApplication: PermisoUnicoApplication = {
      id: application?.id || crypto.randomUUID(),
      businessId: businessId || '',
      status: 'submitted',
      submittedAt: new Date(),
      lastUpdated: new Date(),
      businessInfo: formData,
      documents: application?.documents || [],
      fees: application?.fees || {
        baseFee: 150,
        additionalFees: [],
        totalAmount: 150,
        paidAmount: 0,
        paymentStatus: 'pending'
      },
      notes: application?.notes || []
    };

    onApplicationUpdate(newApplication);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Información del Negocio
          </CardTitle>
          <CardDescription>
            Complete la información básica de su establecimiento comercial
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessName">Nombre del Negocio *</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                placeholder="Ej. Café Luna"
              />
            </div>
            <div>
              <Label htmlFor="dbaName">Nombre Comercial (DBA)</Label>
              <Input
                id="dbaName"
                value={formData.dbaName}
                onChange={(e) => handleInputChange('dbaName', e.target.value)}
                placeholder="Opcional"
              />
            </div>
            <div>
              <Label htmlFor="businessType">Tipo de Negocio *</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tipo de negocio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Comercio al por menor</SelectItem>
                  <SelectItem value="restaurant">Restaurante</SelectItem>
                  <SelectItem value="office">Oficina</SelectItem>
                  <SelectItem value="service">Servicios</SelectItem>
                  <SelectItem value="manufacturing">Manufactura</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="crimNumber">Número CRIM *</Label>
              <Input
                id="crimNumber"
                value={formData.crimNumber}
                onChange={(e) => handleInputChange('crimNumber', e.target.value)}
                placeholder="XXX-XXX-XXX"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Ubicación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="municipality">Municipio *</Label>
              <Select value={formData.municipality} onValueChange={(value) => handleInputChange('municipality', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione municipio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="san-juan">San Juan</SelectItem>
                  <SelectItem value="bayamon">Bayamón</SelectItem>
                  <SelectItem value="carolina">Carolina</SelectItem>
                  <SelectItem value="ponce">Ponce</SelectItem>
                  <SelectItem value="caguas">Caguas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="zipCode">Código Postal *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="00901"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="address">Dirección *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Calle Principal 123"
            />
          </div>
          <div>
            <Label htmlFor="urbanization">Urbanización</Label>
            <Input
              id="urbanization"
              value={formData.urbanization}
              onChange={(e) => handleInputChange('urbanization', e.target.value)}
              placeholder="Ej. Villa Carolina"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Horario de Operación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(formData.operatingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium capitalize">
                  {day === 'monday' && 'Lunes'}
                  {day === 'tuesday' && 'Martes'}
                  {day === 'wednesday' && 'Miércoles'}
                  {day === 'thursday' && 'Jueves'}
                  {day === 'friday' && 'Viernes'}
                  {day === 'saturday' && 'Sábado'}
                  {day === 'sunday' && 'Domingo'}
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hours.isOpen}
                      onChange={(e) => handleOperatingHoursChange(day as keyof OperatingHours, 'isOpen', e.target.checked)}
                    />
                    <span className="text-sm">Abierto</span>
                  </label>
                  {hours.isOpen && (
                    <>
                      <Input
                        type="time"
                        value={hours.openTime}
                        onChange={(e) => handleOperatingHoursChange(day as keyof OperatingHours, 'openTime', e.target.value)}
                        className="w-32"
                      />
                      <span className="text-sm">a</span>
                      <Input
                        type="time"
                        value={hours.closeTime}
                        onChange={(e) => handleOperatingHoursChange(day as keyof OperatingHours, 'closeTime', e.target.value)}
                        className="w-32"
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Información Operacional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employeeCount">Número de Empleados *</Label>
              <Input
                id="employeeCount"
                type="number"
                value={formData.employeeCount}
                onChange={(e) => handleInputChange('employeeCount', parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="estimatedRevenue">Ingresos Estimados Anuales</Label>
              <Select value={formData.estimatedRevenue} onValueChange={(value) => handleInputChange('estimatedRevenue', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-25000">$0 - $25,000</SelectItem>
                  <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
                  <SelectItem value="100000-250000">$100,000 - $250,000</SelectItem>
                  <SelectItem value="250000+">$250,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Descripción del Negocio *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describa brevemente su negocio y los servicios que ofrece..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">
          Guardar Borrador
        </Button>
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
          Enviar Solicitud
        </Button>
      </div>
    </div>
  );
};
