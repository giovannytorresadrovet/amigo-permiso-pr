
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const DocumentsHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Documentos Requeridos
      </CardTitle>
      <CardDescription>
        Subir y gestionar todos los documentos necesarios para el Permiso Único
      </CardDescription>
    </CardHeader>
  );
};
