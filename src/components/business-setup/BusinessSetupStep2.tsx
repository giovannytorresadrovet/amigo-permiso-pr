
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ZoningAnalysisDisplay } from './ZoningAnalysisDisplay';

interface BusinessSetupStep2Props {
  formData: {
    location: string;
    municipality: string;
    businessType: string;
  };
  onInputChange: (field: string, value: string) => void;
  zoningResult: 'checking' | 'compatible' | 'issues' | null;
  discoveredIssues: string[];
  translations: any;
}

export const BusinessSetupStep2 = ({ 
  formData, 
  onInputChange, 
  zoningResult, 
  discoveredIssues, 
  translations 
}: BusinessSetupStep2Props) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="municipality" className="text-slate-300">
            {translations.municipality}
          </Label>
          <Select value={formData.municipality} onValueChange={(value) => onInputChange('municipality', value)}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Seleccionar municipio" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(translations.municipalities).map(([key, value]) => (
                <SelectItem key={key} value={key}>{value as string}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location" className="text-slate-300">
            {translations.location}
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
            placeholder="123 Calle Principal, Santurce"
          />
        </div>
      </div>

      <ZoningAnalysisDisplay
        shouldShow={!!(formData.location && formData.municipality && formData.businessType)}
        zoningResult={zoningResult}
        discoveredIssues={discoveredIssues}
        translations={translations}
      />
    </>
  );
};
