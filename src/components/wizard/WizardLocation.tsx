
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

interface WizardLocationProps {
  businessData: any;
  onInputChange: (field: string, value: string) => void;
  cities: string[];
}

export const WizardLocation = ({ businessData, onInputChange, cities }: WizardLocationProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 px-4 sm:px-0">
      <div>
        <Label htmlFor="address" className="text-sm sm:text-base">Dirección</Label>
        <Input
          id="address"
          value={businessData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Ej. 123 Calle Principal"
          className="mt-1"
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city" className="text-sm sm:text-base">Ciudad</Label>
          <Select onValueChange={(value) => onInputChange('city', value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={isMobile ? "Ciudad" : "Selecciona ciudad"} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-300 shadow-lg z-50">
              {cities.map((city) => (
                <SelectItem key={city} value={city} className="hover:bg-slate-100">
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="zipCode" className="text-sm sm:text-base">Código Postal</Label>
          <Input
            id="zipCode"
            value={businessData.zipCode}
            onChange={(e) => onInputChange('zipCode', e.target.value)}
            placeholder="00901"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};
