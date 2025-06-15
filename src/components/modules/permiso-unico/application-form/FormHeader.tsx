
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const FormHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Solicitud de Permiso Único
      </CardTitle>
      <CardDescription>
        Complete toda la información requerida para su solicitud de Permiso Único de Operación
      </CardDescription>
    </CardHeader>
  );
};
