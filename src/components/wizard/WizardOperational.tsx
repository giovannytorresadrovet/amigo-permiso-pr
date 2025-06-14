
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WizardOperationalProps {
  businessData: any;
  onInputChange: (field: string, value: string) => void;
}

export const WizardOperational = ({ businessData, onInputChange }: WizardOperationalProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="employees">Número de Empleados</Label>
        <Select onValueChange={(value) => onInputChange('employees', value)}>
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
        <Select onValueChange={(value) => onInputChange('revenue', value)}>
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
  );
};
