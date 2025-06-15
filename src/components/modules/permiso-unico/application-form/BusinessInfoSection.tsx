
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PermisoUnicoBusinessInfo } from '@/types/permisoUnico';
import { Building2 } from 'lucide-react';

interface BusinessInfoSectionProps {
  formData: PermisoUnicoBusinessInfo;
  handleInputChange: (field: keyof PermisoUnicoBusinessInfo, value: any) => void;
}

export const BusinessInfoSection = ({ formData, handleInputChange }: BusinessInfoSectionProps) => {
  return (
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
  );
};
