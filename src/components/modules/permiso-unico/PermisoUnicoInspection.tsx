
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface PermisoUnicoInspectionProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

export const PermisoUnicoInspection = ({ application, onApplicationUpdate, language }: PermisoUnicoInspectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inspección</CardTitle>
        <CardDescription>
          Programación y seguimiento de la inspección requerida
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-lg font-medium mb-4">Gestión de Inspección</p>
          <p className="text-gray-600">
            Esta sección estará disponible próximamente para programar y hacer seguimiento a las inspecciones.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
