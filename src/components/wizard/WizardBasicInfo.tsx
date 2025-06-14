
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface WizardBasicInfoProps {
  businessData: any;
  onInputChange: (field: string, value: string) => void;
  businessTypes: Array<{ value: string; label: string }>;
}

export const WizardBasicInfo = ({ businessData, onInputChange, businessTypes }: WizardBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="businessName">Nombre del Negocio</Label>
        <Input
          id="businessName"
          value={businessData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="Ej. Café Luna"
        />
      </div>
      
      <div>
        <Label htmlFor="businessType">Tipo de Negocio</Label>
        <Select onValueChange={(value) => onInputChange('type', value)}>
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
          onChange={(e) => onInputChange('description', e.target.value)}
          placeholder="Describe brevemente tu negocio y los servicios que ofreces"
          rows={3}
        />
      </div>
    </div>
  );
};
