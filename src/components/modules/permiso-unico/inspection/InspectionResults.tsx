
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PermisoUnicoInspection as PermisoUnicoInspectionType } from '@/types/permisoUnico';

interface InspectionResultsProps {
  inspection: PermisoUnicoInspectionType;
}

export const InspectionResults = ({ inspection }: InspectionResultsProps) => {
  if (inspection.status !== 'completed') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resultados de la Inspección</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Badge 
            variant={inspection.passed ? 'default' : 'destructive'}
            className="text-lg px-4 py-2"
          >
            {inspection.passed ? 'APROBADA' : 'REQUIERE CORRECCIONES'}
          </Badge>
        </div>

        {!inspection.passed && inspection.deficiencies.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Deficiencias Encontradas:</h4>
            <ul className="list-disc list-inside space-y-1">
              {inspection.deficiencies.map((deficiency, index) => (
                <li key={index} className="text-sm text-red-600">{deficiency}</li>
              ))}
            </ul>
          </div>
        )}

        {inspection.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Notas del Inspector:</h4>
            <p className="text-sm">{inspection.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
