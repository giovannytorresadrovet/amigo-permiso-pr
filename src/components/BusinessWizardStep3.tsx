
interface BusinessWizardStep3Props {
  businessData: {
    employees: string;
    revenue: string;
  };
  onDataChange: (data: Partial<BusinessWizardStep3Props['businessData']>) => void;
  translations: {
    employees: string;
    revenue: string;
    employeeRanges: Record<string, string>;
    revenueRanges: Record<string, string>;
  };
}

export const BusinessWizardStep3 = ({ businessData, onDataChange, translations }: BusinessWizardStep3Props) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">{translations.employees}</label>
        <select
          value={businessData.employees}
          onChange={(e) => onDataChange({ employees: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          {Object.entries(translations.employeeRanges).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">{translations.revenue}</label>
        <select
          value={businessData.revenue}
          onChange={(e) => onDataChange({ revenue: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          {Object.entries(translations.revenueRanges).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
