
import { CheckCircle } from 'lucide-react';

interface BusinessWizardStep4Props {
  businessData: {
    name: string;
    businessType: string;
    address: any;
    employees: string;
  };
  translations: {
    businessTypes: Record<string, string>;
    employeeRanges: Record<string, string>;
  };
}

export const BusinessWizardStep4 = ({ businessData, translations }: BusinessWizardStep4Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">¡Configuración Completa!</h3>
        <p className="text-gray-600">Revisa la información de tu negocio</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <p><strong>Negocio:</strong> {businessData.name}</p>
        <p><strong>Tipo:</strong> {translations.businessTypes[businessData.businessType as keyof typeof translations.businessTypes]}</p>
        <p><strong>Ubicación:</strong> {businessData.address?.street}, {businessData.address?.city}</p>
        <p><strong>Empleados:</strong> {translations.employeeRanges[businessData.employees as keyof typeof translations.employeeRanges]}</p>
      </div>
    </div>
  );
};
