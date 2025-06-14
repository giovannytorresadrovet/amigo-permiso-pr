
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface WizardSummaryProps {
  businessData: any;
  businessTypes: Array<{ value: string; label: string }>;
}

export const WizardSummary = ({ businessData, businessTypes }: WizardSummaryProps) => {
  return (
    <>
      <Card className="bg-slate-50">
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-slate-800">Información Básica</h3>
            <p className="text-slate-600">Nombre: {businessData.name}</p>
            <p className="text-slate-600">Tipo: {businessTypes.find(t => t.value === businessData.type)?.label}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800">Ubicación</h3>
            <p className="text-slate-600">{businessData.address}</p>
            <p className="text-slate-600">{businessData.city}, PR {businessData.zipCode}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800">Detalles Operacionales</h3>
            <p className="text-slate-600">Empleados: {businessData.employees}</p>
            <p className="text-slate-600">Ingresos: {businessData.revenue}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-800">Próximos Pasos</h4>
            <p className="text-blue-700 text-sm">
              Una vez configurado tu negocio, podrás usar nuestro sistema de IA para 
              identificar los permisos necesarios y subir documentos para validación.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
