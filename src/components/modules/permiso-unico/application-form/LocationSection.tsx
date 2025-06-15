
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PermisoUnicoBusinessInfo } from '@/types/permisoUnico';
import { MapPin } from 'lucide-react';

interface LocationSectionProps {
  formData: PermisoUnicoBusinessInfo;
  handleInputChange: (field: keyof PermisoUnicoBusinessInfo, value: any) => void;
}

export const LocationSection = ({ formData, handleInputChange }: LocationSectionProps) => {
  return (
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
  );
};
