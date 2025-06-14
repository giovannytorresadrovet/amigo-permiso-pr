
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InspectionInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Información Importante</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-1">Preparación para la Inspección</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Asegúrese de estar presente durante la inspección</li>
            <li>• Tenga todos los documentos disponibles</li>
            <li>• El establecimiento debe estar listo para operar</li>
          </ul>
        </div>
        
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-1">Duración Estimada</h4>
          <p className="text-sm text-yellow-700">
            La inspección típicamente toma entre 1-2 horas dependiendo del tipo de establecimiento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
