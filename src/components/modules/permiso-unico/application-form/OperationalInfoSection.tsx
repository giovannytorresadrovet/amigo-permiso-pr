
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PermisoUnicoBusinessInfo } from '@/types/permisoUnico';
import { Users } from 'lucide-react';

interface OperationalInfoSectionProps {
  formData: PermisoUnicoBusinessInfo;
  handleInputChange: (field: keyof PermisoUnicoBusinessInfo, value: any) => void;
}

export const OperationalInfoSection = ({ formData, handleInputChange }: OperationalInfoSectionProps) => {
  return (
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
  );
};
