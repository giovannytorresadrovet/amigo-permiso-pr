
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import type { InspectionItem } from '@/types/permisoUnico';

interface InspectionChecklistProps {
  checklist: InspectionItem[];
}

const getChecklistStatusIcon = (status: string) => {
  switch (status) {
    case 'passed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'failed':
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    case 'not_applicable':
      return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    default:
      return <Clock className="w-4 h-4 text-gray-400" />;
  }
};

export const InspectionChecklist = ({ checklist }: InspectionChecklistProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Lista de Verificación</CardTitle>
        <CardDescription>
          Elementos que serán evaluados durante la inspección
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
              {getChecklistStatusIcon(item.status)}
              <div className="flex-1">
                <h4 className="font-medium">{item.category}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
                {item.notes && (
                  <p className="text-xs text-gray-500 mt-1">
                    <strong>Notas:</strong> {item.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
