
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface WizardLocationProps {
  businessData: any;
  onInputChange: (field: string, value: string) => void;
  cities: string[];
}

export const WizardLocation = ({ businessData, onInputChange, cities }: WizardLocationProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          value={businessData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Ej. 123 Calle Principal"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">Ciudad</Label>
          <Select onValueChange={(value) => onInputChange('city', value)}>
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
            onChange={(e) => onInputChange('zipCode', e.target.value)}
            placeholder="00901"
          />
        </div>
      </div>
    </div>
  );
};
