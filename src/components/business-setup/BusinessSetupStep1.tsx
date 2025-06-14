
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BusinessSetupStep1Props {
  formData: {
    businessName: string;
    businessType: string;
    employees: string;
    revenue: string;
  };
  onInputChange: (field: string, value: string) => void;
  translations: any;
}

export const BusinessSetupStep1 = ({ formData, onInputChange, translations }: BusinessSetupStep1Props) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="businessName" className="text-slate-300">
          {translations.businessName}
        </Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => onInputChange('businessName', e.target.value)}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Ej. Café Luna"
        />
      </div>

      <div>
        <Label htmlFor="businessType" className="text-slate-300">
          {translations.businessType}
        </Label>
        <Select value={formData.businessType} onValueChange={(value) => onInputChange('businessType', value)}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(translations.businessTypes).map(([key, value]) => (
              <SelectItem key={key} value={key}>{value as string}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="employees" className="text-slate-300">
          {translations.employees}
        </Label>
        <Select value={formData.employees} onValueChange={(value) => onInputChange('employees', value)}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Seleccionar cantidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2-5">2-5</SelectItem>
            <SelectItem value="6-10">6-10</SelectItem>
            <SelectItem value="11-20">11-20</SelectItem>
            <SelectItem value="21+">21+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="revenue" className="text-slate-300">
          {translations.revenue}
        </Label>
        <Select value={formData.revenue} onValueChange={(value) => onInputChange('revenue', value)}>
          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
            <SelectValue placeholder="Seleccionar rango" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(translations.revenueRanges).map(([key, value]) => (
              <SelectItem key={key} value={key}>{value as string}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
