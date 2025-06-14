
import { Building2 } from 'lucide-react';

interface BusinessWizardStep1Props {
  businessData: {
    name: string;
    businessType: string;
    description: string;
  };
  onDataChange: (data: Partial<BusinessWizardStep1Props['businessData']>) => void;
  translations: {
    businessName: string;
    businessType: string;
    description: string;
    businessTypes: Record<string, string>;
  };
}

export const BusinessWizardStep1 = ({ businessData, onDataChange, translations }: BusinessWizardStep1Props) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">{translations.businessName}</label>
        <input
          type="text"
          value={businessData.name}
          onChange={(e) => onDataChange({ name: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Mi Empresa"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">{translations.businessType}</label>
        <select
          value={businessData.businessType}
          onChange={(e) => onDataChange({ businessType: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="">Seleccionar tipo</option>
          {Object.entries(translations.businessTypes).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">{translations.description}</label>
        <textarea
          value={businessData.description}
          onChange={(e) => onDataChange({ description: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          placeholder="Describe tu negocio..."
        />
      </div>
    </div>
  );
};
