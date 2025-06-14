
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface PermisoUnicoDocumentsProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

export const PermisoUnicoDocuments = ({ application, onApplicationUpdate, language }: PermisoUnicoDocumentsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos Requeridos</CardTitle>
        <CardDescription>
          Suba los documentos necesarios para su solicitud de Permiso Único
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-lg font-medium mb-4">Gestión de Documentos</p>
          <p className="text-gray-600">
            Esta sección estará disponible próximamente para gestionar los documentos requeridos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
